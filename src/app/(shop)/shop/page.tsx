"use client"

import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import AllProducts from "@/components/shop/products/AllProducts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const getProducts = async () => {
  const { data } = await axios.get("/api/shop/products/get-all-products")
  return data
}

export default function ShopPage() {
  const { isLoading, isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <MaxWidthWrapper>
      <AllProducts products={data} />
    </MaxWidthWrapper>
  )
}
