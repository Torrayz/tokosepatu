import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getProductBySlug, getRelatedProducts } from '@/lib/queries/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from './ProductDetailClient'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Produk Tidak Ditemukan' }

  return {
    title: `${product.name} - STRYDE`,
    description: product.description || `Beli ${product.name} di STRYDE`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Ambil produk rekomendasi dari kategori yang sama
  const relatedProducts = product.category_id
    ? await getRelatedProducts(product.category_id, params.slug, 4)
    : []

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  )
}
