-- ============================================
-- STRYDE E-Commerce — Database Schema
-- ============================================

-- 1. CATEGORIES
CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (name, slug) VALUES
  ('Sneakers', 'sneakers'),
  ('Formal', 'formal'),
  ('Casual', 'casual'),
  ('Sandal', 'sandal'),
  ('Boots', 'boots');

-- 2. PROFILES
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users PRIMARY KEY,
  email       TEXT NOT NULL,
  full_name   TEXT,
  phone       TEXT,
  role        TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS
CREATE TABLE products (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  description  TEXT,
  price        INTEGER NOT NULL,
  category_id  INTEGER REFERENCES categories(id),
  images       TEXT[] DEFAULT '{}',
  is_active    BOOLEAN DEFAULT TRUE,
  is_featured  BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT SIZES
CREATE TABLE product_sizes (
  id          SERIAL PRIMARY KEY,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  size        TEXT NOT NULL,
  stock       INTEGER DEFAULT 0,
  UNIQUE(product_id, size)
);

-- 5. CARTS
CREATE TABLE carts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  size        TEXT NOT NULL,
  quantity    INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id, size)
);

-- 6. ORDERS
CREATE TABLE orders (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id           UUID REFERENCES profiles(id),
  status            TEXT DEFAULT 'pending' CHECK (status IN (
                      'pending', 'awaiting_payment', 'payment_uploaded',
                      'payment_confirmed', 'processing', 'shipped',
                      'delivered', 'cancelled'
                    )),
  payment_method    TEXT NOT NULL CHECK (payment_method IN ('cod', 'transfer')),
  payment_status    TEXT DEFAULT 'pending' CHECK (payment_status IN (
                      'pending', 'uploaded', 'confirmed', 'rejected'
                    )),
  total_amount      INTEGER NOT NULL,
  shipping_name     TEXT NOT NULL,
  shipping_phone    TEXT NOT NULL,
  shipping_address  TEXT NOT NULL,
  shipping_city     TEXT NOT NULL,
  shipping_province TEXT NOT NULL,
  shipping_postal   TEXT NOT NULL,
  notes             TEXT,
  tracking_number   TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS
CREATE TABLE order_items (
  id             SERIAL PRIMARY KEY,
  order_id       UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id     UUID REFERENCES products(id),
  product_name   TEXT NOT NULL,
  product_image  TEXT,
  size           TEXT NOT NULL,
  quantity       INTEGER NOT NULL,
  price          INTEGER NOT NULL
);

-- 8. PAYMENT PROOFS
CREATE TABLE payment_proofs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id     UUID REFERENCES orders(id) ON DELETE CASCADE,
  image_url    TEXT NOT NULL,
  uploaded_at  TIMESTAMPTZ DEFAULT NOW(),
  verified_at  TIMESTAMPTZ,
  verified_by  UUID REFERENCES profiles(id),
  admin_notes  TEXT
);

