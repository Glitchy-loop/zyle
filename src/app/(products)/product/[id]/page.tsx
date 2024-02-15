import ProductDetails from "@/components/shop/products/ProductDetails"
import ProductDetailPageSkeleton from "@/components/skeletons/ProductDetailPageSkeleton"
import axios from "axios"
import { Suspense } from "react"

const getProductDetails = async ({ id }: { id: string }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/shop/products/get-product-by-id`,
    {
      params: { id },
    }
  )
  return data
}

interface paramsProps {
  searchParams: {
    id: string
  }
}

const ProductDetailsPage = async ({ searchParams }: paramsProps) => {
  const id = searchParams.id as string
  const data = await getProductDetails({ id: id })

  return (
    <Suspense fallback={<ProductDetailPageSkeleton />}>
      <ProductDetails product={data} />
    </Suspense>
  )
}

export default ProductDetailsPage
