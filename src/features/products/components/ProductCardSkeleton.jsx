"use client";

import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs animate-pulse flex flex-col justify-between h-full">
      {/* بخش تصویر */}
      <div className="w-full aspect-4/5 bg-stone-200 rounded-xl mb-4" />

      {/* بخش جزئیات */}
      <div className="flex flex-col gap-2.5 flex-1 justify-between">
        <div className="space-y-2">
          {/* عنوان */}
          <div className="h-4 bg-stone-200 rounded-md w-5/6" />
          {/* توضیحات کوتاه / دسته */}
          <div className="h-3 bg-stone-200 rounded-md w-1/2" />
        </div>

        {/* بخش قیمت و اکشن‌ها */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
          <div className="space-y-1">
            <div className="h-3 bg-stone-200 rounded-md w-12" />
            <div className="h-4 bg-stone-200 rounded-md w-20" />
          </div>
          <div className="w-9 h-9 bg-stone-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}