-- ============================================
-- AUTH TRIGGER — Auto-create Profile
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- RPC — Decrease Stock
-- ============================================
CREATE OR REPLACE FUNCTION decrease_stock(p_product_id UUID, p_size TEXT, p_quantity INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE product_sizes
  SET stock = stock - p_quantity
  WHERE product_id = p_product_id AND size = p_size AND stock >= p_quantity;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full access profiles" ON profiles FOR ALL USING (auth.role() = 'service_role');

-- carts
CREATE POLICY "Users manage own cart" ON carts FOR ALL USING (auth.uid() = user_id);

-- orders
CREATE POLICY "Customers view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Customers create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role full access orders" ON orders FOR ALL USING (auth.role() = 'service_role');

-- order_items
CREATE POLICY "Users view own order items" ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users insert order items" ON order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Service role full access order_items" ON order_items FOR ALL USING (auth.role() = 'service_role');

-- payment_proofs
CREATE POLICY "Users view own payment proofs" ON payment_proofs FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = payment_proofs.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users upload payment proofs" ON payment_proofs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = payment_proofs.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Service role full access payment_proofs" ON payment_proofs FOR ALL USING (auth.role() = 'service_role');

-- products & categories (public read)
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Service role full access products" ON products FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can view product sizes" ON product_sizes FOR SELECT USING (true);
CREATE POLICY "Service role full access product_sizes" ON product_sizes FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Service role full access categories" ON categories FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- SEED DATA — Products
-- ============================================

-- Sneakers
INSERT INTO products (name, slug, description, price, category_id, images, is_active, is_featured) VALUES
('STRYDE Runner Pro', 'stryde-runner-pro', 'Sneaker performa premium dengan teknologi bantalan canggih. Dirancang untuk kenyamanan dan gaya, dengan bagian atas mesh breathable dan sol responsif.', 450000, 1, ARRAY['/products/sneaker-runner-pro.png'], true, true),
('STRYDE Air Lite', 'stryde-air-lite', 'Sneaker ringan dan breathable untuk petualangan urban. Desain modern dengan sol ultra-ringan yang nyaman dipakai seharian.', 380000, 1, ARRAY['/products/air-lite.png'], true, false);

-- Casual
INSERT INTO products (name, slug, description, price, category_id, images, is_active, is_featured) VALUES
('STRYDE Canvas Low', 'stryde-canvas-low', 'Sepatu kasual canvas klasik yang cocok untuk sehari-hari. Desain versatile yang bisa dipadukan dengan outfit apapun.', 250000, 3, ARRAY['/products/canvas-low.png'], true, true),
('STRYDE Linen Easy', 'stryde-linen-easy', 'Sepatu slip-on linen yang ringan dan nyaman. Material natural yang sejuk di kaki, cocok untuk gaya santai.', 200000, 3, ARRAY['/products/linen-easy.png'], true, false);

-- Formal
INSERT INTO products (name, slug, description, price, category_id, images, is_active, is_featured) VALUES
('STRYDE Oxford Classic', 'stryde-oxford-classic', 'Sepatu formal oxford abadi untuk acara profesional. Konstruksi kulit premium dengan detail cap-toe elegan.', 650000, 2, ARRAY['/products/oxford-classic.png'], true, true),
('STRYDE Derby Elite', 'stryde-derby-elite', 'Sepatu formal derby berkelas dengan desain open-lacing. Kulit poles premium untuk tampilan yang sophisticated.', 550000, 2, ARRAY['/products/derby-elite.png'], true, false);

-- Sandal
INSERT INTO products (name, slug, description, price, category_id, images, is_active, is_featured) VALUES
('STRYDE Slide Basic', 'stryde-slide-basic', 'Sandal slide nyaman untuk keseharian. Sol tebal dengan bantalan empuk, cocok untuk di rumah maupun jalan santai.', 150000, 4, ARRAY['/products/slide-basic.png'], true, false),
('STRYDE Flip Ultra', 'stryde-flip-ultra', 'Sandal jepit modern dengan sol nyaman. Desain sporty yang cocok untuk aktivitas outdoor santai.', 120000, 4, ARRAY['/products/flip-ultra.png'], true, false);

-- Boots
INSERT INTO products (name, slug, description, price, category_id, images, is_active, is_featured) VALUES
('STRYDE Chelsea Dark', 'stryde-chelsea-dark', 'Boot Chelsea modern dengan finishing kulit hitam sleek. Panel elastis samping dan pull tab untuk kemudahan pemakaian.', 750000, 5, ARRAY['/products/chelsea-dark.png'], true, true);

-- Product sizes (38-44 for each product)
DO $$
DECLARE
  prod RECORD;
  s TEXT;
  sizes TEXT[] := ARRAY['38', '39', '40', '41', '42', '43', '44'];
BEGIN
  FOR prod IN SELECT id FROM products LOOP
    FOREACH s IN ARRAY sizes LOOP
      INSERT INTO product_sizes (product_id, size, stock)
      VALUES (prod.id, s, 5 + floor(random() * 16)::int);
    END LOOP;
  END LOOP;
END $$;

-- ============================================
-- ADMIN USER
-- Buat admin user melalui Supabase Auth Dashboard:
-- Email: admin@stryde.id
-- Password: Admin123!
-- Setelah itu, jalankan query berikut:
-- ============================================
