import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey: string = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const getServiceSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  )
