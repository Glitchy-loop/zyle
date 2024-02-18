import { Product } from "@/types/collection"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { currency } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const StudioSingleProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Details */}
      <div className="col-span-3">
        <Card>
          {/* Head */}
          <CardHeader>
            <CardTitle className="mb-4">{product.name}</CardTitle>
            <CardDescription>
              {product.description || "No description available"}
            </CardDescription>
          </CardHeader>
          {/* Body */}
          <CardContent className="mt-8">
            {/* Details */}
            <h3 className="mb-4">Details:</h3>
            <div className="flex flex-col">
              <div className="flex justify-between">
                {/* Price */}
                <p>Price: </p>
                <span>
                  {product.price}
                  {currency.symbol}
                </span>
              </div>
              {/* Stock */}
              <div className="flex justify-between mt-2">
                <p>Stock: </p>
                <span>{product.stock || "..."}</span>
              </div>
              {/* Collection */}
              <div className="flex justify-between mt-2">
                <p>Collection: </p>
                <span>{product.collection || "..."}</span>
              </div>
              {/* Gender */}
              <div className="flex justify-between mt-2">
                <p>Gender: </p>
                <span>{product.gender || "..."}</span>
              </div>
              {/* Color */}
              <div className="flex justify-between mt-2">
                <p>Color: </p>
                <span>{product.color || "..."}</span>
              </div>
              {/* Sizes */}
              <div className="flex justify-between mt-2">
                <p>Sizes: </p>
                <span>{product.sizes || "..."}</span>
              </div>
            </div>
          </CardContent>
          {/* Footer */}
          <CardFooter className="flex justify-between mt-10">
            {/* Actions */}
            <Link
              href={`${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/edit/product?id=${product.id}`}
            >
              <Button variant="default">Edit</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Media */}
      <div className="col-span-1">
        <Card>
          {/* Head */}
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Media</CardTitle>
            <Button>Edit</Button>
          </CardHeader>
          {/* body */}
          <CardContent>
            {product.images.map((image, index) => {
              return (
                <div key={index} className="mb-4">
                  <Image src={image} alt={image} width={400} height={400} />
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default StudioSingleProductDetails
