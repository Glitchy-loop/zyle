import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })

  const limit = Number(request.nextUrl.searchParams.get("limit"))
  const page = Number(request.nextUrl.searchParams.get("page"))
  const offset = parseInt(request.nextUrl.searchParams.get("offset") || "0")
  const color = request.nextUrl.searchParams.get("color")
  const gender = request.nextUrl.searchParams.get("gender")

  // Create the base query without filters
  const baseQuery = supabase
    .from("products")
    .select("*", { count: "exact" })
    .limit(limit)
    .range(offset, offset + limit - 1)
    .order("created_at", { ascending: false })

  // Conditionally add the color filter
  let queryWithFilters = baseQuery

  if (color && color !== "") {
    queryWithFilters = queryWithFilters.contains("color", [color])
  }

  // Conditionally add the gender filter
  if (gender && gender !== "") {
    queryWithFilters = queryWithFilters.eq("gender", gender)
  }

  // Get products from the database
  const { data: products, count, error } = await queryWithFilters

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ products, count }, { status: 200 })
}
