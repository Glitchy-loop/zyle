import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Link as LinkIcon, Pencil } from "lucide-react"
import { Product } from "@/types/collection"

const ProductMainDetailsModule = ({ product }: { product: Product }) => {
  return (
    <Card>
      {/* Head */}
      <CardHeader>
        <CardTitle className="flex items-center justify-between mb-4">
          {/* Product name */}
          <div>{product.name}</div>
          <Link
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/shop/product/product?id=${product.id}`}
          >
            <Button>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>
          {/* Collection */}
          <div className="flex mt-2">
            <p className="text-muted-foreground">Collection: </p>
            <span className="ms-2 text-primary-foreground">
              {!product.collection
                ? "No collection"
                : product.collection || "..."}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      {/* Body */}
      <CardContent>
        {/* Description */}
        {product.description || "No description available"}
      </CardContent>
      {/* Footer */}
      <CardFooter className="flex justify-between mt-10">
        {/* Actions */}
        <Link
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/edit/main-details/product?id=${product.id}`}
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

export default ProductMainDetailsModule
