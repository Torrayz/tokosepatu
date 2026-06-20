# STRYDE — Antigravity Build Prompt
## Full Implementation Prompt (Setelah dapat UI dari v0.dev)

---

> **INSTRUKSI TORRAY:**
> 1. Paste prompt ini ke Antigravity sebagai system/opening prompt
> 2. Attach file `01_STRYDE_PRD.md` sebagai referensi utama
> 3. Attach hasil export kode dari v0.dev sebagai base UI
> 4. Jalankan per fase — jangan minta semua sekaligus

---

## MASTER PROMPT (Paste ke Antigravity)

```
Kamu adalah senior full-stack developer yang akan membangun platform e-commerce sepatu bernama STRYDE secara lengkap.

Kamu sudah diberikan:
1. PRD lengkap (file: 01_STRYDE_PRD.md) — baca dan jadikan sumber kebenaran utama
2. Base UI dari v0.dev — gunakan sebagai komponen visual, jangan recreate dari nol

Tech stack yang WAJIB dipakai:
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Auth + PostgreSQL + Storage)
- Zustand (cart state)
- React Hook Form + Zod (form & validasi)
- Vercel (deployment target)

ATURAN PENTING:
- Selalu pakai TypeScript, tidak boleh ada `any` yang disengaja
- Semua route customer wajib dicek auth via middleware
- Semua route admin wajib dicek role = 'admin'
- Semua operasi DB yang sensitif pakai server-side (Server Actions atau Route Handlers) dengan Supabase service_role
- Jangan hardcode kredensial — pakai .env.local
- Gunakan komponen shadcn/ui yang sudah ada, jangan buat komponen UI dari nol
- Format harga selalu Rupiah: `Rp 450.000` (titik sebagai pemisah ribuan)
- Semua text/label dalam Bahasa Indonesia

Kerjakan sesuai urutan fase di bawah. Setiap fase selesai, tunggu konfirmasi sebelum lanjut ke fase berikutnya.
```

---

## FASE 1 — Project Setup & Supabase

**Prompt Fase 1:**
```
Kerjakan FASE 1: Project Setup & Supabase

1. SETUP PROYEK
   - Pastikan next.config.js sudah benar untuk App Router
   - Install semua dependencies yang dibutuhkan:
     npm install @supabase/supabase-js @supabase/ssr zustand react-hook-form zod @hookform/resolvers
   - Setup file .env.local dengan placeholder:
     NEXT_PUBLIC_SUPABASE_URL=
     NEXT_PUBLIC_SUPABASE_ANON_KEY=
     SUPABASE_SERVICE_ROLE_KEY=

2. SUPABASE CLIENT SETUP
   Buat 3 file:
   
   a) lib/supabase/client.ts — untuk Client Components:
   ```ts
   import { createBrowserClient } from '@supabase/ssr'
   export const createClient = () => createBrowserClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   )
   ```
   
   b) lib/supabase/server.ts — untuk Server Components & Server Actions:
   ```ts
   import { createServerClient } from '@supabase/ssr'
   import { cookies } from 'next/headers'
   export const createClient = () => { ... } // pakai cookies()
   ```
   
   c) lib/supabase/admin.ts — untuk operasi admin (pakai service_role):
   ```ts
   import { createClient } from '@supabase/supabase-js'
   export const adminClient = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   )
   ```

3. MIDDLEWARE
   Buat middleware.ts di root:
   - Refresh session Supabase di setiap request
   - Protect routes:
     - /cart, /checkout, /orders/* → redirect ke /auth/login jika tidak ada session
     - /admin/* → redirect ke / jika bukan role 'admin'
   - Redirect /auth/login & /auth/register ke / jika sudah login

4. TYPESCRIPT TYPES
   Buat file types/index.ts dengan semua interface:
   - Profile, Category, Product, ProductSize
   - Cart, CartItem (dengan product details)
   - Order, OrderItem, PaymentProof
   - OrderStatus type (union type semua nilai status yang valid)
   - PaymentMethod type

5. SQL SCHEMA
   Generate file supabase/schema.sql dengan semua CREATE TABLE dari PRD,
   termasuk:
   - Semua tabel (profiles, categories, products, product_sizes, carts, orders, order_items, payment_proofs)
   - Auth trigger untuk auto-create profile
   - RLS policies sesuai PRD
   - Seed data: 5 categories, 1 admin user placeholder, 9 produk sample dengan stok per ukuran

6. STORAGE BUCKETS
   Buat file supabase/storage-setup.sql:
   - Bucket 'product-images' (public)
   - Bucket 'payment-proofs' (private)
   - Storage policies yang sesuai

Output yang diharapkan: semua file setup sudah ada, proyek bisa di-run dengan `npm run dev` tanpa error.
```

