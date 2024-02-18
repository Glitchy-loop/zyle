import { getServiceSupabase } from "@/lib/supabase/supabase-client"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import initStripe from "stripe"

export async function DELETE(request: NextRequest) {
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

  const id = request.nextUrl.searchParams.get("id")

  try {
    // Get product stripe id
    const { data: productStripeId, error: productStripeIdError } =
      await serviceSupabase
        .from("products")
        .select("stripe_product_id")
        .eq("id", id)
        .single()

    // Delete product from supabase database
    const { data: product, error: productError } = await serviceSupabase
      .from("products")
      .delete()
      .eq("id", id)

    // Archive product in stripe
    const archived = await stripe.products.update(
      productStripeId?.stripe_product_id,
      {
        active: false,
      }
    )
  } catch (error) {
    console.error(error)
  }

  // Revalidate paths
  revalidatePath(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/shop`)
  revalidatePath(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products`)
  revalidatePath(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products/product?id=${id}`
  )
  revalidatePath(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/studio/products/edit/product?id=${id}`
  )

  return NextResponse.json("Product deleted successfully", { status: 200 })
}
