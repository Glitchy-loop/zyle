"use client"

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import ProductPageImageSlider from "@/components/shop/products/ProductPageImageSlider"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { unstable_noStore } from "next/cache"
import Image from "next/image"

const getProductDetails = async ({ id }: { id: string }) => {
  const { data } = await axios.get("/api/shop/products/get-product-by-id", {
    params: { id },
  })
  return data
}

interface paramsProps {
  searchParams: {
    id: string
  }
}

const ProductDetailsPage = ({ searchParams }: paramsProps) => {
  const id = searchParams.id as string

  const { isLoading, isPending, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductDetails({ id }),
    staleTime: 0,
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <MaxWidthWrapper className="px-0, md:px-0">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Product details */}
        <div className="w-full lg:w-1/3 bg-foreground text-secondary p-16 flex flex-col justify-between order-2">
          <div>
            {/* Category */}
            <p className="text-muted-foreground pb-4 text-xs">Sneakers</p>
            {/* Title */}
            <h1 className="text-2xl font-bold uppercase">{data.title}</h1>
            {/* Price */}
            <p className="py-4">{data.price}</p>
            {/* Description */}
            <p className="text-muted-foreground text-xs">{data.description}</p>
          </div>
          {/* Add to cart */}
          <Button
            variant={"default"}
            className="w-full uppercase text-xs mt-8 py-8"
          >
            Add to cart
          </Button>
        </div>
        {/* Product images */}

        <ProductPageImageSlider
          className="order-1 lg:order-2"
          images={data.images}
        />
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductDetailsPage
