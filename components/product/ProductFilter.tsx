'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, X } from 'lucide-react'

const categories = [
  { id: 'sneakers', name: 'Sneakers' },
  { id: 'casual', name: 'Casual' },
  { id: 'formal', name: 'Formal' },
  { id: 'sandal', name: 'Sandal' },
  { id: 'boots', name: 'Boots' },
]

const priceRanges = [
  { id: 'all', label: 'Semua Harga' },
  { id: '0-300000', label: '< Rp 300rb' },
  { id: '300000-500000', label: 'Rp 300rb - 500rb' },
  { id: '500000-800000', label: 'Rp 500rb - 800rb' },
  { id: '800000+', label: '> Rp 800rb' },
]

const sortOptions = [
  { id: 'newest', label: 'Terbaru' },
  { id: 'price-asc', label: 'Harga Terendah' },
  { id: 'price-desc', label: 'Harga Tertinggi' },
  { id: 'name-asc', label: 'Nama (A - Z)' },
]

export function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const currentCategory = searchParams.get('category') || ''
  const currentPrice = searchParams.get('price') || 'all'
  const currentSort = searchParams.get('sort') || 'newest'

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    
    if (value === 'all' || value === 'newest' || !value) {
      params.delete(filterType)
    } else {
      params.set(filterType, value)
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasFilters = currentCategory || currentPrice !== 'all' || currentSort !== 'newest'

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center mb-6 pb-4 border-b border-border">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 font-medium text-foreground"
        >
          <span>Filters</span>
          <ChevronDown size={20} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary flex items-center gap-1 hover:opacity-70"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6 pb-6 md:pb-0`}>
        {/* Categories */}
        <div>
          <h3 className="font-heading font-bold text-sm mb-3">Kategori</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentCategory === cat.id}
                  onChange={(e) => handleFilterChange('category', e.target.checked ? cat.id : '')}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
                <span className="text-sm">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-heading font-bold text-sm mb-3">Harga</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  value={range.id}
                  checked={currentPrice === range.id}
                  onChange={() => handleFilterChange('price', range.id)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-heading font-bold text-sm mb-3">Urutkan</h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={currentSort === option.id}
                  onChange={() => handleFilterChange('sort', option.id)}
                  className="w-4 h-4 accent-secondary cursor-pointer"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="w-full btn-outline mt-4"
          >
            Reset Filter
          </button>
        )}
      </div>
    </>
  )
}