---

## FASE 2 — Authentication

**Prompt Fase 2:**
```
Kerjakan FASE 2: Authentication

Gunakan base UI dari v0.dev untuk halaman login dan register, tapi tambahkan semua logic.

1. HALAMAN LOGIN (/auth/login)
   - Form: email + password
   - Validasi Zod: email valid, password min 8 karakter
   - Server Action `loginAction(formData)`:
     - Panggil supabase.auth.signInWithPassword()
     - Jika sukses: redirect ke /
     - Jika gagal: return error message yang user-friendly
   - Tampilkan error di bawah form (shadcn Alert)
   - Loading state di tombol saat submit

2. HALAMAN REGISTER (/auth/register)
   - Form: nama lengkap + email + password + konfirmasi password
   - Validasi Zod:
     - full_name: min 2 karakter
     - email: valid format
     - password: min 8 karakter
     - confirmPassword: harus sama dengan password
   - Server Action `registerAction(formData)`:
     - Panggil supabase.auth.signUp() dengan metadata { full_name }
     - DB trigger akan auto-create profile
     - Jika sukses: redirect ke / dengan toast "Registrasi berhasil!"
     - Jika email sudah ada: error "Email sudah terdaftar"
   - Loading state + error handling

3. LOGOUT
   - Buat Server Action `logoutAction()`:
     - supabase.auth.signOut()
     - redirect ke /auth/login
   - Pasang di Navbar (tombol logout)

4. NAVBAR — Auth State
   Update Navbar untuk:
   - Jika tidak login: tampilkan tombol "Masuk"
   - Jika login: tampilkan avatar/inisial nama user + dropdown (Pesanan Saya, Logout)
   - Jika admin: tambahkan link "Admin" di dropdown
   - Navbar harus Server Component yang fetch session dari Supabase

5. USER PROFILE HELPER
   Buat lib/auth.ts dengan helper function:
   - `getUser()` — ambil user dari session (server-side)
   - `getUserProfile()` — ambil profile lengkap termasuk role
   - `requireAuth()` — throw/redirect jika tidak ada session
   - `requireAdmin()` — throw/redirect jika bukan admin
```

---

## FASE 3 — Product Catalog & Detail

**Prompt Fase 3:**
```
Kerjakan FASE 3: Product Catalog & Detail

1. HOMEPAGE (/)
   Gunakan Server Component untuk fetch data:
   - Featured products: SELECT * FROM products WHERE is_featured = true AND is_active = true LIMIT 8
   - Render ProductCard untuk setiap produk
   - Hero section & categories section sudah ada dari v0 (tidak perlu data)

2. HALAMAN CATALOG (/products)
   Server Component dengan URL search params untuk filter:
   - URL params: ?category=sneakers&size=42&min_price=0&max_price=500000&sort=newest&page=1
   
   Query Supabase berdasarkan params aktif:
   - Filter kategori: JOIN categories, WHERE categories.slug = param
   - Filter harga: WHERE price BETWEEN min AND max
   - Filter ukuran: JOIN product_sizes WHERE size = param AND stock > 0
   - Sort: ORDER BY created_at DESC / price ASC / price DESC
   - Pagination: LIMIT 12 OFFSET (page-1)*12

   Komponen:
   - FilterSidebar: Client Component dengan state lokal, update URL params via router.push()
   - ProductGrid: Server Component render hasil query
   - Pagination: navigasi halaman via URL params
   - SortDropdown: Client Component update URL param ?sort=

3. PRODUCT CARD (components/product/ProductCard.tsx)
   Props: { product: Product }
   - Tampilkan: gambar (images[0]), nama, kategori, harga format Rupiah
   - Badge logik:
     - Jika created_at < 7 hari lalu: badge "Baru" (kuning)
     - Jika is_featured: badge "Best Seller" (hitam)
   - Link ke /products/[slug]
   - Hover effect dari v0

4. PRODUCT DETAIL (/products/[slug])
   Server Component:
   - Fetch product by slug + join categories
   - Fetch product_sizes for this product
   - Jika not found atau is_active = false: notFound()
   
   Client Component untuk interaksi:
   - SizeSelector: tombol ukuran, disabled jika stock = 0, selected state
   - AddToCartButton: 
     - Disabled jika belum pilih ukuran
     - Klik → Server Action addToCart(productId, size, userId)
     - Jika belum login → redirect /auth/login
     - Jika sudah ada di cart → tambah quantity
     - Toast "Berhasil ditambahkan ke keranjang"

5. SUPABASE QUERY HELPERS
   Buat lib/queries/products.ts:
   - `getProducts(filters)` — catalog query dengan semua filter
   - `getProductBySlug(slug)` — single product dengan sizes
   - `getFeaturedProducts()` — homepage featured
   - `getProductsAdmin()` — semua produk untuk admin table
```

