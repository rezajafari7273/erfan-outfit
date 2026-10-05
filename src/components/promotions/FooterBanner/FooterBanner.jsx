"use client";

import React from "react";
import DestinationHandler from "../DestinationHandler";
import Skeleton from "@/components/ui/Skeleton";

export default function FooterBanner({ data, className = "" }) {
  // حالت لودینگ یا نبود داده
  if (!data) {
    return <Skeleton variant="rectangular" className="w-full h-20 rounded-2xl" />;
  }

  // در صورتی که داده به صورت آرایه ارسال شده باشد، اولین آیتم را برمی‌داریم
  const banner = Array.isArray(data) ? data[0] : data;

  if (!banner) return null;

  return (
    <DestinationHandler destination={banner.destination} className={`w-full h-full block ${className}`}>
      <div className="relative w-full h-20 md:h-34 rounded-2xl overflow-hidden group border border-slate-100 shadow-sm transition-transform duration-300 ">
        {banner.image ? (
          <img
            src={banner.image}
            alt={banner.title || "Footer Banner"}
            className="w-full h-full object-cover transition-transform duration-500 "
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">
            {banner.title || "بنر تبلیغاتی"}
          </div>
        )}

        
      </div>
    </DestinationHandler>
  );
}