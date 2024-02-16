import { Product } from "@/types/collection"
import { ProductsTable } from "./data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

const StudioListAllProducts = async ({
  products,
  count,
}: {
  products: Product[]
  count: number
}) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Studio Products Page</h1>
        <Link href="/studio/products/new">
          <Button>
            <Plus className="me-2 w-4 h-4" />
            <span>New Product</span>
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground mt-2 mb-10">
        Manage products. Add, remove, edit.
      </p>

      <ProductsTable columns={columns} data={products} />
    </div>
  )
}

export default StudioListAllProducts
