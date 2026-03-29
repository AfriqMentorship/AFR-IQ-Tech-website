-- =============================================
-- Orders Table: Add Checkout Columns
-- Run this in your Supabase SQL Editor
-- =============================================

-- Add delivery and discount columns to orders table
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS delivery_method text DEFAULT 'door',
  ADD COLUMN IF NOT EXISTS delivery_address text,
  ADD COLUMN IF NOT EXISTS delivery_fee numeric DEFAULT 5500,
  ADD COLUMN IF NOT EXISTS discount_code text,
  ADD COLUMN IF NOT EXISTS discount_amount numeric DEFAULT 0;

-- =============================================
-- RLS Policies for orders table
-- =============================================

-- Enable RLS (if not already)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to INSERT their own orders
DROP POLICY IF EXISTS "Allow users to insert their own orders" ON public.orders;
CREATE POLICY "Allow users to insert their own orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to SELECT their own orders
DROP POLICY IF EXISTS "Allow users to read their own orders" ON public.orders;
CREATE POLICY "Allow users to read their own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow admin to SELECT all orders
DROP POLICY IF EXISTS "Allow admin to read all orders" ON public.orders;
CREATE POLICY "Allow admin to read all orders"
  ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admin to UPDATE any order (for status changes like reject/confirm)
DROP POLICY IF EXISTS "Allow admin to update any order" ON public.orders;
CREATE POLICY "Allow admin to update any order"
  ON public.orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (true);

-- =============================================
-- order_items table RLS
-- =============================================
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow users to insert order items" ON public.order_items;
CREATE POLICY "Allow users to insert order items"
  ON public.order_items
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to read order items" ON public.order_items;
CREATE POLICY "Allow users to read order items"
  ON public.order_items
  FOR SELECT USING (true);
