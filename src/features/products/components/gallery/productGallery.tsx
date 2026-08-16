"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { StyleImage } from "../../types/product-detail";
import "./swiperPaginationStyles.css";

interface ProductGalleryProps {
  images: StyleImage[];
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
        {images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <div className="relative aspect-[0.75] w-full">
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </SwiperSlide>
          );
        })}
        <div className="product-gallery-pagination mt-8 flex justify-center" />
      </Swiper>
    </section>
  );
}
