import { getAdminOrders } from '@/lib/actions/admin'
import { formatRupiah, formatDate, generateOrderId } from '@/lib/utils'
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpRight, ShoppingCart } from 'lucide-react'
import type { OrderStatus } from '@/types'

interface PageProps {
  searchParams: { status?: string; method?: string; page?: string }
}

const statusTabs = [
  { label: 'Semua', value: 'all' },
  { label: 'Menunggu Bayar', value: 'awaiting_payment' },
  { label: 'Bukti Masuk', value: 'payment_uploaded' },
  { label: 'Dikonfirmasi', value: 'payment_confirmed' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Dikirim', value: 'shipped' },
  { label: 'Selesai', value: 'delivered' },
]

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const status = searchParams.status || 'all'
  const method = searchParams.method || 'all'
  const page = parseInt(searchParams.page || '1')

  const { orders, total, totalPages } = await getAdminOrders(status, method, page)

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-gray-900 tracking-tight">Pesanan</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} total pesanan</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {statusTabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/admin/orders?status=${tab.value}`}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              status === tab.value
                ? 'bg-[#0A0A0A] text-[#E8FF3A] shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Tidak ada pesanan dengan status ini</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['ID Pesanan', 'Pelanggan', 'Tanggal', 'Total', 'Metode', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order: {
                  id: string
                  profile?: { full_name?: string; email?: string }
                  created_at: string
                  total_amount: number
                  payment_method: string
                  status: string
                }) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-bold text-gray-900">{generateOrderId(order.id)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900 text-sm">{order.profile?.full_name || '-'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.profile?.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{formatDate(order.created_at)}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">{formatRupiah(order.total_amount)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        order.payment_method === 'transfer'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-green-50 text-green-700'
                      }`}>
                        {order.payment_method === 'transfer' ? '🏦 Transfer' : '💵 COD'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <OrderStatusBadge status={order.status as OrderStatus} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-900 transition group-hover:text-gray-900"
                      >
                        Detail <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Halaman {page} dari {totalPages} ({total} pesanan)
          </p>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={`/admin/orders?status=${status}&page=${page - 1}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/admin/orders?status=${status}&page=${page + 1}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
              >
                Selanjutnya <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
