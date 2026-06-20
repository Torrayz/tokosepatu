'use client'

import { ProductSize } from '@/types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block font-heading font-bold text-sm">Pilih Ukuran</label>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => {
          const isAvailable = size.stock > 0
          const isSelected = selectedSize === size.size
          const isLowStock = size.stock > 0 && size.stock <= 5

          return (
            <button
              key={size.id}
              onClick={() => isAvailable && onSelectSize(size.size)}
              disabled={!isAvailable}
              className={`py-3 rounded-button font-medium text-sm transition ${
                isSelected
                  ? 'bg-primary text-background border-2 border-primary'
                  : isAvailable
                  ? 'border-2 border-border text-foreground hover:border-primary'
                  : 'border-2 border-border text-gray-400 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <div className="text-center">
                <div className="text-base">{size.size}</div>
                {isLowStock && (
                  <div className="text-xs text-warning">Sisa {size.stock}</div>
                )}
                {!isAvailable && (
                  <div className="text-xs text-error">Habis</div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
