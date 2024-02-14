import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import required modules
import {
  FreeMode,
  Navigation,
  //  Mousewheel
} from "swiper/modules"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductPageImageSliderProps {
  images: string[]
  className?: string
}

const ProductPageImageSlider = ({
  images,
  className,
}: ProductPageImageSliderProps) => {
  {
    images
  }

  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },

        1024: {
          slidesPerView: 1.25,
        },
      }}
      spaceBetween={0}
      freeMode={true}
      // mousewheel={true}
      pagination={{
        clickable: true,
      }}
      modules={[
        FreeMode,
        Navigation,
        //  Mousewheel
      ]}
      className={cn("w-full h-[calc(70vh)]", className)}
      navigation={{
        nextEl: ".button-next-image",
        prevEl: ".button-prev-image",
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="border">
          <Image
            src={image}
            alt="Product image"
            fill
            className="w-full object-cover"
          />
        </SwiperSlide>
      ))}
      {/* Navigation buttons */}
      <div className="absolute bottom-10 right-10 z-10">
        <Button className="rounded-full button-prev-image p-2">
          <ArrowLeft />
        </Button>
        <Button className="rounded-full p-2 button-next-image ms-2 ">
          <ArrowRight />
        </Button>
      </div>
    </Swiper>
  )
}

export default ProductPageImageSlider
