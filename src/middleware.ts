import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url))
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).)",
    "/dashboard/:path*",
  ],
}
