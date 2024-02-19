import { Product } from "@/types/collection"
import DeleteProductModule from "../modules/DeleteProductModule"
import ProductMainDetailsModule from "../modules/ProductMainDetailsModule"
import ProductPriceModule from "../modules/ProductPriceModule"
import ProductMediaModule from "../modules/ProductMediaModule"
import ProductRawPreviewModule from "../modules/ProductRawPreviewModule"
import ProductMetaDataModule from "../modules/ProductMetaDataModule"

const StudioSingleProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-3">
        {/* Main product details */}
        <ProductMainDetailsModule product={product} />

        {/* Product meta data */}
        <ProductMetaDataModule product={product} />

        {/* Product price */}
        <ProductPriceModule product={product} />
        {/* Product raw data json */}
        <ProductRawPreviewModule product={product} />
      </div>

      {/* Media */}
      <div className="col-span-4 lg:col-span-1">
        <ProductMediaModule product={product} />
      </div>

      {/* Delete product module */}
      <DeleteProductModule product={product} />
    </div>
  )
}

export default StudioSingleProductDetails
