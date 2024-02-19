import initStripe from "stripe"
import { NextRequest, NextResponse } from "next/server"
import { getServiceSupabase } from "@/lib/supabase/supabase-client"

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.text()
  const signature = req.headers.get("stripe-signature")
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string

  const serviceSupabase = getServiceSupabase()

  let event

  //   Get user from supabase

  try {
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY as string)
    if (signature) {
      event = stripe.webhooks.constructEvent(data, signature, signingSecret)

      switch (event.type) {
        case "payment_intent.canceled":
          const paymentIntentCanceled = event.data.object
          console.log(paymentIntentCanceled)
          // Then define and call a function to handle the event payment_intent.canceled
          break
        case "payment_intent.created":
          const paymentIntentCreated = event.data.object

          // Then define and call a function to handle the event payment_intent.created
          break
        case "payment_intent.payment_failed":
          const paymentIntentPaymentFailed = event.data.object

          // Then define and call a function to handle the event payment_intent.payment_failed
          break
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object
          console.log(paymentIntentSucceeded)

          const { data: order, error: orderError } = await serviceSupabase
            .from("orders")
            .insert([
              {
                stripe_customer: event?.data.object.customer,
                paid_amount: event?.data.object.amount / 100,
                payment_intent: event?.data.object.id,
                payment_method: event?.data.object.payment_method,
                status: event?.data.object.status,
              },
            ])
          // Then define and call a function to handle the event payment_intent.succeeded
          break
      }
    } else if (!signature) {
      // Handle the case where the signature is null
      throw new Error("Missing stripe-signature header")
    } else if (!signingSecret) {
      // Handle the case where the signing secret is null
      throw new Error("Missing STRIPE_SIGNING_SECRET environment variable")
    }

    return NextResponse.json({ received: true, data }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
