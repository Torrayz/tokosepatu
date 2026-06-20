import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductFilter } from '@/components/product/ProductFilter'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Product } from '@/types'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Suspense } from 'react'

function ProductsContent({ searchParams }: { searchParams: Record<string, string> }) {
  const category = searchParams.category
  const price = searchParams.price
  const sort = searchParams.sort

// Mock products for demo
const allProducts: Product[] = [
  {
    id: '1',
    name: 'STRYDE Runner Pro',
    slug: 'stryde-runner-pro',
    description: 'Premium performance running sneaker with advanced cushioning technology.',
    price: 450000,
    category_id: 1,
    images: ['/products/shoe-1.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', created_at: new Date().toISOString() },
    sizes: [
      { id: 1, product_id: '1', size: '38', stock: 5 },
      { id: 2, product_id: '1', size: '39', stock: 8 },
      { id: 3, product_id: '1', size: '40', stock: 12 },
      { id: 4, product_id: '1', size: '41', stock: 0 },
      { id: 5, product_id: '1', size: '42', stock: 10 },
      { id: 6, product_id: '1', size: '43', stock: 7 },
      { id: 7, product_id: '1', size: '44', stock: 3 },
    ],
  },
  {
    id: '2',
    name: 'STRYDE Canvas Low',
    slug: 'stryde-canvas-low',
    description: 'Classic casual canvas shoe perfect for everyday wear.',
    price: 250000,
    category_id: 3,
    images: ['/products/shoe-2.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 3, name: 'Casual', slug: 'casual', created_at: new Date().toISOString() },
    sizes: [
      { id: 8, product_id: '2', size: '38', stock: 15 },
      { id: 9, product_id: '2', size: '39', stock: 20 },
      { id: 10, product_id: '2', size: '40', stock: 18 },
      { id: 11, product_id: '2', size: '41', stock: 12 },
      { id: 12, product_id: '2', size: '42', stock: 25 },
      { id: 13, product_id: '2', size: '43', stock: 9 },
      { id: 14, product_id: '2', size: '44', stock: 0 },
    ],
  },
  {
    id: '3',
    name: 'STRYDE Oxford Classic',
    slug: 'stryde-oxford-classic',
    description: 'Timeless formal oxford shoe for professional occasions.',
    price: 650000,
    category_id: 2,
    images: ['/products/shoe-3.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 2, name: 'Formal', slug: 'formal', created_at: new Date().toISOString() },
    sizes: [
      { id: 15, product_id: '3', size: '39', stock: 6 },
      { id: 16, product_id: '3', size: '40', stock: 9 },
      { id: 17, product_id: '3', size: '41', stock: 7 },
      { id: 18, product_id: '3', size: '42', stock: 4 },
      { id: 19, product_id: '3', size: '43', stock: 11 },
      { id: 20, product_id: '3', size: '44', stock: 2 },
    ],
  },
  {
    id: '4',
    name: 'STRYDE Air Lite',
    slug: 'stryde-air-lite',
    description: 'Lightweight breathable sneaker for urban adventures.',
    price: 380000,
    category_id: 1,
    images: ['/products/shoe-4.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', created_at: new Date().toISOString() },
    sizes: [
      { id: 21, product_id: '4', size: '38', stock: 3 },
      { id: 22, product_id: '4', size: '39', stock: 11 },
      { id: 23, product_id: '4', size: '40', stock: 14 },
      { id: 24, product_id: '4', size: '41', stock: 8 },
      { id: 25, product_id: '4', size: '42', stock: 5 },
      { id: 26, product_id: '4', size: '43', stock: 0 },
      { id: 27, product_id: '4', size: '44', stock: 6 },
    ],
  },
  {
    id: '5',
    name: 'STRYDE Slide Basic',
    slug: 'stryde-slide-basic',
    description: 'Comfortable slide sandal for casual comfort.',
    price: 150000,
    category_id: 4,
    images: ['/products/shoe-2.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 4, name: 'Sandal', slug: 'sandal', created_at: new Date().toISOString() },
    sizes: [
      { id: 28, product_id: '5', size: '39', stock: 22 },
      { id: 29, product_id: '5', size: '40', stock: 18 },
      { id: 30, product_id: '5', size: '41', stock: 15 },
      { id: 31, product_id: '5', size: '42', stock: 20 },
      { id: 32, product_id: '5', size: '43', stock: 17 },
    ],
  },
  {
    id: '6',
    name: 'STRYDE Chelsea Dark',
    slug: 'stryde-chelsea-dark',
    description: 'Modern Chelsea boot with sleek black leather finish.',
    price: 750000,
    category_id: 5,
    images: ['/products/shoe-3.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 5, name: 'Boots', slug: 'boots', created_at: new Date().toISOString() },
    sizes: [
      { id: 33, product_id: '6', size: '39', stock: 5 },
      { id: 34, product_id: '6', size: '40', stock: 7 },
      { id: 35, product_id: '6', size: '41', stock: 6 },
      { id: 36, product_id: '6', size: '42', stock: 8 },
      { id: 37, product_id: '6', size: '43', stock: 4 },
    ],
  },
]

  // Filter and sort logic
  let filtered = [...allProducts]

  if (category) {
    filtered = filtered.filter((p) => p.category?.slug === category)
  }

  if (price && price !== 'all') {
    filtered = filtered.filter((p) => {
      if (price === '0-300000') return p.price < 300000
      if (price === '300000-500000') return p.price >= 300000 && p.price < 500000
      if (price === '500000-800000') return p.price >= 500000 && p.price < 800000
      if (price === '800000+') return p.price >= 800000
      return true
    })
  }

  // Sort products
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    // newest - by created_at
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  const categoryName = category
    ? allProducts.find((p) => p.category?.slug === category)?.category?.name
    : 'Semua Produk'

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {/* Header */}
        <div className="bg-muted border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Link href="/" className="hover:text-primary transition">
                Beranda
              </Link>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium">{categoryName}</span>
            </div>

            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold">{categoryName}</h1>
              <p className="text-gray-600 mt-2">Menampilkan {filtered.length} produk</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <ProductFilter />
              </div>
            </div>

            {/* Products */}
            <div className="md:col-span-3">
              <ProductGrid
                products={filtered}
                isEmpty={filtered.length === 0}
                emptyMessage="No products match your filters. Try adjusting your search."
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default function ProductsPage({ 
  searchParams,
}: {
  searchParams: Record<string, string>
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  )
}

function LoadingState() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted py-12">
        <div className="mx-auto max-w-7xl px-4 animate-pulse">
          <div className="h-10 bg-gray-300 w-48 mb-8 rounded"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}
