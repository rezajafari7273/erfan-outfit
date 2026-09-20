"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import Divider from "@/components/ui/Divider";
import Swiper from "swiper";
import "swiper/css";

const WISHLIST_PRODUCTS = [
  {
    id: "w1",
    title: "هودی دورس اسپرت مردانه",
    price: 690000,
    originalPrice: 850000,
    image: "/images/products/hoodie.png",
    href: "/products/men-hoodie",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "w2",
    title: "تیشرت یقه‌گرد جینبی",
    price: 390000,
    originalPrice: 520000,
    image: "/images/products/tshirt.png",
    href: "/products/men-tshirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "w3",
    title: "شلوار جین اسلیم فیت",
    price: 850000,
    originalPrice: 1200000,
    image: "/images/products/jeans.png",
    href: "/products/jeans",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "w4",
    title: "کت اسپرت مردانه پاییزه",
    price: 1250000,
    originalPrice: 1680000,
    image: "/images/products/jacket.png",
    href: "/products/jacket",
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "w5",
    title: "پیراهن مجلسی مردانه",
    price: 750000,
    originalPrice: 980000,
    image: "/images/products/shirt.png",
    href: "/products/shirt",
    sizes: ["S", "M", "L", "XL"],
  },
];

// اسکلتون ریسپانسیو با ابعاد تصویر ثابت
function ProductCardSkeleton() {
  return (
    <div className="w-[145px] sm:w-[165px] md:w-[180px] flex flex-col items-center gap-0 rounded-2xl bg-primary/5 p-2 border border-cart-boarder shadow-xs select-none shrink-0">
      {/* باکس تصویر ثابت */}
      <div className="w-full aspect-square relative overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex-1 w-full min-w-0 flex flex-col justify-between gap-1.5 px-0.5 py-1.5">
        <div className="space-y-1.5">
          <Skeleton variant="text" className="w-full h-3" />
          <Skeleton variant="text" className="w-3/4 h-3" />
          <div className="flex items-center gap-1 pt-0.5">
            <Skeleton className="w-6 h-2.5 rounded" />
            <Skeleton className="h-3.5 w-4 rounded" />
            <Skeleton className="h-3.5 w-4 rounded" />
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent my-0.5" />
        <div className="flex items-end justify-between w-full">
          <div className="space-y-1">
            <Skeleton variant="text" className="w-8 h-2.5" />
            <Skeleton variant="text" className="w-14 h-3.5" />
          </div>
          <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// کارت محصول با عکس ثابت و تغییرناپذیر در موبایل
function ProductCard({ product }) {
  const availableSizes = product.sizes || ["S", "M", "L", "XL"];

  return (
    <div className="group/card relative w-[145px] sm:w-[165px] md:w-[180px] flex flex-col items-center gap-0 rounded-2xl bg-primary/5 p-2 border border-cart-boarder shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-md cursor-pointer select-none shrink-0">
      {/* باکس تصویر: ابعاد نسبت ۱:۱ ثابت حفظ شده تا کوچک و دفرمه نشود */}
      <div className="relative w-full aspect-square shrink-0 overflow-hidden rounded-xl bg-black/20 shadow-xs">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 640px) 145px, (max-width: 768px) 165px, 180px"
        />
      </div>

      <div className="flex-1 w-full min-w-0 text-right flex flex-col justify-between gap-1 px-0.5 py-1 mt-1">
        <div className="flex flex-col items-start space-y-1">
          <h3 className="text-[11px] sm:text-xs font-bold text-product-title transition-colors group-hover/card:text-primary leading-tight line-clamp-2 break-words">
            {product.title}
          </h3>
          <div className="flex flex-wrap items-center gap-0.5">
            <span className="text-[7px] sm:text-[8px] font-bold text-slate-400">سایز:</span>
            {availableSizes.slice(0, 3).map((size, index) => (
              <span
                key={index}
                className="flex h-3.5 w-4 sm:h-4 sm:w-5 items-center justify-center rounded text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-[7px] sm:text-[8px] font-bold shadow-2xs transition-colors cursor-default"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent my-0.5" />

        <div className="mt-0.5 flex items-end justify-between w-full">
          <div className="flex flex-col items-start">
            {product.originalPrice && (
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
                  {new Intl.NumberFormat("fa-IR").format(product.originalPrice)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-black text-[#263238] tabular-nums tracking-tighter">
                {new Intl.NumberFormat("fa-IR").format(product.price)}
              </span>
              <span className="text-[8px] text-gray-500 font-bold">
                تومان
              </span>
            </div>
          </div>

          <Button
            variant="gradient"
            size="sm"
            icon={PlusIcon}
            iconPosition="left"
            className="w-7 h-7 sm:w-8 sm:h-8 !p-0 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer shrink-0"
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

export default function WishlistProductsSlider() {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (swiperRef.current && !swiperInstance && !isLoading) {
      const swiper = new Swiper(swiperRef.current, {
        slidesPerView: 'auto',
        spaceBetween: 12,
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
          320: { spaceBetween: 10 },
          640: { spaceBetween: 12 },
          768: { spaceBetween: 14 },
          1024: { spaceBetween: 16 },
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

  return (
    <section className="w-full space-y-3">
      {/* هدر بخش لیست ذخیره‌شده‌ها */}
      <div className="relative flex items-center gap-2 sm:gap-3 z-10 shrink-0 ">
        <div className="w-8 h-9 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-primary to-rose-900 flex items-center justify-center shadow-xs shadow-amber-500/20 shrink-0">
          <BookmarkIcon className="w-4 h-4 stroke-[2.2] text-amber-600" />
        </div>

        <div className="flex flex-col justify-center relative">
          <span className="block text-[8px] sm:text-[9px] font-black tracking-widest text-primary/20 uppercase select-none font-serif truncate leading-tight">
            YOUR WISHLIST
          </span>

          <h2 className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
            <span className="text-[#332C2D]">محصولات موجود در </span>
            <span className="text-primary text-xs sm:text-sm font-rokh font-bold inline-block">
              لیست شما
            </span>
          </h2>
        </div>

        
      </div>
      <Divider variant="gradient" color="primary" />
      <div className="relative px-0.5 md:px-2">
        <div 
          ref={swiperRef}
          className="overflow-hidden pb-2 pt-1"
        >
          <div className="swiper-wrapper">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="swiper-slide !w-auto">
                    <ProductCardSkeleton />
                  </div>
                ))
              : WISHLIST_PRODUCTS.map((product) => (
                  <div key={product.id} className="swiper-slide !w-auto">
                    <Link href={product.href}>
                      <ProductCard product={product} />
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}