import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getOrders } from '@/lib/actions/order'
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge'
import { formatRupiah, formatDate, generateOrderId } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRight, Package, ShoppingBag } from 'lucide-react'
import type { OrderStatus } from '@/types'

interface PageProps {
  searchParams: { status?: string }
}

const statusTabs = [
  { label: 'Semua', value: 'all' },
  { label: 'Menunggu', value: 'awaiting_payment' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Dikirim', value: 'shipped' },
  { label: 'Selesai', value: 'delivered' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

const statusIcon: Record<string, string> = {
  awaiting_payment: '⏳',
  payment_uploaded: '📤',
  payment_confirmed: '✅',
  processing: '⚙️',
  shipped: '🚚',
  delivered: '📦',
  cancelled: '❌',
  pending: '🕐',
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const status = searchParams.status || 'all'
  const orders = await getOrders(status)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A0A0A] rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-[#E8FF3A]" />
              </div>
              <div>
                <h1 className="font-black text-2xl text-gray-900">Pesanan Saya</h1>
                <p className="text-sm text-gray-500">{orders.length} pesanan ditemukan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {statusTabs.map((tab) => (
              <Link
                key={tab.value}
                href={`/orders?status=${tab.value}`}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  status === tab.value
                    ? 'bg-[#0A0A0A] text-[#E8FF3A] shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h2 className="font-bold text-lg text-gray-900 mb-2">Belum Ada Pesanan</h2>
              <p className="text-gray-500 text-sm mb-6">Mulai belanja dan temukan sepatu impianmu!</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#E8FF3A] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition"
              >
                Belanja Sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all p-6 flex items-center gap-5 group"
                >
                  {/* Icon status */}
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shrink-0">
                    {statusIcon[order.status] || '📋'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <p className="font-black text-sm font-mono text-gray-900">{generateOrderId(order.id)}</p>
                      <OrderStatusBadge status={order.status as OrderStatus} />
                    </div>
                    <p className="text-xs text-gray-400">
                      {formatDate(order.created_at)} • {order.items?.length || 0} item •{' '}
                      {order.payment_method === 'cod' ? 'Bayar di Tempat' : 'Transfer Bank'}
                    </p>
                    {/* Thumbnail items */}
                    {order.items && order.items.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {order.items.slice(0, 2).map((i: { product_name: string; size: string; quantity: number }) =>
                          `${i.product_name} (${i.size})`).join(', ')}
                        {order.items.length > 2 && ` +${order.items.length - 2} lainnya`}
                      </p>
                    )}
                  </div>

                  {/* Total & Arrow */}
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="font-black text-lg text-gray-900">{formatRupiah(order.total_amount)}</p>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
