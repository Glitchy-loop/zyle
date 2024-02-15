import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <Card className="cursor-pointer flex flex-col group transition-all duration-150 ease-in">
      <CardHeader className="p-0">
        <Skeleton className="objcet-cover object-center w-full h-96 object-cover" />
      </CardHeader>
      <CardContent className="font-bold text-sm mt-10">
        <Skeleton className="h-4 w-[150px] my-2" />
      </CardContent>
      <CardFooter className="flex text-sm">
        <Skeleton className="h-4 w-[50px]" />
      </CardFooter>
    </Card>
  )
}

export default ProductCardSkeleton
