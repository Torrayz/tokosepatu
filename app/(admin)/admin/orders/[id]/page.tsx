import { getAdminOrderById } from '@/lib/actions/admin'
import { formatRupiah, formatDate, generateOrderId } from '@/lib/utils'
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge'
import { StatusTracker } from '@/components/order/StatusTracker'
import { AdminOrderActions } from './AdminOrderActions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { OrderStatus } from '@/types'

interface PageProps {
  params: { id: string }
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const order = await getAdminOrderById(params.id)

  if (!order) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 rounded-button hover:bg-background transition">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-extrabold">{generateOrderId(order.id)}</h1>
          <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
        </div>
        <OrderStatusBadge status={order.status as OrderStatus} />
      </div>

      <div className="card bg-background">
        <StatusTracker status={order.status as OrderStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="card bg-background space-y-4">
            <h2 className="font-heading font-bold">Item Pesanan</h2>
            {order.items?.map((item: { id?: number; product_name: string; product_image?: string | null; size: string; quantity: number; price: number }) => (
              <div key={item.id || item.product_name} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="relative w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                  <Image src={item.product_image || '/products/sneaker-runner-pro.png'} alt={item.product_name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.product_name}</h3>
                  <p className="text-xs text-gray-500">Ukuran: {item.size} • Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-sm">{formatRupiah(item.price * item.quantity)}</p>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-heading font-bold">Total</span>
              <span className="font-heading font-extrabold text-lg">{formatRupiah(order.total_amount)}</span>
            </div>
          </div>

          {/* Payment Proof */}
          {order.payment_proof && order.payment_proof.length > 0 && (
            <div className="card bg-background space-y-4">
              <h2 className="font-heading font-bold">Bukti Pembayaran</h2>
              {order.payment_proof.map((proof: { id: string; image_url: string; uploaded_at: string }) => (
                <div key={proof.id} className="border border-border rounded-card p-3">
                  <p className="text-xs text-gray-500 mb-2">Diupload: {formatDate(proof.uploaded_at)}</p>
                  <div className="relative w-full h-48 rounded overflow-hidden bg-muted">
                    <Image src={proof.image_url} alt="Bukti bayar" fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Actions */}
          <AdminOrderActions order={order} />

          {/* Customer Info */}
          <div className="card bg-background space-y-3">
            <h2 className="font-heading font-bold">Pelanggan</h2>
            <p className="text-sm font-medium">{order.profile?.full_name || '-'}</p>
            <p className="text-sm text-gray-500">{order.profile?.email}</p>
          </div>

          {/* Shipping */}
          <div className="card bg-background space-y-3">
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
  )
}
