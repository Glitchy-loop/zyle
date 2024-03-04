import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { supabase } from "@/lib/supabase/supabase-client"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const Studio = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/stripe/user-payments`
  )

  // const cookieStore = cookies()
  // const supabase = createServerActionClient({ cookies: () => cookieStore })

  // const { data: user } = await supabase.auth.getUser()
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession()
  // console.log(user)

  const data = await res.json()

  console.log(data)

  return (
    <MaxWidthWrapper>
      <h1>Studio</h1>
    </MaxWidthWrapper>
  )
}

export default Studio
