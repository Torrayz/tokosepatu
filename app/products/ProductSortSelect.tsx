'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface ProductSortSelectProps {
  defaultValue: string
}

export function ProductSortSelect({ defaultValue }: ProductSortSelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('sort', e.target.value)
    } else {
      params.delete('sort')
    }
    // Reset halaman ke 1 saat mengganti urutan
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <select
      name="sort"
      value={defaultValue}
      onChange={handleChange}
      className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
    >
      <option value="" className="text-gray-900">Terbaru</option>
      <option value="price-asc" className="text-gray-900">Harga Terendah</option>
      <option value="price-desc" className="text-gray-900">Harga Tertinggi</option>
      <option value="name-asc" className="text-gray-900">Nama A-Z</option>
    </select>
  )
}
