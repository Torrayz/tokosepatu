import { getCategories } from '@/lib/queries/products'
import { ProductForm } from '@/components/admin/ProductForm'
import { adminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: PageProps) {
  const categories = await getCategories()

  const { data: product } = await adminClient
    .from('products')
    .select('*, sizes:product_sizes(*)')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  const sizesMap: Record<string, number> = {}
  product.sizes?.forEach((s: { size: string; stock: number }) => {
    sizesMap[s.size] = s.stock
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-button hover:bg-background transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-heading text-3xl font-extrabold">Edit Produk</h1>
      </div>
      <ProductForm
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          price: product.price,
          category_id: product.category_id,
          images: product.images || [],
          is_featured: product.is_featured,
          is_active: product.is_active,
          sizes: sizesMap,
        }}
      />
    </div>
  )
}
