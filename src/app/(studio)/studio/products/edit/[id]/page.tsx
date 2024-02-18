import EditProductForm from "@/components/studio/forms/EditProductForm"
import { supabase } from "@/lib/supabase/supabase-client"
import { unstable_noStore } from "next/cache"

interface paramsProps {
  searchParams: {
    id: string
  }
}

unstable_noStore()

const StudioEditProductPage = async ({ searchParams }: paramsProps) => {
  const id: string = searchParams.id

  // Get product from supabase
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  // Get collections
  const { data: collections } = await supabase.from("collections").select("*")
  const { data: colors } = await supabase.from("colors").select("*")
  const { data: sizes } = await supabase.from("sizes").select("*")

  return (
    <div>
      {product && collections && colors && sizes && (
        <EditProductForm
          product={product}
          collections={collections}
          colors={colors}
          sizes={sizes}
        />
      )}
    </div>
  )
}

export default StudioEditProductPage
