'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string, size: string, quantity: number = 1) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Silakan login terlebih dahulu' }
  }

  // Check stock
  const { data: sizeData } = await supabase
    .from('product_sizes')
    .select('stock')
    .eq('product_id', productId)
    .eq('size', size)
    .single()

  if (!sizeData || sizeData.stock < quantity) {
    return { success: false, error: 'Stok tidak cukup' }
  }

  // Check if already in cart
  const { data: existing } = await supabase
    .from('carts')
    .select('id, quantity')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .eq('size', size)
    .single()

  if (existing) {
    const newQty = existing.quantity + quantity
    if (newQty > sizeData.stock) {
      return { success: false, error: 'Stok tidak cukup' }
    }

    const { error } = await supabase
      .from('carts')
      .update({ quantity: newQty })
      .eq('id', existing.id)

    if (error) return { success: false, error: 'Gagal menambahkan ke keranjang' }
  } else {
    const { error } = await supabase
      .from('carts')
      .insert({ user_id: user.id, product_id: productId, size, quantity })

    if (error) return { success: false, error: 'Gagal menambahkan ke keranjang' }
  }

  revalidatePath('/cart')
  return { success: true }
}

export async function updateCartQuantity(cartId: string, quantity: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Silakan login terlebih dahulu' }

  if (quantity < 1) {
    return { success: false, error: 'Jumlah minimal 1' }
  }

  // Get cart item to check stock
  const { data: cartItem } = await supabase
    .from('carts')
    .select('product_id, size')
    .eq('id', cartId)
    .eq('user_id', user.id)
    .single()

  if (!cartItem) return { success: false, error: 'Item tidak ditemukan' }

  const { data: sizeData } = await supabase
    .from('product_sizes')
    .select('stock')
    .eq('product_id', cartItem.product_id)
    .eq('size', cartItem.size)
    .single()

  if (!sizeData || quantity > sizeData.stock) {
    return { success: false, error: 'Stok tidak cukup' }
  }

  const { error } = await supabase
    .from('carts')
    .update({ quantity })
    .eq('id', cartId)
    .eq('user_id', user.id)

  if (error) return { success: false, error: 'Gagal memperbarui keranjang' }

  revalidatePath('/cart')
  return { success: true }
}

export async function removeFromCart(cartId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { success: false, error: 'Silakan login terlebih dahulu' }

  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('id', cartId)
    .eq('user_id', user.id)

  if (error) return { success: false, error: 'Gagal menghapus item' }

  revalidatePath('/cart')
  return { success: true }
}

export async function getCartItems() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('carts')
    .select(`
      *,
      product:products(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cart:', error)
    return []
  }

  return data || []
}

export async function getCartCount(): Promise<number> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return 0

  const { count } = await supabase
    .from('carts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return count || 0
}
