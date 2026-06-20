// Auth & User Types
export type UserRole = 'customer' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
}

// Category Types
export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
}

// Product Types
export interface ProductSize {
  id: number
  product_id: string
  size: string
  stock: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category_id: number
  images: string[]
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  category?: Category
  sizes?: ProductSize[]
}

// Cart Types
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  size: string
  quantity: number
  created_at: string
  product?: Product
}

// Order Types
export type OrderStatus = 
  | 'pending'
  | 'awaiting_payment'
  | 'payment_uploaded'
  | 'payment_confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentMethod = 'cod' | 'transfer'
export type PaymentStatus = 'pending' | 'uploaded' | 'confirmed' | 'rejected'

export interface Order {
  id: string
  user_id: string
  status: OrderStatus
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  total_amount: number
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_province: string
  shipping_postal: string
  notes: string | null
  tracking_number: string | null
  created_at: string
  updated_at: string
  items?: OrderItem[]
  payment_proof?: PaymentProof
}

export interface OrderItem {
  id: number
  order_id: string
  product_id: string
  product_name: string
  product_image: string | null
  size: string
  quantity: number
  price: number
}

export interface PaymentProof {
  id: string
  order_id: string
  image_url: string
  uploaded_at: string
  verified_at: string | null
  verified_by: string | null
  admin_notes: string | null
}

// Form Types
export interface CheckoutFormData {
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_province: string
  shipping_postal: string
  notes?: string
  payment_method: PaymentMethod
}

export interface ProductFormData {
  name: string
  slug: string
  description: string
  price: number
  category_id: number
  images: string[]
  sizes: Record<string, number> // size: stock
  is_featured: boolean
  is_active: boolean
}
