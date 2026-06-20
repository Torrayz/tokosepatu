import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getOrderById } from '@/lib/actions/order'
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge'
import { StatusTracker } from '@/components/order/StatusTracker'
import { UploadPaymentProof } from '@/components/order/UploadPaymentProof'
import { formatRupiah, formatDate, generateOrderId } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { OrderStatus } from '@/types'

interface PageProps {
  params: { id: string }
}

export default async function OrderDetailPage({ params }: PageProps) {
  const order = await getOrderById(params.id)

  if (!order) {
    notFound()
  }

  const showUploadProof =
    order.payment_method === 'transfer' &&
    ['awaiting_payment'].includes(order.status)

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/orders" className="hover:text-primary transition">Pesanan Saya</Link>
            <ChevronRight size={16} />
            <span className="text-foreground font-medium">{generateOrderId(order.id)}</span>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-2xl font-bold">{generateOrderId(order.id)}</h1>
              <p className="text-sm text-gray-600">{formatDate(order.created_at)}</p>
            </div>
            <OrderStatusBadge status={order.status as OrderStatus} />
          </div>

          {/* Status Tracker */}
          <div className="card mb-8">
            <StatusTracker status={order.status as OrderStatus} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <div className="card space-y-4">
                <h2 className="font-heading font-bold">Item Pesanan</h2>
                {order.items?.map((item: { id?: number; product_name: string; product_image?: string | null; size: string; quantity: number; price: number }) => (
                  <div key={item.id || item.product_name} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="relative w-16 h-16 rounded-card overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.product_image || '/products/sneaker-runner-pro.png'} alt={item.product_name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product_name}</h3>
                      <p className="text-xs text-gray-500">Ukuran: {item.size} • Qty: {item.quantity}</p>
                    </div>
                    <p className="font-heading font-bold text-sm">{formatRupiah(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Upload Payment */}
              {showUploadProof && <UploadPaymentProof orderId={order.id} />}
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <div className="card space-y-3">
                <h2 className="font-heading font-bold">Ringkasan</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Metode Bayar</span>
                  <span className="font-medium">{order.payment_method === 'transfer' ? 'Transfer Bank' : 'COD'}</span>
                </div>
                {order.tracking_number && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">No. Resi</span>
                    <span className="font-mono font-medium">{order.tracking_number}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading font-extrabold text-lg">{formatRupiah(order.total_amount)}</span>
                </div>
              </div>

              {/* Shipping */}
              <div className="card space-y-3">
                <h2 className="font-heading font-bold">Alamat Pengiriman</h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="text-foreground font-medium">{order.shipping_name}</p>
                  <p>{order.shipping_phone}</p>
                  <p>{order.shipping_address}</p>
                  <p>{order.shipping_city}, {order.shipping_province} {order.shipping_postal}</p>
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
