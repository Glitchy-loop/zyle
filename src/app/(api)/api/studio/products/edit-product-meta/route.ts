import { getServiceSupabase } from "@/lib/supabase/supabase-client"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import initStripe from "stripe"

export async function POST(request: NextRequest) {
  const stripe = new initStripe(`${process.env.STRIPE_SECRET_KEY}`)
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  })
  // Service supabase
  const serviceSupabase = getServiceSupabase()

  //   Check if user is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: role } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single()

  if (role?.role !== "admin") {
    return NextResponse.json("You are not authorized to perform this action", {
      status: 401,
    })
  }

  const data = await request.formData()

  const id = data.get("id")
  const stripe_product_id = data.get("stripe_product_id")
  const gender = data.get("gender")
  const stock = data.get("stock")
  const color = data.get("color")
  const sizes = data.get("sizes")
    ? JSON.parse(data.get("sizes") as string)
    : null

  try {
    // Update product in supabase database
    const { error: productError } = await serviceSupabase
      .from("products")
      .update({
        gender,
        stock,
        color,
        sizes,
      })
      .eq("id", id)
      .select()
      .single()

    if (productError) {
      return NextResponse.json(productError, { status: 500 })
    }

    // Edit product on stripe
    await stripe.products
      .update(stripe_product_id as string, {
        metadata: {
          stock: stock as string,
          color: color as string,
          sizes: JSON.stringify(sizes),
          gender: gender as string,
        },
      })
      .catch((error) => {
        console.error(error)
      })

    // Revalidate paths
    revalidatePath(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products`)
    revalidatePath(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products/product?id=${id}`
    )
    revalidatePath(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products/edit/product?id=${id}`
    )
  } catch (error) {
    NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json("Hello from route", { status: 200 })
}