---

## FASE 4 — Cart

**Prompt Fase 4:**
```
Kerjakan FASE 4: Shopping Cart

1. CART SERVER ACTIONS (lib/actions/cart.ts)
   Semua Server Actions, semua butuh auth:
   
   - `addToCart(productId: string, size: string, quantity: number)`
     - Cek stok tersedia di product_sizes
     - UPSERT ke tabel carts (tambah quantity jika sudah ada)
     - Revalidate cart count
   
   - `updateCartQuantity(cartId: string, quantity: number)`
     - Cek stok tidak melebihi
     - UPDATE quantity di carts
   
   - `removeFromCart(cartId: string)`
     - DELETE dari carts WHERE id = cartId AND user_id = currentUser
   
   - `getCartItems(userId: string)`
     - SELECT carts JOIN products JOIN product_sizes
     - Return CartItem[] dengan semua detail produk

2. HALAMAN CART (/cart)
   Server Component: fetch cart items dari Supabase
   
   Jika cart kosong: tampilkan empty state dengan tombol "Mulai Belanja"
   
   CartItem (Client Component per item):
   - Gambar produk, nama, ukuran badge
   - Quantity stepper: tombol - dan + dengan optimistic update
   - Harga per item × qty = subtotal
   - Tombol hapus (trash icon) dengan konfirmasi
   
   Order Summary (sticky):
   - Hitung total dari items
   - Ongkos kirim: "Gratis"
   - Grand total
   - Tombol checkout

3. CART STORE (Zustand) — lib/store/cartStore.ts
   Hanya untuk cart COUNT di navbar (badge angka):
   - State: { count: number }
   - Action: setCount(n), increment(), decrement()
   - Sync count dari server saat pertama load
   - Update count setiap add/remove/update

4. CART COUNT DI NAVBAR
   - Client Component CartBadge yang subscribe ke Zustand store
   - Fetch initial count dari server saat mount
   - Update real-time saat ada operasi cart
```

---

## FASE 5 — Checkout & Order Creation

**Prompt Fase 5:**
```
Kerjakan FASE 5: Checkout & Order Creation

1. HALAMAN CHECKOUT (/checkout)
   - Redirect ke /cart jika cart kosong
   - Dua bagian: Form + Order Summary
   
   Form Checkout (Client Component dengan React Hook Form + Zod):
   Schema validasi:
   - shipping_name: string min 2
   - shipping_phone: regex Indonesia ^(\+62|62|0)8[0-9]{8,11}$
   - shipping_address: string min 10
   - shipping_city: string required
   - shipping_province: enum provinsi Indonesia (34 provinsi)
   - shipping_postal: string length 5, digits only
   - notes: string optional
   - payment_method: 'cod' | 'transfer'
   
   Payment method selector:
   - Dua card yang bisa dipilih (COD / Transfer Bank)
   - Transfer: tampilkan info rekening BCA 1234567890 a.n. STRYDE Indonesia
   
   Order Summary (sidebar):
   - Fetch cart items dari server
   - Tampilkan items, subtotal, ongkir Rp 0, total

2. SERVER ACTION createOrder(formData)
   Langkah-langkah di dalam satu transaksi:
   a) Validasi user sudah login
   b) Ambil cart items user dari DB
   c) Cek ulang stok setiap item (race condition prevention)
   d) Hitung total_amount dari cart items
   e) INSERT ke tabel orders
   f) INSERT ke tabel order_items (snapshot nama, gambar, harga saat itu)
   g) Kurangi stok di product_sizes untuk setiap item
   h) DELETE semua cart items user
   i) Return { orderId, paymentMethod }
   
   Error handling:
   - Jika ada item habis stok: rollback, return error dengan nama produk + ukuran yang habis
   - Jika total 0: error

3. REDIRECT SETELAH ORDER
   Setelah createOrder berhasil:
   - redirect ke /checkout/success?order_id=[id]&method=[cod|transfer]

4. HALAMAN SUCCESS (/checkout/success)
   - Ambil order_id dan method dari search params
   - Fetch order dari DB untuk verifikasi (pastikan milik user ini)
   - Tampilkan pesan berbeda berdasarkan method:
     - COD: "Pesanan diterima! Kami akan menghubungi kamu."
     - Transfer: "Segera upload bukti transfer di halaman pesanan."
   - Tombol: "Lihat Pesanan" → /orders/[order_id]
   - Reset Zustand cart count ke 0
```

