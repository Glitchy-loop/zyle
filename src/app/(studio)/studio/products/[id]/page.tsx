import StudioSingleProductDetails from "@/components/studio/products/StudioSingleProductDetails"
import { supabase } from "@/lib/supabase/supabase-client"
import { Product } from "@/types/collection"

interface paramsProps {
  searchParams: {
    id: string
  }
}

const StudioSingleProductPage = async ({ searchParams }: paramsProps) => {
  const id: string = searchParams.id

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  return (
    <div>
      <StudioSingleProductDetails product={product as Product} />
    </div>
  )
}

export default StudioSingleProductPage
