"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/ui/Button";
import Timer from "@/components/common/Timer";
import Skeleton from "@/components/ui/Skeleton";
import Swiper from "swiper";
import "swiper/css";

// نمونه داده‌های محصولات پوشاک شگفت‌انگیز
const AMAZING_PRODUCTS = [
  {
    id: "1",
    title: "هودی دورس اسپرت مردانه",
    price: 690000,
    originalPrice: 850000,
    discountPercent: 19,
    image: "/images/products/hoodie.png",
    href: "/products/men-hoodie",
    stock: 4,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    title: "تیشرت یقه‌گرد جینبی",
    price: 390000,
    originalPrice: 520000,
    discountPercent: 25,
    image: "/images/products/tshirt.png",
    href: "/products/men-tshirt",
    stock: 2,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    title: "شلوار جین اسلیم فیت",
    price: 850000,
    originalPrice: 1200000,
    discountPercent: 29,
    image: "/images/products/jeans.png",
    href: "/products/jeans",
    stock: 7,
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "4",
    title: "کت اسپرت مردانه پاییزه",
    price: 1250000,
    originalPrice: 1680000,
    discountPercent: 26,
    image: "/images/products/jacket.png",
    href: "/products/jacket",
    stock: 3,
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    title: "پیراهن مجلسی مردانه",
    price: 750000,
    originalPrice: 980000,
    discountPercent: 23,
    image: "/images/products/shirt.png",
    href: "/products/shirt",
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    title: "شلوارک اسپرت مردانه",
    price: 450000,
    originalPrice: 620000,
    discountPercent: 27,
    image: "/images/products/shorts.png",
    href: "/products/shorts",
    stock: 8,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "7",
    title: "تیشرت یقه‌هفت زنانه",
    price: 350000,
    originalPrice: 480000,
    discountPercent: 27,
    image: "/images/products/wtshirt.png",
    href: "/products/women-tshirt",
    stock: 6,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "8",
    title: "هودی کشیده زنانه کاپشن",
    price: 890000,
    originalPrice: 1200000,
    discountPercent: 26,
    image: "/images/products/whoodie.png",
    href: "/products/women-hoodie",
    stock: 4,
    sizes: ["XS", "S", "M", "L"],
  },
];

