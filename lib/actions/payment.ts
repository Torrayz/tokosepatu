'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadPaymentProof(orderId: string, imageUrl: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Silakan login terlebih dahulu' }

  // Verify order belongs to user
  const { data: order } = await supabase
    .from('orders')
    .select('id, user_id, payment_method')
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single()

  if (!order) return { success: false, error: 'Pesanan tidak ditemukan' }
  if (order.payment_method !== 'transfer') {
    return { success: false, error: 'Metode pembayaran bukan transfer' }
  }

  // Insert payment proof
  const { error: proofError } = await supabase
    .from('payment_proofs')
    .insert({
      order_id: orderId,
      image_url: imageUrl,
    })

  if (proofError) return { success: false, error: 'Gagal mengupload bukti bayar' }

  // Update order status
  const { error: statusError } = await supabase
    .from('orders')
    .update({
      status: 'payment_uploaded',
      payment_status: 'uploaded',
      updated_at: new Date().toISOString(),
    })
    .eq('id', orderId)

  if (statusError) return { success: false, error: 'Gagal memperbarui status pesanan' }

  revalidatePath(`/orders/${orderId}`)
  return { success: true }
}
