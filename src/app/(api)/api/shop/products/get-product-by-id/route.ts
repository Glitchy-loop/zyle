import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const id = request.nextUrl.searchParams.get("id")

  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", id)
    .single()
  if (error) {
    console.error("error", error)
    return NextResponse.json(error, { status: 500 })
  }
  if (!data) {
    return NextResponse.json("Product not found", { status: 404 })
  }
  return NextResponse.json(data, { status: 200 })
}
