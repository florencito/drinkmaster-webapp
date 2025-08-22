import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a null client if environment variables are not set (for development)
const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your-supabase-url-here') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export default supabase
