'use client'

import { useState } from 'react'
import { updateOrderStatus, confirmPayment, rejectPayment, updateTrackingNumber } from '@/lib/actions/admin'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import type { OrderStatus } from '@/types'

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'awaiting_payment', label: 'Menunggu Pembayaran' },
  { value: 'payment_confirmed', label: 'Pembayaran Dikonfirmasi' },
  { value: 'processing', label: 'Diproses' },
  { value: 'shipped', label: 'Dikirim' },
  { value: 'delivered', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
]

export function AdminOrderActions({ order }: { order: { id: string; status: string; payment_method: string; tracking_number?: string } }) {
  const [isLoading, setIsLoading] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || '')
  const [rejectNotes, setRejectNotes] = useState('')
  const router = useRouter()

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setIsLoading(true)
    const result = await updateOrderStatus(order.id, newStatus)
    if (result.success) {
      toast.success('Status diperbarui')
      router.refresh()
    } else {
      toast.error(result.error || 'Gagal')
    }
    setIsLoading(false)
  }

  const handleConfirmPayment = async () => {
    setIsLoading(true)
    const result = await confirmPayment(order.id)
    if (result.success) {
      toast.success('Pembayaran dikonfirmasi')
      router.refresh()
    }
    setIsLoading(false)
  }

  const handleRejectPayment = async () => {
    if (!rejectNotes.trim()) {
      toast.error('Masukkan alasan penolakan')
      return
    }
    setIsLoading(true)
    const result = await rejectPayment(order.id, rejectNotes)
    if (result.success) {
      toast.success('Pembayaran ditolak')
      router.refresh()
    }
    setIsLoading(false)
  }

  const handleUpdateTracking = async () => {
    if (!trackingNumber.trim()) {
      toast.error('Masukkan nomor resi')
      return
    }
    setIsLoading(true)
    const result = await updateTrackingNumber(order.id, trackingNumber)
    if (result.success) {
      toast.success('Nomor resi diperbarui')
      router.refresh()
    } else {
      toast.error(result.error || 'Gagal')
    }
    setIsLoading(false)
  }

  return (
    <div className="card bg-background space-y-4">
      <h2 className="font-heading font-bold">Aksi</h2>

      {/* Status Update */}
      <div>
        <label className="block text-sm font-medium mb-2">Ubah Status</label>
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
          disabled={isLoading}
          className="w-full border border-border rounded-button px-3 py-2 text-sm bg-background"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Payment Verification */}
      {order.status === 'payment_uploaded' && (
        <div className="space-y-3 border-t border-border pt-4">
          <p className="font-medium text-sm">Verifikasi Pembayaran</p>
          <button onClick={handleConfirmPayment} disabled={isLoading} className="btn-secondary w-full text-sm disabled:opacity-50">
            ✓ Konfirmasi Pembayaran
          </button>
          <div>
            <input
              type="text"
              placeholder="Alasan penolakan..."
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              className="w-full border border-border rounded-button px-3 py-2 text-sm mb-2"
            />
            <button onClick={handleRejectPayment} disabled={isLoading} className="btn-outline w-full text-sm text-error border-error hover:bg-red-50 disabled:opacity-50">
              ✕ Tolak Pembayaran
            </button>
          </div>
        </div>
      )}

      {/* Tracking Number */}
      {['processing', 'shipped'].includes(order.status) && (
        <div className="space-y-2 border-t border-border pt-4">
          <label className="block text-sm font-medium">Nomor Resi</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="JNE/TIKI/..."
              className="flex-1 border border-border rounded-button px-3 py-2 text-sm"
            />
            <button onClick={handleUpdateTracking} disabled={isLoading} className="btn-outline text-sm disabled:opacity-50">
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
