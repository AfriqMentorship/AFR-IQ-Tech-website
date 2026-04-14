CREATE TABLE academy_videos (
  id uuid default extensions.uuid_generate_v4() primary key,
  title text not null,
  category text,
  video_url text not null,
  price text,
  description text,
  duration text,
  lessons text,
  instructor text,
  rating numeric,
  reviews bigint,
  level text,
  "levelLabel" text,
  enrolled text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Note: Just for administrative ease of access. You can lock this down later with RLS.
ALTER TABLE academy_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read video" ON academy_videos FOR SELECT USING (true);
CREATE POLICY "Allow public insert video" ON academy_videos FOR INSERT WITH CHECK (true);
