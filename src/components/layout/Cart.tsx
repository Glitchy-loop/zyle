"use client"

import { ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { Button } from "../ui/button"

export default function CartButton() {
  const { handleCartClick } = useShoppingCart()
  return (
    <div className="flex-1 flex justify-end" onClick={handleCartClick}>
      <div className="flex divide-x">
        <Button
          variant="ghost"
          className="gap-y-1.5 flex flex-col hover:bg-transparent p-0 m-0"
        >
          <ShoppingBag size={20} />
          {/* <span className="hidden text-xs font-semibold sm:block">Cart</span> */}
        </Button>
      </div>
    </div>
  )
}
