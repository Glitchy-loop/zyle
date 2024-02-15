"use client"

import { CartProvider as USCProvider } from "use-shopping-cart"

export default function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
      successUrl={`${process.env.NEXT_PUBLIC_WEB_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_WEB_URL}/cancel`}
      currency="EUR"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  )
}
