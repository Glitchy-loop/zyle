import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Pencil } from "lucide-react"
import { currency } from "@/lib/constants"
import { Product } from "@/types/collection"

const ProductPriceModule = ({ product }: { product: Product }) => {
  return (
    <Card className="mt-8">
      {/* Head */}
      <CardHeader>
        <CardTitle className="mb-4">Product price</CardTitle>
        <CardDescription>Edit product price</CardDescription>
      </CardHeader>
      {/* Body */}
      <CardContent>
        <div className="flex flex-col">
          {/* Price */}
          <div className="flex justify-between mt-2">
            <p className="text-muted-foreground">Price: </p>
            <span>
              {product.price || "..."}
              {currency.symbol}
            </span>
          </div>
        </div>
      </CardContent>
      {/* Footer */}
      <CardFooter>
        {/* Actions */}
        <Link
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/edit/price/product?id=${product.id}`}
        >
          <Button variant="default">
            <Pencil className="w-4 h-4 me-2" />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ProductPriceModule
