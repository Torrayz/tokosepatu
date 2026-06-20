'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAction(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email dan kata sandi wajib diisi' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { success: false, error: 'Email atau kata sandi salah' }
    }
    // Tangani error email belum dikonfirmasi
    if (
      error.message.includes('Email not confirmed') ||
      error.message.includes('email_not_confirmed')
    ) {
      return {
        success: false,
        needsEmailConfirmation: true,
        error:
          'Email Anda belum dikonfirmasi. Silakan cek kotak masuk (atau folder spam) dan klik tautan konfirmasi.',
      }
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function registerAction(formData: FormData) {
  const supabase = createClient()

  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!fullName || !email || !password || !confirmPassword) {
    return { success: false, error: 'Semua bidang wajib diisi' }
  }

  if (fullName.length < 2) {
    return { success: false, error: 'Nama minimal 2 karakter' }
  }

  if (password.length < 8) {
    return { success: false, error: 'Kata sandi minimal 8 karakter' }
  }

  if (password !== confirmPassword) {
    return { success: false, error: 'Konfirmasi kata sandi tidak cocok' }
  }

  // Daftar akun baru (mencoba menggunakan adminClient agar langsung email_confirm: true jika service role key tersedia)
  let signUpError: any = null
  const isServiceKeyConfigured = process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== 'placeholder_key'

  if (isServiceKeyConfigured) {
    try {
      const { adminClient } = await import('@/lib/supabase/admin')
      const { error: adminError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName }
      })
      if (adminError) {
        signUpError = adminError
      }
    } catch (err: any) {
      signUpError = err
    }
  } else {
    const { error: normalError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    signUpError = normalError
  }

  if (signUpError) {
    if (
      signUpError.message.includes('already registered') ||
      signUpError.message.includes('email already exists')
    ) {
      return { success: false, error: 'Email sudah terdaftar' }
    }
    return { success: false, error: signUpError.message }
  }

  // Auto-login setelah daftar berhasil
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    // Email belum dikonfirmasi - berikan info yang jelas
    if (
      signInError.message.includes('Email not confirmed') ||
      signInError.message.includes('email_not_confirmed')
    ) {
      return {
        success: false,
        needsEmailConfirmation: true,
        userEmail: email,
        error:
          'Akun berhasil dibuat! Silakan cek email Anda dan klik tautan konfirmasi sebelum masuk.',
      }
    }
    redirect('/auth/login')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resendConfirmationAction(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  })
  if (error) {
    return { success: false, error: 'Gagal mengirim ulang email. Coba lagi.' }
  }
  return { success: true }
}

export async function logoutAction() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}
