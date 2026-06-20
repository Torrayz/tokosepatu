'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { CheckoutFormData, Order } from '@/types'

export async function createOrder(formData: CheckoutFormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Silakan login terlebih dahulu' }

  // Get cart items
  const { data: cartItems } = await supabase
    .from('carts')
    .select('*, product:products(*)')
    .eq('user_id', user.id)

  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: 'Keranjang kosong' }
  }

  // Check stock for each item
  for (const item of cartItems) {
    const { data: sizeData } = await supabase
      .from('product_sizes')
      .select('stock')
      .eq('product_id', item.product_id)
      .eq('size', item.size)
      .single()

    if (!sizeData || sizeData.stock < item.quantity) {
      return {
        success: false,
        error: `Stok ${item.product?.name} ukuran ${item.size} tidak cukup`,
      }
    }
  }

  // Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )

  if (totalAmount === 0) return { success: false, error: 'Total pesanan tidak valid' }

  // Determine initial status
  const initialStatus = formData.payment_method === 'transfer' ? 'awaiting_payment' : 'pending'

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: initialStatus,
      payment_method: formData.payment_method,
      payment_status: 'pending',
      total_amount: totalAmount,
      shipping_name: formData.shipping_name,
      shipping_phone: formData.shipping_phone,
      shipping_address: formData.shipping_address,
      shipping_city: formData.shipping_city,
      shipping_province: formData.shipping_province,
      shipping_postal: formData.shipping_postal,
      notes: formData.notes || null,
    })
    .select()
    .single()

  if (orderError || !order) {
    return { success: false, error: 'Gagal membuat pesanan' }
  }

  // Create order items (snapshot)
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product?.name || '',
    product_image: item.product?.images?.[0] || null,
    size: item.size,
    quantity: item.quantity,
    price: item.product?.price || 0,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    // Rollback: delete order
    await supabase.from('orders').delete().eq('id', order.id)
    return { success: false, error: 'Gagal membuat pesanan' }
  }

  // Decrease stock
  for (const item of cartItems) {
    await supabase.rpc('decrease_stock', {
      p_product_id: item.product_id,
      p_size: item.size,
      p_quantity: item.quantity,
    })
  }

  // Clear cart
  await supabase.from('carts').delete().eq('user_id', user.id)

  revalidatePath('/cart')
  revalidatePath('/orders')

  redirect(`/checkout/success?order_id=${order.id}&method=${formData.payment_method}`)
}

export async function getOrders(status?: string): Promise<Order[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  let query = supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return (data as Order[]) || []
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*),
      payment_proof:payment_proofs(*)
    `)
    .eq('id', orderId)
    .single()

  if (error || !data) return null

  // Check ownership (customer can only see own orders)
  if (data.user_id !== user.id) {
    // Check if admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') return null
  }

  return data as Order
}
