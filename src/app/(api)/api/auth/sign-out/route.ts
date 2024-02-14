import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json(error, { status: 400 })
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
