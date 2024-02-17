import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { supabase } from "@/lib/supabase/supabase-client"
import { Product } from "@/types/collection"
import SimilarProductCarousel from "./SimilarProductCarousel"
import { Suspense } from "react"
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"

interface ProductProps {
  product: Product
}

const SimilarProducts = async ({ product }: ProductProps) => {
  const { data: similarProducts, error } = await supabase
    .from("products")
    .select("*")
    .eq("gender", product.gender || "")
    .eq("color", product.color)
    .gte("price", product.price - 50)
    .lte("price", product.price + 50)
    .neq("id", product.id) // Exclude the current product
    .limit(4) // Limit to 4 similar products

  if (error) {
    console.error("Error fetching similar products:", error)
    return <div>Error fetching similar products</div>
  }

  return (
    <MaxWidthWrapper className="mt-20 py-10">
      <h3 className="text-2xl mb-4">Similar products</h3>
      <Suspense
        fallback={
          <div className="flex">
            <ProductCardSkeleton />
          </div>
        }
      >
        <SimilarProductCarousel similarProducts={similarProducts} />
      </Suspense>
    </MaxWidthWrapper>
  )
}

export default SimilarProducts
