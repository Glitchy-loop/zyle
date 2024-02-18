import StudioSingleProductDetails from "@/components/studio/products/StudioSingleProductDetails"
import { supabase } from "@/lib/supabase/supabase-client"
import { Product } from "@/types/collection"
import { revalidateTag, unstable_noStore } from "next/cache"

interface paramsProps {
  searchParams: {
    id: string
  }
}

const StudioSingleProductPage = async ({ searchParams }: paramsProps) => {
  const id: string = searchParams.id

  // Get product
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  unstable_noStore() // NOTE: NO CACHE FOR THIS PAGE

  return (
    <div>
      <StudioSingleProductDetails product={product as Product} />
    </div>
  )
}

export default StudioSingleProductPage
