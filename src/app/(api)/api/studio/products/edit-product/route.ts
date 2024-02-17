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
  const name = data.get("name")
  const description = data.get("description")
  const price = data.get("price")
  const gender = data.get("gender")
  const collection = data.get("collection")
  const stock = data.get("stock")
  const color = data.get("color")
  const sizes = data.get("sizes")
    ? JSON.parse(data.get("sizes") as string)
    : null

  try {
    // Add new product to stripe
    // const stripeProduct = await stripe.products.update(
    //   'prod_NWjs8kKbJWmuuc',
    //   {
    //     metadata: {
    //       order_id: '6735',
    //     },
    //   }
    // );

    // Update product in supabase database
    const { data: product, error: productError } = await serviceSupabase
      .from("products")
      .update({
        name,
        description,
        price,
        gender,
        collection,
        stock,
        color,
        sizes,
      })
      .eq("id", id)
      .select()

    revalidatePath(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/studio/products/product?id=${id}`
    )

    if (productError) {
      return NextResponse.json(productError, { status: 500 })
    }
  } catch (error) {
    NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json("Hello from route", { status: 200 })
}
