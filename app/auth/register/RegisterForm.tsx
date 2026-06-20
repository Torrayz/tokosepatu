'use client'

import Link from 'next/link'
import { useState } from 'react'
import { registerAction, resendConfirmationAction } from '@/lib/actions/auth'
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2, Loader2, MailCheck } from 'lucide-react'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setNeedsConfirmation(false)

    const formData = new FormData(e.currentTarget)
    const result = await registerAction(formData)

    if (result && !result.success) {
      if (result.needsEmailConfirmation) {
        setNeedsConfirmation(true)
        // @ts-ignore
        setPendingEmail(result.userEmail || (formData.get('email') as string))
      }
      setError(result.error || 'Gagal mendaftar')
    }
    setIsLoading(false)
  }

  const handleResend = async () => {
    if (!pendingEmail) return
    setResendLoading(true)
    const result = await resendConfirmationAction(pendingEmail)
    if (result.success) setResendSuccess(true)
    setResendLoading(false)
  }

  // Tampilan setelah daftar - menunggu konfirmasi email
  if (needsConfirmation) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            STRYDE
          </h1>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-8 text-center space-y-5">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
            <MailCheck className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cek Email Anda! 📧</h2>
            <p className="text-sm text-gray-500 mt-2">
              Akun berhasil dibuat. Kami mengirim email konfirmasi ke:
            </p>
            <p className="font-semibold text-gray-800 mt-1">{pendingEmail}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 text-left space-y-1">
            <p className="font-medium">Langkah selanjutnya:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Buka kotak masuk email Anda</li>
              <li>Cari email dari Supabase / STRYDE</li>
              <li>Klik tautan konfirmasi</li>
              <li>Kembali ke sini dan masuk</li>
            </ol>
            <p className="text-xs text-amber-600 mt-2">Cek juga folder spam / junk jika tidak ada di kotak masuk.</p>
          </div>

          {resendSuccess ? (
            <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Email konfirmasi berhasil dikirim ulang!
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="flex items-center justify-center gap-2 mx-auto text-sm text-gray-500 hover:text-primary underline underline-offset-2 disabled:opacity-50"
            >
              {resendLoading && <Loader2 className="w-3 h-3 animate-spin" />}
              Tidak menerima email? Kirim ulang
            </button>
          )}

          <Link
            href="/auth/login"
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20 text-center"
          >
            Masuk Sekarang
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          STRYDE
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Buat akun baru Anda</p>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Buat Akun 🚀</h2>
          <p className="text-sm text-gray-500 mt-1">Bergabung dan mulai berbelanja</p>
        </div>

        {/* Error alert */}
        {error && !needsConfirmation && (
          <div className="flex gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="fullName"
                required
                minLength={2}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

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
                minLength={8}
                placeholder="Minimal 8 karakter"
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

          {/* Konfirmasi Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                required
                minLength={8}
                placeholder="Ulangi kata sandi"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md shadow-primary/20 mt-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Membuat Akun...
              </>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Dengan mendaftar, kamu setuju dengan{' '}
          <a href="#" className="text-primary hover:underline">Syarat Layanan</a> dan{' '}
          <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a> kami
        </p>

        <div className="text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
          <Link href="/auth/login" className="text-primary font-semibold hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  )
}
