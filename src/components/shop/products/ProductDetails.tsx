import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper"
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
    <MaxWidthWrapper className="px-0, md:px-20">
      {/* Breadcrumbs */}
      <div className="ms-0 md:ms-4 xl:ms-0">
        <BreadCrumb
          root={"Shop"}
          items={[{ title: product.name, link: `/product/${product.id}` }]}
        />
      </div>
      <div className="flex flex-col md:flex-row h-full">
        {/* Product details */}
        <div className="w-full md:w-[50%] py-10 md:py-0 px-6 md:px-8 lg:px-10  flex flex-col justify-between order-2">
          <div>
            {/* Gender */}
            <p className="text-muted-foreground pb-4 text-xs">
              {product.gender}
            </p>
            {/* Name */}
            <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
            {/* Collection */}
            {product.collection && (
              <p className="py-4 italic">{product.collection}</p>
            )}
            {/* Color */}
            <p className="py-1 text-sm">
              <span className="text-muted-foreground">Color: </span>
              {product.color}
            </p>
            {/* Sizes */}
            <p className="py-1 text-sm">
              <span className="text-muted-foreground">Sizes: </span>
              {product.sizes && product.sizes.join(", ")}
            </p>

            {/* Stock */}
            <p className="py-1 text-sm">
              <span className="text-muted-foreground">Stock: </span>
              {product.stock}
            </p>

            {/* Price */}
            <p className="py-4  text-3xl font-bold">
              <span>{product.price}</span>
              <span>{currency.symbol}</span>
            </p>
            {/* Description */}
            <p className="text-muted-foreground text-xs mb-10 md:mb-16">
              {product.description}
            </p>
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
