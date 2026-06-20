'use client'

import type { ProductSize } from '@/types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block font-heading font-bold text-sm">Pilih Ukuran</label>
      <div className="grid grid-cols-7 gap-2">
        {sizes.map((s) => {
          const isOutOfStock = s.stock === 0
          return (
            <button
              key={s.size}
              onClick={() => !isOutOfStock && onSelectSize(s.size)}
              disabled={isOutOfStock}
              className={`py-2 rounded-button border text-sm font-medium transition ${
                selectedSize === s.size
                  ? 'bg-primary text-background border-primary'
                  : isOutOfStock
                  ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                  : 'border-border hover:border-primary'
              }`}
            >
              {s.size}
            </button>
          )
        })}
      </div>
      {selectedSize && (
        <p className="text-xs text-gray-500">
          Stok tersisa: {sizes.find((s) => s.size === selectedSize)?.stock || 0}
        </p>
      )}
    </div>
  )
}
