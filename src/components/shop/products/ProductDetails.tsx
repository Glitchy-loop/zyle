import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { currency } from "@/lib/constants"
import ProductPageImageSlider from "./ProductPageImageSlider"
import { Product } from "@/types/collection"
import AddToCartButton from "../cart/AddToCartButton"

interface ProductDetailsProps {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <MaxWidthWrapper className="px-0, md:px-0">
      <div className="flex flex-col md:flex-row h-full">
        {/* Product details */}
        <div className="w-full md:w-[50%] bg-foreground text-secondary p-6 md:p-16 flex flex-col justify-between order-2">
          <div>
            {/* Category */}
            <p className="text-muted-foreground pb-4 text-xs">Sneakers</p>
            {/* Title */}
            <h1 className="text-2xl font-bold uppercase">{product.title}</h1>
            {/* Price */}
            <p className="py-4 text-sm">
              <span>{product.price}</span>
              <span>{currency.symbol}</span>
            </p>
            {/* Description */}
            <p className="text-muted-foreground text-xs">
              {product.description}
            </p>
          </div>
          {/* Add to cart */}
          <AddToCartButton
            title={product?.title}
            image={product?.images?.[0] || ""}
            price={product.price}
            description={product.description || ""}
            currency={currency.type}
            price_id={product?.price_id || ""}
          />
        </div>
        {/* Product images */}
        <div className="w-full md:w-[50%]">
          {product.images && <ProductPageImageSlider images={product.images} />}
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductDetails
