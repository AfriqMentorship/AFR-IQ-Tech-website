import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo-removebg-preview.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-page {
    min-height: 100vh;
    background: var(--bg-base);
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'Poppins', sans-serif;
    color: var(--text-primary);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .auth-left {
    position: relative;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 60px 64px;
    background: var(--bg-level1);
    overflow: hidden;
    border-right: 1px solid var(--border-medium);
  }
  .auth-left::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 30%, var(--accent-orange-glow) 0%, transparent 65%),
      radial-gradient(ellipse 60% 80% at 80% 80%, var(--accent-green-glow) 0%, transparent 60%);
    pointer-events: none;
  }
  .auth-left-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--border-subtle) 1px, transparent 1px),
      linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    opacity: 0.4;
  }

  .auth-lines {
    position: absolute; inset: 0;
    display: flex; gap: 50px; padding: 0 5%;
    pointer-events: none; overflow: hidden;
  }
  .auth-line { flex: 1; position: relative; overflow: hidden; }
  .auth-line::after {
    content: ''; position: absolute; width: 1.5px; left: 50%;
    height: 50%;
    background: linear-gradient(180deg, transparent 0%, var(--accent-orange) 40%, var(--accent-orange) 60%, transparent 100%);
    animation: authLine 6s linear infinite;
    opacity: 0.3;
  }
  .auth-line:nth-child(2n)::after { animation-delay: -2s; background: linear-gradient(180deg, transparent 0%, var(--accent-green) 40%, var(--accent-green) 60%, transparent 100%); }
  @keyframes authLine { 0% { top: -60%; } 100% { top: 120%; } }

  .auth-left-top { position: relative; z-index: 2; }
  .auth-brand {
    display: flex; align-items: center; gap: 14px; margin-bottom: 64px;
  }
  .auth-brand-logo {
    width: 56px; height: 56px; border-radius: 12px;
    overflow: hidden; background: transparent;
    display: flex; align-items: center; justify-content: center;
  }
  .auth-brand-logo img { width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 12px var(--accent-orange-glow)); }
  .auth-brand-name { font-family: 'Poppins', sans-serif; font-size: 30px; letter-spacing: 0.08em; color: var(--text-primary); line-height: 1; }
  .auth-brand-sub { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--accent-orange); letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700; }

  .auth-left-headline {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(48px, 6vw, 76px);
    line-height: 0.9;
    color: var(--text-primary);
    margin-bottom: 24px;
  }
  .auth-left-headline .hl { color: var(--accent-orange); display: block; text-shadow: 0 0 40px var(--accent-orange-glow); }
  .auth-left-headline .hl2 { color: var(--accent-green); display: block; }

  .auth-left-desc {
    font-size: 16px; color: var(--text-secondary); line-height: 1.7; max-width: 440px; margin-bottom: 48px;
  }

  .auth-features { display: flex; flex-direction: column; gap: 14px; }
  .auth-feature {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px;
    background: var(--bg-level2); border: 1px solid var(--border-subtle);
    border-radius: 10px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .auth-feature:hover { border-color: var(--accent-orange); background: var(--bg-level1); transform: translateX(8px); }
  .auth-feature-icon { font-size: 20px; flex-shrink: 0; filter: drop-shadow(0 0 8px var(--accent-orange-glow)); }
  .auth-feature-text { font-size: 14px; color: var(--text-secondary); font-weight: 700; }

  .auth-left-bottom { position: relative; z-index: 2; }
  .auth-quote {
    padding: 24px 28px;
    border-left: 4px solid var(--accent-orange);
    background: var(--bg-glass);
    backdrop-filter: blur(10px);
    border-radius: 0 12px 12px 0;
    box-shadow: var(--shadow-soft);
  }
  .auth-quote-text { font-size: 14px; color: var(--text-secondary); line-height: 1.8; font-style: italic; margin-bottom: 12px; }
  .auth-quote-author { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--accent-orange); letter-spacing: 0.1em; font-weight: 700; }

  .auth-right {
    display: flex; align-items: center; justify-content: center;
    padding: 60px 64px;
    background: var(--bg-base);
  }

  .auth-form-wrap { width: 100%; max-width: 420px; }

  .auth-form-title {
    font-family: 'Poppins', sans-serif; font-size: 44px;
    letter-spacing: 0.02em; color: var(--text-primary); margin-bottom: 8px;
  }
  .auth-form-sub { font-size: 15px; color: var(--text-muted); margin-bottom: 40px; font-family: 'Inter', sans-serif; }

  .auth-field { margin-bottom: 24px; }
  .auth-label {
    display: block; font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em;
    margin-bottom: 10px; font-weight: 700;
  }
  .auth-input-wrap { position: relative; }
  .auth-input-icon {
    position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
    font-size: 16px; pointer-events: none;
    color: var(--text-muted); opacity: 0.6;
  }
  .auth-input {
    width: 100%; padding: 15px 16px 15px 48px;
    background: var(--bg-level1); border: 1px solid var(--border-medium);
    border-radius: 10px; color: var(--text-primary);
    font-family: 'Poppins', sans-serif; font-size: 15px;
    outline: none; transition: all 0.25s;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  }
  .auth-input:focus { 
    border-color: var(--accent-orange); 
    background: var(--bg-level2); 
    box-shadow: 0 0 0 4px var(--accent-orange-glow); 
  }
  .auth-input.error { border-color: #ff5050; }

  .auth-eye {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    font-size: 18px; color: var(--text-muted); transition: color 0.25s; padding: 0;
  }
  .auth-eye:hover { color: var(--accent-orange); }

  .auth-error {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 18px; margin-bottom: 24px;
    background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.25);
    border-radius: 10px;
    font-size: 14px; color: #ff7070; font-family: 'Inter', sans-serif;
    font-weight: 700;
  }

  .auth-forgot {
    display: flex; justify-content: flex-end; margin-top: -12px; margin-bottom: 24px;
  }
  .auth-forgot button {
    background: none; border: none; font-family: 'Inter', sans-serif;
    font-size: 11px; color: var(--accent-orange); cursor: pointer;
    letter-spacing: 0.08em; text-decoration: underline; padding: 0;
    transition: all 0.2s; font-weight: 700; opacity: 0.8;
  }
  .auth-forgot button:hover { opacity: 1; transform: scale(1.05); }

  .auth-submit {
    width: 100%; padding: 16px;
    background: var(--accent-gradient); color: var(--text-inverse);
    border: none; border-radius: 10px;
    font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 16px;
    letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative; overflow: hidden; margin-bottom: 28px;
  }
  .auth-submit:hover { transform: translateY(-3px); box-shadow: 0 12px 30px var(--accent-orange-glow); filter: brightness(1.1); }
  .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

  .auth-divider {
    display: flex; align-items: center; gap: 14px; margin-bottom: 24px;
    font-family: 'Inter', sans-serif; font-size: 10px; color: var(--text-muted);
    letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700;
  }
  .auth-divider::before, .auth-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border-subtle);
  }

  .auth-socials { display: flex; gap: 12px; margin-bottom: 32px; }
  .auth-social-btn {
    flex: 1; padding: 13px 20px;
    background: var(--bg-level2); border: 1px solid var(--border-medium);
    border-radius: 10px; color: var(--text-primary);
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }
  .auth-social-btn:hover { border-color: var(--accent-orange); background: var(--bg-level1); transform: translateY(-2px); box-shadow: var(--shadow-soft); }

  .auth-switch {
    text-align: center;
    font-size: 14px; color: var(--text-muted);
    font-family: 'Inter', sans-serif;
  }
  .auth-switch button {
    background: none; border: none;
    color: var(--accent-orange); font-family: 'Inter', sans-serif; font-size: 14px;
    font-weight: 700; cursor: pointer; text-decoration: underline;
    transition: all 0.2s; padding: 0;
  }
  .auth-switch button:hover { filter: brightness(1.2); letter-spacing: 0.02em; }

  .auth-spinner {
    display: inline-block; width: 18px; height: 18px;
    border: 3px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.7s linear infinite; margin-right: 12px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 1024px) {
    .auth-page { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .auth-right { padding: 80px 32px; }
  }
  @media (max-width: 500px) {
    .auth-right { padding: 40px 16px; }
    .auth-form-title { font-size: 32px; }
  }
`;

export default function Login({ navigate }) {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [supvForm, setSupvForm] = useState({ name: "", email: "", university: "", password: "", regNo: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // "signin" or "supervisor"

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = await login({ email, password });

    if (!result.success) {
      setLoading(false);
      return setError(result.error);
    }

    setLoading(false);
    setSuccess("Login successful! Redirecting...");
    setEmail("");
    setPassword("");
    setTimeout(() => {
      navigate("Home");
    }, 1500);
  };

  const handleForgot = async () => {
    setError("");
    setSuccess("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
    } else {
      setSuccess("Password reset link sent! Check your email.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      setGoogleLoading(false);
      setError(result.error);
    }
  };

  const handleSupervisorAccess = async () => {
    const { name, university, email, password, regNo } = supvForm;
    setError("");
    setSuccess("");
    if (!name || !email || !university || !password || !regNo) {
      setError("Please fill in all fields to create your supervisor access account.");
      return;
    }
    
    setLoading(true);

    // 1. Try to create the supervisor account
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role: 'supervisor', university } }
    });

    // If account exists, we'll try to sign in instead
    const alreadyExists = signUpError?.message?.toLowerCase().includes('already registered') || signUpError?.status === 422;

    if (signUpError && !alreadyExists) {
      setError("Account creation failed: " + signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Sign in to ensure we have a session
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError("Access denied: " + signInError.message);
      setLoading(false);
      return;
    }

    const currentUserId = signInData.user.id;

    // 3. Ensure supervisor record exists in public.users
    try {
        await supabase.from('users').upsert([{
            id: currentUserId,
            email,
            full_name: name,
            role: 'supervisor',
            status: 'Active'
        }]);
    } catch { 
        // Secondary record check skipped
    }

    // 4. Locate Student by Registration Number
    const { data: studentInt } = await supabase
      .from('internships')
      .select('student_id, full_name, first_name, last_name')
      .eq('registration_number', regNo)
      .maybeSingle();
    
    setLoading(false);
    if (studentInt) {
      const studentName = studentInt.full_name || `${studentInt.first_name} ${studentInt.last_name}`;
      setSuccess(`Linked to student: ${studentName}. Redirecting to dashboard...`);
      setTimeout(() => navigate(`Dashboard?student_id=${studentInt.student_id}`), 1500);
    } else {
      setSuccess("Account verified! However, no student was found with that Registration Number.");
      setError("Please ensure the student has already submitted their IMS application with the correct Reg No.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">

        {/* ── LEFT PANEL ── */}
        <div className="auth-left">
          <div className="auth-left-grid" />
          <div className="auth-lines">
            {Array.from({ length: 10 }).map((_, i) => <div className="auth-line" key={i} />)}
          </div>

          <div className="auth-left-top">
            <div className="auth-brand">
              <div className="auth-brand-logo">
                <img src={logo} alt="AFR-IQ" />
              </div>
              <div>
                <div className="auth-brand-name">AFR-IQ</div>
                <div className="auth-brand-sub">Technologies Ltd</div>
              </div>
            </div>

            <h1 className="auth-left-headline">
              Welcome
              <span className="hl">Back to</span>
              <span className="hl2">AFR-IQ.</span>
            </h1>
            <p className="auth-left-desc">
              Sign in to access IT solutions, manage your internship applications, browse the tech shop, and continue your Academy courses.
            </p>

            <div className="auth-features">
              {[
                { icon: "🖥️", text: "IT Solutions & Cloud Services" },
                { icon: "📊", text: "IMS — Internship Management" },
                { icon: "🎓", text: "Academy — Online & Physical Courses" },
                { icon: "📦", text: "Tech Shop — Genuine Smart Devices" },
              ].map(f => (
                <div className="auth-feature" key={f.text}>
                  <span className="auth-feature-icon">{f.icon}</span>
                  <span className="auth-feature-text">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-left-bottom">
            <div className="auth-quote">
              <div className="auth-quote-text">"AFR-IQ transformed how we manage our entire IT infrastructure. Their team is world-class."</div>
              <div className="auth-quote-author">— Emmanuel K., CEO, Kampala Retail Ltd</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM PANEL ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">
            
            {/* TABS (Only show if not in forgot password mode) */}
            {!isForgot && (
              <div style={{ display: "flex", gap: "24px", marginBottom: "32px", borderBottom: "1px solid var(--border-subtle)" }}>
                <button 
                  onClick={() => { setAuthMode("signin"); setError(""); setSuccess(""); }}
                  style={{ 
                    padding: "12px 0", background: "none", border: "none", fontSize: "14px", fontWeight: "800", 
                    color: authMode === "signin" ? "var(--accent-orange)" : "var(--text-muted)",
                    borderBottom: authMode === "signin" ? "2px solid var(--accent-orange)" : "none",
                    cursor: "pointer", transition: "all 0.3s"
                  }}
                >
                   Sign In
                </button>
                <button 
                   onClick={() => { setAuthMode("supervisor"); setError(""); setSuccess(""); }}
                   style={{ 
                    padding: "12px 0", background: "none", border: "none", fontSize: "14px", fontWeight: "800", 
                    color: authMode === "supervisor" ? "var(--accent-green)" : "var(--text-muted)",
                    borderBottom: authMode === "supervisor" ? "2px solid var(--accent-green)" : "none",
                    cursor: "pointer", transition: "all 0.3s"
                  }}
                >
                   Supervisor Access
                </button>
              </div>
            )}

            <div className="auth-form-title">
              {isForgot ? "Reset Password" : authMode === "signin" ? "Log In" : "Supervisor View"}
            </div>
            <div className="auth-form-sub">
              {isForgot ? "Enter your email to receive a reset link" : authMode === "signin" ? "Enter your credentials to continue" : "Enter a student's ID to view their dashboard"}
            </div>

            {error && (
              <div className="auth-error">
                <span>⚠</span> {error}
              </div>
            )}

            {success && (
              <div className="auth-success" style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", marginBottom: "18px",
                background: "rgba(0,200,120,0.08)", border: "1px solid rgba(0,200,120,0.25)",
                borderRadius: "6px", fontSize: "13px", color: "#00c878", fontFamily: "'Inter', sans-serif"
              }}>
                <span>✓</span> {success}
              </div>
            )}

            {/* SUPERVISOR MODE: Create Account & View */}
            {authMode === "supervisor" && !isForgot && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: "1.5" }}>
                  Supervisors must create an account first to access a student's internship progress.
                </p>

                <div className="auth-field" style={{ marginBottom: "16px" }}>
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">👤</span>
                    <input className="auth-input" placeholder="Full Name" value={supvForm.name} onChange={e=>setSupvForm({...supvForm, name: e.target.value})} />
                  </div>
                </div>

                <div className="auth-field" style={{ marginBottom: "16px" }}>
                  <label className="auth-label">University / Company Name</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🏫</span>
                    <input className="auth-input" placeholder="e.g. Makerere University" value={supvForm.university} onChange={e=>setSupvForm({...supvForm, university: e.target.value})} />
                  </div>
                </div>

                <div className="auth-field" style={{ marginBottom: "16px" }}>
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">✉</span>
                    <input className="auth-input" type="email" placeholder="supervisor@example.com" value={supvForm.email} onChange={e=>setSupvForm({...supvForm, email: e.target.value})} />
                  </div>
                </div>

                <div className="auth-field" style={{ marginBottom: "16px" }}>
                  <label className="auth-label">Create Password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input className="auth-input" type="password" placeholder="Min. 8 characters" value={supvForm.password} onChange={e=>setSupvForm({...supvForm, password: e.target.value})} />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Student Registration Number</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🆔</span>
                    <input
                      className="auth-input"
                      placeholder="e.g. 21/U/1234/EVE"
                      value={supvForm.regNo}
                      onChange={e=>setSupvForm({...supvForm, regNo: e.target.value})}
                      onKeyDown={e => e.key === "Enter" && handleSupervisorAccess()}
                    />
                  </div>
                </div>

                <button 
                  className="auth-submit" 
                  style={{ marginTop: "24px", background: "var(--accent-green)" }} 
                  onClick={handleSupervisorAccess}
                  disabled={loading}
                >
                  {loading && <span className="auth-spinner" />}
                  {loading ? "Processing..." : "Create Account & Access"}
                </button>
              </div>
            )}

            {/* SIGNIN MODE: Email / Password Fields */}
            {authMode === "signin" && (
              <>
                {/* Email */}
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">✉</span>
                    <input
                      className={`auth-input ${error ? "error" : ""} `}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError(""); }}
                      onKeyDown={e => e.key === "Enter" && (isForgot ? handleForgot() : handleSubmit())}
                    />
                  </div>
                </div>

                {/* Password */}
                {!isForgot && (
                  <>
                    <div className="auth-field">
                      <label className="auth-label">Password</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon">🔒</span>
                        <input
                          className={`auth-input ${error ? "error" : ""} `}
                          type={showPass ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={e => { setPassword(e.target.value); setError(""); }}
                          onKeyDown={e => e.key === "Enter" && handleSubmit()}
                          style={{ paddingRight: 44 }}
                        />
                        <button className="auth-eye" onClick={() => setShowPass(p => !p)}>
                          {showPass ? "🙈" : "👁"}
                        </button>
                      </div>
                    </div>

                    <div className="auth-forgot">
                      <button onClick={() => { setIsForgot(true); setError(""); setSuccess(""); }}>Forgot password?</button>
                    </div>
                  </>
                )}

                {isForgot ? (
                  <button className="auth-submit" onClick={handleForgot} disabled={loading}>
                    {loading && <span className="auth-spinner" />}
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                ) : (
                  <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
                    {loading && <span className="auth-spinner" />}
                    {loading ? "Signing In..." : "Sign In →"}
                  </button>
                )}

                {!isForgot && (
                  <>
                    <div className="auth-divider">or continue with</div>

                    <div className="auth-socials">
                      <button
                        className="auth-social-btn"
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        style={{ opacity: googleLoading ? 0.7 : 1 }}
                      >
                        {googleLoading ? (
                          <span className="auth-spinner" style={{ borderTopColor: "#4285F4", borderColor: "rgba(66,133,244,0.3)" }} />
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                          </svg>
                        )}
                        {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            <div className="auth-switch" style={{ marginTop: authMode === "supervisor" ? "32px" : "0" }}>
              {isForgot ? (
                <>
                  Remember your password?{" "}
                  <button onClick={() => { setIsForgot(false); setError(""); setSuccess(""); }}>Log in here</button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => navigate("Signup")}>Create one →</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}