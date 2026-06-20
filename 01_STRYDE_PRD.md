# STRYDE — Product Requirements Document (PRD)
## Platform E-Commerce Toko Sepatu | Tugas Kuliah

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| **Brand** | STRYDE |
| **Tagline** | Walk Your Way |
| **Tipe** | Toko sepatu online single-seller |
| **Target User** | Gen Z & Millennial Indonesia |
| **Status Payment** | COD + Transfer Manual (Midtrans belum aktif) |
| **Platform** | Web (Desktop-first, responsive mobile) |

**Deskripsi Singkat:**
STRYDE adalah platform e-commerce sepatu lokal Indonesia yang menjual koleksi sepatu sneakers, casual, formal, sandal, dan boots. Dibangun sebagai tugas kuliah dengan fitur lengkap: catalog, cart, checkout, order management, dan admin dashboard.

---

## 2. Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend/DB | Supabase (PostgreSQL + Auth + Storage) |
| State Management | Zustand |
| Form | React Hook Form + Zod |
| Deployment | Vercel |

---

## 3. User Roles & Akses

### 3.1 Guest (Tidak Login)
- Browse & lihat katalog produk
- Lihat detail produk
- Search & filter produk
- Klik checkout → redirect ke `/auth/login`

### 3.2 Customer (Sudah Login, role: `customer`)
- Semua akses Guest
- Kelola cart (add, update, remove)
- Proses checkout
- Upload bukti pembayaran (untuk transfer)
- Lihat riwayat & status order
- Edit profil

### 3.3 Admin (role: `admin`)
- Semua akses Customer
- Akses penuh `/admin/*`
- CRUD produk + stok per ukuran
- Lihat & update status semua order
- Verifikasi pembayaran manual (konfirmasi/tolak)

---

## 4. Fitur & Requirements Detail

### 4.1 Authentication
- [ ] Register: email + password + nama lengkap
- [ ] Login: email + password
- [ ] Logout
- [ ] Session persistent (Supabase Auth)
- [ ] Auto-create profile di tabel `profiles` setelah register (via DB trigger)
- [ ] Protected routes: middleware Next.js cek session
- [ ] Role check: admin routes hanya bisa diakses role `admin`

### 4.2 Catalog & Filter Produk
- [ ] Grid layout produk (2 col mobile / 3-4 col desktop)
- [ ] Filter by:
  - Kategori (Sneakers, Formal, Casual, Sandal, Boots)
  - Rentang harga (slider atau preset range)
  - Ukuran tersedia
- [ ] Sort by: Terbaru, Harga Terendah, Harga Tertinggi, Nama A-Z
- [ ] Search produk by nama (search bar di navbar)
- [ ] Pagination (12 produk per halaman)
- [ ] Badge: `New` (produk < 7 hari), `Best Seller`, `Habis`
- [ ] Filter & sort via URL params (shareable link)

### 4.3 Product Detail
- [ ] Galeri gambar (thumbnail + main image, bisa multiple)
- [ ] Nama, deskripsi lengkap, harga (format Rupiah)
- [ ] Kategori badge
- [ ] Size selector: tombol ukuran yang tersedia
  - Disabled jika stok = 0
  - Tampilkan sisa stok jika stok ≤ 5 ("Sisa 3!")
- [ ] Tombol "Tambah ke Keranjang"
  - Wajib pilih ukuran dulu sebelum bisa klik
  - Toast notification sukses/gagal
- [ ] Breadcrumb navigasi

### 4.4 Shopping Cart
- [ ] Daftar item dengan gambar, nama, ukuran, harga, quantity
- [ ] Update quantity (+ / -), minimum 1
- [ ] Hapus item dari cart
- [ ] Subtotal per item & grand total
- [ ] Cart disimpan di tabel `carts` di Supabase (bukan localStorage)
- [ ] Cart badge count di navbar (real-time update)
- [ ] Empty cart state dengan CTA ke catalog
- [ ] Tombol "Lanjut ke Checkout"

### 4.5 Checkout
**Form Alamat Pengiriman:**
- [ ] Nama penerima (required)
- [ ] Nomor telepon (required, validasi format Indonesia)
- [ ] Alamat lengkap / jalan (required)
- [ ] Kota (required)
- [ ] Provinsi (required, dropdown)
- [ ] Kode pos (required, 5 digit)
- [ ] Catatan untuk kurir (optional)

**Pilih Metode Pembayaran:**
- [ ] **COD (Cash on Delivery)** — bayar saat barang datang
- [ ] **Transfer Bank** — BCA 1234567890 a.n. STRYDE Indonesia

**Order Summary:**
- [ ] Review item, size, qty, harga
- [ ] Subtotal + ongkir (sementara gratis/flat Rp 0)
- [ ] Total bayar
- [ ] Tombol "Buat Pesanan"

### 4.6 Payment Flow

**COD:**
```
Checkout → Order created (status: pending, payment_method: cod) 
→ Admin lihat order → Update status: processing → shipped → delivered
```

