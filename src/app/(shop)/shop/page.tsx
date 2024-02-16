import Paginator from "@/components/Paginator"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import ShopFilter from "@/components/shop/filters/ShopFilter"
import AllProducts from "@/components/shop/products/AllProducts"
import AllProductsSkeleton from "@/components/skeletons/AllProductsSkeleton"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { Suspense } from "react"

interface ShopPageProps {
  limit: number
  page: number
  offset: number
  color: string
  gender: string
}

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const getProducts = async ({
  limit,
  page,
  offset,
  color,
  gender,
}: ShopPageProps) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/shop/products/get-all-products`,
      {
        params: {
          limit,
          page,
          offset,
          color,
          gender,
        },
      }
    )

    if (!response.data) {
      throw new Error("No data found in the response")
    }

    const { products, count } = response.data
    return { products, count }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { products: null, count: 0 }
  }
}

export default async function ShopPage({ searchParams }: paramsProps) {
  const page: number = parseInt(searchParams.page as string) || 1
  const limit: number = parseInt(searchParams.limit as string) || 6
  const offset: number = (page - 1) * limit
  const color: string = searchParams.color?.toString() || ""
  const gender: string = searchParams.gender?.toString() || ""

  const { products, count } = await getProducts({
    limit,
    page,
    offset,
    color,
    gender,
  })
  const totalPages = Math.ceil(count / limit)

  return (
    <MaxWidthWrapper>
      <Suspense fallback={<AllProductsSkeleton repeatCount={6} />}>
        <ShopFilter />
        <AllProducts products={products} />
      </Suspense>
      <Paginator totalPages={totalPages} />
    </MaxWidthWrapper>
  )
}
