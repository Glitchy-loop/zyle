import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Product } from "@/types/collection"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

const ProductMediaModule = ({ product }: { product: Product }) => {
  return (
    <Card>
      {/* Head */}
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Media</CardTitle>
        <Button>
          <Pencil className="w-4 h-4 me-2" />
          Edit
        </Button>
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
  )
}

export default ProductMediaModule
