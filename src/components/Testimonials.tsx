"use client"

import { testimonials } from "@/lib/constants"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Autoplay, Pagination } from "swiper/modules"
import { Quote, Star } from "lucide-react"

const Testimonials = () => {
  return (
    <div className="flex flex-col justify-center pt-20">
      <h2 className="text-2xl text-center">What our client say</h2>
      <Swiper
        //   slidesPerView={3}
        spaceBetween={10}
        speed={750}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        //   pagination={{
        //     clickable: true,
        //   }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay]}
        className="py-4 w-full mt-10 md:mt-20"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col items-center bg-secondary justify-center pb-10"
          >
            <div className="flex flex-col justify-between h-full items-center p-4">
              <div className="flex flex-col">
                <Quote className="w-8 h-8 self-center mb-4" />
                <p className="text-center text-sm">{testimonial.text}</p>
              </div>

              <div>
                <p className="text-center font-semibold mt-6">
                  {testimonial.name}
                </p>
                <div className="flex justify-center mt-2">
                  {[...Array(testimonial.stars)].map((_, index) => (
                    <Star key={index} className="w-4 h-4" fill="orange" />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Testimonials
