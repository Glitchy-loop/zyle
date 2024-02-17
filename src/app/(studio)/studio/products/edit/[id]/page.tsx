import EditProductForm from "@/components/studio/forms/EditProductForm"
import { supabase } from "@/lib/supabase/supabase-client"

interface paramsProps {
  searchParams: {
    id: string
  }
}

const StudioEditProductPage = async ({ searchParams }: paramsProps) => {
  const id: string = searchParams.id
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  return <div>{product && <EditProductForm product={product} />}</div>
}

export default StudioEditProductPage