**Transfer Bank:**
```
Checkout → Order created (status: awaiting_payment, payment_method: transfer)
→ Customer diarahkan ke halaman order detail 
→ Customer upload foto bukti transfer 
→ Order status: payment_uploaded
→ Admin verifikasi bukti bayar
  → Konfirmasi: status → payment_confirmed → processing
  → Tolak: status → awaiting_payment (customer upload ulang)
→ Admin update: shipped → delivered
```

### 4.7 Order Management (Sisi Customer)

**Halaman `/orders`:**
- [ ] List semua order dengan status badge berwarna
- [ ] Filter by status
- [ ] Klik order → ke detail

**Halaman `/orders/[id]`:**
- [ ] Detail lengkap: items, total, alamat, metode bayar
- [ ] Status tracker (step visual)
- [ ] Untuk transfer & status `awaiting_payment`: form upload bukti bayar
- [ ] Preview bukti yang sudah diupload
- [ ] Nomor resi / info pengiriman (jika admin sudah isi)

### 4.8 Admin Dashboard

**Overview `/admin`:**
- [ ] Card statistik: total order hari ini, total revenue, order pending, produk aktif
- [ ] Tabel order terbaru (5 baris)

**Kelola Produk `/admin/products`:**
- [ ] Tabel produk: gambar thumbnail, nama, kategori, harga, stok total, status
- [ ] Search & filter by kategori/status
- [ ] Tombol tambah produk baru
- [ ] Aksi: edit, soft-delete (is_active = false)

**Form Tambah/Edit Produk `/admin/products/new` & `/admin/products/[id]/edit`:**
- [ ] Nama produk
- [ ] Slug (auto-generate dari nama, bisa di-edit)
- [ ] Deskripsi (textarea)
- [ ] Harga (dalam Rupiah)
- [ ] Kategori (dropdown dari tabel categories)
- [ ] Upload gambar multiple (ke Supabase Storage, bucket `product-images`)
- [ ] Stok per ukuran: form matrix ukuran 38-44 dengan input angka masing-masing
- [ ] Toggle is_featured (tampil di homepage)
- [ ] Toggle is_active

**Kelola Order `/admin/orders`:**
- [ ] Tabel semua order: ID, customer, tanggal, total, metode bayar, status
- [ ] Filter by status, metode bayar, tanggal
- [ ] Pagination

**Detail Order `/admin/orders/[id]`:**
- [ ] Info lengkap order & customer
- [ ] Daftar item pesanan
- [ ] Status saat ini + dropdown update status manual
- [ ] Untuk transfer: tampilkan bukti bayar + tombol "Konfirmasi Bayar" / "Tolak"
  - Modal konfirmasi dengan opsional catatan penolakan
- [ ] Input nomor resi / info pengiriman

---

## 5. Database Schema (Supabase / PostgreSQL)

