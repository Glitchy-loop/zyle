"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Image from "next/image"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "../ui/button"
import { currency } from "@/lib/constants"

export default function ShoppingCartSidebar() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart()

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
    <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetClose />
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-secondary">
              {cartCount! === 0 && (
                <h1 className="py-6">
                  You don&apos;t have any products in the cart
                </h1>
              )}

              {cartCount! > 0 && (
                <>
                  <h1 className="py-6">
                    You have {cartCount} products in the cart
                  </h1>
                  <div>
                    {Object.values(cartDetails ?? {}).map((product) => (
                      <li
                        key={product.id}
                        className="py-6 flex items-center hover:bg-primary-foreground transition-colors duration-200 ease-in-out"
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
                </>
              )}
            </ul>
          </div>

          <div className="border-t px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium">
              <p>SubTotal:</p>
              <p>{totalPrice?.toFixed(2)} EUR</p>
            </div>
            <p className="text-muted-foreground">
              Shipping and taxes will be calculated at the checkout page.
            </p>

            <div className="mt-6">
              <Button
                variant="default"
                className="w-full"
                onClick={handleCheckoutClick}
              >
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center flex-col text-center text-sm text-muted-foreground">
              <Button variant="link" onClick={() => handleCartClick()}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
