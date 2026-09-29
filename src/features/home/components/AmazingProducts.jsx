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

function ProductCardSkeleton() {
  return (
    <div className="w-[170px] xs:w-[185px] sm:w-[200px] md:w-[215px] lg:w-[230px] flex flex-col items-center gap-0 rounded-[1.5rem] bg-primary/5 p-2 border border-cart-boarder shadow-md">
      <Skeleton className="h-36 w-36 xs:h-40 xs:w-40 sm:h-36 sm:w-36 lg:h-52 lg:w-full rounded-[1.2rem]" />
      <div className="flex-1 w-full min-w-0 flex flex-col justify-between gap-2 px-0.5 py-1.5 lg:px-3 lg:py-2.5">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-full h-4" />
          <Skeleton variant="text" className="w-3/4 h-4" />
          <div className="flex items-center gap-1 pt-1">
            <Skeleton className="w-8 h-3 rounded" />
            <Skeleton className="h-4 w-5 lg:h-[22px] lg:w-[26px] rounded-md lg:rounded-lg" />
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent my-1" />
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

function ProductCard({ product }) {
  const availableSizes = product?.sizes && product.sizes.length > 0 ? product.sizes : ["L", "XL"];
  const title = product?.title || product?.name || "بدون عنوان";
  
  // مدیریت تصویر پیش‌فرض در صورت null بودن image در API
  const image = product?.image ? product.image : "/images/placeholder.png"; 
  
  const price = product?.price || 0;
  const originalPrice = product?.originalPrice || product?.old_price || price;
  const discountPercent = product?.discountPercent || product?.discount || 0;

  return (
    <div className="group/card relative w-[170px] xs:w-[185px] sm:w-[200px] md:w-[215px] lg:w-[230px] flex flex-col items-center gap-0 rounded-[1.5rem] bg-primary/5 p-2 border border-cart-boarder shadow-md transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_15px_30px_-12px_rgba(229,193,88,0.25)] cursor-pointer">
      <div className="relative h-36 w-36 xs:h-40 xs:w-40 sm:h-36 sm:w-36 lg:h-52 lg:w-full flex-shrink-0 overflow-hidden rounded-[1.2rem] bg-black/10 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)]">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized={image.startsWith("http") || image.endsWith(".png")}
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 215px, 230px"
        />
        {discountPercent > 0 && (
          <div className="absolute top-0 right-3 lg:right-4 z-20 overflow-hidden rounded-b-lg rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-1 py-0.5 shadow-md">
            <span className="font-black text-[9px] lg:text-[11px] text-primary">
              %{discountPercent}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 w-full min-w-0 text-right flex flex-col justify-between gap-1.5 lg:gap-2 px-0.5 py-1.5 lg:px-3 lg:py-2.5">
        <div className="flex flex-col items-start space-y-2">
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-product-title transition-colors group-hover/card:text-primary leading-snug line-clamp-2 break-words">
            {title}
          </h3>

          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[8px] lg:text-[9px] font-bold text-slate-400">سایزها:</span>
            {availableSizes.slice(0, 4).map((size, index) => (
              <span
                key={index}
                className="flex h-4 w-5 lg:h-[22px] lg:w-[26px] items-center justify-center rounded-md lg:rounded-lg text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-[8px] lg:text-[10px] font-bold shadow-sm cursor-default"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent my-1" />

        <div className="mt-1.5 flex items-end justify-between w-full">
          <div className="flex flex-col items-start">
            {originalPrice > price && (
              <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
                {new Intl.NumberFormat("fa-IR").format(originalPrice)}
              </span>
            )}
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg lg:text-xl font-black text-[#263238] tabular-nums tracking-tighter">
                {new Intl.NumberFormat("fa-IR").format(price)}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">تومان</span>
            </div>
          </div>

          <Button
            variant="gradient"
            size="sm"
            icon={PlusIcon}
            iconPosition="left"
            className="w-8 h-8 sm:w-10 sm:h-10 !p-0 rounded-md sm:rounded-lg flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("افزودن به سبد خرید:", product.id);
            }}
            aria-label="افزودن به سبد خرید"
          />
        </div>
      </div>
    </div>
  );
}

export default function AmazingOffersSlider({ amazingData = {}, isLoading = false }) {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const products = amazingData?.products || [];
  
  // محاسبه تایمر براساس targetDate دریافتی از API
  const targetDate = amazingData?.targetDate 
    ? new Date(amazingData.targetDate).getTime() 
    : Date.now() + 24 * 60 * 60 * 1000;

  // راه اندازی مجدد یا Update سوئیپر پس از تغییر لیست محصولات
  useEffect(() => {
    if (!swiperRef.current) return;

    if (swiperInstance) {
      swiperInstance.update();
      return;
    }

    if (products.length > 0) {
      const swiper = new Swiper(swiperRef.current, {
        slidesPerView: "auto",
        spaceBetween: 16,
        freeMode: true,
        speed: 600,
        breakpoints: {
          640: { spaceBetween: 18 },
          768: { spaceBetween: 20 },
          1024: { spaceBetween: 24 },
        },
      });
      setSwiperInstance(swiper);
    }
  }, [products, swiperInstance]);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

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
        iconColor="text-lime-300"
        highlightColor="text-lime-600"
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
        <div ref={swiperRef} className="overflow-hidden pb-3 pt-1">
          <div className="swiper-wrapper">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="swiper-slide !w-auto">
                    <ProductCardSkeleton />
                  </div>
                ))
              : products.map((product) => {
                  // ساخت مسیر لینک بر اساس slug دریافتی از API
                  const productHref = product.href || `/products/${product.slug || product.id}`;
                  
                  return (
                    <div key={product.id} className="swiper-slide !w-auto">
                      <Link href={productHref}>
                        <ProductCard product={product} />
                      </Link>
                    </div>
                  );
                })}
          </div>
        </div>

        {products.length > 0 && !isLoading && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all shadow-md"
              aria-label="قبلی"
            >
              <ChevronRightIcon className="w-5 h-5 text-secondary" />
            </button>

            <button
              onClick={handleNext}
              className="flex items-center justify-center p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all shadow-md"
              aria-label="بعدی"
            >
              <ChevronLeftIcon className="w-5 h-5 text-secondary" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}