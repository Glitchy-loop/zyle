"use client"

import React, { useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/zoom"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import required modules
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules"
import Image from "next/image"

interface ProductPageImageSliderProps {
  images: string[]
  className?: string
}

const ProductPageImageSlider = ({ images }: ProductPageImageSliderProps) => {
  {
    images
  }

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        navigation={true}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Zoom, FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image: any, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-zoom-container">
              <Image
                src={image}
                alt="Product Image"
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper as any}
        spaceBetween={4}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="absolute bottom-0 left-0 transform -translate-y-1/2 w-full md:unset md:transform-none"
      >
        {images.map((image: any, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Product Image"
              width={100}
              height={100}
              className="h-full w-full md:mt-[4px] object-cover object-center border-2 border-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductPageImageSlider
