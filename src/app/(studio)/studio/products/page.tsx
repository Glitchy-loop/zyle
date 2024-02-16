import StudioListAllProducts from "@/components/studio/products/StudioListAllProducts/StudioListAllProducts"
import { supabase } from "@/lib/supabase/supabase-client"
import { Product } from "@/types/collection"
import axios from "axios"

const getProducts = async () => {
  try {
    const {
      data: products,
      count,
      error,
    } = await supabase.from("products").select("*", { count: "exact" })
    return { products, count }
  } catch (error) {
    console.error("Error fetching products:", error)
  }
}

const StudioProductsPage = async () => {
  const { products, count } = (await getProducts()) as {
    products: Product[] | null
    count: number | null
  }

  return (
    <div>
      {/* List products */}
      <StudioListAllProducts products={products || []} count={count || 0} />
    </div>
  )
}

export default StudioProductsPage
