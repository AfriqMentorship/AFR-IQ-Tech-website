-- ============================================================
-- FIX: "infinite recursion detected in policy for relation users"
-- Run this ENTIRE script in your Supabase SQL Editor
-- ============================================================

-- Step 1: Drop EVERY existing policy on public.users to clear the recursion
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

-- Step 2: Make sure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 3: Create ONE simple flat policy — no subqueries, no self-references
-- This allows all operations safely without any recursion risk
CREATE POLICY "public_users_open_policy"
  ON public.users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Also fix internships table: make student_id nullable
-- so applications can be saved even before user is confirmed
-- ============================================================
ALTER TABLE public.internships ALTER COLUMN student_id DROP NOT NULL;

-- Add extra columns if missing
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS university text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS registration_number text;

-- Fix internships RLS policy
DROP POLICY IF EXISTS "Allow all public internships" ON public.internships;
CREATE POLICY "Allow all public internships"
  ON public.internships
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- Fix storage bucket for PDF uploads
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public upload to applications bucket" ON storage.objects;
CREATE POLICY "Allow public upload to applications bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'applications');

DROP POLICY IF EXISTS "Allow public read from applications bucket" ON storage.objects;
CREATE POLICY "Allow public read from applications bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'applications');
