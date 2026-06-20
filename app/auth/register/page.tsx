'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Account created successfully!')
      router.push('/auth/login')
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />

      <main className="min-h-screen flex items-center justify-center bg-muted">
        <div className="w-full max-w-md px-4">
          <div className="card bg-background space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className="font-heading text-2xl font-bold">Create Account</h1>
              <p className="text-gray-600 text-sm mt-2">Join STRYDE and start shopping</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <p className="text-xs text-gray-600 mt-1">At least 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-secondary w-full disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-600 text-center">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-primary hover:opacity-70">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:opacity-70">
                Privacy Policy
              </a>
            </p>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/auth/login" className="text-primary font-medium hover:opacity-70">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
