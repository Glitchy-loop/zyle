import React from "react"
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasket } from "lucide-react"

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="p-0 m-0">
          <ShoppingBasket className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="bg-foreground h-20 flex items-center justify-center mt-4">
          <SheetTitle className="text-secondary uppercase">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow">
          <div className="text-center">Your cart is empty</div>
        </div>
        <SheetFooter>
          <div className="flex justify-center w-full">
            <Button variant="default" className="w-full h-20">
              Checkout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Cart
