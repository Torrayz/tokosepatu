import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Package, ShoppingBag, TrendingUp, Users } from 'lucide-react'

const stats = [
  {
    label: 'Total Revenue',
    value: formatCurrency(15250000),
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Total Orders',
    value: '342',
    icon: ShoppingBag,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    label: 'Total Products',
    value: '127',
    icon: Package,
    color: 'bg-green-100 text-green-600',
  },
  {
    label: 'Active Customers',
    value: '1.2K',
    icon: Users,
    color: 'bg-orange-100 text-orange-600',
  },
]

const recentOrders = [
  {
    id: 'STR20240620003',
    customer: 'Ahmad Reza',
    total: 750000,
    status: 'processing',
    date: new Date().toISOString(),
  },
  {
    id: 'STR20240620002',
    customer: 'Siti Nurhaliza',
    total: 1200000,
    status: 'shipped',
    date: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'STR20240620001',
    customer: 'Budi Santoso',
    total: 450000,
    status: 'delivered',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
]

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s your store overview.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="card bg-background">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                      <p className="font-heading text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-button ${stat.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="card bg-background">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-lg font-bold">Recent Orders</h2>
                  <Link href="/admin/orders" className="text-primary text-sm font-medium hover:opacity-70">
                    View All
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-semibold">Order ID</th>
                        <th className="text-left py-3 px-2 font-semibold">Customer</th>
                        <th className="text-left py-3 px-2 font-semibold">Total</th>
                        <th className="text-left py-3 px-2 font-semibold">Status</th>
                        <th className="text-left py-3 px-2 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted transition">
                          <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                          <td className="py-3 px-2">{order.customer}</td>
                          <td className="py-3 px-2 font-medium">{formatCurrency(order.total)}</td>
                          <td className="py-3 px-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded-badge bg-blue-100 text-blue-800 capitalize">
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-gray-600">{formatDate(order.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="card bg-background">
                <h2 className="font-heading font-bold text-lg mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link href="/admin/products/new" className="btn-primary w-full text-center">
                    Add New Product
                  </Link>
                  <Link href="/admin/orders" className="btn-outline w-full text-center">
                    Manage Orders
                  </Link>
                  <Link href="/admin/products" className="btn-outline w-full text-center">
                    Manage Products
                  </Link>
                </div>
              </div>

              <div className="card bg-background">
                <h2 className="font-heading font-bold text-lg mb-3">System Info</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Listings</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Orders</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Low Stock Items</span>
                    <span className="font-medium text-warning">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
