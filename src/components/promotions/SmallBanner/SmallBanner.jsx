"use client";

import React from "react";
import DestinationHandler from "../DestinationHandler";

export default function SmallBanner({ banner, className = "h-32 md:h-40" }) {
  if (!banner) return null;

  return (
    <DestinationHandler destination={banner.destination} className="w-full">
      <div className={`relative w-full ${className} rounded-xl overflow-hidden shadow-sm group border border-gray-100`}>
        <img
          src={banner.image}
          alt={banner.title || "Small Banner"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {banner.title && (
          <div className="absolute bottom-0 inset-x-0 p-2 bg-black/40 text-white text-xs font-bold text-center truncate backdrop-blur-xs">
            {banner.title}
          </div>
        )}
      </div>
    </DestinationHandler>
  );
}