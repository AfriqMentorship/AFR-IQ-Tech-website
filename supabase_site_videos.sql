CREATE TABLE IF NOT EXISTS public.site_videos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_videos ENABLE ROW LEVEL SECURITY;

-- Allow public viewing of videos
CREATE POLICY "Public can view site videos" 
ON public.site_videos 
FOR SELECT 
USING (true);

-- Allow authenticated admins to insert and delete videos
-- Adjust these specific policies if your authentication structure relies on different fields.
CREATE POLICY "Admins can insert videos" 
ON public.site_videos 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete videos" 
ON public.site_videos 
FOR DELETE 
USING (auth.role() = 'authenticated');
