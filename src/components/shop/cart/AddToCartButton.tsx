"use client"

import { Button } from "@/components/ui/button"
import { ProductCartProps } from "@/types"
import { useShoppingCart } from "use-shopping-cart"

export default function AddToCartButton({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCartProps) {
  const { addItem, handleCartClick } = useShoppingCart()
  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image,
    id: price_id,
  }

  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick()
      }}
    >
      Add To Cart
    </Button>
  )
}
