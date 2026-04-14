-- =============================================
-- 1. Create Courses Table
-- =============================================
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  duration text,
  price text,
  created_at timestamp with time zone DEFAULT now()
);

TRUNCATE TABLE public.courses;

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all public courses" ON public.courses;
CREATE POLICY "Allow all public courses" ON public.courses USING (true) WITH CHECK (true);

-- Insert the short courses
INSERT INTO public.courses (title, duration, price) VALUES
('Computer Fundamentals', '10 weeks', 'UGX. 500,000'),
('Business Computing (Quick Books And Tally)', '4 weeks', 'UGX. 400,000'),
('Graphics Design (Photoshop, Illustrator, Canva, Design Principles, Color theory etc)', '8 weeks', 'UGX. 450,000'),
('Digital Marketing', '6 weeks', 'UGX. 500,000'),
('Computer Repair And Maintenance', '8 weeks', 'UGX. 600,000'),
('Introduction to Programming | Coding', '4 weeks', 'UGX. 450,000'),
('Website Development (HTML, CSS and JavaScript Mastery)', '8 weeks', 'UGX. 450,000'),
('Advanced Website Development (Django, React, Next Js - Become a Professional Web Dev)', '12 weeks', 'UGX. 1.5M'),
('Networking (CCNA Prep)', '16 weeks', 'UGX. 700,000'),
('Linux Systems Adminstration', '8 weeks', 'UGX. 450,000'),
('Cyber Security (Comptia Security+ Prep)', '12 weeks', 'UGX. 1.2M'),
('Ethical Hacking (CEH Prep)', '16 weeks', 'UGX. 2.5M'),
('Cloud Computing (Comptia Cloud+ Prep)', '8 weeks', 'UGX. 650,000'),
('Mobile App Development', '12 weeks', 'UGX. 1.2M'),
('Data Analysis', '6 weeks', 'UGX. 400,000'),
('Video Editing and Photography', '8 weeks', 'UGX. 600,000');


-- =============================================
-- 2. Create Academy Enrollments Table
-- =============================================
CREATE TABLE IF NOT EXISTS public.academy_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course_title text NOT NULL,
  course_duration text,
  course_price text,
  mode_of_study text NOT NULL DEFAULT 'Physical',  -- 'Physical' or 'Online (Self-Paced)'
  start_date text,
  message text,
  status text NOT NULL DEFAULT 'Pending',           -- 'Pending', 'Approved', 'Rejected'
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.academy_enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow insert enrollment" ON public.academy_enrollments;
DROP POLICY IF EXISTS "Allow read own or admin enrollment" ON public.academy_enrollments;

CREATE POLICY "Allow insert enrollment" ON public.academy_enrollments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read own or admin enrollment" ON public.academy_enrollments
  FOR SELECT USING (true);

CREATE POLICY "Allow update enrollment" ON public.academy_enrollments
  FOR UPDATE USING (true);


-- =============================================
-- 3. Insert Example Companies
-- =============================================
INSERT INTO public.companies (name, description, address, website, status) VALUES
('Tech Innovators Hub', 'Software solutions and IT consultancy firm', 'Kampala, Uganda', 'https://techinnovators.com', 'Approved'),
('Nile Data Systems', 'Data analytics and business intelligence pipeline company', 'Jinja, Uganda', 'https://niledatasystems.co.ug', 'Approved'),
('Pearl Cybersecurity', 'Information security and network defense agency', 'Entebbe, Uganda', 'https://pearlcyber.co.ug', 'Approved'),
('Africom Solutions', 'Cloud infrastructure and hosting provider', 'Kampala, Uganda', 'https://africom-solutions.ug', 'Pending');
