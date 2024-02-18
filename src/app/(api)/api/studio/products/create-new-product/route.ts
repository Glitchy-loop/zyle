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
  const imageFiles = data.getAll("images")
  const collection = data.get("collection")
  const stock = data.get("stock")
  const color = data.get("color")
  const sizes = data.get("sizes")
    ? JSON.parse(data.get("sizes") as string)
    : null

  try {
    //  Upload image file to the storage
    const fileArray = Array.from(imageFiles) as File[]
    const imageUrls: string[] = []

    await Promise.all(
      fileArray.map(async (imageFile: File) => {
        // Upload the image file to the storage
        const { data: image, error: imageUploadError } =
          await serviceSupabase.storage
            .from("products")
            .upload(`images/${name}/${imageFile.name}`, imageFile, {
              cacheControl: "3600",
            })

        // Check if image upload was successful
        if (!imageUploadError) {
          // Get public URL of the uploaded image
          const imageUrl = serviceSupabase.storage
            .from("products")
            .getPublicUrl(`images/${name}/${imageFile.name}`)

          // Add the URL to the array
          if (imageUrl) {
            imageUrls.push(imageUrl.data.publicUrl)
          }
        }
      })
    )

    // Add new product to stripe
    const stripeProduct = await stripe.products.create({
      name: name as string,
      images: imageUrls,
      description: description as string,
      default_price_data: {
        currency: "eur",
        unit_amount: parseInt(price as string) * 100,
      },
      metadata: {
        stock: stock as string,
        color: color as string,
        sizes: JSON.stringify(sizes),
        collection: collection as string,
        gender: gender as string,
      },
    })

    // Add product to supabase database
    const { data: product, error: productError } = await serviceSupabase
      .from("products")
      .insert([
        {
          name,
          stripe_product_id: stripeProduct.id,
          description,
          price,
          gender,
          images: imageUrls,
          collection,
          stock,
          color,
          sizes,
          price_id: stripeProduct.default_price,
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
