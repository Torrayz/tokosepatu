import { getAdminStats, getRecentOrders } from '@/lib/actions/admin'
import { formatRupiah, formatDate, generateOrderId } from '@/lib/utils'
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge'
import {
  ShoppingBag, Clock, Package,
  ArrowRight, ArrowUpRight, DollarSign
} from 'lucide-react'
import Link from 'next/link'
import type { OrderStatus } from '@/types'

export default async function AdminDashboardPage() {
  const stats = await getAdminStats()
  const recentOrders = await getRecentOrders(8)

  const statCards = [
    {
      label: 'Pendapatan Hari Ini',
      value: formatRupiah(stats.revenueToday),
      icon: DollarSign,
      iconBg: 'bg-green-500',
      change: '+12.5%',
      changeUp: true,
      sub: 'dibanding kemarin',
    },
    {
      label: 'Pesanan Hari Ini',
      value: stats.ordersToday,
      icon: ShoppingBag,
      iconBg: 'bg-blue-500',
      change: '+3',
      changeUp: true,
      sub: 'pesanan baru',
    },
    {
      label: 'Menunggu Tindakan',
      value: stats.pendingOrders,
      icon: Clock,
      iconBg: 'bg-amber-500',
      change: 'Segera proses',
      changeUp: false,
      sub: 'pesanan pending',
    },
    {
      label: 'Produk Aktif',
      value: stats.activeProducts,
      icon: Package,
      iconBg: 'bg-purple-500',
      change: 'total',
      changeUp: true,
      sub: 'di katalog',
    },
  ]

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Selamat datang kembali! Berikut ringkasan hari ini.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#E8FF3A] font-bold px-4 py-2.5 rounded-xl text-sm hover:opacity-90 transition"
        >
          + Produk Baru
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.changeUp
                    ? 'bg-green-50 text-green-600'
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="font-black text-2xl text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Pesanan Terbaru</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 transition"
            >
              Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Belum ada pesanan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID Pesanan</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Pelanggan</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order: {
                    id: string
                    profile?: { full_name?: string; email?: string }
                    total_amount: number
                    status: string
                    created_at: string
                  }) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-xs font-bold text-[#0A0A0A] hover:text-blue-600 flex items-center gap-1 transition"
                        >
                          {generateOrderId(order.id)}
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 text-sm">
                          {order.profile?.full_name || '-'}
                        </p>
                        <p className="text-xs text-gray-400">{order.profile?.email || ''}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">{formatRupiah(order.total_amount)}</td>
                      <td className="px-6 py-4"><OrderStatusBadge status={order.status as OrderStatus} /></td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{formatDate(order.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="font-bold text-gray-900">Aksi Cepat</h2>
          {[
            {
              href: '/admin/products/new',
              icon: '📦',
              title: 'Tambah Produk Baru',
              desc: 'Upload produk ke katalog',
              color: 'from-blue-500 to-indigo-600',
            },
            {
              href: '/admin/orders?status=payment_uploaded',
              icon: '💳',
              title: 'Verifikasi Pembayaran',
              desc: 'Cek bukti transfer masuk',
              color: 'from-amber-500 to-orange-600',
              badge: stats.pendingOrders > 0 ? `${stats.pendingOrders} pending` : undefined,
            },
            {
              href: '/admin/orders?status=processing',
              icon: '🚚',
              title: 'Pesanan Diproses',
              desc: 'Siap untuk dikirim',
              color: 'from-green-500 to-emerald-600',
            },
            {
              href: '/admin/orders',
              icon: '📋',
              title: 'Kelola Semua Pesanan',
              desc: 'Lihat & update status',
              color: 'from-purple-500 to-violet-600',
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl shadow-sm shrink-0`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
              </div>
              {action.badge && (
                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-1 rounded-full shrink-0">
                  {action.badge}
                </span>
              )}
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
