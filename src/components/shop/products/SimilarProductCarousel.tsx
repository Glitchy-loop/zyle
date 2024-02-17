"use client"

import { Product } from "@/types/collection"
import React from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Pagination, Autoplay } from "swiper/modules"
import ProductCard from "./ProductCard"

interface SimilarProductCarouselProps {
  similarProducts: Product[]
}

const SimilarProductCarousel = ({
  similarProducts,
}: SimilarProductCarouselProps) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      //   pagination={{
      //     clickable: true,
      //   }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        1280: {
          slidesPerView: similarProducts.length > 3 ? 4 : 3,
          spaceBetween: 10,
        },
      }}
      modules={[Autoplay]}
      className="w-full"
    >
      {similarProducts.map((product) => (
        <SwiperSlide key={product.id} className="h-20">
          <ProductCard key={product.id} product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SimilarProductCarousel
