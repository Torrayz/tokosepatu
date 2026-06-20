import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
  isEmpty?: boolean
  emptyMessage?: string
}

export function ProductGrid({ products, isEmpty }: ProductGridProps) {
  if (isEmpty || products.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <p className="text-3xl">🔍</p>
        </div>
        <h3 className="font-heading font-extrabold text-xl mb-2 text-gray-900">Produk Tidak Ditemukan</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Kami tidak dapat menemukan produk yang sesuai dengan filter Anda. Coba hapus filter atau cari kata kunci lain.</p>
        <Link href="/products" className="bg-[#0A0A0A] text-white px-8 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-colors inline-flex items-center shadow-lg">
          Lihat Semua Produk
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
