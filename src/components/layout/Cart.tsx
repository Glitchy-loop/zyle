"use client"

import { ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "../ui/button"

export default function CartButton() {
  const { handleCartClick, cartCount } = useShoppingCart()
  return (
    <div className="flex-1 flex justify-end" onClick={handleCartClick}>
      <div className="flex divide-x">
        <Button
          variant="ghost"
          className="gap-y-1.5 flex flex-col hover:bg-transparent p-0 m-0 relative"
        >
          <div className="-top-2 absolute left-3">
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-primary/40 border border-primary p-3 text-xs">
              {cartCount}
            </p>
          </div>
          <ShoppingBag size={20} />
          {/* <span className="hidden text-xs font-semibold sm:block">Cart</span> */}
        </Button>
      </div>
    </div>
  )
}
