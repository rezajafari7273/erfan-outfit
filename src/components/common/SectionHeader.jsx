"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  SparklesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";

// نمونه داده‌های محصولات شگفت‌انگیز
const AMAZING_PRODUCTS = [
  {
    id: "1",
    title: "ساعت هوشمند مدل Ultra 2 پرو",
    price: 3850000,
    originalPrice: 4500000,
    discountPercent: 14,
    image: "/images/products/watch.png",
    href: "/products/watch-ultra-2",
    stock: 4,
  },
  {
    id: "2",
    title: "هدفون بی‌سیم نویز کنسلینگ",
    price: 2100000,
    originalPrice: 2800000,
    discountPercent: 25,
    image: "/images/products/headphone.png",
    href: "/products/wireless-headphone",
    stock: 2,
  },
  {
    id: "3",
    title: "اسپیکر بلوتوثی قابل حمل ضدآب",
    price: 1450000,
    originalPrice: 1900000,
    discountPercent: 23,
    image: "/images/products/speaker.png",
    href: "/products/bluetooth-speaker",
    stock: 7,
  },
  {
    id: "4",
    title: "مچ‌بند سلامتی هوشمند نسخه گلوبال",
    price: 890000,
    originalPrice: 1200000,
    discountPercent: 26,
    image: "/images/products/band.png",
    href: "/products/smart-band",
    stock: 3,
  },
  {
    id: "5",
    title: "پاوربانک ۲۰۰۰۰ میلی‌آمپر فست شارژ",
    price: 1250000,
    originalPrice: 1600000,
    discountPercent: 21,
    image: "/images/products/powerbank.png",
    href: "/products/powerbank-20k",
    stock: 5,
  },
];

export default function AmazingOffersSlider() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <section className="w-full py-6 space-y-4">
      {/* فراخوانی کامپوننت اختصاصی SectionHeader */}
      <SectionHeader
        icon={FireIcon}
        titlePrimary="پیشنهاد‌های"
        titleSecondary="شگفت‌انگیز"
        watermarkText="AMAZING OFFERS"
        watermarkTextMobile="OFFERS"
        subtitleMain="تخفیف‌های ویژه و استثنایی"
        subtitleHighlight="تخفیف‌های ویژه"
        subtitleSub="فرصت محدود جهت خریدهای شگفت‌انگیز هفته"
        buttonText="مشاهده همه پیشنهاد‌ها"
        buttonTextMobile="همه"
        buttonHref="/offers"
        showSubtitle={true}
        showButton={true}
      />

      {/* کانتینر اصلی اسلایدر هماهنگ با تم F6F5EF */}
      <div className="relative group bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden">
        
        {/* نوار بالای اسلایدر: دکمه‌های فلش اسکرول و برچسب زمان */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAE7DC]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs bg-rose-50 text-rose-600 font-medium px-3 py-1 rounded-full border border-rose-100">
              <ClockIcon className="w-3.5 h-3.5" />
              زمان باقی‌مانده محدود
            </span>
          </div>

          {/* دکمه‌های کنترل افقی اسلایدر */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EEE6] border border-[#E4E0D4] flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-200 active:scale-95"
              aria-label="قبلی"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F0EEE6] border border-[#E4E0D4] flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-200 active:scale-95"
              aria-label="بعدی"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* اسلایدر افقی محصولات */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {AMAZING_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[250px] sm:w-[270px] snap-start"
            >
              <Link
                href={product.href}
                className="group/card flex flex-col h-full bg-[#F0EEE6] border border-[#E4E0D4] rounded-2xl p-4 transition-all duration-300 hover:bg-white hover:border-[#e5c158] hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
              >
                {/* نشان تخفیف */}
                <div className="absolute top-3 right-3 z-10 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                  %{product.discountPercent}
                </div>

                {/* تصویر محصول */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-white/60 mb-3 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover/card:scale-105"
                  />
                </div>

                {/* اطلاعات محصول */}
                <div className="flex flex-col flex-grow justify-between gap-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-relaxed group-hover/card:text-black">
                    {product.title}
                  </h3>

                  {/* قیمت و موجودی */}
                  <div className="space-y-2 pt-2 border-t border-black/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-rose-600 font-medium">
                        تنها {product.stock} عدد باقی‌مانده
                      </span>
                      <span className="text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">قیمت شگفت‌انگیز:</span>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-gray-600">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* کارت "مشاهده همه" در انتهای اسلایدر */}
          <div className="flex-shrink-0 w-[180px] snap-start h-full">
            <Link
              href="/offers"
              className="flex flex-col items-center justify-center h-[340px] bg-[#F0EEE6]/60 border border-dashed border-[#D5D1C4] rounded-2xl p-4 text-center group/all hover:bg-white hover:border-[#e5c158] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-3 group-hover/all:scale-110 transition-transform">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-gray-800 mb-1">مشاهده همه</span>
              <span className="text-xs text-gray-500">پیشنهادات ویژه</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}