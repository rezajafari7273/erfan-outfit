"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function InteractiveProductCard({ product, onPlayVideo }) {
  if (!product) return null;

  // ساخت واریانت پیش‌فرض در صورت عدم وجود variants
  const defaultVariant = {
    id: `default-${product.id}`,
    name: "اصلی",
    color_code: "#1e293b",
    image: product.image || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    sizes: product.sizes || [],
  };

  const variants = product.variants && product.variants.length > 0 
    ? product.variants 
    : [defaultVariant];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // دریافت لیست سایزهای واریانت فعال (در صورت نبودن، استفاده از سایزهای کلی محصول)
  const currentSizes = selectedVariant.sizes && selectedVariant.sizes.length > 0 
    ? selectedVariant.sizes 
    : (product.sizes || []);

  // فرمت سه‌رقم سه‌رقم قیمت‌ها به فارسی
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("fa-IR");
  };

  const handlePlayVideoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlayVideo) {
      onPlayVideo({
        id: `${product.id}-${Date.now()}`,
        title: `${product.title} (${selectedVariant.name})`,
        videoUrl: product.video_url,
      });
    }
  };

  // آدرس صفحه جزئیات — اول slug بعد id
  const productHref = `/products/${product.slug || product.id}`;

  return (
    <Link
      href={productHref}
      className="group/card relative w-full lg:w-[275px] flex flex-row lg:flex-col items-center gap-3 lg:gap-0 rounded-[2rem] bg-primary/5 p-2.5 lg:p-2 text-secondary border border-cart-boarder shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 lg:hover:-translate-y-2 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_20px_35px_-15px_rgba(229,193,88,0.25)] hover:shadow-primary/20 cursor-pointer"
    >
      
      {/* ۱. بخش تصویر */}
      <div className="relative h-32 w-32 sm:h-36 sm:w-36 lg:h-70 lg:w-full flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4),0_8px_16px_-6px_rgba(229,193,88,0.15)]">
        
        {/* دکمه پخش ویدیو */}
        {product.video_url && (
          <button
            onClick={handlePlayVideoClick}
            title="پخش ویدیوی محصول"
            className="absolute top-2 left-2 z-10 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-rose-900 transition-all duration-300"
          >
            <PlayIcon className="w-4 h-4 translate-x-0.5" />
          </button>
        )}

        {/* تصویر تغییرپذیر بر اساس واریانت */}
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedVariant.id || selectedVariant.image}
            src={selectedVariant.image}
            alt={`${product.title} - ${selectedVariant.name}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* بج تخفیف */}
        {product.discount_percent > 0 && (
          <div className="absolute top-0 right-5 lg:right-5 z-20 overflow-hidden rounded-b-xl rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-1.5 py-1 lg:py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
            <span className="font-black text-[10px] lg:text-sm text-rose-500">
              {product.discount_percent}٪
            </span>
          </div>
        )}

        {/* پلت رنگ‌ها */}
        {variants.length > 1 && (
          <div className="absolute bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1 rounded-full bg-white/10 backdrop-blur-md border border-white/30 p-1 lg:p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-1 lg:gap-1.5">
              {variants.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(item);
                  }}
                  title={item.name}
                  className={`relative h-3 w-3 lg:h-4 lg:w-4 rounded-full border border-white/60 shadow-sm transition-all duration-300 ${
                    selectedVariant.id === item.id
                      ? "scale-125 ring-2 ring-white ring-offset-1 ring-offset-black/50"
                      : "opacity-80 hover:opacity-100 hover:scale-110"
                  }`}
                  style={{ backgroundColor: item.color_code || "#000000" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ۲. بخش اطلاعات */}
      <div className="flex-1 w-full min-w-0 text-right flex flex-col justify-between lg:justify-start gap-2.5 lg:gap-3 px-1 py-1 lg:px-4 lg:py-3.5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm lg:text-base font-bold text-[#131925] truncate">
              {product.title}
            </h3>
            <span className="text-[9px] lg:text-[10px] font-extrabold text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md px-2 lg:px-2.5 py-0.5 rounded-md shadow-sm shrink-0">
              {selectedVariant.name}
            </span>
          </div>
          <p className="text-[10px] lg:text-[11px] font-medium text-slate-500 line-clamp-2 lg:truncate">
            {product.short_description || `دسته‌بندی: ${product.category_name}`}
          </p>
        </div>

        <div className="hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent" />

        <div className="flex items-end justify-between gap-1 mt-1 lg:mt-0">
          {/* سایزهای دینامیک واریانت فعال */}
          <div className="flex flex-col gap-1">
            <span className="text-[8px] lg:text-[9px] font-bold text-slate-400">سایزها:</span>
            <div className="flex items-center gap-1">
              {currentSizes.length > 0 ? (
                currentSizes.map((size, index) => (
                  <span
                    key={index}
                    className="flex h-4 w-5 lg:h-[22px] lg:w-[26px] items-center justify-center rounded-md lg:rounded-lg text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-[8px] lg:text-[10px] font-bold shadow-sm"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <span className="text-[8px] lg:text-[9px] font-medium text-slate-400">ناموجود</span>
              )}
            </div>
          </div>

          {/* قیمت */}
          <div className="flex flex-col items-end leading-none shrink-0">
            {product.discount_percent > 0 && (
              <span className="text-[10px] lg:text-xs font-bold text-slate-400 line-through decoration-slate-600 mb-0.5 lg:mb-1">
                {formatPrice(product.base_price)}
              </span>
            )}
            <div className="flex items-baseline gap-0.5 lg:gap-1">
              <span className="text-sm lg:text-[17px] font-black text-emerald-700 tracking-tight">
                {formatPrice(product.discounted_price)}
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold text-slate-500">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}