-- Copy and paste this script into your Supabase SQL Editor and hit Run!

-- This ensures your users table allows your frontend to read and insert users
-- without being blocked by Row Level Security (RLS).
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Attempt to create a permissive policy (drops easiest to avoid errors if it exists)
DROP POLICY IF EXISTS "Allow all public users" ON public.users;
CREATE POLICY "Allow all public users" ON public.users USING (true) WITH CHECK (true);
