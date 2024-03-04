"use client"

import type { StripeError } from "@stripe/stripe-js"

import * as React from "react"
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js"
import { createPaymentIntent } from "./Actions"
import { currency } from "@/lib/constants"
import { formatAmountForDisplay } from "@/lib/stripe-helpers"
import getStripe from "@/lib/get-stripejs"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function CheckoutForm(): JSX.Element {
  const [input, setInput] = React.useState<{
    customDonation: number
    cardholderName: string
  }>({
    customDonation: 20.0,
    cardholderName: "",
  })
  const [paymentType, setPaymentType] = React.useState<string>("")
  const [payment, setPayment] = React.useState<{
    status: "initial" | "processing" | "error"
  }>({ status: "initial" })
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const stripe = useStripe()
  const elements = useElements()

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>

      case "requires_action":
        return <h2>Authenticating...</h2>

      case "succeeded":
        return <h2>Payment Succeeded 🥳</h2>

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        )

      default:
        return null
    }
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

    elements?.update({ amount: input.customDonation * 100 })
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      // Abort if form isn't valid
      if (!e.currentTarget.reportValidity()) return
      if (!elements || !stripe) return

      setPayment({ status: "processing" })

      const { error: submitError } = await elements.submit()

      if (submitError) {
        setPayment({ status: "error" })
        setErrorMessage(submitError.message ?? "An unknown error occurred")

        return
      }

      // Create a PaymentIntent with the specified amount.
      const { client_secret: clientSecret } = await createPaymentIntent(
        new FormData(e.target as HTMLFormElement)
      )

      // Use your card Element with other Stripe.js APIs
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
          payment_method_data: {
            billing_details: {
              name: input.cardholderName,
            },
          },
        },
      })

      if (confirmError) {
        setPayment({ status: "error" })
        setErrorMessage(confirmError.message ?? "An unknown error occurred")
      }
    } catch (err) {
      const { message } = err as StripeError

      setPayment({ status: "error" })
      setErrorMessage(message ?? "An unknown error occurred")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="elements-style">
          <legend>Your payment details:</legend>
          {paymentType === "card" ? (
            <Input
              placeholder="Cardholder name"
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              required
            />
          ) : null}
          <div className="FormRow elements-style">
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type)
              }}
            />
          </div>
        </fieldset>
        <Button
          className=""
          type="submit"
          disabled={
            !["initial", "succeeded", "error"].includes(payment.status) ||
            !stripe
          }
        >
          Pay {formatAmountForDisplay(input.customDonation, currency.type)}
        </Button>
      </form>
      <PaymentStatus status={payment.status} />
    </>
  )
}

export default function ElementsForm(): JSX.Element {
  const { theme } = useTheme()

  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          theme: theme === "dark" ? "night" : "stripe",
          variables: {
            colorIcon: "#e567d4",
            fontFamily: "'Chakra Petch', sans-serif",
          },
        },
        currency: currency.type,
        mode: "payment",
        amount: Math.round(5000.0 / 5.0),
      }}
    >
      <CheckoutForm />
    </Elements>
  )
}
