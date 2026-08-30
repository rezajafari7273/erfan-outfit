"use client";

import React from "react";
import DestinationHandler from "../DestinationHandler";
import Skeleton from "@/components/ui/Skeleton";

export default function TopBanner({ data }) {
  if (!data) {
    return <Skeleton variant="rectangular" className="w-full h-10 md:h-12" />;
  }

  return (
    <DestinationHandler destination={data.destination} className="w-full">
      <div className="relative w-full h-10 md:h-12 bg-amber-500 text-white flex items-center justify-center overflow-hidden hover:opacity-95 transition-opacity">
        {data.image && (
          <img
            src={data.image}
            alt={data.title || "Top Banner"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="relative z-10 px-4 font-bold text-xs md:text-sm text-center truncate drop-shadow">
          {data.title}
        </div>
      </div>
    </DestinationHandler>
  );
}