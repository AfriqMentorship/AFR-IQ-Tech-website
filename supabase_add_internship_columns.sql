-- Run this script in your Supabase SQL Editor if you want to store the extra internship form details.

ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS university text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.internships ADD COLUMN IF NOT EXISTS registration_number text;
