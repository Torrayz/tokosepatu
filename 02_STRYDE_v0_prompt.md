# STRYDE — V0.dev Prompt
## Untuk generate Frontend UI (Static/Mockup)
## Copy prompt di bawah ini ke v0.dev

---

> **INSTRUKSI TORRAY:**
> Paste SATU prompt di bawah ke v0.dev. V0 akan generate UI lengkap.
> Setelah dapat hasil, download kode-nya dan jadikan base untuk di-build di Antigravity.

---

## PROMPT UNTUK V0.DEV

```
Build a complete e-commerce web app UI for "STRYDE" — an Indonesian shoe brand with the tagline "Walk Your Way". 

Tech stack: Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui

Design System:
- Font: Plus Jakarta Sans (headings, bold/extrabold) + Inter (body)
- Primary: #0A0A0A (near black)
- Background: #FFFFFF
- Accent: #E8FF3A (electric yellow) — use for CTAs, badges, highlights
- Muted: #F5F5F5
- Border: #E5E5E5
- Border radius: 8px for cards, 6px for buttons, 999px for badges
- Vibe: Minimalist streetwear — clean, bold, modern. Inspired by Nike SNKRS

---

Create the following pages/components with mock data:

### 1. NAVBAR (shared layout)
- Logo "STRYDE" in bold black on left (text logo, Plus Jakarta Sans)
- Navigation links: Home, Products, (categories dropdown: Sneakers, Formal, Casual, Sandal, Boots)
- Right side: Search icon, Cart icon with badge count (show "3"), Login button (or User avatar if logged in)
- Sticky on scroll, white background with bottom border

### 2. HOMEPAGE (`/`)
- **Hero Section**: Full-width, dark background (#0A0A0A), large heading "Walk Your Way" in white + electric yellow accent word, subtext, two CTA buttons ("Shop Now" in yellow, "View Catalog" outlined). Include a large hero shoe image placeholder on the right.
- **Categories Section**: 5 category cards in a horizontal scroll/grid (Sneakers, Formal, Casual, Sandal, Boots) with icon/emoji and category name
- **Featured Products Section**: Heading "Featured Picks", grid of 4 product cards (see ProductCard component below)
- **Footer**: Dark (#0A0A0A) background, logo, tagline, quick links (Home, Products, About), social icons

### 3. PRODUCT CATALOG PAGE (`/products`)
Layout: sidebar (filters) + main content grid

**Filter Sidebar (left, 260px):**
- Section "Kategori": checkboxes (Sneakers ✓, Formal, Casual, Sandal, Boots)
- Section "Ukuran": button grid for sizes 38-44, toggleable
- Section "Harga": two preset range buttons ("< Rp 300rb", "Rp 300rb - 500rb", "Rp 500rb - 800rb", "> Rp 800rb")
- "Reset Filter" link at bottom

**Main Content (right):**
- Top bar: "Showing 24 products", Sort dropdown (Terbaru, Harga Terendah, Harga Tertinggi)
- Product grid 3 columns: 8 product cards with mock data
- Pagination at bottom

**ProductCard Component:**
- Shoe image (placeholder rectangle with bg-gray-100)
- Category badge (small pill, gray)
- Product name (bold)
- Price (format: Rp 450.000)
- "New" badge (electric yellow) or "Best Seller" badge (black)
- Hover: subtle shadow lift + "Lihat Detail" overlay button

### 4. PRODUCT DETAIL PAGE (`/products/[slug]`)
Two-column layout:
**Left (images):**
- Main large image area (bg-gray-100 placeholder)
- Row of 3 thumbnail images below

**Right (info):**
- Breadcrumb: Home > Sneakers > STRYDE Runner Pro
- Category badge
- Product name (h1, Plus Jakarta Sans, 2xl bold)
- Price (large, black, Rp 450.000)
- Divider
- "Pilih Ukuran" label + size buttons (38-44):
  - Available: outlined black button (hover: black fill white text)
  - Selected: black fill white text
  - Out of stock: gray text, strikethrough, disabled
  - Show "Sisa 3!" badge in yellow for low stock sizes
- "Tambah ke Keranjang" button: full width, black background, white text, yellow accent on hover
- Product description section below

### 5. CART PAGE (`/cart`)
Two-column layout:

**Left (items):**
- List of 3 cart items, each:
  - Shoe image (80x80 placeholder)
  - Product name + size badge ("UK 42")
  - Price
  - Quantity stepper (- 2 +)
  - Delete icon (trash)
  - Subtotal
- Divider between items

**Right (summary):**
- "Ringkasan Pesanan" card
- Subtotal: Rp 1.350.000
- Ongkos kirim: Gratis
- Total: Rp 1.350.000 (bold, larger)
- "Lanjut ke Checkout" button (full width, black)
- "Lanjut Belanja" link below

### 6. CHECKOUT PAGE (`/checkout`)
Single column, max-width container, two-section layout:

**Section 1: Alamat Pengiriman**
- Form fields with shadcn Input:
  - Nama Penerima *
  - Nomor Telepon *
  - Alamat Lengkap * (textarea)
  - Kota *
  - Provinsi * (Select dropdown)
  - Kode Pos *
  - Catatan Kurir (optional)

**Section 2: Metode Pembayaran**
- Two radio cards (styled selectable cards):
  - Card 1: "COD (Bayar di Tempat)" with truck icon — "Bayar tunai saat barang tiba"
  - Card 2: "Transfer Bank" with bank icon — "BCA 1234567890 a.n. STRYDE Indonesia"
- Selected card: black border + electric yellow accent dot

**Right column (sticky): Order Summary card**
- Item list (2-3 items, name + size + qty + price)
- Subtotal + Ongkir
- Total
- "Buat Pesanan" button (full width, black)

### 7. ORDER SUCCESS PAGE (`/checkout/success`)
- Centered layout
- Large animated checkmark in electric yellow circle
- "Pesanan Berhasil Dibuat!" heading
- Order ID: #STR-2024-0042
- Success message based on payment method:
  - COD: "Tim kami akan menghubungi kamu untuk konfirmasi pengiriman."
  - Transfer: "Upload bukti transfer kamu di halaman detail pesanan."
- Two buttons: "Lihat Pesanan" (black) + "Lanjut Belanja" (outlined)

### 8. ORDERS PAGE (`/orders`)
- Page heading "Pesanan Saya"
- Filter tabs: Semua | Menunggu Pembayaran | Diproses | Dikirim | Selesai | Dibatalkan
- List of order cards, each:
  - Order ID + tanggal
  - Status badge (colored: yellow for "Menunggu Pembayaran", green for "Selesai", etc.)
  - Item thumbnail row (3 shoes)
  - "2 produk + 1 lainnya"
  - Total harga
  - "Lihat Detail" button

### 9. ORDER DETAIL PAGE (`/orders/[id]`)
- Order ID heading + status badge
- **Status Tracker**: horizontal step indicator (pending → confirmed → processing → shipped → delivered) with current step highlighted in yellow/black
- Card: item list with images, names, sizes, quantities, prices
- Card: alamat pengiriman info
- Card: metode pembayaran + status bayar
- **Upload Bukti Bayar section** (visible when payment_method=transfer AND status=awaiting_payment):
  - Dashed border upload area with upload icon
  - "Drag & drop atau klik untuk upload" text
  - Preview if already uploaded
  - "Kirim Bukti Bayar" button

### 10. AUTH PAGES

**Login (`/auth/login`):**
- Centered card, max-width 400px
- STRYDE logo at top
- Heading "Masuk ke Akun"
- Email + Password inputs
- "Lupa password?" link
- "Masuk" button (full width, black)
- "Belum punya akun? Daftar" link

**Register (`/auth/register`):**
- Same card layout
- Nama Lengkap + Email + Password + Konfirmasi Password
- "Daftar" button
- "Sudah punya akun? Masuk" link

### 11. ADMIN LAYOUT (shared for /admin/*)
- **Left sidebar (240px, dark #0A0A0A):**
  - STRYDE logo in white at top
  - "Admin Panel" label (yellow, small)
  - Nav items with icons: Dashboard, Produk, Pesanan
  - Active state: yellow text + yellow left border
  - User info + logout at bottom

### 12. ADMIN DASHBOARD (`/admin`)
- 4 stat cards: Total Pesanan Hari Ini (24), Revenue Hari Ini (Rp 8.4jt), Pesanan Pending (7), Produk Aktif (42)
- Table: "Pesanan Terbaru" — columns: Order ID, Customer, Produk, Total, Status, Metode Bayar, Aksi
- Show 5 rows of mock data with colored status badges

### 13. ADMIN PRODUCTS PAGE (`/admin/products`)
- Header with "Kelola Produk" title + "Tambah Produk" button (black + yellow icon)
- Search input + category filter dropdown
- Table columns: Gambar, Nama, Kategori, Harga, Total Stok, Status (Active/Inactive toggle), Aksi (Edit, Hapus icons)
- 8 rows of mock shoe data

### 14. ADMIN ADD/EDIT PRODUCT FORM (`/admin/products/new`)
Two-column layout:
**Left:**
- Nama Produk input
- Slug input (auto from name, editable)
- Textarea Deskripsi
- Price input (with Rp prefix)
- Category select
- Toggle: Tampilkan di Homepage (is_featured)
- Toggle: Produk Aktif (is_active)

**Right:**
- Image upload area: drag & drop box, show 2-3 uploaded image thumbnails with delete X
- "Stok per Ukuran" section: grid table
  | Ukuran | Stok |
  |--------|------|
  | 38 | [input] |
  | 39 | [input] |
  | 40 | [input] |
  ... up to 44
- "Simpan Produk" button (full width, black)

### 15. ADMIN ORDER DETAIL (`/admin/orders/[id]`)
- Order heading + status dropdown (admin can change)
- Customer info card
- Items table
- Shipping address card
- **Payment Verification card** (for transfer orders):
  - Show uploaded proof image (placeholder)
  - Two buttons: "Konfirmasi Pembayaran" (green) + "Tolak" (red outlined)
  - If rejected: textarea for admin notes
- Input field: "Nomor Resi / Info Pengiriman"
- "Update Pesanan" button

---

Notes:
- All text in Bahasa Indonesia
- Use shadcn/ui components throughout (Button, Input, Select, Card, Badge, Table, Dialog, etc.)
- Prices formatted as Indonesian Rupiah: "Rp 450.000" (with period as thousands separator)
- Responsive: mobile-friendly but desktop-first
- No backend logic needed — just static UI with mock data
- Use realistic Indonesian shoe product names and prices
- Keep the black + white + electric yellow (#E8FF3A) design system consistent throughout
```