---

## FASE 6 — Order Management (Customer)

**Prompt Fase 6:**
```
Kerjakan FASE 6: Order Management (Sisi Customer)

1. HALAMAN DAFTAR ORDER (/orders)
   Server Component:
   - Fetch semua order milik user yang login
   - SELECT * FROM orders WHERE user_id = currentUser ORDER BY created_at DESC
   
   Filter tabs (Client Component):
   - Semua, Menunggu Pembayaran, Diproses, Dikirim, Selesai, Dibatalkan
   - Update via URL param ?status=

   OrderCard per item:
   - Order ID (#STR-[8 char ID pertama])
   - Tanggal: format "20 Jan 2025, 14:30"
   - StatusBadge: warna sesuai mapping di PRD
   - Thumbnails 3 produk pertama (max)
   - Jumlah item total
   - Total harga
   - Tombol "Lihat Detail"

2. KOMPONEN OrderStatusBadge (components/order/OrderStatusBadge.tsx)
   Props: { status: OrderStatus }
   Map status ke label Indonesia + warna:
   - pending → "Menunggu" → gray
   - awaiting_payment → "Menunggu Pembayaran" → yellow
   - payment_uploaded → "Bukti Dikirim" → blue
   - payment_confirmed → "Pembayaran Dikonfirmasi" → cyan
   - processing → "Diproses" → purple
   - shipped → "Dikirim" → orange
   - delivered → "Selesai" → green
   - cancelled → "Dibatalkan" → red

3. HALAMAN DETAIL ORDER (/orders/[id])
   Server Component:
   - Fetch order by ID, pastikan user_id = currentUser (jika bukan: notFound)
   - Fetch order_items untuk order ini
   - Fetch payment_proof jika ada
   
   Sections:
   a) Status tracker: horizontal steps, current step highlighted
   b) Daftar item dengan gambar, nama, ukuran, qty, harga, subtotal
   c) Alamat pengiriman (semua field)
   d) Info pembayaran:
      - Metode (COD / Transfer Bank)
      - Status pembayaran
      - Nomor resi (jika sudah ada dari admin)
   e) Upload bukti bayar (HANYA tampil jika):
      - payment_method = 'transfer'
      - status = 'awaiting_payment' ATAU payment_status = 'rejected'
   
4. UPLOAD BUKTI BAYAR
   Client Component (UploadPaymentProof):
   - Dropzone area atau input file
   - Accept: image/jpeg, image/png, image/webp (max 5MB)
   - Preview image setelah dipilih
   - Tombol "Kirim Bukti Bayar"
   - Server Action uploadPaymentProof(orderId, file):
     - Upload file ke Supabase Storage bucket 'payment-proofs'
     - Path: payment-proofs/{orderId}/{timestamp}.jpg
     - INSERT ke tabel payment_proofs
     - UPDATE orders SET status = 'payment_uploaded', payment_status = 'uploaded'
     - Revalidate halaman
   - Toast sukses + tampilkan "Menunggu verifikasi admin"
   - Jika sudah ada bukti: tampilkan preview + "Sudah dikirim, menunggu konfirmasi"
```

---

## FASE 7 — Admin Dashboard

