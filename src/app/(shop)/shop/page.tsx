import Paginator from "@/components/Paginator"
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import AllProducts from "@/components/shop/products/AllProducts"
import AllProductsSkeleton from "@/components/skeletons/AllProductsSkeleton"
import axios from "axios"
import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface ShopPageProps {
  limit: number
  page: number
  offset: number
}

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const getProducts = async ({ limit, page, offset }: ShopPageProps) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/shop/products/get-all-products`,
    {
      params: {
        limit,
        page,
        offset,
      },
    }
  )
  const { products, count } = data
  return { products, count }
}

export default async function ShopPage({ searchParams }: paramsProps) {
  const page: number = parseInt(searchParams.page as string) || 1
  const limit: number = parseInt(searchParams.limit as string) || 6
  const offset: number = (page - 1) * limit
  // const search: string | null = searchParams.search?.toString() || null

  const { products, count } = await getProducts({ limit, page, offset })
  const totalPages = Math.ceil(count / limit)

  return (
    <MaxWidthWrapper>
      <Suspense fallback={<AllProductsSkeleton repeatCount={6} />}>
        <AllProducts products={products} />
      </Suspense>
      <Paginator totalPages={totalPages} />
    </MaxWidthWrapper>
  )
}
