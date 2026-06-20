import { getCategories } from '@/lib/queries/products'
import { ProductForm } from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-button hover:bg-background transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-heading text-3xl font-extrabold">Tambah Produk Baru</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  )
}
