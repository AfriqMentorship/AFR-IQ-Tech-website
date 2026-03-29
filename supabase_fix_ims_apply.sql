-- ============================================================
-- FIX: IMS Application Submission Failure
-- Run this ENTIRE script in your Supabase SQL Editor
-- ============================================================

-- 1. Make student_id nullable in internships so we can still insert
--    even if the public.users row hasn't been confirmed/created yet.
ALTER TABLE public.internships ALTER COLUMN student_id DROP NOT NULL;

-- 2. Add the extra columns if they don't exist yet
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS university text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS registration_number text;

-- 3. Ensure RLS policy allows inserts from unauthenticated (anon) users
--    (needed because new users aren't logged in yet during application)
DROP POLICY IF EXISTS "Allow all public internships" ON public.internships;
CREATE POLICY "Allow all public internships"
  ON public.internships
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. Ensure the storage bucket and policies exist for PDF uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- Drop and recreate storage policies to ensure anon access
DROP POLICY IF EXISTS "Allow public upload to applications bucket" ON storage.objects;
CREATE POLICY "Allow public upload to applications bucket"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'applications');

DROP POLICY IF EXISTS "Allow public read from applications bucket" ON storage.objects;
CREATE POLICY "Allow public read from applications bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'applications');

-- 5. Ensure users table allows anon inserts (for new student registration)
DROP POLICY IF EXISTS "Allow insert for new users" ON public.users;
CREATE POLICY "Allow insert for new users"
  ON public.users FOR INSERT
  WITH CHECK (true);
