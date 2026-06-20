'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SizeSelector } from '@/components/product/SizeSelector'
import { formatCurrency } from '@/lib/utils'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ShoppingBag, Heart } from 'lucide-react'
import { Toaster, toast } from 'sonner'

// Mock products
const allProducts: Product[] = [
  {
    id: '1',
    name: 'STRYDE Runner Pro',
    slug: 'stryde-runner-pro',
    description: 'Premium performance running sneaker with advanced cushioning technology. Engineered for comfort and style, featuring breathable mesh upper and responsive sole.',
    price: 450000,
    category_id: 1,
    images: ['/products/shoe-1.png', '/products/shoe-2.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', created_at: new Date().toISOString() },
    sizes: [
      { id: 1, product_id: '1', size: '38', stock: 5 },
      { id: 2, product_id: '1', size: '39', stock: 8 },
      { id: 3, product_id: '1', size: '40', stock: 12 },
      { id: 4, product_id: '1', size: '41', stock: 0 },
      { id: 5, product_id: '1', size: '42', stock: 10 },
      { id: 6, product_id: '1', size: '43', stock: 7 },
      { id: 7, product_id: '1', size: '44', stock: 3 },
    ],
  },
  {
    id: '2',
    name: 'STRYDE Canvas Low',
    slug: 'stryde-canvas-low',
    description: 'Classic casual canvas shoe perfect for everyday wear. Versatile design that goes with any outfit.',
    price: 250000,
    category_id: 3,
    images: ['/products/shoe-2.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 3, name: 'Casual', slug: 'casual', created_at: new Date().toISOString() },
    sizes: [
      { id: 8, product_id: '2', size: '38', stock: 15 },
      { id: 9, product_id: '2', size: '39', stock: 20 },
      { id: 10, product_id: '2', size: '40', stock: 18 },
      { id: 11, product_id: '2', size: '41', stock: 12 },
      { id: 12, product_id: '2', size: '42', stock: 25 },
      { id: 13, product_id: '2', size: '43', stock: 9 },
      { id: 14, product_id: '2', size: '44', stock: 0 },
    ],
  },
  {
    id: '3',
    name: 'STRYDE Oxford Classic',
    slug: 'stryde-oxford-classic',
    description: 'Timeless formal oxford shoe for professional occasions. Premium leather construction.',
    price: 650000,
    category_id: 2,
    images: ['/products/shoe-3.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 2, name: 'Formal', slug: 'formal', created_at: new Date().toISOString() },
    sizes: [
      { id: 15, product_id: '3', size: '39', stock: 6 },
      { id: 16, product_id: '3', size: '40', stock: 9 },
      { id: 17, product_id: '3', size: '41', stock: 7 },
      { id: 18, product_id: '3', size: '42', stock: 4 },
      { id: 19, product_id: '3', size: '43', stock: 11 },
      { id: 20, product_id: '3', size: '44', stock: 2 },
    ],
  },
  {
    id: '4',
    name: 'STRYDE Air Lite',
    slug: 'stryde-air-lite',
    description: 'Lightweight breathable sneaker for urban adventures.',
    price: 380000,
    category_id: 1,
    images: ['/products/shoe-4.png'],
    is_active: true,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: { id: 1, name: 'Sneakers', slug: 'sneakers', created_at: new Date().toISOString() },
    sizes: [
      { id: 21, product_id: '4', size: '38', stock: 3 },
      { id: 22, product_id: '4', size: '39', stock: 11 },
      { id: 23, product_id: '4', size: '40', stock: 14 },
      { id: 24, product_id: '4', size: '41', stock: 8 },
      { id: 25, product_id: '4', size: '42', stock: 5 },
      { id: 26, product_id: '4', size: '43', stock: 0 },
      { id: 27, product_id: '4', size: '44', stock: 6 },
    ],
  },
]

interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = allProducts.find((p) => p.slug === params.slug)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.images?.[0] || '/products/shoe-1.png')

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Link href="/products" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size first')
      return
    }
    toast.success(`Added ${product.name} (Size ${selectedSize}) to cart!`)
    // Cart logic will be implemented in the cart page
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/products" className="hover:text-primary transition">
              Products
            </Link>
            <ChevronRight size={16} />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative rounded-card overflow-hidden bg-muted aspect-square">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImage(image)}
                      className={`relative w-20 h-20 rounded-card overflow-hidden border-2 transition ${
                        mainImage === image ? 'border-primary' : 'border-border hover:border-primary'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="badge badge-secondary mb-2">{product.category?.name}</span>
                <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-2">
                  {product.name}
                </h1>
                <p className="font-heading font-extrabold text-3xl text-primary">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selector */}
              <SizeSelector
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block font-heading font-bold text-sm">Quantity</label>
                <div className="flex items-center gap-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-button border border-border hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-button border border-border hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Tambah ke Keranjang
                </button>
                <button className="w-12 h-12 rounded-button border border-border hover:bg-muted transition flex items-center justify-center">
                  <Heart size={20} />
                </button>
              </div>

              {/* Info Boxes */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex gap-3">
                  <div className="text-2xl">🚚</div>
                  <div>
                    <p className="font-medium text-sm">Pengiriman Gratis</p>
                    <p className="text-xs text-gray-600">Untuk pembelian di atas Rp 500.000</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl">✓</div>
                  <div>
                    <p className="font-medium text-sm">Garansi Keaslian</p>
                    <p className="text-xs text-gray-600">100% produk original</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-2xl">↩️</div>
                  <div>
                    <p className="font-medium text-sm">Pengembalian Mudah</p>
                    <p className="text-xs text-gray-600">Kebijakan pengembalian 30 hari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-muted mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-heading text-2xl font-bold mb-8">Produk Serupa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts
                .filter((p) => p.id !== product.id && p.category_id === product.category_id)
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative mb-3 overflow-hidden rounded-card bg-background aspect-square">
                      <Image
                        src={p.images?.[0] || '/products/shoe-1.png'}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-bold text-sm line-clamp-2 group-hover:text-primary transition">
                      {p.name}
                    </h3>
                    <p className="font-heading font-extrabold text-base">
                      {formatCurrency(p.price)}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
