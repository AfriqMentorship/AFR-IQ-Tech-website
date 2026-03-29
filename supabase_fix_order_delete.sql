-- =============================================
-- FIX: Enable Order Deletion (Cascading)
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Enable admin to DELETE orders (required for the Delete button to work)
DROP POLICY IF EXISTS "Allow admin to delete any order" ON public.orders;
CREATE POLICY "Allow admin to delete any order"
  ON public.orders
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 2. Ensure linked items go away automatically when an order is deleted (CASCADE)
-- NOTE: We must first find the constraint name. Usually it's order_items_order_id_fkey.
ALTER TABLE public.order_items 
  DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;

ALTER TABLE public.order_items
  ADD CONSTRAINT order_items_order_id_fkey 
  FOREIGN KEY (order_id) 
  REFERENCES public.orders(id) 
  ON DELETE CASCADE;
