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
    <Link href={`product/product?id=${product.id}`}>
      <Card className="cursor-pointer flex flex-col group hover:border-primary transition-all duration-150 ease-in">
        <CardHeader className="p-0">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0]}
              alt={product.title}
              width={350}
              height={350}
              className="objcet-cover object-center w-full h-96 object-cover"
            />
          )}
        </CardHeader>
        <CardContent className="font-bold text-sm mt-10">
          {product.title}
        </CardContent>
        <CardFooter className="flex text-sm">
          <span>{product.price}</span> <span>{currency.symbol}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard
