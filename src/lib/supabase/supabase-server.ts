import { Database } from "@/types/supabase"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const supabaseServer = () => createServerComponentClient<Database>({ cookies })

export default supabaseServer
