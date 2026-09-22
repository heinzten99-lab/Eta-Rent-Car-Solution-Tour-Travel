CREATE TYPE public.service_type AS ENUM ('lepas_kunci','dengan_sopir');
CREATE TYPE public.car_status AS ENUM ('available','booked');

CREATE TABLE public.cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text,
  seats int NOT NULL DEFAULT 5,
  transmission text NOT NULL DEFAULT 'Manual',
  fuel_type text NOT NULL DEFAULT 'Bensin',
  price_per_24h int NOT NULL DEFAULT 350000,
  service_type public.service_type NOT NULL DEFAULT 'lepas_kunci',
  status public.car_status NOT NULL DEFAULT 'available',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cars TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cars TO authenticated;
GRANT ALL ON public.cars TO service_role;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cars_public_read" ON public.cars FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "cars_admin_write" ON public.cars FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES public.cars(id) ON DELETE SET NULL,
  car_name text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time text NOT NULL,
  return_date date NOT NULL,
  service_type public.service_type NOT NULL DEFAULT 'lepas_kunci',
  duration_days int NOT NULL DEFAULT 1,
  total_price int NOT NULL DEFAULT 0,
  ktp_url text,
  sim_url text,
  status text NOT NULL DEFAULT 'pending_confirmation',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_public_insert" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "orders_admin_read" ON public.orders FOR SELECT TO authenticated USING (true);
CREATE POLICY "orders_admin_update" ON public.orders FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "orders_admin_delete" ON public.orders FOR DELETE TO authenticated USING (true);

CREATE POLICY "documents_public_upload" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'documents');
CREATE POLICY "documents_admin_read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents');

INSERT INTO public.cars (name, seats, transmission, fuel_type, price_per_24h, service_type, status) VALUES
 ('Toyota Avanza', 7, 'Manual', 'Bensin', 350000, 'lepas_kunci', 'available'),
 ('Toyota Avanza Matic', 7, 'Matic', 'Bensin', 400000, 'dengan_sopir', 'available'),
 ('Daihatsu Xenia', 7, 'Manual', 'Bensin', 350000, 'lepas_kunci', 'available'),
 ('Toyota Innova Reborn', 7, 'Matic', 'Diesel', 700000, 'dengan_sopir', 'available'),
 ('Honda Brio Satya', 5, 'Matic', 'Bensin', 300000, 'lepas_kunci', 'available'),
 ('Suzuki Ertiga', 7, 'Manual', 'Bensin', 375000, 'lepas_kunci', 'booked'),
 ('Mitsubishi Pajero Sport', 7, 'Matic', 'Diesel', 950000, 'dengan_sopir', 'available'),
 ('Toyota Hiace Commuter', 15, 'Manual', 'Diesel', 1200000, 'dengan_sopir', 'available');