"use client";

import React, { useState } from "react";
import Sidebar from "@/features/products/components/sidebar/Sidebar";
import ProductCard from "@/features/products/components/ProductCard";
import SortBar from "@/features/products/components/SortBar";

export default function ProductsPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentSort, setCurrentSort] = useState("newest");

  const handleSortChange = (newSort) => {
    setCurrentSort(newSort);
    // منطق مرتب‌سازی محصولات
  };

  return (
    <div className="min-h-screen bg-stone-100 mt-4 sm:mt-8">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-start px-4 sm:px-6">
        
        {/* ستون سمت راست: سایدبار دسکتاپ + نوار اسکرولی موبایل */}
        <div className="w-full lg:w-72 shrink-0">
          <Sidebar
            activeVideo={activeVideo}
            onCloseVideo={() => setActiveVideo(null)}
            currentSort={currentSort}
            onSortChange={handleSortChange}
            onCategoryChange={(cat) => console.log("Category selected:", cat)}
            onColorChange={(colors) => console.log("Colors selected:", colors)}
            onPriceChange={(price) => console.log("Price selected:", price)}
            onSizeChange={(size) => console.log("Size selected:", size)}
          />
        </div>

        {/* ستون اصلی: هدر بالای گرید و محصولات */}
        <div className="flex-1 w-full">

          {/* حالت ۱: دسکتاپ (دو دیو مجزا با flex و justify-between) */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            
            {/* دیو اول: سورت بار */}
            <div>
              <SortBar
                currentSort={currentSort}
                onSortChange={handleSortChange}
              />
            </div>

            {/* دیو دوم: تعداد محصولات (باکس مجزا) */}
            <div className="flex items-center gap-2 bg-white px-5 py-3.5 rounded-2xl border border-stone-200/80 shadow-xs text-xs text-stone-500 font-medium">
              <span>تعداد محصولات:</span>
              <span className="font-bold text-stone-900 text-sm">۲۴ محصول</span>
            </div>

          </div>

          {/* حالت ۲: موبایل (نمایش فقط تعداد محصول) */}
          <div className="lg:hidden flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
            <span>تعداد محصولات:</span>
            <span className="font-bold text-stone-900">۲۴ محصول</span>
          </div>

          {/* گرید محصولات */}
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 items-start">
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
            <ProductCard onPlayVideo={(video) => setActiveVideo(video)} />
          </main>
        </div>

      </div>
    </div>
  );
}