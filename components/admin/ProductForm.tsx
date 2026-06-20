'use client'

import { useState } from 'react'
import { saveProduct } from '@/lib/actions/admin'
import { generateSlug } from '@/lib/utils'
import { toast } from 'sonner'
import type { Category } from '@/types'

interface ProductFormProps {
  categories: Category[]
  initialData?: {
    id?: string
    name: string
    slug: string
    description: string
    price: number
    category_id: number
    images: string[]
    is_featured: boolean
    is_active: boolean
    sizes: Record<string, number>
  }
}

const defaultSizes: Record<string, number> = { '38': 10, '39': 10, '40': 10, '41': 10, '42': 10, '43': 10, '44': 10 }

export function ProductForm({ categories, initialData }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [price, setPrice] = useState(initialData?.price || 0)
  const [categoryId, setCategoryId] = useState(initialData?.category_id || (categories[0]?.id || 0))
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false)
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true)
  const [sizes, setSizes] = useState<Record<string, number>>(initialData?.sizes || defaultSizes)
  const [isLoading, setIsLoading] = useState(false)
  const [imageInput, setImageInput] = useState('')

  const handleNameChange = (value: string) => {
    setName(value)
    if (!initialData?.id) {
      setSlug(generateSlug(value))
    }
  }

  const addImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()])
      setImageInput('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug || !price || !categoryId) {
      toast.error('Mohon lengkapi semua bidang wajib')
      return
    }

    setIsLoading(true)
    try {
      await saveProduct({
        id: initialData?.id,
        name,
        slug,
        description,
        price,
        category_id: categoryId,
        images,
        is_featured: isFeatured,
        is_active: isActive,
        sizes,
      })
      toast.success(initialData?.id ? 'Produk diperbarui' : 'Produk ditambahkan')
    } catch {
      // redirect throws
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card bg-background space-y-4">
            <h2 className="font-heading font-bold">Informasi Produk</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Nama Produk *</label>
              <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)} required className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary font-mono text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deskripsi</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>

          <div className="card bg-background space-y-4">
            <h2 className="font-heading font-bold">Gambar</h2>
            <div className="flex gap-2">
              <input type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="/products/nama-file.png" className="flex-1 border border-border rounded-button px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              <button type="button" onClick={addImage} className="btn-outline">Tambah</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {images.map((img, i) => (
                <div key={i} className="bg-muted px-3 py-1.5 rounded-badge text-xs flex items-center gap-2">
                  {img}
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="text-error">×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-background space-y-4">
            <h2 className="font-heading font-bold">Stok per Ukuran</h2>
            <div className="grid grid-cols-7 gap-3">
              {Object.entries(sizes).map(([size, stock]) => (
                <div key={size} className="text-center">
                  <label className="block text-xs font-medium mb-1">{size}</label>
                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setSizes({ ...sizes, [size]: parseInt(e.target.value) || 0 })}
                    className="w-full border border-border rounded-button px-2 py-1.5 text-center text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-background space-y-4">
            <h2 className="font-heading font-bold">Pengaturan</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Harga (Rp) *</label>
              <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value) || 0)} required min={0} className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kategori *</label>
              <select value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} className="w-full border border-border rounded-button px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-secondary">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="accent-primary" />
              <span className="text-sm">Produk Unggulan</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="accent-primary" />
              <span className="text-sm">Produk Aktif</span>
            </label>
          </div>

          <button type="submit" disabled={isLoading} className="btn-secondary w-full disabled:opacity-50">
            {isLoading ? 'Menyimpan...' : initialData?.id ? 'Perbarui Produk' : 'Tambah Produk'}
          </button>
        </div>
      </div>
    </form>
  )
}
