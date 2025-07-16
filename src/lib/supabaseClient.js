// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ugvcjfomrnpcnhfrbdpo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVndmNqZm9tcm5wY25oZnJiZHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MDA1NjEsImV4cCI6MjA2ODI3NjU2MX0.DAcdV-UIim-8BA54QGjB-ppx31cIRa9YDqol29SffCI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
