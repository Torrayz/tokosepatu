import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const mockOrders = [
  {
    id: 'STR20240620001',
    date: new Date().toISOString(),
    total: 950000,
    status: 'processing' as const,
    items_count: 2,
  },
  {
    id: 'STR20240619001',
    date: new Date(Date.now() - 86400000).toISOString(),
    total: 450000,
    status: 'delivered' as const,
    items_count: 1,
  },
]

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  awaiting_payment: 'bg-yellow-100 text-yellow-800',
  payment_uploaded: 'bg-blue-100 text-blue-800',
  payment_confirmed: 'bg-cyan-100 text-cyan-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function OrdersPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-3xl font-bold mb-8">Pesanan Saya</h1>

          {mockOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Kamu belum memiliki pesanan</p>
              <Link href="/products" className="btn-secondary inline-block">
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="card flex items-center justify-between hover:border-primary transition group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <p className="font-heading font-bold">{order.id}</p>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-badge capitalize ${statusColors[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.date)} • {order.items_count} item
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-heading font-extrabold text-lg">
                      {formatCurrency(order.total)}
                    </p>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-primary transition" />
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
