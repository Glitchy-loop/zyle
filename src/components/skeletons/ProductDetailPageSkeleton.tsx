import MaxWidthWrapper from "../layout/MaxWidthWrapper"
import { Skeleton } from "../ui/skeleton"

const ProductDetailPageSkeleton = () => {
  return (
    <MaxWidthWrapper className="px-0, md:px-0">
      <div className="flex flex-col md:flex-row h-full">
        {/* Product details */}
        <div className="w-full md:w-[50%] p-6 md:p-16 flex flex-col justify-between order-2">
          <div>
            {/* Category */}
            <div className="text-muted-foreground pb-4 text-xs">
              <Skeleton className="h-4 w-[50px]" />
            </div>
            {/* Name */}
            <h1 className="text-2xl font-bold uppercase">
              <Skeleton className="h-10 w-[250px] my-4" />
            </h1>
            {/* Price */}
            <div className="py-4 text-sm">
              <Skeleton className="h-4 w-[40px]" />
            </div>
            {/* Description */}
            <div className="text-muted-foreground text-xs">
              <Skeleton className="h-4 w-[250px] my-2" />
              <Skeleton className="h-4 w-[230px] my-2" />
              <Skeleton className="h-4 w-[150px] my-2" />
              <Skeleton className="h-4 w-[100px] my-2" />
            </div>
          </div>
          {/* Add to cart */}
          <Skeleton className="h-20 w-full" />
        </div>
        {/* Product images */}
        <div className="w-full md:w-[50%] self-end">
          <Skeleton className="h-full w-full" />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductDetailPageSkeleton
