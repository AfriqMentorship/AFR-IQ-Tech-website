-- ============================================================
-- NUCLEAR FIX: Drop ALL RLS policies on users table
-- Run this in Supabase SQL Editor
-- ============================================================

-- Step 1: Temporarily DISABLE RLS entirely on users to stop recursion
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop every possible policy name (exhaustive list)
DROP POLICY IF EXISTS "public_users_open_policy" ON public.users;
DROP POLICY IF EXISTS "Allow all public users" ON public.users;
DROP POLICY IF EXISTS "Allow insert for new users" ON public.users;
DROP POLICY IF EXISTS "Allow authenticated users" ON public.users;
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Allow admin full access" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admin access" ON public.users;
DROP POLICY IF EXISTS "user_policy" ON public.users;
DROP POLICY IF EXISTS "users_policy" ON public.users;
DROP POLICY IF EXISTS "select_policy" ON public.users;
DROP POLICY IF EXISTS "insert_policy" ON public.users;
DROP POLICY IF EXISTS "update_policy" ON public.users;
DROP POLICY IF EXISTS "delete_policy" ON public.users;

-- Step 3: Use dynamic SQL to drop ALL remaining policies on users (catches any name)
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'users' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.users', pol.policyname);
    END LOOP;
END $$;

-- Step 4: Re-enable RLS with ONE simple open policy (no recursion)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "open_access"
  ON public.users
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Verify it worked (should show only 1 policy named "open_access")
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'users' AND schemaname = 'public';
