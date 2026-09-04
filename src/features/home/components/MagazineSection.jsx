"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";

// وارد کردن Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ARTICLES = [
  {
    id: "art-1",
    title: "راهنمای کامل ست کردن استایل پاییزه با رنگ‌های ترند سال",
    summary:
      "بررسی جدیدترین ترکیب‌های رنگی و اکسسوری‌های محبوب برای ساخت یک استایل جذاب و کژوال در فصل پاییز...",
    category: "استایل و مد",
    author: "تیم تحریریه",
    readTime: "۵ دقیقه",
    views: "۱.۲k",
    date: "۱۲ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    href: "/blog/autumn-style-guide",
  },
  {
    id: "art-2",
    title: "چگونه جنس پارچه پوشاک را مثل یک حرفه‌ای تشخیص دهیم؟",
    summary:
      "نکات کلیدی برای بررسی الیاف طبیعی و مصنوعی هنگام خرید لباس آنلاین...",
    category: "راهنمای خرید",
    author: "علی محمدی",
    readTime: "۴ دقیقه",
    views: "۸۵۰",
    date: "۱۰ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    href: "/blog/fabric-types-guide",
  },
  {
    id: "art-3",
    title: "۱۰ اکسسوری ضروری که استایل شما را دگرگون می‌کنند",
    summary:
      "معرفی اکسسوری‌های کوچکی که نقش بسیار بزرگی در جذابیت ظاهری شما ایفا می‌کنند...",
    category: "اکسسوری",
    author: "سارا راد",
    readTime: "۳ دقیقه",
    views: "۹۲۰",
    date: "۰۸ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    href: "/blog/essential-accessories",
  },
  {
    id: "art-4",
    title: "اصول نگهداری و شستشوی لباس‌های زمستانه و کاپشن",
    summary:
      "چگونه عمر کاپشن‌ها و پالتوهای اورجینال خود را با شستشوی صحیح افزایش دهیم...",
    category: "نگهداری پوشاک",
    author: "تیم پشتیبانی",
    readTime: "۶ دقیقه",
    views: "۱.۵k",
    date: "۰۵ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?w=600&q=80",
    href: "/blog/winter-clothes-care",
  },
];

// کارت مقاله با ارتفاع یکسان
const ArticleCard = ({ article }) => (
  <Link
    href={article.href}
    className="group relative flex flex-col justify-between rounded-[2rem] bg-primary/5 p-3.5 border border-cart-boarder shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_15px_30px_-10px_rgba(229,193,88,0.22)] cursor-pointer overflow-hidden h-full w-full"
  >
    {/* افکت گذر نور */}
    <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:animate-shine group-hover:opacity-100 z-10" />

    <div className="flex flex-col flex-1">
      {/* تصویر مقاله */}
      <div className="relative h-48 w-full overflow-hidden rounded-[1.5rem] bg-black/20 shadow-md flex-shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* دسته مقاله */}
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-[11px] shadow-md">
          <span className="text-primary ml-1">#</span>
          {article.category}
        </div>

        {/* زمان مطالعه */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-medium text-[10px]">
          <ClockIcon className="w-3 h-3 text-primary" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* جزئیات مقاله */}
      <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
            <span className="flex items-center gap-1 text-[#6E6868]">
              <UserIcon className="w-3.5 h-3.5 text-primary" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="w-3.5 h-3.5 text-amber-500" />
              {article.views}
            </span>
          </div>

          <h3 className="text-base font-bold text-product-title transition-colors group-hover:text-primary leading-snug line-clamp-2">
            {article.title}
          </h3>
        </div>

        <p className="text-xs font-medium text-gray-500 line-clamp-2 leading-relaxed mt-auto">
          {article.summary}
        </p>
      </div>
    </div>

    {/* دکمه ادامه مطلب */}
    <div className="flex items-center justify-between pt-4 mt-3 border-t border-primary/10 flex-shrink-0">
      <span className="text-[11px] font-bold text-gray-400">{article.date}</span>
      <div className="flex items-center gap-1.5 text-primary font-bold text-xs group-hover:translate-x-[-4px] transition-transform duration-300">
        <span>ادامه مطلب</span>
        <ArrowLeftIcon className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
    </div>
  </Link>
);

export default function MagazineSection() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section dir="rtl" className="w-full py-8 sm:py-12 select-none">
      <div className="mx-auto w-full">
        {/* ۱. هدر بخش */}
        <div className="mb-8">
          <SectionHeader
            icon={BookOpenIcon}
            titlePrimary="مجله و"
            titleSecondary="اخبار مد"
            watermarkText="MAGAZINE"
            watermarkTextMobile="BLOG"
            subtitleMain="جدیدترین مقالات و"
            subtitleHighlight="راهنمای استایل"
            subtitleSub="مطالب خواندنی درباره مد، پوشاک و تکنیک‌های استایلینگ"
            showSubtitle={true}
            showButton={true}
            buttonText="مشاهده همه مقالات"
            buttonTextMobile="مشاهده همه"
            buttonHref="/blog"
          />
        </div>

        {/* ۲. اسلایدر Swiper مقالات (بدون Autoplay) */}
        <div className="relative">
          <Swiper
            onSwiper={setSwiperRef}
            spaceBetween={16}
            slidesPerView={1.1}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="!px-1 !py-2"
          >
            {ARTICLES.map((article) => (
              <SwiperSlide key={article.id} className="!h-auto flex">
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ۳. دکمه‌های ناوبری متصل به متدهای Swiper */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => swiperRef?.slidePrev()}
              aria-label="قبلی"
              className="flex items-center gap-2 p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md"
            >
              <ChevronRightIcon className="w-5 h-5 text-secondary hover:text-lime-950 transition-colors" />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              aria-label="بعدی"
              className="flex items-center gap-2 p-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md"
            >
              <ChevronLeftIcon className="w-5 h-5 text-secondary hover:text-lime-950 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}