**Prompt Fase 7:**
```
Kerjakan FASE 7: Admin Dashboard

Semua halaman /admin/* wajib:
- Cek session + role admin di Server Component (gunakan requireAdmin())
- Gunakan AdminLayout dengan sidebar dari v0

1. ADMIN LAYOUT (app/(admin)/admin/layout.tsx)
   - Sidebar dengan navigasi: Dashboard, Produk, Pesanan
   - Active state berdasarkan pathname
   - Semua halaman di bawah layout ini otomatis terlindungi

2. DASHBOARD (/admin) 
   Fetch statistik server-side:
   - Total order hari ini: COUNT orders WHERE DATE(created_at) = today
   - Revenue hari ini: SUM total_amount WHERE DATE(created_at) = today
   - Order pending: COUNT orders WHERE status IN ('pending', 'awaiting_payment', 'payment_uploaded')
   - Produk aktif: COUNT products WHERE is_active = true
   - 5 order terbaru dengan info customer
   
   Render stat cards + tabel order terbaru

3. KELOLA PRODUK (/admin/products)
   Server Component dengan filter:
   - Tabel: gambar, nama, kategori, harga, total stok (SUM product_sizes.stock), status, aksi
   - Search by nama (URL param)
   - Filter by kategori (URL param)
   
   Aksi:
   - Edit → /admin/products/[id]/edit
   - Toggle aktif: Server Action toggleProductActive(id)
   - Hapus: Server Action deleteProduct(id) — soft delete (is_active = false)

4. FORM PRODUK — Tambah (/admin/products/new) & Edit (/admin/products/[id]/edit)
   Client Component dengan React Hook Form:
   
   Schema Zod:
   - name: min 3 karakter
   - slug: lowercase, hanya huruf/angka/dash, auto-generate dari nama tapi editable
   - description: min 10 karakter
   - price: number, min 1000
   - category_id: required
   - is_featured, is_active: boolean
   
   Upload gambar (multi-image):
   - Input file multiple, accept image/*
   - Preview thumbnail setiap gambar yang dipilih
   - Upload ke Supabase Storage bucket 'product-images' saat form submit
   - Path: product-images/{productId}/{filename}
   - Simpan array URL di products.images
   - Tampilkan gambar existing (edit mode) dengan tombol hapus per gambar
   
   Stok per ukuran:
   - Tabel dengan 7 baris: ukuran 38-44
   - Input number per ukuran, min 0
   - Default 0 untuk semua ukuran
   
   Server Action saveProduct(formData):
   - Untuk tambah: INSERT products, INSERT product_sizes (7 rows)
   - Untuk edit: UPDATE products, UPSERT product_sizes
   - Gunakan adminClient (service_role) karena RLS products butuh admin
   - Redirect ke /admin/products setelah sukses

5. KELOLA ORDER (/admin/orders)
   Server Component:
   - Tabel semua order: ID, customer name, tanggal, total, metode, status
   - Filter by status (tabs atau dropdown)
   - Filter by metode bayar
   - Pagination 20 per halaman
   - Highlight baris order dengan payment_status = 'uploaded' (perlu diverifikasi)

6. DETAIL ORDER ADMIN (/admin/orders/[id])
   Server Component:
   - Info lengkap order + customer
   - Tabel order items
   - Alamat pengiriman
   
   Verifikasi Pembayaran (Client Component, untuk transfer):
   Tampil jika payment_status = 'uploaded':
   - Tampilkan bukti bayar (gambar dari Supabase Storage)
   - Tombol "Konfirmasi Pembayaran" (hijau):
     - Server Action confirmPayment(orderId):
       - UPDATE orders SET payment_status = 'confirmed', status = 'payment_confirmed'
       - UPDATE payment_proofs SET verified_at = NOW(), verified_by = adminId
   - Tombol "Tolak" (merah outlined):
     - Dialog konfirmasi dengan textarea catatan penolakan
     - Server Action rejectPayment(orderId, notes):
       - UPDATE orders SET payment_status = 'rejected', status = 'awaiting_payment'
       - UPDATE payment_proofs SET admin_notes = notes
   
   Update Status Order:
   - Dropdown status yang bisa diubah admin
   - Validasi transisi status (misal: tidak bisa dari delivered ke pending)
   - Server Action updateOrderStatus(orderId, newStatus)
   
   Input Nomor Resi:
   - Input field untuk tracking_number
   - Server Action updateTrackingNumber(orderId, trackingNumber)
   - Tampil setelah status = 'shipped'
```

---

## FASE 8 — Polish & Final

