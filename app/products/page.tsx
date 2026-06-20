import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductFilter } from '@/components/product/ProductFilter'
import { ProductGrid } from '@/components/product/ProductGrid'
import { getProducts } from '@/lib/queries/products'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { Suspense } from 'react'
import { ProductSortSelect } from './ProductSortSelect'

interface PageProps {
  searchParams: Record<string, string | undefined>
}

async function ProductsContent({ searchParams }: PageProps) {
  const category = searchParams.category
  const price = searchParams.price
  const sort = searchParams.sort
  const search = searchParams.search
  const size = searchParams.size
  const page = parseInt(searchParams.page || '1')

  let minPrice: number | undefined
  let maxPrice: number | undefined
  if (price && price !== 'all') {
    if (price === '0-300000') { minPrice = 0; maxPrice = 299999 }
    else if (price === '300000-500000') { minPrice = 300000; maxPrice = 499999 }
    else if (price === '500000-800000') { minPrice = 500000; maxPrice = 799999 }
    else if (price === '800000+') { minPrice = 800000 }
  }

  const { products, total, totalPages } = await getProducts({
    category, minPrice, maxPrice, sort, page, search, size,
  })

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : search
    ? `Hasil: "${search}"`
    : 'Semua Produk'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div className="bg-[#0A0A0A] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-4">
              <Link href="/" className="hover:text-white transition">Beranda</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{categoryName}</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-black text-3xl md:text-4xl tracking-tight">{categoryName}</h1>
                <p className="text-white/50 text-sm mt-1">{total} produk ditemukan</p>
              </div>
              {/* Sort Dropdown */}
              <Suspense fallback={
                <select disabled className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-3 py-2 focus:outline-none cursor-not-allowed opacity-50">
                  <option value="" className="text-gray-900">Memuat...</option>
                </select>
              }>
                <ProductSortSelect defaultValue={sort || ''} />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <span className="font-bold text-sm text-gray-900">Filter</span>
                </div>
                <div className="p-4">
                  <ProductFilter />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="md:col-span-3">
              <ProductGrid
                products={products}
                isEmpty={products.length === 0}
                emptyMessage="Tidak ada produk yang sesuai dengan filter Anda"
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  {page > 1 && (
                    <Link
                      href={`/products?${new URLSearchParams({ ...searchParams as Record<string, string>, page: String(page - 1) }).toString()}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
                    >
                      <ChevronLeft className="w-4 h-4" /> Sebelumnya
                    </Link>
                  )}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const p = i + 1
                      return (
                        <Link
                          key={p}
                          href={`/products?${new URLSearchParams({ ...searchParams as Record<string, string>, page: String(p) }).toString()}`}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium transition ${
                            p === page
                              ? 'bg-[#0A0A0A] text-[#E8FF3A]'
                              : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {p}
                        </Link>
                      )
                    })}
                  </div>
                  {page < totalPages && (
                    <Link
                      href={`/products?${new URLSearchParams({ ...searchParams as Record<string, string>, page: String(page + 1) }).toString()}`}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
                    >
                      Selanjutnya <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function LoadingState() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="bg-[#0A0A0A] h-32 animate-pulse" />
        <div className="mx-auto max-w-7xl px-4 py-10 animate-pulse">
          <div className="grid grid-cols-4 gap-8">
            <div className="bg-gray-100 rounded-2xl h-64" />
            <div className="col-span-3 grid grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-square rounded-2xl bg-gray-100" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ProductsPage(props: PageProps) {
  return (
    <Suspense fallback={<LoadingState />}>
      <ProductsContent {...props} />
    </Suspense>
  )
}
