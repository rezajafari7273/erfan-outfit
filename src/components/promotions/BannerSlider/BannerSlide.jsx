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
       
      </div>
    </DestinationHandler>
  );
}