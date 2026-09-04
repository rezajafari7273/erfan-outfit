"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FireIcon,
  StarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { TrophyIcon } from "@heroicons/react/24/outline";
import SectionHeader from "@/components/common/SectionHeader";

// وارد کردن ماژول‌ها و استایل‌های Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BEST_SELLING_PRODUCTS = [
  {
    id: "top-1",
    rank: "01",
    title: "کاپشن زمستانه اورجینال ضد آب پریمیوم",
    category: "پوشاک آقایان",
    price: 1450000,
    originalPrice: 1850000,
    discountPercent: 21,
    salesCount: 340,
    stockProgress: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&q=80",
    href: "/products/top-jacket",
    badge: "داغ‌ترین انتخاب",
  },
  {
    id: "top-2",
    rank: "02",
    title: "هودی دورس اسپرت طرح کژوال",
    category: "هودی و سویشرت",
    price: 690000,
    originalPrice: 890000,
    discountPercent: 22,
    salesCount: 280,
    stockProgress: 72,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    href: "/products/hoodie-casual",
    badge: "پرفروش هفته",
  },
  {
    id: "top-3",
    rank: "03",
    title: "شلوار جین اسلیم فیت کلاسیک",
    category: "شلوار",
    price: 850000,
    originalPrice: 1100000,
    discountPercent: 22,
    salesCount: 215,
    stockProgress: 64,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1542272604-780c36856d62?w=500&q=80",
    href: "/products/slim-jeans",
    badge: "محبوب کاربران",
  },
  {
    id: "top-4",
    rank: "04",
    title: "کت اسپرت زنانه پاییزه",
    category: "پوشاک بانوان",
    price: 1250000,
    originalPrice: 1550000,
    discountPercent: 19,
    salesCount: 190,
    stockProgress: 58,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
    href: "/products/women-jacket",
    badge: "ترند فصل",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// کامپوننت کارت محصول جهت جلوگیری از تکرار کد
const ProductCard = ({ product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("fa-IR").format(price);

  return (
    <Link
      href={product.href}
      className="group relative flex flex-col sm:flex-row items-center gap-4 rounded-[2rem] bg-primary/5 p-3.5 border border-cart-boarder shadow-sm transition-all duration-500 hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_15px_30px_-10px_rgba(229,193,88,0.22)] cursor-pointer overflow-hidden h-full"
    >
      {/* واترمارک رتبه */}
      <span className="pointer-events-none absolute -left-2 -bottom-4 z-0 text-7xl font-black text-primary/5 group-hover:text-primary/15 transition-all duration-500 scale-125">
        #{product.rank}
      </span>

      {/* افکت گذر نور */}
      <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover:animate-shine group-hover:opacity-100 z-10" />

      {/* تصویر محصول */}
      <div className="relative h-48 w-full sm:w-44 sm:h-44 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-md z-10">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        <div className="absolute top-2.5 right-2.5 z-20 flex items-center justify-center px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-black text-xs shadow-md">
          <span className="text-primary font-bold ml-1">#</span>
          {product.rank}
        </div>

        <div className="absolute top-0 left-5 z-20 overflow-hidden rounded-b-lg bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-2 py-0.5 shadow-sm">
          <span className="font-black text-[11px] text-primary/90">
            {product.discountPercent}%
          </span>
        </div>
      </div>

      {/* اطلاعات محصول */}
      <div className="flex-1 w-full min-w-0 flex flex-col justify-between h-full gap-2 z-10 py-1">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-md">
              {product.badge}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <StarIcon className="w-3.5 h-3.5" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-product-title transition-colors group-hover:text-primary leading-snug line-clamp-1">
            {product.title}
          </h3>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
            <span className="flex items-center gap-1 text-primary">
              <FireIcon className="w-3.5 h-3.5 text-amber-500" />
              {product.salesCount}+ سفارش موفق
            </span>
            <span>میزان محبوبیت</span>
          </div>
          <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-primary rounded-full transition-all duration-1000"
              style={{ width: `${product.stockProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between pt-2 border-t border-primary/10">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
              {formatPrice(product.originalPrice)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-lg font-black text-[#263238] tabular-nums tracking-tighter">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-gray-500 font-bold">تومان</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-xl text-xs font-bold shadow-md group-hover:bg-primary/90 transition-all duration-300">
            <span>خرید</span>
            <ArrowLeftIcon className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function BestSellingProducts() {
  return (
    <section dir="rtl" className="w-full py-8 sm:py-12 select-none">
      <div className="mx-auto w-full">
        {/* ۱. هدر بخش */}
        <div className="mb-8">
          <SectionHeader
            icon={TrophyIcon}
            titlePrimary="پرفروش‌ترین"
            titleSecondary="محصولات"
            watermarkText="BEST SELLERS"
            watermarkTextMobile="TOP"
            subtitleMain="محبوب‌ترین انتخاب‌های "
            subtitleHighlight="مشتریان ما"
            subtitleSub="محصولاتی که بیشترین رضایت و ثبت سفارش را داشته‌اند"
            showSubtitle={true}
            showButton={true}
            buttonText="مشاهده همه پرفروش‌ها"
            buttonTextMobile="مشاهده همه"
            buttonHref="/bestsellers"
          />
        </div>

        {/* ۲. حالت گرید برای دسکتاپ (lg به بالا) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden lg:grid grid-cols-2 gap-5"
        >
          {BEST_SELLING_PRODUCTS.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* ۳. حالت Swiper برای تبلت و موبایل (کوچک‌تر از lg) */}
        <div className="block lg:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
            }}
            className="pb-12 !px-1"
          >
            {BEST_SELLING_PRODUCTS.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}