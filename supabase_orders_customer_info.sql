-- =============================================
-- Orders Table Update: Add Customer Details and Transaction ID
-- Run this in your Supabase SQL Editor
-- =============================================

ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS customer_name text,
  ADD COLUMN IF NOT EXISTS customer_phone text,
  ADD COLUMN IF NOT EXISTS transaction_id text;

-- Update RLS to allow guest orders (or at least reading/writing these fields)
DROP POLICY IF EXISTS "Allow users to insert their own orders" ON public.orders;
CREATE POLICY "Allow anyone to insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);
