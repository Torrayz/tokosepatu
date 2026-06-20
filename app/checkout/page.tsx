'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

// Mock provinces
const provinces = [
  { id: 'jawa-barat', name: 'Jawa Barat' },
  { id: 'jawa-tengah', name: 'Jawa Tengah' },
  { id: 'jawa-timur', name: 'Jawa Timur' },
  { id: 'dki-jakarta', name: 'DKI Jakarta' },
  { id: 'yogyakarta', name: 'Yogyakarta' },
  { id: 'sumatera-utara', name: 'Sumatera Utara' },
]

const mockCartTotal = 950000

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'transfer'>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postal: '',
    notes: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.province ||
      !formData.postal
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Order created successfully!')
      router.push('/checkout/success')
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Information */}
                <div className="card">
                  <h2 className="font-heading font-bold text-lg mb-4">Shipping Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium text-sm mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-sm mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812 3456 7890"
                        className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-sm mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Jl. Merdeka No. 123"
                        className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium text-sm mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Jakarta"
                          className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-sm mb-2">Province *</label>
                        <select
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                          <option value="">Select Province</option>
                          {provinces.map((prov) => (
                            <option key={prov.id} value={prov.id}>
                              {prov.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-sm mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postal"
                        value={formData.postal}
                        onChange={handleInputChange}
                        placeholder="12345"
                        maxLength={5}
                        className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-sm mb-2">Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery..."
                        rows={3}
                        className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card">
                  <h2 className="font-heading font-bold text-lg mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-border rounded-button cursor-pointer hover:bg-muted transition">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'transfer')}
                        className="w-4 h-4 accent-secondary"
                      />
                      <div>
                        <p className="font-medium">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border border-border rounded-button cursor-pointer hover:bg-muted transition">
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'transfer')}
                        className="w-4 h-4 accent-secondary"
                      />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-gray-600">BCA: 1234567890 a.n. STRYDE</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-secondary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Order...' : 'Create Order'}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24 space-y-4">
                <h2 className="font-heading font-bold text-lg">Order Summary</h2>

                <div className="space-y-2 text-sm pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-gray-600">2 Items</span>
                    <span className="font-medium">{formatCurrency(mockCartTotal - 100000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatCurrency(100000)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-heading font-extrabold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(mockCartTotal)}</span>
                </div>

                <Link href="/cart" className="btn-outline w-full text-center text-sm">
                  Back to Cart
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
