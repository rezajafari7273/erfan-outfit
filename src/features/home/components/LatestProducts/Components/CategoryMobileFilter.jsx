"use client";

import React from "react";

export default function CategoryMobileFilter({
  categories = [],
  activeCategory,
  setActiveCategory,
  setCurrentPage,
}) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="lg:hidden mb-4">
      <div className="flex items-center gap-2 p-1.5 bg-[#EFECE3] backdrop-blur-2xl rounded-2xl border border-cart-boarder shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] overflow-x-auto no-scrollbar">
        {safeCategories.map((category) => {
          const rawIcon = category.icon;
          const active = category.id === activeCategory;

          // تشخیص نوع آیکون (کامپوننت React یا لینک عکس) جهت رندر ایمن
          const isReactComponent =
            typeof rawIcon === "function" ||
            (typeof rawIcon === "object" && rawIcon !== null && "$$typeof" in rawIcon);
          const isImageUrl =
            typeof rawIcon === "string" && (rawIcon.startsWith("http") || rawIcon.includes("/"));

          const IconComponent = isReactComponent ? rawIcon : null;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                if (setActiveCategory) setActiveCategory(category.id);
                if (setCurrentPage) setCurrentPage(0);
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 whitespace-nowrap backdrop-blur-sm select-none cursor-pointer
                ${
                  active
                    ? "bg-primary/30 text-[#500000] border border-[#e56b6b]/40 shadow-lg shadow-primary/10 scale-[1.02]"
                    : "bg-white/40 border border-transparent text-gray-600 hover:bg-white/80 hover:text-primary"
                }
              `}
            >
              {/* رندر ایمن آیکون در صورت وجود */}
              {IconComponent ? (
                <IconComponent className="w-4 h-4 shrink-0" />
              ) : isImageUrl ? (
                <img
                  src={rawIcon}
                  alt={category.title || ""}
                  className="w-4 h-4 object-contain shrink-0"
                />
              ) : null}

              <span>{category.title}</span>

              {/* نمایش تعداد آیتم‌ها در صورت وجود */}
              {category.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? "bg-white/30 text-[#500000]" : "bg-black/5 text-gray-500"
                  }`}
                >
                  {category.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}