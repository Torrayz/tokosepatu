'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Logged in successfully!')
      router.push('/')
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
              <h1 className="font-heading text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600 text-sm mt-2">Sign in to your STRYDE account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-secondary w-full disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-600">or</span>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="space-y-2 text-sm">
              <button
                onClick={() => {
                  setFormData({ email: 'demo@stryde.id', password: 'Demo123!' })
                  toast.info('Demo account credentials filled')
                }}
                className="w-full btn-outline"
              >
                Try Demo Account
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link href="/auth/register" className="text-primary font-medium hover:opacity-70">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
