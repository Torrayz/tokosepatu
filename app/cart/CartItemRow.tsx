'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { updateCartQuantity, removeFromCart } from '@/lib/actions/cart'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CartItemRowProps {
  item: {
    id: string
    size: string
    quantity: number
    product?: {
      name: string
      price: number
      images?: string[]
      slug: string
    }
  }
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [qty, setQty] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleQuantityChange = async (newQty: number) => {
    if (newQty < 1) return
    setIsUpdating(true)
    setQty(newQty)
    const result = await updateCartQuantity(item.id, newQty)
    if (!result.success) {
      toast.error(result.error || 'Gagal memperbarui')
      setQty(item.quantity)
    }
    setIsUpdating(false)
    router.refresh()
  }

  const handleRemove = async () => {
    setIsUpdating(true)
    const result = await removeFromCart(item.id)
    if (result.success) {
      toast.success('Item dihapus dari keranjang')
    } else {
      toast.error(result.error || 'Gagal menghapus')
    }
    setIsUpdating(false)
    router.refresh()
  }

  const image = item.product?.images?.[0] || '/products/sneaker-runner-pro.png'

  return (
    <div className={`flex gap-4 items-center transition-opacity ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Gambar */}
      <Link href={`/products/${item.product?.slug}`} className="shrink-0">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 hover:scale-105 transition-transform">
          <Image src={image} alt={item.product?.name || ''} fill className="object-cover" />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link href={`/products/${item.product?.slug}`}>
          <h3 className="font-bold text-sm text-gray-900 hover:text-blue-600 transition truncate">
            {item.product?.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-400 mt-0.5">Ukuran: <span className="font-semibold text-gray-600">{item.size}</span></p>
        <p className="font-extrabold text-sm text-[#0A0A0A] mt-1">
          {formatRupiah((item.product?.price || 0) * qty)}
        </p>
        {qty > 1 && (
          <p className="text-xs text-gray-400">{formatRupiah(item.product?.price || 0)} / item</p>
        )}
      </div>

      {/* Kontrol qty + hapus */}
      <div className="flex flex-col items-end gap-3 shrink-0">
        <button
          onClick={handleRemove}
          disabled={isUpdating}
          className="text-gray-300 hover:text-red-400 transition p-1 rounded-lg hover:bg-red-50"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>

        <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => handleQuantityChange(qty - 1)}
            disabled={isUpdating || qty <= 1}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30 text-gray-500"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-gray-900">{qty}</span>
          <button
            onClick={() => handleQuantityChange(qty + 1)}
            disabled={isUpdating}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30 text-gray-500"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
