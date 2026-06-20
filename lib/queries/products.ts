import { createClient } from '@/lib/supabase/server'
import type { Product, Category } from '@/types'

interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  size?: string
  sort?: string
  page?: number
  search?: string
}

interface ProductsResult {
  products: Product[]
  total: number
  totalPages: number
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResult> {
  const supabase = createClient()
  const perPage = 12
  const page = filters.page || 1
  const offset = (page - 1) * perPage

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      sizes:product_sizes(*)
    `, { count: 'exact' })
    .eq('is_active', true)

  // Filter by category slug
  if (filters.category) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filters.category)
      .single()

    if (cat) {
      query = query.eq('category_id', cat.id)
    }
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }

  // Search by name
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  // Sort
  switch (filters.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'name-asc':
      query = query.order('name', { ascending: true })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  // Pagination
  query = query.range(offset, offset + perPage - 1)

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return { products: [], total: 0, totalPages: 0 }
  }

  let products = (data as Product[]) || []

  // Filter by size (post-query since it requires checking nested sizes)
  if (filters.size) {
    products = products.filter((p) =>
      p.sizes?.some((s) => s.size === filters.size && s.stock > 0)
    )
  }

  const total = count || 0
  const totalPages = Math.ceil(total / perPage)

  return { products, total, totalPages }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      sizes:product_sizes(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null

  return data as Product
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      sizes:product_sizes(*)
    `)
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return (data as Product[]) || []
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return (data as Category[]) || []
}

export async function getRelatedProducts(categoryId: number, excludeSlug: string, limit = 4): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      sizes:product_sizes(*)
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('slug', excludeSlug)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return (data as Product[]) || []
}

