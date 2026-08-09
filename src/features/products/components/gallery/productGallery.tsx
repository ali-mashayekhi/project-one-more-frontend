"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "./swiperPaginationStyles.css";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <section>
      {" "}
      <Swiper
        modules={[Pagination, Keyboard, A11y]}
        pagination={{ clickable: true }}
        keyboard
        spaceBetween={0}
        slidesPerView={1}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <div className="relative aspect-[0.75] w-full">
              <Image src={image} alt="" fill className="object-cover" />
            </div>
          </SwiperSlide>
        ))}
        <div className="product-gallery-pagination mt-8 flex justify-center" />
      </Swiper>
    </section>
  );
}
