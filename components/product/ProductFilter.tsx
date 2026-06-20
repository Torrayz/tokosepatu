'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = [
  { name: 'Semua', slug: '' },
  { name: 'Sneakers', slug: 'sneakers' },
  { name: 'Casual', slug: 'casual' },
  { name: 'Formal', slug: 'formal' },
  { name: 'Sandal', slug: 'sandal' },
  { name: 'Boots', slug: 'boots' },
]

const priceRanges = [
  { label: 'Semua Harga', value: 'all' },
  { label: 'Di bawah Rp 300.000', value: '0-300000' },
  { label: 'Rp 300.000 - Rp 500.000', value: '300000-500000' },
  { label: 'Rp 500.000 - Rp 800.000', value: '500000-800000' },
  { label: 'Di atas Rp 800.000', value: '800000+' },
]

const sizes = ['38', '39', '40', '41', '42', '43', '44']

const sortOptions = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Harga: Rendah ke Tinggi', value: 'price-asc' },
  { label: 'Harga: Tinggi ke Rendah', value: 'price-desc' },
  { label: 'Nama: A-Z', value: 'name-asc' },
]

export function ProductFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category') || ''
  const currentPrice = searchParams.get('price') || 'all'
  const currentSort = searchParams.get('sort') || 'newest'
  const currentSize = searchParams.get('size') || ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset page on filter change
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/products')
  }

  const hasFilters = currentCategory || currentPrice !== 'all' || currentSize

  return (
    <div className="space-y-6">
      {hasFilters && (
        <button onClick={clearFilters} className="text-sm text-error hover:opacity-70 transition">
          ✕ Hapus semua filter
        </button>
      )}

      {/* Sort */}
      <div>
        <h3 className="font-heading font-bold text-sm mb-3">Urutkan</h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full border border-border rounded-button px-3 py-2 text-sm bg-background"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-heading font-bold text-sm mb-3">Kategori</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter('category', cat.slug)}
              className={`px-3 py-1.5 rounded-badge text-xs font-medium border transition ${
                currentCategory === cat.slug
                  ? 'bg-primary text-background border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-heading font-bold text-sm mb-3">Harga</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={currentPrice === range.value}
                onChange={() => updateFilter('price', range.value)}
                className="accent-primary"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="font-heading font-bold text-sm mb-3">Ukuran</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => updateFilter('size', currentSize === size ? '' : size)}
              className={`py-1.5 rounded-button border text-xs font-medium transition ${
                currentSize === size
                  ? 'bg-primary text-background border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
