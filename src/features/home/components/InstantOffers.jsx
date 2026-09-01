'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { BoltIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import 'swiper/css';

const offersData = [
  {
    id: 1,
    categoryBadge: 'پیشنهاد ویژه',
    title: 'هودی دورس اسپرت با دوخت پریمیوم',
    description: 'دوخت پریمیوم، پارچه داخل کُرک بسیار گرم و راحت',
    discount: '۱۲٪',
    oldPrice: '۸۵۰,۰۰۰',
    price: '۶۹۰,۰۰۰',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80',
    href: '#',
  },
  {
    id: 2,
    categoryBadge: 'پرفروش‌ترین',
    title: 'کاپشن زمستانه اورجینال ضد آب',
    description: 'ضد آب، عایق حرارتی بالا مناسب هوای برفی',
    discount: '۱۵٪',
    oldPrice: '۱,۴۵۰,۰۰۰',
    price: '۱,۲۳۰,۰۰۰',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=500&q=80',
    href: '#',
  },
];

const quickAccessImages = [
  { id: 1, src: '/assets/images/product/mobile-1.png', href: '#' },
  { id: 2, src: '/assets/images/product/mobile-5.png', href: '#' },
  { id: 3, src: '/assets/images/product/mobile-4.png', href: '#' },
];

const TWELVE_HOURS_IN_SECONDS = 12 * 60 * 60;

function ProductSlide({ item }) {
  return (
    <Link
      href={item.href}
      className="group/card relative w-full flex flex-row items-center gap-3 rounded-[2rem] bg-primary/5 p-2.5 text-secondary border border-cart-boarder shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-md cursor-pointer overflow-hidden"
    >
      {/* ۱. بخش تصویر محصول (سایز بزرگ اصلی حفظ شد) */}
      <div className="relative h-32 w-32 sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4),0_8px_16px_-6px_rgba(229,193,88,0.15)]">
        <motion.img
          src={item.image}
          alt={item.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
        />

        {/* بج تخفیف شیشه‌ای */}
        <div className="absolute top-0 right-4 sm:right-6 z-20 overflow-hidden rounded-b-xl rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-1 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
          <span className="font-black text-[10px] sm:text-xs text-primary/90">
            {item.discount}
          </span>
        </div>
      </div>

      {/* ۲. بخش اطلاعات - بدون pl-10 اضافی */}
      <div className="flex-1 min-w-0 text-right flex flex-col justify-between gap-1 py-0.5 relative z-10">
        <div className="flex flex-col gap-1 w-full min-w-0">
          {/* بج عنوان */}
          <div>
            <span className="inline-block text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              {item.categoryBadge}
            </span>
          </div>

          {/* عنوان بدون truncate مخرب، استفاده از line-clamp-2 برای استفاده کامل از عرض */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-product-title transition-colors group-hover/card:text-primary leading-snug line-clamp-2 break-words">
            {item.title}
          </h3>

          <p className="line-clamp-1 text-[10px] font-medium text-[#6E6868]">
            {item.description}
          </p>
        </div>

        {/* بخش قیمت */}
        <div className="mt-1.5 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
              {item.oldPrice}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-black text-[#263238] tabular-nums tracking-tighter">
              {item.price}
            </span>
            <span className="text-[10px] text-gray-500 font-bold">
              تومان
            </span>
          </div>
        </div>
      </div>

      {/* دکمه افزودن آیکونی: سمت چپ وسط کارت */}
      <div className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-md sm:rounded-lg flex items-center justify-center opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 shadow-lg shadow-primary/30">
        <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
      </div>
    </Link>
  );
}

export default function InstantOffersCard() {
  const [timeLeft, setTimeLeft] = useState(TWELVE_HOURS_IN_SECONDS);

  const Icon = BoltIcon;
  const titlePrimary = 'پیشنهادات';
  const titleSecondary = 'لحظه‌ای';
  const watermarkText = 'INSTANT OFFERS';

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return TWELVE_HOURS_IN_SECONDS;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, '0');
    const formatted = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    return formatted.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
  };

  return (
    <div className="relative group bg-[#EFECE3] xl:backdrop-blur-3xl rounded-3xl p-6 border border-cart-boarder flex flex-col justify-between transition-all duration-500 shadow-sm w-full h-full">
      {/* هدر کامپوننت */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div className="relative flex items-center gap-2.5 sm:gap-3.5 z-10 shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-md sm:rounded-2xl bg-gradient-to-tr from-primary to-rose-900 text-secondary flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>

          <div className="flex flex-col justify-center relative">
            {watermarkText && (
              <span className="text-xs sm:text-sm font-black tracking-widest text-primary/20 uppercase select-none font-serif truncate max-w-[250px] leading-tight">
                {watermarkText}
              </span>
            )}

            <h2 className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
              <span className="text-[#332C2D]">{titlePrimary} </span>
              {titleSecondary && (
                <span className="text-primary text-xs sm:text-base md:text-lg font-rokh font-bold inline-block">
                  {titleSecondary}
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* تایمر معکوس */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-red-500/10 border border-red-500/20 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-2xl shrink-0 w-[105px] sm:w-[120px]">
          <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0" />
          <span className="text-xs sm:text-sm md:text-base font-black text-red-500 tabular-nums dir-ltr tracking-wider text-center">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* اسلایدر پیشنهادات */}
      <div className="suggestion-wrapper overflow-hidden relative z-10 my-auto">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          className="suggestionSwiper w-full px-1"
        >
          {offersData.map((item) => (
            <SwiperSlide key={item.id} className="py-2 px-1">
              <ProductSlide item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

        {/* بخش دسترسی سریع */}
        <div className="mt-auto pt-6relative z-10">

          <div className='flex items-center justify-center gap-x-2 mb-4'>
            <p className="text-[10px] font-rokh font-black text-gray-500 shrink-0 uppercase tracking-[0.2em]">
               دسترسی سریع
            </p>
            <div className="h-px w-full bg-gradient-to-r  from-transparent via-cart-boarder to-transparent" />
          </div>
          

          {/* کانتینر اسکرول افقی بدون نمایش اسکرول‌بار اضافی */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1 w-full max-w-full">
            {quickAccessImages.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gray-50 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-gray-200 transition-all duration-300 group overflow-hidden hover:border-primary/60 flex items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img
                    src={img.src}
                    alt="محصول"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}