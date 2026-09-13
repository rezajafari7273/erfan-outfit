// components/promotion/BannerSlider/BannerSlider.jsx
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { BannerSlide } from "./BannerSlide";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BannerSlider({ slides = [], isLoading = false }) {
  const [paginationEl, setPaginationEl] = useState(null);

  if (isLoading) {
    return (
      <div className="relative w-full my-6 overflow-hidden">
        <div className="flex gap-3 justify-center items-center lg:hidden px-4">
          <div className="w-[88%] h-48 sm:h-64 rounded-xl bg-gray-200/70 dark:bg-gray-800/60 animate-pulse shrink-0" />
          <div className="w-[12%] h-48 sm:h-64 rounded-l-xl bg-gray-200/40 dark:bg-gray-800/30 animate-pulse shrink-0" />
        </div>
        <div className="hidden lg:block relative w-full h-[360px] xl:h-[420px] rounded-xl bg-gray-200/80 dark:bg-gray-800/60 animate-pulse overflow-hidden" />
      </div>
    );
  }

  if (!slides || slides.length === 0) return null;

  const isLoopable = slides.length > 1;

  return (
    <div className="relative w-full my-6 group overflow-hidden lg:overflow-visible">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={isLoopable}
        lazyPreloadPrevNext={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: paginationEl,
          bulletClass: "custom-dot-bullet",
          bulletActiveClass: "custom-dot-bullet-active",
        }}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        slidesPerView={1.15}
        spaceBetween={12}
        centeredSlides={true}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: false,
          },
        }}
        className="w-full rounded-xl !overflow-visible lg:!overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="transition-all duration-300">
            {({ isActive, isNext, isPrev }) => (
              <BannerSlide
                slide={slide}
                shouldLoad={isActive || isNext || isPrev}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌ها و دات‌ها (فقط دسکتاپ) */}
      {isLoopable && (
        <div className="hidden lg:block">
          <button 
            type="button" 
            aria-label="Previous Slide" 
            className="custom-swiper-button-prev absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-14 w-7 items-center justify-center rounded-full text-secondary border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 shadow-md active:scale-95 opacity-0 group-hover:opacity-100 disabled:hidden cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5 stroke-[2.5]" />
          </button>

          <button 
            type="button" 
            aria-label="Next Slide" 
            className="custom-swiper-button-next absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-14 w-7 items-center justify-center rounded-full text-secondary border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 shadow-md active:scale-95 opacity-0 group-hover:opacity-100 disabled:hidden cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5 stroke-[2.5]" />
          </button>

          <div className="absolute bottom-3 right-1/2 translate-x-1/2 z-20 flex items-center justify-center gap-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20 px-4 py-1.5 shadow-lg">
            <div
              ref={(node) => setPaginationEl(node)}
              className="custom-swiper-pagination flex items-center justify-center gap-2 min-w-[40px] h-3"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-swiper-pagination .custom-dot-bullet {
          width: 8px !important;
          height: 8px !important;
          background-color: rgba(255, 255, 255, 0.4) !important;
          border-radius: 9999px !important;
          cursor: pointer !important;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: inline-block !important;
          margin: 0 !important;
          opacity: 1 !important;
        }

        .custom-swiper-pagination .custom-dot-bullet:hover {
          background-color: rgba(255, 255, 255, 0.8) !important;
        }

        .custom-swiper-pagination .custom-dot-bullet-active {
          width: 24px !important;
          height: 8px !important;
          background-color: #ffffff !important;
          border-radius: 9999px !important;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>
    </div>
  );
}