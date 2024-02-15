import { getServiceSupabase } from "@/lib/supabase/supabase-client"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
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
  const name = data.get("name")
  const description = data.get("description")
  const price = data.get("price")
  const gender = data.get("gender")
  const imageFile = data.get("images")
  const fileName = (imageFile as File)?.name
  const collection = data.get("collection")
  const stock = data.get("stock")
  const color = data.get("color")
  const sizes = data.get("sizes")

  try {
    //  Upload image file to the storage
    if ((imageFile as File).size > 1000000) {
      return NextResponse.json(
        { error: "Image is too large." },
        { status: 400 }
      )
    }

    const { data: image, error: imageUploadError } =
      await serviceSupabase.storage
        .from("products")
        .upload(`products/${name}/${fileName}`, imageFile as File)

    // Get image URL
    const imageUrl = supabase.storage
      .from("products")
      .getPublicUrl(`products/${name}/${fileName}`)

    if (imageUrl) {
      NextResponse.json({ message: "Image uploaded" }, { status: 200 })
    }

    //   Add new product to stripe
    const productStripe = await stripe.products.create({
      name: name as string,
      images: [imageUrl.data.publicUrl],
      description: description as string,
      default_price_data: {
        currency: "EUR",
        unit_amount: parseInt(price as string) * 100,
      },
      metadata: {
        stock: stock as string,
        color: color as string,
        sizes: sizes as string,
      },
    })

    // Add product to supabase database

    const { data: product, error: productError } = await serviceSupabase
      .from("products")
      .insert([
        {
          name,
          description,
          price,
          gender,
          images: [imageUrl.data.publicUrl],
          collection,
          stock,
          color: [color],
          sizes: [sizes],
          price_id: productStripe.default_price,
        },
      ])

    if (productError) {
      return NextResponse.json(productError, { status: 500 })
    }
  } catch (error) {
    NextResponse.json(error, { status: 500 })
  }

  return NextResponse.json("Hello from route", { status: 200 })
}
