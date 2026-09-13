// components/promotion/BannerSlider/BannerSlide.jsx
"use client";

import React from "react";
import DestinationHandler from "../DestinationHandler";

export function BannerSlide({ slide }) {
  if (!slide) return null;

  return (
    <DestinationHandler destination={slide.destination} className="w-full h-full">
      <div className="relative w-full h-[260px] md:h-[480px] rounded-xl overflow-hidden shadow-md group">
        <img
          src={slide.image}
          alt={slide.title || "Banner Slide"}
          className="w-full h-full object-cover  transition-transform duration-500"
        />
        {(slide.title || slide.subtitle) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white" dir="rtl">
            {slide.title && <h3 className="text-xl md:text-2xl font-black">{slide.title}</h3>}
            {slide.subtitle && <p className="text-xs md:text-sm text-gray-200 mt-1">{slide.subtitle}</p>}
          </div>
        )}
      </div>
    </DestinationHandler>
  );
}