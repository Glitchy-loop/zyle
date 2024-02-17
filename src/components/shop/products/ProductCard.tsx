import { Product } from "@/types/collection"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { currency } from "@/lib/constants"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_WEB_URL}/shop/product/product?id=${product.id}`}
    >
      <Card className="cursor-pointer flex flex-col group hover:border-primary transition-all duration-150 ease-in">
        <CardHeader className="p-0">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover object-center w-full h-96"
            />
          )}
        </CardHeader>
        <CardContent className="font-bold text-sm mt-10 truncate">
          {product.name}
        </CardContent>
        <CardFooter className="flex text-sm">
          <span>{product.price}</span> <span>{currency.symbol}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
