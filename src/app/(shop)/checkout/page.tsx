"use client"

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { currency } from "@/lib/constants"
import Image from "next/image"
import { useShoppingCart } from "use-shopping-cart"

const CheckoutPage = () => {
  const { cartCount, cartDetails, removeItem, totalPrice, redirectToCheckout } =
    useShoppingCart()

  const handleCheckoutClick = async (e: any) => {
    e.preventDefault()
    try {
      const result = await redirectToCheckout()
      if (result?.error) {
        console.error("Redirect to checkout failed:", result.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MaxWidthWrapper>
      <h1 className="text-2xl my-10">Checkout</h1>
      <h1 className="py-6">You have {cartCount} products in the cart</h1>
      <div>
        {Object.values(cartDetails ?? {}).map((product) => (
          <li
            key={product.id}
            className="py-6 flex items-center hover:bg-secondary transition-colors duration-200 ease-in-out"
          >
            <Image
              src={product.image as string}
              alt={product.name || "Product Image"}
              className="w-20 h-20 object-cover"
              width={80}
              height={80}
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm py-1">
                {product.price} <span>{currency.symbol}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                QTY: <span>{product.quantity}</span>
              </p>
            </div>
            <div className="flex p-2 items-end justify-end">
              <Button
                variant="link"
                onClick={() => {
                  removeItem(product.id)
                }}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </div>

      <div className="border-t px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium">
          <p>SubTotal:</p>
          <p>
            {totalPrice?.toFixed(2)}
            {currency.symbol}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="default" onClick={handleCheckoutClick}>
            Checkout
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default CheckoutPage
