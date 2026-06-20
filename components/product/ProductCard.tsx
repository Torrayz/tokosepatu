'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasStock = product.sizes && product.sizes.some(s => s.stock > 0)
  const firstImage = product.images?.[0] || '/products/sneaker-runner-pro.png'
  const isNew = (Date.now() - new Date(product.created_at).getTime()) < 7 * 86400000

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-3 overflow-hidden rounded-card bg-muted aspect-square">
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {!hasStock && (
              <span className="badge badge-error">Habis</span>
            )}
            {isNew && hasStock && (
              <span className="badge badge-secondary">Baru</span>
            )}
            {product.is_featured && (
              <span className="badge badge-primary">Pilihan</span>
            )}
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="btn-secondary flex items-center gap-2">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.name || 'Shoes'}
          </p>
          <h3 className="font-heading font-bold text-sm line-clamp-2 group-hover:text-primary transition">
            {product.name}
          </h3>
          <p className="font-heading font-extrabold text-base">
            {formatRupiah(product.price)}
          </p>
        </div>
      </div>
    </Link>
  )
}
