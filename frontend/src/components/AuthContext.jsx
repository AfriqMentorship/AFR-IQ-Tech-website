import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isRecovering, setIsRecovering] = useState(false);

  useEffect(() => {
    const fetchProfile = async (sessionUser) => {
      if (!sessionUser) {
        setUser(null);
        return;
      }
      // Fetch role and extra data from our users table
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (!data) {
        // User exists in auth but missing from public.users. Sync them now!
        const insertData = {
          id: sessionUser.id,
          email: sessionUser.email,
          full_name: sessionUser.user_metadata?.full_name
            || sessionUser.user_metadata?.name
            || sessionUser.email.split('@')[0],
          phone: sessionUser.user_metadata?.phone || '',
          avatar_url: sessionUser.user_metadata?.avatar_url || sessionUser.user_metadata?.picture || null,
          role: 'student',
          status: 'Active'
        };
        const { error: insertErr } = await supabase.from('users').insert([insertData]);
        if (!insertErr) {
          setUser({ ...sessionUser, profile: insertData });
        } else {
          // Row may already exist (race condition) — fetch it instead
          const { data: existing } = await supabase.from('users').select('*').eq('id', sessionUser.id).single();
          setUser({ ...sessionUser, profile: existing || insertData });
        }
      } else {
        setUser({ ...sessionUser, profile: data });
      }
    };

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      fetchProfile(session?.user ?? null);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetchProfile(session?.user ?? null);
        if (event === 'PASSWORD_RECOVERY') {
          setIsRecovering(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signup = async ({ fullName, email, phone, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        }
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Sync to public.users table immediately
    if (data.user) {
      await supabase.from('users').insert([{
        id: data.user.id,
        email: email,
        full_name: fullName,
        phone: phone,
        role: 'student',
        status: 'Active'
      }]);
    }

    return { success: true };
  };

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email) => {
    // Determine the best redirect URL for testing and production
    // If we're on local wifi, we use the local IP so phone testing works
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const localIP = "http://192.168.1.3:5173"; 
    const redirectTo = isLocal ? localIP : "https://afr-iq.tech";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { success: false, error: error.message };
    setIsRecovering(false);
    return { success: true };
  };

  const updateProfile = async ({ fullName, phone }) => {
    if (!user) return { success: false, error: "Not logged in" };
    // Update auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone: phone }
    });
    if (authError) return { success: false, error: authError.message };

    // Update public.users
    const { error: dbError } = await supabase.from('users').update({
      full_name: fullName,
      phone: phone
    }).eq('id', user.id);
    
    if (dbError) return { success: false, error: dbError.message };

    // Update local state
    setUser(prev => ({
      ...prev,
      user_metadata: { ...prev.user_metadata, full_name: fullName, phone: phone },
      profile: { ...prev.profile, full_name: fullName, phone: phone }
    }));

    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user, isRecovering, setIsRecovering,
      signup, login, loginWithGoogle, logout,
      resetPassword, updatePassword, updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}