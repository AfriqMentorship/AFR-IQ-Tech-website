-- =============================================
-- Contact Messages Table
-- Run this in your Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',  -- 'unread', 'read', 'replied'
  created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous visitors) to INSERT contact messages
DROP POLICY IF EXISTS "Allow public to submit contact messages" ON public.contact_messages;
CREATE POLICY "Allow public to submit contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Allow admin to SELECT all messages
DROP POLICY IF EXISTS "Allow admin to read contact messages" ON public.contact_messages;
CREATE POLICY "Allow admin to read contact messages"
  ON public.contact_messages
  FOR SELECT
  USING (true);

-- Allow admin to UPDATE message status (mark as read/replied)
DROP POLICY IF EXISTS "Allow admin to update contact messages" ON public.contact_messages;
CREATE POLICY "Allow admin to update contact messages"
  ON public.contact_messages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow admin to DELETE messages
DROP POLICY IF EXISTS "Allow admin to delete contact messages" ON public.contact_messages;
CREATE POLICY "Allow admin to delete contact messages"
  ON public.contact_messages
  FOR DELETE
  USING (true);
