'use client'

import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasStock = product.sizes && product.sizes.some(s => s.stock > 0)
  const firstImage = product.images?.[0] || '/products/sneaker-runner-pro.png'
  const isNew = (Date.now() - new Date(product.created_at).getTime()) < 7 * 86400000
  // Fake original price for featured items to look like a sale
  const originalPrice = product.is_featured ? product.price * 1.15 : null

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative mb-4 overflow-hidden rounded-3xl bg-gray-50 aspect-[4/5] border border-gray-100/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
        <Image
          src={firstImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {!hasStock && (
            <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">Habis</span>
          )}
          {isNew && hasStock && (
            <span className="bg-[#E8FF3A] text-[#0A0A0A] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">Terbaru</span>
          )}
          {product.is_featured && (
            <span className="bg-[#0A0A0A] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">Pilihan</span>
          )}
        </div>

        {/* Hover Action Buttons */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex gap-2">
          <button className="flex-1 bg-[#0A0A0A] text-[#E8FF3A] py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-xl">
            <ShoppingBag className="w-4 h-4" /> Lihat Detail
          </button>
          <button className="w-12 h-12 bg-white text-gray-900 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-xl shrink-0">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-1.5 px-1">
        <div className="flex justify-between items-start gap-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
            {product.category?.name || 'Koleksi'}
          </p>
          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="text-[10px] font-bold text-gray-600">4.9</span>
          </div>
        </div>
        <h3 className="font-heading font-extrabold text-sm text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <p className="font-heading font-black text-base text-[#0A0A0A]">
            {formatRupiah(product.price)}
          </p>
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through font-semibold">
              {formatRupiah(originalPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
