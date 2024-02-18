import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Product } from "@/types/collection"
import { Pencil } from "lucide-react"
import Link from "next/link"

const ProductMetaDataModule = ({ product }: { product: Product }) => {
  return (
    <Card className="mt-8">
      {/* Head */}
      <CardHeader>
        <CardTitle className="mb-4">Product meta data</CardTitle>
        <CardDescription>Edit product meta data</CardDescription>
      </CardHeader>
      {/* Body */}
      <CardContent>
        {/* Details */}
        <h3 className="mb-4">Details:</h3>
        <div className="flex flex-col">
          {/* Stock */}
          <div className="flex justify-between mt-2">
            <p className="text-muted-foreground">Stock: </p>
            <span>{product.stock || "..."}</span>
          </div>

          {/* Gender */}
          <div className="flex justify-between mt-2">
            <p className="text-muted-foreground">Gender: </p>
            <span>{product.gender || "..."}</span>
          </div>
          {/* Color */}
          <div className="flex justify-between mt-2">
            <p className="text-muted-foreground">Color: </p>

            <div className="flex items-center">
              <span
                className={cn(
                  "h-4 w-4 rounded-full border-white border me-2",
                  product.color ? `bg-${product.color}-400` : "bg-gray-300",
                  product.color === "white"
                    ? "bg-white"
                    : product.color === "black"
                    ? "bg-black"
                    : product.color === "grey"
                    ? "bg-gray-400"
                    : product.color === "red"
                    ? "bg-red-400"
                    : product.color === "yellow"
                    ? "bg-yellow-400"
                    : product.color === "green"
                    ? "bg-green-400"
                    : product.color === "blue"
                    ? "bg-blue-400"
                    : product.color === "purple"
                    ? "bg-purple-400"
                    : product.color === "pink"
                    ? "bg-pink-400"
                    : product.color === "orange"
                    ? "bg-orange-400"
                    : product.color === "multi"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    : "bg-gray-300"
                )}
              />
              <span className="capitalize">{product.color || "..."}</span>
            </div>
          </div>
          {/* Sizes */}
          <div className="flex justify-between mt-2">
            <p className="text-muted-foreground">Sizes: </p>
            <span>{product.sizes?.join(",") || "..."}</span>
          </div>
        </div>
      </CardContent>
      {/* Footer */}
      <CardFooter>
        {/* Actions */}
        <Link
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/edit/meta/product?id=${product.id}`}
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

export default ProductMetaDataModule
