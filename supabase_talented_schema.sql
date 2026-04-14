-- Table for Talented Graduates
CREATE TABLE IF NOT EXISTS public.talented (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Afric Graduate', 'Intern Graduate')),
    course TEXT NOT NULL,
    cv_url TEXT,
    image_url TEXT,
    skills TEXT, -- Comma-separated list of skills
    strengths TEXT, -- Comma-separated list of strengths (highlighted)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'Active'
);

-- RLS Policies
ALTER TABLE public.talented ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Public Read talented" ON public.talented
    FOR SELECT TO public USING (true);

-- Allow only authenticated admins to insert/update/delete
-- Based on existing system, we check auth.email() or a 'role' column in a users profile
CREATE POLICY "Admin All talented" ON public.talented
    FOR ALL TO authenticated
    USING (
        auth.email() = 'iamsifu.dev@gmail.com' OR 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        auth.email() = 'iamsifu.dev@gmail.com' OR 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Storage Bucket for CV PDFs
-- This needs to be run in the SQL editor to create the bucket policies
-- INSERT INTO storage.buckets (id, name, public) VALUES ('talented_cvs', 'talented_cvs', true);

-- Storage Policies for 'talented_cvs' bucket
-- CREATE POLICY "Public Read CVs" ON storage.objects FOR SELECT TO public USING (bucket_id = 'talented_cvs');
-- CREATE POLICY "Admin Upload CVs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'talented_cvs');
