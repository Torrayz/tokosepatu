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
      toast.error('Mohon isi semua bidang')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Kata sandi tidak sesuai')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Kata sandi minimal 8 karakter')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Akun berhasil dibuat!')
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
              <h1 className="font-heading text-2xl font-bold">Buat Akun</h1>
              <p className="text-gray-600 text-sm mt-2">Bergabung dengan STRYDE dan mulai berbelanja</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
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
                  placeholder="anda@contoh.com"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kata Sandi</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full border border-border rounded-button px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <p className="text-xs text-gray-600 mt-1">Minimal 8 karakter</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Konfirmasi Kata Sandi</label>
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
                {isLoading ? 'Membuat Akun...' : 'Daftar'}
              </button>
            </form>

            {/* Terms */}
            <p className="text-xs text-gray-600 text-center">
              Dengan membuat akun, kamu setuju dengan{' '}
              <a href="#" className="text-primary hover:opacity-70">
                Syarat Layanan
              </a>{' '}
              dan{' '}
              <a href="#" className="text-primary hover:opacity-70">
                Kebijakan Privasi
              </a>{' '}
              kami
            </p>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Sudah punya akun? </span>
              <Link href="/auth/login" className="text-primary font-medium hover:opacity-70">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
