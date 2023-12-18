import { createClient } from '@supabase/supabase-js'

/* const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY */
const SUPABASE_URL = 'https://cdvpvrzefhyxgbckqtjc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdnB2cnplZmh5eGdiY2txdGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTg4ODMsImV4cCI6MjAxNzgzNDg4M30.pvZly3ENXtVzb7KyRgJmVMcRfb8o0gEstv2l2d9QOJc'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase;