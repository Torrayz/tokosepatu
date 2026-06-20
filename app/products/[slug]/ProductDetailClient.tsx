'use client'

import { useState } from 'react'
import { SizeSelector } from '@/components/product/SizeSelector'
import { formatRupiah } from '@/lib/utils'
import { addToCart } from '@/lib/actions/cart'
import type { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight, Heart, Star,
  Truck, ShieldCheck, RefreshCw, Loader2,
  Plus, Minus
} from 'lucide-react'
import { toast } from 'sonner'
import { ProductCard } from '@/components/product/ProductCard'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images?.[0] || '/products/sneaker-runner-pro.png')
  const [isAdding, setIsAdding] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  const hasStock = product.sizes?.some(s => s.stock > 0)

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error('Pilih ukuran terlebih dahulu')
      return
    }
    setIsAdding(true)
    try {
      const result = await addToCart(product.id, selectedSize, quantity)
      if (result.success) {
        toast.success(`${product.name} (Ukuran ${selectedSize}) ditambahkan ke keranjang!`)
      } else {
        toast.error(result.error || 'Gagal menambahkan ke keranjang')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsAdding(false)
    }
  }

  const allImages = product.images?.length ? product.images : ['/products/sneaker-runner-pro.png']

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-gray-900 transition">Produk</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/products?category=${product.category?.slug}`} className="hover:text-gray-900 transition">
              {product.category?.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

          {/* ── Gambar ── */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-7">
            {/* Main Image - Frosted Glass Mockup Match */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F5F7FA] to-[#E2E8F0] aspect-square group border-2 border-white shadow-inner">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              {/* Badge stok */}
              {!hasStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
                  <span className="bg-white text-gray-900 font-bold px-6 py-2 rounded-full text-sm">Stok Habis</span>
                </div>
              )}
              {product.is_featured && hasStock && (
                <div className="absolute top-4 left-4 bg-[#E8FF3A] text-[#0A0A0A] text-xs font-bold px-3 py-1.5 rounded-full">
                  ⭐ Pilihan Unggulan
                </div>
              )}
            </div>

            {/* Thumbnail */}
            {allImages.length > 1 && (
              <div className="flex gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      mainImage === img
                        ? 'border-[#0A0A0A] scale-95'
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info Produk ── */}
          <div className="flex flex-col gap-8 lg:col-span-5 pt-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-white border border-gray-200 px-3 py-1 shadow-sm">
                  {product.category?.name}
                </span>
                {/* Rating dummy */}
                <div className="flex items-center gap-1 text-[#0A0A0A] bg-gray-50 px-2 py-1 border border-gray-200">
                  <Star className="w-3.5 h-3.5 fill-[#0A0A0A]" />
                  <span className="text-xs font-black">4.8</span>
                  <span className="text-xs text-gray-500 ml-1">/ 124 REVIEWS</span>
                </div>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-black text-[#0A0A0A] leading-[0.9] tracking-tighter uppercase mb-4">
                {product.name}
              </h1>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Ultra-Lite Street Performance</p>
              
              <div className="flex items-center gap-4 mt-6">
                <p className="font-black text-5xl text-[#0A0A0A] tracking-tighter">{formatRupiah(product.price)}</p>
              </div>
            </div>

            {/* Deskripsi */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-5">
                {product.description}
              </p>
            )}

            {/* Pilih Ukuran */}
            <div className="border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-gray-900">Pilih Ukuran</span>
                <button className="text-xs text-[#0A0A0A] underline underline-offset-2">Panduan Ukuran</button>
              </div>
              <SizeSelector
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            </div>

            {/* Jumlah */}
            <div className="border-t border-gray-100 pt-5">
              <p className="font-bold text-sm text-gray-900 mb-3">Jumlah</p>
              <div className="inline-flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-gray-50 transition text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 border-t-2 border-gray-100 pt-8">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || !hasStock}
                  className="flex-1 py-5 rounded-sm bg-[#E8FF3A] text-[#0A0A0A] font-black uppercase tracking-widest text-base hover:bg-[#d4e832] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-[#E8FF3A]/20"
                >
                  {isAdding ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sedang Menambahkan...</>
                  ) : (
                    <>TAMBAH KE KERANJANG</>
                  )}
                </button>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`w-[68px] h-[68px] rounded-sm border-2 flex items-center justify-center transition-all shrink-0 ${
                    wishlist
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-inner'
                      : 'border-gray-200 hover:border-[#0A0A0A] text-[#0A0A0A] bg-white shadow-sm'
                  }`}
                >
                  <Heart className={`w-7 h-7 transition-transform ${wishlist ? 'fill-white scale-110' : 'hover:scale-110'}`} />
                </button>
              </div>
              <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">
                Free Shipping & Returns
              </p>
            </div>

            {/* Keunggulan */}
            <div className="bg-gray-50 rounded-2xl p-5 grid grid-cols-1 gap-3">
              {[
                { icon: Truck, title: 'Gratis Ongkos Kirim', desc: 'Untuk semua pesanan' },
                { icon: ShieldCheck, title: 'Garansi 100% Asli', desc: 'Produk original bersertifikat' },
                { icon: RefreshCw, title: 'Retur 30 Hari', desc: 'Proses mudah & cepat' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Icon className="w-4 h-4 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Produk Rekomendasi ── */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">Dari kategori {product.category?.name}</p>
                <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900">Produk Rekomendasi</h2>
              </div>
              <Link
                href={`/products?category=${product.category?.slug}`}
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#0A0A0A] hover:gap-3 transition-all"
              >
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
