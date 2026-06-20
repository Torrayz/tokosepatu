'use server'

import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { OrderStatus, ProductFormData } from '@/types'

// Dashboard stats
export async function getAdminStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = today.toISOString()

  const [ordersToday, revenueToday, pendingOrders, activeProducts] = await Promise.all([
    adminClient.from('orders').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
    adminClient.from('orders').select('total_amount').gte('created_at', todayISO),
    adminClient.from('orders').select('*', { count: 'exact', head: true }).in('status', ['pending', 'awaiting_payment', 'payment_uploaded']),
    adminClient.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ])

  const revenue = revenueToday.data?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

  return {
    ordersToday: ordersToday.count || 0,
    revenueToday: revenue,
    pendingOrders: pendingOrders.count || 0,
    activeProducts: activeProducts.count || 0,
  }
}

export async function getRecentOrders(limit = 5) {
  const { data } = await adminClient
    .from('orders')
    .select(`*, profile:profiles(full_name, email), items:order_items(*)`)
    .order('created_at', { ascending: false })
    .limit(limit)

  return data || []
}

// Products
export async function getAdminProducts(search?: string, category?: string) {
  let query = adminClient
    .from('products')
    .select(`*, category:categories(*), sizes:product_sizes(*)`)
    .order('created_at', { ascending: false })

  if (search) query = query.ilike('name', `%${search}%`)
  if (category) {
    const { data: cat } = await adminClient.from('categories').select('id').eq('slug', category).single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  const { data } = await query
  return data || []
}

export async function saveProduct(formData: ProductFormData & { id?: string }) {
  const productData = {
    name: formData.name,
    slug: formData.slug,
    description: formData.description,
    price: formData.price,
    category_id: formData.category_id,
    images: formData.images,
    is_featured: formData.is_featured,
    is_active: formData.is_active,
    updated_at: new Date().toISOString(),
  }

  let productId = formData.id

  if (productId) {
    // Update
    const { error } = await adminClient.from('products').update(productData).eq('id', productId)
    if (error) return { success: false, error: 'Gagal memperbarui produk' }
  } else {
    // Insert
    const { data, error } = await adminClient.from('products').insert(productData).select().single()
    if (error || !data) return { success: false, error: 'Gagal menambahkan produk' }
    productId = data.id
  }

  // Upsert sizes
  const sizes = Object.entries(formData.sizes).map(([size, stock]) => ({
    product_id: productId!,
    size,
    stock: stock as number,
  }))

  for (const s of sizes) {
    await adminClient.from('product_sizes').upsert(s, { onConflict: 'product_id,size' })
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  redirect('/admin/products')
}

export async function toggleProductActive(productId: string) {
  const { data: product } = await adminClient.from('products').select('is_active').eq('id', productId).single()
  if (!product) return { success: false, error: 'Produk tidak ditemukan' }

  const { error } = await adminClient.from('products').update({ is_active: !product.is_active }).eq('id', productId)
  if (error) return { success: false, error: 'Gagal memperbarui status produk' }

  revalidatePath('/admin/products')
  return { success: true }
}

export async function deleteProduct(productId: string) {
  const { error } = await adminClient.from('products').update({ is_active: false }).eq('id', productId)
  if (error) return { success: false, error: 'Gagal menghapus produk' }

  revalidatePath('/admin/products')
  return { success: true }
}

// Orders
export async function getAdminOrders(status?: string, paymentMethod?: string, page = 1) {
  const perPage = 20
  const offset = (page - 1) * perPage

  let query = adminClient
    .from('orders')
    .select(`*, profile:profiles(full_name, email), items:order_items(*)`, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + perPage - 1)

  if (status && status !== 'all') query = query.eq('status', status)
  if (paymentMethod && paymentMethod !== 'all') query = query.eq('payment_method', paymentMethod)

  const { data, count } = await query
  return { orders: data || [], total: count || 0, totalPages: Math.ceil((count || 0) / perPage) }
}

export async function getAdminOrderById(orderId: string) {
  const { data } = await adminClient
    .from('orders')
    .select(`*, profile:profiles(full_name, email, phone), items:order_items(*), payment_proof:payment_proofs(*)`)
    .eq('id', orderId)
    .single()

  return data
}

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const { error } = await adminClient
    .from('orders')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) return { success: false, error: 'Gagal memperbarui status pesanan' }

  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin/orders')
  return { success: true }
}

export async function confirmPayment(orderId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  await adminClient.from('orders').update({
    status: 'payment_confirmed',
    payment_status: 'confirmed',
    updated_at: new Date().toISOString(),
  }).eq('id', orderId)

  await adminClient.from('payment_proofs').update({
    verified_at: new Date().toISOString(),
    verified_by: user?.id || null,
  }).eq('order_id', orderId)

  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}

export async function rejectPayment(orderId: string, notes: string) {
  await adminClient.from('orders').update({
    status: 'awaiting_payment',
    payment_status: 'rejected',
    updated_at: new Date().toISOString(),
  }).eq('id', orderId)

  await adminClient.from('payment_proofs').update({
    admin_notes: notes,
  }).eq('order_id', orderId)

  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}

export async function updateTrackingNumber(orderId: string, trackingNumber: string) {
  const { error } = await adminClient.from('orders').update({
    tracking_number: trackingNumber,
    updated_at: new Date().toISOString(),
  }).eq('id', orderId)

  if (error) return { success: false, error: 'Gagal memperbarui nomor resi' }

  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}
