-- =============================================
-- FINAL FIX for Order Deletion: Full Permissions & Cleanup
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Grant ALL permissions to the Admin for both orders and items
DROP POLICY IF EXISTS "Allow admin to manage all orders" ON public.orders;
CREATE POLICY "Allow admin to manage all orders"
  ON public.orders FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'Admin')));

DROP POLICY IF EXISTS "Allow admin to manage all order_items" ON public.order_items;
CREATE POLICY "Allow admin to manage all order_items"
  ON public.order_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND (role = 'admin' OR role = 'Admin')));

-- 2. Clean up any stuck items and link them correctly for future deletions (CASCADE)
-- We use a more aggressive approach to find and fix the link.
DO $$
BEGIN
    -- Try to drop common constraint names if they exist
    ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_fkey;
    ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS fk_order;
    
    -- Re-add the proper link with CASCADE deletion
    ALTER TABLE public.order_items 
    ADD CONSTRAINT order_items_order_id_fkey 
    FOREIGN KEY (order_id) REFERENCES public.orders(id) 
    ON DELETE CASCADE;
END $$;