**Prompt Fase 8:**
```
Kerjakan FASE 8: Polish & Finalisasi

1. ERROR HANDLING GLOBAL
   - Buat app/error.tsx (Error Boundary global)
   - Buat app/not-found.tsx (404 page dengan tombol kembali ke home)
   - Semua Server Actions return { success: boolean, error?: string }
   - Semua form tampilkan error message inline menggunakan shadcn Alert

2. LOADING STATES
   - Buat app/loading.tsx (skeleton global)
   - Loading skeleton untuk ProductGrid (ProductCardSkeleton komponen)
   - Loading skeleton untuk tabel admin
   - Tombol submit semua form: disable + spinner saat loading

3. TOAST NOTIFICATIONS
   - Install + setup sonner: npm install sonner
   - Tambahkan <Toaster /> di root layout
   - Semua aksi sukses/gagal tampilkan toast:
     - "Berhasil ditambahkan ke keranjang" (success)
     - "Stok tidak cukup" (error)
     - "Pesanan berhasil dibuat!" (success)
     - "Pembayaran dikonfirmasi" (success)
     - dll

4. FORMAT HELPERS (lib/utils.ts)
   Buat function:
   - `formatRupiah(amount: number): string` 
     → "Rp 450.000"
   - `formatDate(date: string): string`
     → "20 Jan 2025, 14:30"
   - `generateOrderId(uuid: string): string`
     → "#STR-A1B2C3D4" (8 char pertama UUID, uppercase)
   - `generateSlug(name: string): string`
     → lowercase, spasi jadi dash, hapus karakter spesial
   - `truncateText(text: string, maxLength: number): string`

5. METADATA & SEO
   - Root layout: metadata brand STRYDE
   - Setiap page punya generateMetadata()
   - Product detail: dynamic OG tags dengan nama + gambar produk

6. MIDDLEWARE FINAL
   Pastikan middleware.ts sudah handle semua kasus:
   - Session refresh Supabase di setiap request
   - Protect /cart, /checkout, /orders/* → redirect /auth/login
   - Protect /admin/* → redirect / jika bukan admin
   - Redirect /auth/* → / jika sudah login

7. SEED DATA SQL (supabase/seed.sql)
   Generate SQL lengkap untuk development:
   - 5 categories
   - 9 produk dengan gambar placeholder URL (picsum.photos)
   - product_sizes untuk setiap produk (ukuran 38-44, stok random 5-20)
   - Instruksi untuk buat admin user via Supabase Auth Dashboard

8. README.md
   Buat README lengkap:
   - Deskripsi project STRYDE
   - Prerequisites
   - Setup langkah demi langkah (clone, install, .env, supabase setup, seed, run)
   - Cara akses admin
   - Struktur folder
   - Tech stack

9. VERIFIKASI FINAL
   Cek semua hal berikut sebelum selesai:
   - [ ] `npm run build` sukses tanpa error TypeScript
   - [ ] Semua route terlindungi sesuai PRD
   - [ ] Cart persist saat refresh halaman
   - [ ] Stok berkurang saat order dibuat
   - [ ] Upload gambar produk berfungsi
   - [ ] Upload bukti bayar berfungsi
   - [ ] Admin bisa konfirmasi/tolak pembayaran
   - [ ] Format Rupiah konsisten di seluruh app
   - [ ] Mobile responsive (minimal di viewport 375px)
```

---

## CATATAN PENTING UNTUK ANTIGRAVITY

```
1. URUTAN WAJIB: Jangan skip fase. Fase 1 → 2 → 3 → dst.

2. KODE V0.DEV: Komponen dari v0 dipakai sebagai UI shell.
   Yang perlu ditambahkan: logic, state, server actions, DB queries, auth.
   
3. SERVER vs CLIENT: 
   - Default semua ke Server Component
   - Jadikan Client Component HANYA yang butuh:
     - useState / useEffect
     - Event handlers (onClick, onChange)
     - Browser APIs
     - Zustand store
   
4. SERVER ACTIONS:
   - Semua mutasi DB pakai Server Actions (app/actions/ atau lib/actions/)
   - Tambahkan 'use server' di top file
   - Validasi ulang di server (jangan percaya client-side validation saja)
   
5. RLS SUPABASE:
   - Operasi customer: pakai client biasa (anon key) → RLS aktif
   - Operasi admin (CRUD produk, update order): pakai adminClient (service_role) → bypass RLS
   
6. MIDTRANS:
   - JANGAN implementasikan dulu
   - Biarkan struktur payment_method sudah ada ('cod' | 'transfer')
   - Nanti saat Midtrans aktif, tinggal tambahkan method baru
   
7. IMAGE HANDLING:
   - Supabase Storage untuk semua gambar
   - Produk: bucket 'product-images' (public)
   - Bukti bayar: bucket 'payment-proofs' (private)
   - Pakai next/image dengan domain supabase dikonfigurasi di next.config.js
```
