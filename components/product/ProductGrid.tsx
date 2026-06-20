import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[]
  isEmpty?: boolean
  emptyMessage?: string
}

export function ProductGrid({ products, isEmpty, emptyMessage }: ProductGridProps) {
  if (isEmpty || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🔍</p>
        <h3 className="font-heading font-bold text-lg mb-2">Tidak Ada Produk</h3>
        <p className="text-gray-600 mb-6">{emptyMessage || 'Coba filter lain atau hapus pencarian Anda'}</p>
        <Link href="/products" className="btn-secondary inline-block">
          Lihat Semua Produk
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
