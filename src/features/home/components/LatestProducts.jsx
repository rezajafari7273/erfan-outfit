// components/home/LatestProducts.jsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import "swiper/css";

const LATEST_PRODUCTS = [
  {
    id: 1,
    title: "هودی دورس اسپرت مردانه",
    price: 690000,
    originalPrice: 850000,
    discount: 19,
    image: "/images/products/hoodie.png",
    href: "/products/men-hoodie",
    rating: 4.8,
    reviews: 126,
    isNew: true,
  },
  {
    id: 2,
    title: "تیشرت یقه‌گرد جینبی",
    price: 390000,
    originalPrice: 520000,
    discount: 25,
    image: "/images/products/tshirt.png",
    href: "/products/men-tshirt",
    rating: 4.9,
    reviews: 89,
    isNew: true,
  },
  {
    id: 3,
    title: "شلوار جین اسلیم فیت",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    image: "/images/products/jeans.png",
    href: "/products/jeans",
    rating: 4.7,
    reviews: 203,
    isNew: false,
  },
  {
    id: 4,
    title: "کت اسپرت پاییزه",
    price: 1250000,
    originalPrice: 1680000,
    discount: 26,
    image: "/images/products/jacket.png",
    href: "/products/jacket",
    rating: 4.6,
    reviews: 154,
    isNew: true,
  },
  {
    id: 5,
    title: "پیراهن مجلسی مردانه",
    price: 750000,
    originalPrice: 980000,
    discount: 23,
    image: "/images/products/shirt.png",
    href: "/products/shirt",
    rating: 4.8,
    reviews: 97,
    isNew: false,
  },
  {
    id: 6,
    title: "شلوارک اسپرت مردانه",
    price: 450000,
    originalPrice: 620000,
    discount: 27,
    image: "/images/products/shorts.png",
    href: "/products/shorts",
    rating: 4.5,
    reviews: 67,
    isNew: true,
  },
];

function ProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/80">
      {/* بخش تصویر */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* برچسب جدید */}
        {product.isNew && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-emerald-500/25">
              <SparklesIcon className="w-3 h-3" />
              جدید
            </span>
          </div>
        )}

        {/* برچسب تخفیف درصدی - بزرگ */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="flex flex-col items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg shadow-rose-500/30">
            <span className="text-lg font-black text-white leading-none">
              {product.discount}%
            </span>
            <span className="text-[8px] font-medium text-white/80">تخفیف</span>
          </div>
        </div>

        {/* دکمه سریع مشاهده */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={product.href}
            className="px-6 py-2.5 bg-white text-gray-900 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            مشاهده محصول
          </Link>
        </div>
      </div>

      {/* بخش اطلاعات */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* امتیاز */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-gray-700">{product.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews} نظر)</span>
        </div>

        {/* قیمت */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-[10px] text-gray-400 line-through">
              {new Intl.NumberFormat("fa-IR").format(product.originalPrice)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-base font-bold text-gray-900">
                {new Intl.NumberFormat("fa-IR").format(product.price)}
              </span>
              <span className="text-[8px] text-gray-400">تومان</span>
            </div>
          </div>
          <Link
            href={product.href}
            className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            خرید
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LatestProducts() {
  return (
    <section className="w-full py-8 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* هدر */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                جدیدترین <span className="text-emerald-600">محصولات</span>
              </h2>
              <p className="text-xs text-gray-400">آخرین محصولات اضافه شده</p>
            </div>
          </div>

          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            مشاهده همه
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* اسلایدر */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 12 },
            480: { slidesPerView: 2, spaceBetween: 14 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="px-1"
        >
          {LATEST_PRODUCTS.map((product) => (
            <SwiperSlide key={product.id} className="py-2">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* دکمه مشاهده همه در موبایل */}
        <div className="flex justify-center mt-6 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
          >
            مشاهده همه محصولات
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}