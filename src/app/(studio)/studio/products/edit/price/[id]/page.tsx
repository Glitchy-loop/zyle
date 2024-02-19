import BreadCrumb from "@/components/BreadCrumbs"
import EditProductPriceForm from "@/components/studio/forms/EditProductPriceForm"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/supabase-client"
import { Undo2 } from "lucide-react"
import { unstable_noStore } from "next/cache"
import Link from "next/link"

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

  return (
    <div>
      <BreadCrumb
        root={"Studio"}
        items={[
          {
            title: "Products",
            link: `${process.env.NEXT_PUBLIC_WEB_URL}/studio/products`,
          },
          {
            title: product?.name as string,
            link: `${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/product?id=${product?.id}`,
          },
        ]}
      />
      <div className="flex justify-between mt-8">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-muted-foreground me-2">Edit</span>
          {product?.name}
        </h1>
        <Link
          href={`${process.env.NEXT_PUBLIC_WEB_URL}/studio/products/product?id=${product?.id}`}
        >
          <Button variant="default">
            <Undo2 className="w-4 h-4 me-2" /> Back
          </Button>
        </Link>
      </div>
      {product && <EditProductPriceForm product={product} />}
    </div>
  )
}

export default StudioEditProductPage
