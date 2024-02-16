import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
import { Button } from "@/components/ui/button"
import { currency } from "@/lib/constants"
import ProductPageImageSlider from "./ProductPageImageSlider"
import { Product } from "@/types/collection"
import AddToCartButton from "../cart/AddToCartButton"
import BreadCrumb from "@/components/BreadCrumbs"

interface ProductDetailsProps {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <MaxWidthWrapper className="px-0, md:px-0">
      {/* Breadcrumbs */}
      <BreadCrumb
        items={[
          { title: "Shop", link: "/shop" },
          { title: product.name, link: `/product/${product.id}` },
        ]}
      />
      <div className="flex flex-col md:flex-row h-full">
        {/* Product details */}
        <div className="w-full md:w-[50%] py-10 md:py-0 px-6 md:px-8 lg:px-10  flex flex-col justify-between order-2">
          <div>
            {/* Category */}
            <p className="text-muted-foreground pb-4 text-xs">Sneakers</p>
            {/* Name */}
            <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
            {/* Price */}
            <p className="py-4 text-sm">
              <span>{product.price}</span>
              <span>{currency.symbol}</span>
            </p>
            {/* Description */}
            <p className="text-muted-foreground text-xs mb-10 md:mb-0">
              {product.description}
            </p>
          </div>
          {/* Add to cart */}
          <AddToCartButton
            name={product?.name}
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
