import React from "react"
import ProductCardSkeleton from "./ProductCardSkeleton"

const AllProductsSkeleton = ({ repeatCount }: { repeatCount: number }) => {
  // Create an array with the specified length and fill it with null values
  const skeletons = Array.from({ length: repeatCount }, (_, index) => (
    <ProductCardSkeleton key={index} />
  ))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 box-border">
      {skeletons}
    </div>
  )
}

export default AllProductsSkeleton
