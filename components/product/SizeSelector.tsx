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
      <div className="flex flex-wrap gap-2 mt-3">
        {sizes.map((s) => {
          const isSelected = selectedSize === s.size
          const isOutOfStock = s.stock === 0

          return (
            <button
              key={s.size}
              onClick={() => !isOutOfStock && onSelectSize(s.size)}
              disabled={isOutOfStock}
              className={`h-14 w-14 flex flex-col items-center justify-center rounded-sm font-bold text-lg transition-all ${
                isSelected
                  ? 'bg-[#0A0A0A] text-white shadow-md scale-105'
                  : isOutOfStock
                  ? 'bg-gray-100 text-gray-300 border-2 border-gray-100 cursor-not-allowed line-through'
                  : 'bg-white text-[#0A0A0A] border-2 border-gray-200 hover:border-gray-800'
              }`}
            >
              <span className="text-[10px] uppercase text-gray-400 font-medium mb-0.5 leading-none">EU</span>
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
