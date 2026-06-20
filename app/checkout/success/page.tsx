import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getOrderById } from '@/lib/actions/order'
import { formatRupiah, generateOrderId } from '@/lib/utils'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

interface PageProps {
  searchParams: { order_id?: string; method?: string }
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const orderId = searchParams.order_id
  const method = searchParams.method || 'cod'
  let order = null

  if (orderId) {
    order = await getOrderById(orderId)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <CheckCircle2 size={64} className="mx-auto text-success" />
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Pesanan Berhasil Dibuat!</h1>
              <p className="text-gray-600">Terima kasih telah berbelanja di STRYDE.</p>
            </div>

            {order && (
              <div className="bg-muted rounded-card p-4 text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ID Pesanan</span>
                  <span className="font-medium font-mono">{generateOrderId(order.id)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode Pembayaran</span>
                  <span className="font-medium">{method === 'transfer' ? 'Transfer Bank' : 'Bayar di Tempat (COD)'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total</span>
                  <span className="font-medium">{formatRupiah(order.total_amount)}</span>
                </div>
              </div>
            )}

            {method === 'transfer' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-card p-4 text-left text-sm text-yellow-800">
                <p className="font-medium mb-1">Segera lakukan pembayaran</p>
                <p>Transfer ke BCA 1234567890 a.n. STRYDE Indonesia, lalu upload bukti bayar di halaman pesanan.</p>
              </div>
            )}

            {method === 'cod' && (
              <div className="bg-blue-50 border border-blue-200 rounded-card p-4 text-left text-sm text-blue-800">
                <p>Tim kami akan menghubungi kamu untuk konfirmasi pengiriman. Siapkan pembayaran saat barang diterima.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href={orderId ? `/orders/${orderId}` : '/orders'} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                Lihat Pesanan <ArrowRight size={18} />
              </Link>
              <Link href="/products" className="btn-outline flex-1">
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
