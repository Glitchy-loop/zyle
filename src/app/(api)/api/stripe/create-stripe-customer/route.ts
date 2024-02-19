import { getServiceSupabase } from "@/lib/supabase/supabase-client"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: NextRequest) {
  if (
    req.headers.get("API_ROUTE_SECRET") !== process.env.API_ROUTE_SECRET ||
    !req.headers.get("API_ROUTE_SECRET")
  ) {
    return NextResponse.json(
      { error: "You are not authorized to call this API" },
      { status: 401 }
    )
  }

  const supabase = getServiceSupabase()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
  const { record } = await req.json()

  const customer = await stripe.customers.create({
    email: record.email,
  })

  await supabase
    .from("users")
    .update({ stripe_customer: customer.id })
    .eq("id", record.id)

  return NextResponse.json(customer.id, { status: 200 })
}
