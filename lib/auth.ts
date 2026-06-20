import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile } from '@/types'

export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/auth/login')
  }
  return user
}

export async function requireAdmin() {
  const profile = await getUserProfile()
  if (!profile || profile.role !== 'admin') {
    redirect('/')
  }
  return profile
}
