-- RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR

-- 1. Create Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text,
  website text,
  status text DEFAULT 'Pending',
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Add company_id and role fallback to public.users if it doesn't exist
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL;

-- 3. Create Internships Table (Core IMS tracking)
CREATE TABLE IF NOT EXISTS public.internships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  supervisor_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  package_name text,
  title text DEFAULT 'Software Engineering Intern',
  cv_url text,
  application_url text,
  final_report_url text,
  start_date character varying(50),
  end_date character varying(50),
  status text DEFAULT 'Pending',
  created_at timestamp with time zone DEFAULT now()
);

-- 4. Create Weekly Reports Table
CREATE TABLE IF NOT EXISTS public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  internship_id uuid REFERENCES public.internships(id) ON DELETE CASCADE,
  student_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  week_number integer NOT NULL,
  report_text text,
  file_url text,
  status text DEFAULT 'Submitted',
  supervisor_comment text,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. Create Evaluations Table
CREATE TABLE IF NOT EXISTS public.evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  internship_id uuid REFERENCES public.internships(id) ON DELETE CASCADE,
  supervisor_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  week_number integer NOT NULL,
  eval_text text,
  score numeric,
  created_at timestamp with time zone DEFAULT now()
);

-- 6. Important: Enable RLS or simply allow anon/authenticated access safely.
-- Let's just create generic permissive policies for these new tables to guarantee rapid application building internally.
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all public companies" ON public.companies USING (true) WITH CHECK (true);

ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all public internships" ON public.internships USING (true) WITH CHECK (true);

ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all public weekly_reports" ON public.weekly_reports USING (true) WITH CHECK (true);

ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all public evaluations" ON public.evaluations USING (true) WITH CHECK (true);

-- (Skip creating custom extensions to simplify script deployment)
