import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/product/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types'

// Mock featured products for demo
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'STRYDE Runner Pro',
    slug: 'stryde-runner-pro',
    description: 'Premium performance running sneaker with advanced cushioning technology.',
    price: 450000,
    category_id: 1,
    images: ['/products/shoe-1.png', '/products/shoe-2.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: 1,
      name: 'Sneakers',
      slug: 'sneakers',
      created_at: new Date().toISOString(),
    },
    sizes: [
      { id: 1, product_id: '1', size: '38', stock: 5 },
      { id: 2, product_id: '1', size: '39', stock: 8 },
      { id: 3, product_id: '1', size: '40', stock: 12 },
      { id: 4, product_id: '1', size: '41', stock: 10 },
    ],
  },
  {
    id: '2',
    name: 'STRYDE Canvas Low',
    slug: 'stryde-canvas-low',
    description: 'Classic casual canvas shoe perfect for everyday wear.',
    price: 250000,
    category_id: 3,
    images: ['/products/shoe-2.png', '/products/shoe-1.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: 3,
      name: 'Casual',
      slug: 'casual',
      created_at: new Date().toISOString(),
    },
    sizes: [
      { id: 5, product_id: '2', size: '38', stock: 15 },
      { id: 6, product_id: '2', size: '40', stock: 20 },
      { id: 7, product_id: '2', size: '42', stock: 18 },
    ],
  },
  {
    id: '3',
    name: 'STRYDE Oxford Classic',
    slug: 'stryde-oxford-classic',
    description: 'Timeless formal oxford shoe for professional occasions.',
    price: 650000,
    category_id: 2,
    images: ['/products/shoe-3.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: 2,
      name: 'Formal',
      slug: 'formal',
      created_at: new Date().toISOString(),
    },
    sizes: [
      { id: 8, product_id: '3', size: '39', stock: 6 },
      { id: 9, product_id: '3', size: '41', stock: 9 },
      { id: 10, product_id: '3', size: '43', stock: 7 },
    ],
  },
  {
    id: '4',
    name: 'STRYDE Air Lite',
    slug: 'stryde-air-lite',
    description: 'Lightweight breathable sneaker for urban adventures.',
    price: 380000,
    category_id: 1,
    images: ['/products/shoe-4.png'],
    is_active: true,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: {
      id: 1,
      name: 'Sneakers',
      slug: 'sneakers',
      created_at: new Date().toISOString(),
    },
    sizes: [
      { id: 11, product_id: '4', size: '38', stock: 3 },
      { id: 12, product_id: '4', size: '40', stock: 11 },
      { id: 13, product_id: '4', size: '42', stock: 14 },
      { id: 14, product_id: '4', size: '44', stock: 5 },
    ],
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="font-heading text-4xl md:text-6xl font-extrabold leading-tight">
                    Walk Your Way
                  </h1>
                  <p className="text-lg text-gray-600 max-w-md">
                    Premium Indonesian footwear crafted for the modern lifestyle. From sneakers to formal wear, find your perfect stride with STRYDE.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products" className="btn-secondary inline-flex items-center justify-center gap-2">
                    Shop Now
                    <ArrowRight size={18} />
                  </Link>
                  <button className="btn-outline">
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4">
                  <div>
                    <p className="font-heading font-extrabold text-2xl">500+</p>
                    <p className="text-xs text-gray-600">Products</p>
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-2xl">10K+</p>
                    <p className="text-xs text-gray-600">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-heading font-extrabold text-2xl">100%</p>
                    <p className="text-xs text-gray-600">Authentic</p>
                  </div>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent rounded-card blur-2xl"></div>
                <div className="relative bg-muted rounded-card p-8 flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="inline-block h-64 w-64 bg-gradient-to-br from-secondary/30 to-primary/10 rounded-card"></div>
                    <p className="mt-4 text-sm text-gray-600">Featured Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold">Featured Collection</h2>
                <p className="text-gray-600 mt-2">Discover our latest and most-loved shoes</p>
              </div>
              <Link href="/products" className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                View All
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Mobile CTA */}
            <Link href="/products" className="sm:hidden btn-secondary w-full text-center py-3">
              View All Products
            </Link>
          </div>
        </section>

        {/* Category Preview Section */}
        <section className="bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="font-heading text-3xl font-extrabold mb-12 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Sneakers', slug: 'sneakers', icon: '👟' },
                { name: 'Casual', slug: 'casual', icon: '🥾' },
                { name: 'Formal', slug: 'formal', icon: '👞' },
                { name: 'Sandals', slug: 'sandal', icon: '🩴' },
                { name: 'Boots', slug: 'boots', icon: '🔴' },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="group card hover:border-primary transition text-center"
                >
                  <div className="text-4xl mb-3">👟</div>
                  <h3 className="font-heading font-bold text-sm group-hover:text-primary transition">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-primary text-background rounded-card p-12 text-center space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold">Ready to Walk Your Way?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Explore our complete collection of premium footwear and find the perfect shoe for any occasion.
            </p>
            <Link href="/products" className="inline-block btn-secondary">
              Start Shopping
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