### `profiles`
```sql
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users PRIMARY KEY,
  email       TEXT NOT NULL,
  full_name   TEXT,
  phone       TEXT,
  role        TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### `categories`
```sql
CREATE TABLE categories (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO categories (name, slug) VALUES
  ('Sneakers', 'sneakers'),
  ('Formal', 'formal'),
  ('Casual', 'casual'),
  ('Sandal', 'sandal'),
  ('Boots', 'boots');
```

### `products`
```sql
CREATE TABLE products (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  description  TEXT,
  price        INTEGER NOT NULL, -- dalam satuan Rupiah
  category_id  INTEGER REFERENCES categories(id),
  images       TEXT[] DEFAULT '{}', -- array URL dari Supabase Storage
  is_active    BOOLEAN DEFAULT TRUE,
  is_featured  BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### `product_sizes`
```sql
CREATE TABLE product_sizes (
  id          SERIAL PRIMARY KEY,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  size        TEXT NOT NULL, -- '38', '39', '40', '41', '42', '43', '44'
  stock       INTEGER DEFAULT 0,
  UNIQUE(product_id, size)
);
```

### `carts`
```sql
CREATE TABLE carts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  size        TEXT NOT NULL,
  quantity    INTEGER DEFAULT 1 CHECK (quantity > 0),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id, size)
);
```

### `orders`
```sql
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
```

### `order_items`
```sql
CREATE TABLE order_items (
  id             SERIAL PRIMARY KEY,
  order_id       UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id     UUID REFERENCES products(id),
  product_name   TEXT NOT NULL,  -- snapshot nama saat order
  product_image  TEXT,           -- snapshot gambar saat order
  size           TEXT NOT NULL,
  quantity       INTEGER NOT NULL,
  price          INTEGER NOT NULL -- snapshot harga saat order
);
```

### `payment_proofs`
```sql
CREATE TABLE payment_proofs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id     UUID REFERENCES orders(id) ON DELETE CASCADE,
  image_url    TEXT NOT NULL,
  uploaded_at  TIMESTAMPTZ DEFAULT NOW(),
  verified_at  TIMESTAMPTZ,
  verified_by  UUID REFERENCES profiles(id),
  admin_notes  TEXT
);
```

---

## 6. Supabase Setup

### Auth Trigger (Auto-create Profile)
```sql
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
```

### Row Level Security (RLS)
```sql
-- Aktifkan RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;

-- profiles: user hanya bisa lihat/edit profil sendiri; admin bisa lihat semua
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- carts: user hanya bisa akses cart sendiri
CREATE POLICY "Users manage own cart" ON carts USING (auth.uid() = user_id);

-- orders: customer lihat order sendiri; admin lihat semua
CREATE POLICY "Customers view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Customers create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- products & categories: public read, admin write (handle via service_role di API routes)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (is_active = TRUE);
```

### Storage Buckets
```
- Bucket: product-images (public)
- Bucket: payment-proofs (private, hanya bisa diakses user terkait + admin)
```

---

## 7. Pages & Routes

| Route | Access | Deskripsi |
|-------|--------|-----------|
| `/` | Public | Homepage: Hero + Featured Products |
| `/products` | Public | Catalog + Filter + Search |
| `/products/[slug]` | Public | Detail Produk |
| `/cart` | Customer | Shopping Cart |
| `/checkout` | Customer | Form Checkout |
| `/checkout/success` | Customer | Order sukses |
| `/orders` | Customer | Riwayat Order |
| `/orders/[id]` | Customer | Detail Order + Upload Bukti |
| `/auth/login` | Guest | Login |
| `/auth/register` | Guest | Register |
| `/admin` | Admin | Dashboard Overview |
| `/admin/products` | Admin | List & Kelola Produk |
| `/admin/products/new` | Admin | Form Tambah Produk |
| `/admin/products/[id]/edit` | Admin | Form Edit Produk |
| `/admin/orders` | Admin | List Semua Order |
| `/admin/orders/[id]` | Admin | Detail & Verifikasi Order |

---

## 8. Brand & Design System

| Elemen | Value |
|--------|-------|
| Brand Name | STRYDE |
| Font Heading | Plus Jakarta Sans (bold/extrabold) |
| Font Body | Inter |
| Primary | `#0A0A0A` (hitam pekat) |
| Background | `#FFFFFF` |
| Accent | `#E8FF3A` (electric yellow) |
| Muted BG | `#F5F5F5` |
| Border | `#E5E5E5` |
| Success | `#22C55E` |
| Error | `#EF4444` |
| Warning | `#F59E0B` |
| Border Radius | `8px` (card), `6px` (button), `999px` (badge) |

**Design Vibe:** Minimalist clean streetwear — terinspirasi dari Nike SNKRS & Sneakers.id

---

## 9. Status Order — Color Mapping

| Status | Label | Warna |
|--------|-------|-------|
| `pending` | Menunggu | Gray |
| `awaiting_payment` | Menunggu Pembayaran | Yellow |
| `payment_uploaded` | Bukti Dikirim | Blue |
| `payment_confirmed` | Pembayaran Dikonfirmasi | Cyan |
| `processing` | Diproses | Purple |
| `shipped` | Dikirim | Orange |
| `delivered` | Selesai | Green |
| `cancelled` | Dibatalkan | Red |

---

## 10. Struktur Folder (Next.js App Router)

```
stryde/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (customer)/
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── checkout/success/page.tsx
│   │   └── orders/
│   │       ├── page.tsx
│   │       └── [id]/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   └── [id]/edit/page.tsx
│   │       └── orders/
│   │           ├── page.tsx
│   │           └── [id]/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                    (shadcn components)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── SizeSelector.tsx
│   ├── cart/
│   │   └── CartItem.tsx
│   ├── order/
│   │   ├── OrderCard.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   └── StatusTracker.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       └── ProductForm.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── store/
│   │   └── cartStore.ts      (Zustand)
│   └── utils.ts
├── types/
│   └── index.ts              (semua TypeScript types)
├── middleware.ts              (auth + role protection)
└── .env.local
```

---

## 11. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 12. Out of Scope (Sementara)

- ❌ Payment Gateway Midtrans (akan ditambahkan di fase berikutnya)
- ❌ Sistem review & rating produk
- ❌ Wishlist / saved items
- ❌ Kupon / voucher diskon
- ❌ Notifikasi email otomatis
- ❌ Kalkulasi ongkos kirim (RajaOngkir)
- ❌ Multiple alamat pengiriman tersimpan
- ❌ Multi-seller / marketplace

---

## 13. Seed Data (Untuk Development)

```
Admin: admin@stryde.id / Admin123!

Produk Sample (per kategori):
- Sneakers: STRYDE Runner Pro, STRYDE Air Lite
- Casual: STRYDE Canvas Low, STRYDE Linen Easy
- Formal: STRYDE Oxford Classic, STRYDE Derby Elite
- Sandal: STRYDE Slide Basic, STRYDE Flip Ultra
- Boots: STRYDE Chelsea Dark

Ukuran: 38, 39, 40, 41, 42, 43, 44
Stok per ukuran: 5-20 unit (random)
Harga: Rp 150.000 - Rp 850.000
```
