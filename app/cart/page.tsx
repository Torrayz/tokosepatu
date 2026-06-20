'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trash2, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

// Mock cart data for demo
const mockCartItems = [
  {
    id: '1',
    product_id: '1',
    product_name: 'STRYDE Runner Pro',
    product_image: '/products/shoe-1.png',
    size: '42',
    price: 450000,
    quantity: 1,
  },
  {
    id: '2',
    product_id: '2',
    product_name: 'STRYDE Canvas Low',
    product_image: '/products/shoe-2.png',
    size: '40',
    price: 250000,
    quantity: 2,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(mockCartItems)

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const tax = Math.round(subtotal * 0.1) // 10% tax
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center space-y-6">
              <ShoppingBag size={64} className="mx-auto opacity-20" />
              <div>
                <h1 className="font-heading text-3xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              </div>
              <Link href="/products" className="btn-secondary inline-block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-button overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link href={`/products`} className="font-heading font-bold hover:text-primary transition">
                      {item.product_name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                    <p className="font-heading font-extrabold text-base mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-muted rounded-button transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-2 border border-border rounded-button p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-muted rounded"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-heading font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24 space-y-4">
                <h2 className="font-heading font-bold text-lg">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-success">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between font-heading font-extrabold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <Link href="/checkout" className="btn-secondary w-full text-center flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>

                <Link href="/products" className="btn-outline w-full text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
