-- 1. Create the 'applications' bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow anyone to upload PDF applications
CREATE POLICY "Allow public upload to applications bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'applications');

-- 3. Allow admins and anyone to read the uploaded PDFs
CREATE POLICY "Allow public read from applications bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'applications');
