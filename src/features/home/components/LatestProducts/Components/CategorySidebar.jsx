"use client";

import React from "react";
import {
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

export default function CategorySidebar({
  categories = [],
  activeCategory,
  setActiveCategory,
  setCurrentPage,
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <aside className="w-full bg-[#EFECE3] backdrop-blur-2xl p-4 rounded-3xl border border-cart-boarder shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)]">
      {/* هدر سایدبار مدرن */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-200/30">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-primary/20 to-primary/5 text-primary rounded-2xl shadow-inner shadow-primary/5 transition-all duration-300 hover:scale-105 hover:rotate-3">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-tr from-primary to-primary/60 rounded-full ring-2 ring-white shadow-lg shadow-primary/30 animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight tracking-tight">
              دسته‌بندی‌ها
            </h3>
            <span className="text-[12px] font-medium text-gray-400/80 mt-0.5 block">
              فیلتر بر اساس گروه
            </span>
          </div>
        </div>

        {/* نشانگر تعداد کل دسته‌بندی‌ها */}
        <span className="text-[11px] font-bold text-gray-400/80 bg-gray-100/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-200/30">
          {safeCategories.length}
        </span>
      </div>

      {/* لیست دسته‌بندی‌ها با استایل مدرن */}
      <div className="flex flex-col gap-2">
        {safeCategories.map((category) => {
          const rawIcon = category.icon;
          const active = category.id === activeCategory;

          // تشخیص نوع آیکون (آیا کامپوننت React است یا لینک/مسیر تصویر)
          const isReactComponent =
            typeof rawIcon === "function" ||
            (typeof rawIcon === "object" && rawIcon !== null && "$$typeof" in rawIcon);
          const isImageUrl = typeof rawIcon === "string" && (rawIcon.startsWith("http") || rawIcon.includes("/"));

          const IconComponent = isReactComponent ? rawIcon : null;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                if (setActiveCategory) setActiveCategory(category.id);
                if (setCurrentPage) setCurrentPage(0);
              }}
              className={`group relative flex items-center justify-between p-3 rounded-2xl transition-[background-color,transform,box-shadow] duration-300 ease-out select-none cursor-pointer backdrop-blur-sm gap-3 ${
                active
                  ? "bg-primary/30 text-[#500000] font-bold border border-[#e56b6b]/40 shadow-lg shadow-primary/10 scale-[1.02] -translate-x-0.5"
                  : "bg-white/40 border border-transparent text-gray-600 hover:bg-white/80 hover:text-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-x-1 hover:scale-[1.01]"
              }`}
            >
              {/* بخش راست: آیکون */}
              {(IconComponent || isImageUrl) && (
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-300 border border-transparent shrink-0 z-10 ${
                    active
                      ? "bg-white/20 text-white backdrop-blur-md shadow-inner shadow-white/20"
                      : "bg-white/80 text-gray-500 shadow-sm shadow-gray-200/50 group-hover:bg-primary/10 group-hover:text-primary group-hover:shadow-primary/20"
                  }`}
                >
                  {IconComponent ? (
                    <IconComponent className="h-4.5 w-4.5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
                  ) : (
                    <img
                      src={rawIcon}
                      alt={category.title || "icon"}
                      className="h-5 w-5 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>
              )}

              {/* عنوان */}
              <span className="flex-1 text-right font-medium text-sm tracking-wide z-10 truncate px-1">
                {category.title}
              </span>

              {/* بخش چپ: تعداد و فلش راهنما */}
              <div className="flex items-center gap-2 z-10 shrink-0">
                {category.count !== undefined && (
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors duration-300 border border-transparent ${
                      active
                        ? "bg-white/20 text-white backdrop-blur-md shadow-inner shadow-white/20"
                        : "bg-white/80 text-gray-400 shadow-sm shadow-gray-200/30 group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    {category.count}
                  </span>
                )}

                <ChevronLeftIcon
                  className={`h-4 w-4 transition-all duration-500 ${
                    active
                      ? "opacity-100 text-white translate-x-0 rotate-0"
                      : "opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary group-hover:rotate-[-5deg]"
                  }`}
                />
              </div>

              {/* افکت‌های پس‌زمینه */}
              {!active && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/10 transition-colors duration-300 rounded-2xl" />
                </>
              )}

              {/* هایلایت اکتیو */}
              {active && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/60 rounded-l-full blur-[2px] shadow-lg shadow-white/50" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}