// کامپوننت اسکلتون اختصاصی کارت محصول
function ProductCardSkeleton() {
  return (
    <div className="w-[170px] xs:w-[185px] sm:w-[200px] md:w-[215px] lg:w-[230px] flex flex-col items-center gap-0 rounded-[1.5rem] bg-primary/5 p-2 border border-cart-boarder shadow-md">
      {/* بخش تصویر */}
      <Skeleton className="h-36 w-36 xs:h-40 xs:w-40 sm:h-36 sm:w-36 lg:h-52 lg:w-full rounded-[1.2rem]" />

      {/* بخش اطلاعات */}
      <div className="flex-1 w-full min-w-0 flex flex-col justify-between gap-2 px-0.5 py-1.5 lg:px-3 lg:py-2.5">
        <div className="space-y-2">
          {/* تایتل دو خطی */}
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-3/4 h-4" />

          {/* سایزها */}
          <div className="flex items-center gap-1 pt-1">
            <Skeleton className="w-8 h-3 rounded" />
            <Skeleton className="h-4 w-5 lg:h-[22px] lg:w-[26px] rounded-md lg:rounded-lg" />
            <Skeleton className="h-4 w-5 lg:h-[22px] lg:w-[26px] rounded-md lg:rounded-lg" />
            <Skeleton className="h-4 w-5 lg:h-[22px] lg:w-[26px] rounded-md lg:rounded-lg" />
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent my-1" />

        {/* قیمت و دکمه */}
        <div className="flex items-end justify-between w-full">
          <div className="space-y-1">
            <Skeleton variant="text" className="w-12 h-3" />
            <Skeleton variant="text" className="w-20 h-5" />
          </div>
          <Skeleton className="w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// کامپوننت کارت محصول
function ProductCard({ product }) {
  const availableSizes = product.sizes || ["S", "M", "L", "XL"];

  return (
    <div className="group/card relative w-[170px] xs:w-[185px] sm:w-[200px] md:w-[215px] lg:w-[230px] flex flex-col items-center gap-0 rounded-[1.5rem] bg-primary/5 p-2 border border-cart-boarder shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_15px_30px_-12px_rgba(229,193,88,0.25)] cursor-pointer">
      
      {/* بخش تصویر محصول */}
      <div className="relative h-36 w-36 xs:h-40 xs:w-40 sm:h-36 sm:w-36 lg:h-52 lg:w-full flex-shrink-0 overflow-hidden rounded-[1.2rem] bg-black/20 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)]">
        
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 215px, 230px"
        />

        {/* بج تخفیف */}
        <div className="absolute top-0 right-3 lg:right-4 z-20 overflow-hidden rounded-b-lg rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-0.5 py-0.25 lg:py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_15px_rgba(0,0,0,0.2)]">
          <span className="font-black text-[8px] lg:text-[11px] text-primary/90">{product.discountPercent}%</span>
        </div>
      </div>

      {/* بخش اطلاعات */}
      <div className="flex-1 w-full min-w-0 text-right flex flex-col justify-between gap-1.5 lg:gap-2 px-0.5 py-1.5 lg:px-3 lg:py-2.5">
        
        <div className="flex flex-col items-start space-y-2">
          {/* تایتل */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-product-title transition-colors group-hover/card:text-primary leading-snug line-clamp-2 break-words">
            {product.title}
          </h3>

          {/* سایزها */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[8px] lg:text-[9px] font-bold text-slate-400">سایزها:</span>
            {availableSizes.slice(0, 4).map((size, index) => (
              <span
                key={index}
                className="flex h-4 w-5 lg:h-[22px] lg:w-[26px] items-center justify-center rounded-md lg:rounded-lg text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-[8px] lg:text-[10px] font-bold shadow-sm transition-colors cursor-default"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        
        {/* خط جداکننده */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent" />

        {/* بخش قیمت و دکمه + */}
        <div className="mt-1.5 flex items-end justify-between w-full">
          {/* قیمت */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
                {new Intl.NumberFormat("fa-IR").format(product.originalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black text-[#263238] tabular-nums tracking-tighter">
                {new Intl.NumberFormat("fa-IR").format(product.price)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold">
                تومان
              </span>
            </div>
          </div>

          {/* دکمه + */}
          <Button
            variant="gradient"
            size="sm"
            icon={PlusIcon}
            iconPosition="left"
            className="w-8 h-8 sm:w-10 sm:h-10 !p-0 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              console.log('افزودن به سبد خرید:', product.id);
            }}
            aria-label="افزودن به سبد خرید"
          />
        </div>
      </div>
    </div>
  );
}

export default function AmazingOffersSlider() {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // تاریخ هدف: ۲۴ ساعت بعد
  const targetDate = new Date().getTime() + 24 * 60 * 60 * 1000;

  // شبیه‌سازی لودینگ داده‌ها (می‌توانید به متغیر لودینگ واقعی API تغییر دهید)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (swiperRef.current && !swiperInstance && !isLoading) {
      const swiper = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        freeModeMomentum: false,
        speed: 800,
        mousewheel: false,
        keyboard: {
          enabled: true,
        },
        touchRatio: 0.8,
        resistanceRatio: 0.5,
        breakpoints: {
          320: {
            spaceBetween: 16,
          },
          640: {
            spaceBetween: 18,
          },
          768: {
            spaceBetween: 20,
          },
          1024: {
            spaceBetween: 24,
          },
        },
      });
      setSwiperInstance(swiper);
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, [swiperInstance, isLoading]);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev(800);
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext(800);
    }
  };

  return (
    <section className="w-full pt-6 space-y-4">
      <SectionHeader
        icon={FireIcon}
        titlePrimary="پیشنهاد‌های"
        titleSecondary="شگفت‌انگیز"
        watermarkText="AMAZING OFFERS"
        watermarkTextMobile="OFFERS"
        subtitleMain="تخفیف‌های ویژه و استثنایی"
        subtitleHighlight="تخفیف‌های ویژه"
        subtitleSub="فرصت محدود جهت خریدهای شگفت‌انگیز هفته"
        showSubtitle={true}
        showButton={true}
        buttonText="مشاهده همه پیشنهاد‌ها"
        buttonTextMobile="مشاهده همه"
        buttonHref="/offers"
        showTimer={true}
        timer={
          <Timer 
            targetDate={targetDate}
            containerClassName="bg-primary/5 border border-primary/20 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-2xl shrink-0 w-[105px] sm:w-[120px]"
            textClassName="text-xs sm:text-sm md:text-base font-black text-primary tabular-nums dir-ltr tracking-wider text-center"
            iconClassName="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0"
          />
        }
        timerPosition="right"
      />

      <div className="relative px-3 md:px-6 lg:px-12">
        {/* اسلایدر با Swiper */}
        <div 
          ref={swiperRef}
          className="overflow-hidden pb-3 pt-1"
        >
          <div className="swiper-wrapper">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="swiper-slide !w-auto">
                    <ProductCardSkeleton />
                  </div>
                ))
              : AMAZING_PRODUCTS.map((product) => (
                  <div key={product.id} className="swiper-slide !w-auto">
                    <Link href={product.href}>
                      <ProductCard product={product} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>

        {/* دکمه‌های ناوبری - پایین و وسط */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={isLoading}
            className="flex items-center gap-2 p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="اسکرول به چپ"
          >
            <ChevronRightIcon className="w-5 h-5 text-secondary hover:text-lime-950 transition-colors" />
          </button>

          <button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center gap-2 p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="اسکرول به راست"
          >
            <ChevronLeftIcon className="w-5 h-5 text-secondary hover:text-lime-950 transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}