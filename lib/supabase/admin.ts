import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://placeholder-url.supabase.co'

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'

export const adminClient = createClient(supabaseUrl, supabaseServiceKey)
