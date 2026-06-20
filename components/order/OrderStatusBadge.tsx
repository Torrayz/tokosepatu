import type { OrderStatus } from '@/types'

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Menunggu', className: 'bg-gray-100 text-gray-800' },
  awaiting_payment: { label: 'Menunggu Pembayaran', className: 'bg-yellow-100 text-yellow-800' },
  payment_uploaded: { label: 'Bukti Dikirim', className: 'bg-blue-100 text-blue-800' },
  payment_confirmed: { label: 'Pembayaran Dikonfirmasi', className: 'bg-cyan-100 text-cyan-800' },
  processing: { label: 'Diproses', className: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Dikirim', className: 'bg-orange-100 text-orange-800' },
  delivered: { label: 'Selesai', className: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Dibatalkan', className: 'bg-red-100 text-red-800' },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status] || statusConfig.pending
  return (
    <span className={`inline-block px-3 py-1 rounded-badge text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  )
}
