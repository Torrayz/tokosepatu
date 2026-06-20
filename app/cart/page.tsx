import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getCartItems } from '@/lib/actions/cart'
import { formatRupiah } from '@/lib/utils'
import Link from 'next/link'
import { CartItemRow } from './CartItemRow'
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Tag } from 'lucide-react'

export default async function CartPage() {
  const cartItems = await getCartItems()

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E8FF3A] rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#0A0A0A]" />
              </div>
              <div>
                <h1 className="font-black text-2xl text-gray-900">Keranjang Belanja</h1>
                <p className="text-sm text-gray-500">{totalItems} item dalam keranjang</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="font-bold text-xl text-gray-900 mb-2">Keranjang Masih Kosong</h2>
              <p className="text-gray-500 mb-8">Yuk temukan sepatu yang kamu suka!</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#E8FF3A] font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition"
              >
                Mulai Belanja <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">{cartItems.length} Produk</span>
                    <Link href="/products" className="text-xs text-gray-400 hover:text-gray-700 transition">
                      + Tambah Produk
                    </Link>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {cartItems.map((item) => (
                      <div key={item.id} className="px-6 py-4">
                        <CartItemRow item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, text: 'Gratis Ongkir' },
                    { icon: ShieldCheck, text: 'Barang 100% Asli' },
                    { icon: Tag, text: 'Harga Terbaik' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-xs font-medium text-gray-600">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5 sticky top-24">
                  <h2 className="font-bold text-gray-900">Ringkasan Pesanan</h2>

                  {/* Item list mini */}
                  <div className="space-y-2.5 max-h-40 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-500 truncate max-w-[180px]">
                          {item.product?.name} <span className="text-gray-400">×{item.quantity}</span>
                        </span>
                        <span className="font-medium text-gray-900 shrink-0">
                          {formatRupiah((item.product?.price || 0) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal ({totalItems} item)</span>
                      <span className="text-gray-900 font-medium">{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Ongkos Kirim</span>
                      <span className="text-green-600 font-semibold">GRATIS</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <span className="font-black text-gray-900 text-base">Total</span>
                      <span className="font-black text-xl text-[#0A0A0A]">{formatRupiah(subtotal)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full py-4 rounded-xl bg-[#0A0A0A] text-[#E8FF3A] font-bold text-center block hover:opacity-90 transition shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                  >
                    Lanjut ke Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/products"
                    className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm text-center block hover:bg-gray-50 transition"
                  >
                    Lanjut Belanja
                  </Link>

                  <p className="text-center text-xs text-gray-400">
                    🔒 Pembayaran aman & terenkripsi
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
