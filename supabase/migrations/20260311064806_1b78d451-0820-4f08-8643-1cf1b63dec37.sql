
-- Fix overly permissive INSERT policies on orders and order_items
-- Orders: allow authenticated users or validate email is provided
DROP POLICY "Anyone can create orders" ON public.orders;
CREATE POLICY "Authenticated users can create orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Also allow anonymous order creation with required fields
CREATE POLICY "Anonymous can create orders with details" ON public.orders
  FOR INSERT TO anon WITH CHECK (customer_email IS NOT NULL AND customer_name IS NOT NULL);

DROP POLICY "Anyone can create order items" ON public.order_items;
CREATE POLICY "Authenticated users can create order items" ON public.order_items
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );
