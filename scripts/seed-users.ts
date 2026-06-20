import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables from .env.local or .env
const envPathLocal = path.resolve(process.cwd(), '.env.local')
const envPath = path.resolve(process.cwd(), '.env')

if (fs.existsSync(envPathLocal)) {
  dotenv.config({ path: envPathLocal })
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
} else {
  console.error("No .env or .env.local found!")
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE URL or SERVICE_ROLE_KEY in env")
  process.exit(1)
}

// Use Service Role key to bypass RLS and create users directly
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const USERS_TO_CREATE = [
  { email: 'admin1@stryde.com', password: 'password123', full_name: 'Budi Admin', role: 'admin' },
  { email: 'admin2@stryde.com', password: 'password123', full_name: 'Siti Admin', role: 'admin' },
  { email: 'user1@gmail.com', password: 'password123', full_name: 'Andi Pelanggan', role: 'customer' },
  { email: 'user2@gmail.com', password: 'password123', full_name: 'Reza Pelanggan', role: 'customer' },
  { email: 'user3@gmail.com', password: 'password123', full_name: 'Toni Pelanggan', role: 'customer' },
]

async function seedUsers() {
  console.log("Memulai proses injeksi akun ke Supabase...")
  
  for (const u of USERS_TO_CREATE) {
    console.log(`\nMembuat akun: ${u.email}...`)
    
    // 1. Create User in Auth system
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true, // Auto confirm email so they can login immediately
      user_metadata: { full_name: u.full_name }
    })

    if (authError) {
      if (authError.message.includes('already been registered')) {
        console.log(`⚠️ Email ${u.email} sudah terdaftar. Melanjutkan...`)
        continue
      } else {
        console.error(`❌ Gagal membuat Auth User ${u.email}:`, authError.message)
        continue
      }
    }

    const userId = authData.user.id
    console.log(`✅ Auth User dibuat dengan ID: ${userId}`)

    // 2. Upsert profile into 'profiles' table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: userId,
        email: u.email,
        full_name: u.full_name,
        role: u.role
      })

    if (profileError) {
      console.error(`❌ Gagal membuat Profile untuk ${u.email}:`, profileError.message)
    } else {
      console.log(`✅ Profile (${u.role}) sukses dibuat untuk ${u.email}!`)
    }
  }

  console.log("\n🎉 SELESAI! Berikut daftar kredensial untuk dicoba (semua password: password123):")
  USERS_TO_CREATE.forEach(u => console.log(`- ${u.role === 'admin' ? '👑 Admin' : '👤 User'} | ${u.email}`))
}

seedUsers().catch(console.error)
