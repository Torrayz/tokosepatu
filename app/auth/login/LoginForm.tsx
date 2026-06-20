'use client'

import Link from 'next/link'
import { useState } from 'react'
import { loginAction, resendConfirmationAction } from '@/lib/actions/auth'
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setNeedsConfirmation(false)

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string
    setUserEmail(email)

    const result = await loginAction(formData)

    if (result && !result.success) {
      if (result.needsEmailConfirmation) {
        setNeedsConfirmation(true)
      }
      setError(result.error || 'Gagal masuk')
    }
    setIsLoading(false)
  }

  const handleResend = async () => {
    if (!userEmail) return
    setResendLoading(true)
    const result = await resendConfirmationAction(userEmail)
    if (result.success) {
      setResendSuccess(true)
    }
    setResendLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          STRYDE
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Masuk ke akun Anda</p>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Selamat Datang Kembali 👋</h2>
          <p className="text-sm text-gray-500 mt-1">Masukkan email dan kata sandi Anda</p>
        </div>

        {/* Error / Email Confirmation Alert */}
        {error && (
          <div className={`flex gap-3 p-4 rounded-xl text-sm ${
            needsConfirmation
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p>{error}</p>
              {needsConfirmation && (
                <div className="mt-3">
                  {resendSuccess ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Email konfirmasi berhasil dikirim ulang!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={resendLoading}
                      className="flex items-center gap-2 text-amber-700 font-medium hover:text-amber-900 underline underline-offset-2 disabled:opacity-50"
                    >
                      {resendLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                      Kirim ulang email konfirmasi
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="anda@contoh.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-primary/20 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sedang Masuk...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Belum punya akun?{' '}
          <Link href="/auth/register" className="text-primary font-semibold hover:underline">
            Daftar sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}
