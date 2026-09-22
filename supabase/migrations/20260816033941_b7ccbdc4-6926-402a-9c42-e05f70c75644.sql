GRANT SELECT ON public.orders TO anon;
GRANT UPDATE ON public.cars TO anon;

DROP POLICY IF EXISTS "Demo admin can view orders" ON public.orders;
CREATE POLICY "Demo admin can view orders" ON public.orders FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Demo admin can update car status" ON public.cars;
CREATE POLICY "Demo admin can update car status" ON public.cars FOR UPDATE TO anon USING (true) WITH CHECK (true);