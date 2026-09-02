"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBagIcon,
  SparklesIcon,
  HeartIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";
import CategorySidebar from "./components/CategorySidebar";
import CategoryMobileFilter from "./components/CategoryMobileFilter";
import Button from "@/components/ui/Button";

// متغیرهای انیمیشن
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 20,
    },
  },
};

const categories = [
  { id: "all", title: "همه", icon: Squares2X2Icon, count: 135 },
  { id: "coat", title: "مانتو و کت", icon: ShoppingBagIcon, count: 24 },
  { id: "dress", title: "لباس مجلسی", icon: SparklesIcon, count: 18 },
  { id: "pants", title: "شلوار و دامن", icon: Squares2X2Icon, count: 32 },
  { id: "shoes", title: "کفش زنانه", icon: ShoppingBagIcon, count: 15 },
  { id: "bag", title: "شومیز و بلوز", icon: HeartIcon, count: 21 },
  { id: "accessory", title: "اکسسوری", icon: SparklesIcon, count: 27 },
];

const products = [
  {
    id: 1,
    title: "پیراهن زنانه گل‌دار",
    price: 690000,
    originalPrice: 850000,
    discount: 24,
    description: "دوخت پریمیوم، پارچه کتان تنفس‌پذیر و بسیار سبک",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    colors: ["#ef4444", "#3b82f6", "#f59e0b"],
    rating: 4.8,
    reviews: 124,
    category: "لباس مجلسی",
    isNew: true,
  },
  {
    id: 2,
    title: "پیراهن زنانه مشکی",
    price: 450000,
    originalPrice: 620000,
    discount: 27,
    description: "مناسب برای استفاده روزمره و مجالس رسمی",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#f59e0b"],
    rating: 4.6,
    reviews: 89,
    category: "مانتو و کت",
    isNew: false,
  },
  {
    id: 3,
    title: "پیراهن زنانه قرمز",
    price: 390000,
    originalPrice: 520000,
    discount: 25,
    description: "طراحی مدرن با تن‌خور بسیار عالی",
    image:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#84cc16", "#d1d5db"],
    rating: 4.9,
    reviews: 203,
    category: "شلوار و دامن",
    isNew: true,
  },
  {
    id: 4,
    title: "پیراهن تابستانی زنانه",
    price: 350000,
    originalPrice: 480000,
    discount: 18,
    description: "خنک و راحت، ایده‌آل برای فصل گرم",
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=700&q=85",
    colors: ["#111827", "#3b82f6", "#f59e0b"],
    rating: 4.7,
    reviews: 156,
    category: "کفش زنانه",
    isNew: false,
  },
  {
    id: 5,
    title: "کت اسپرت زنانه",
    price: 1250000,
    originalPrice: 1680000,
    discount: 26,
    description: "استایل شیک با آستر داخلی باکیفیت",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=700&q=85",
    colors: ["#1a1a2e", "#d4a373", "#e63946"],
    rating: 4.5,
    reviews: 67,
    category: "مانتو و کت",
    isNew: true,
  },
  {
    id: 6,
    title: "شومیز مجلسی",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    description: "پارچه حریر وارداتی و دوخت صنعتی",
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=700&q=85",
    colors: ["#f8f9fa", "#ced4da", "#6c757d"],
    rating: 4.8,
    reviews: 98,
    category: "شومیز و بلوز",
    isNew: false,
  },
];

export default function LatestProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => {
          const categoryMap = {
            coat: "مانتو و کت",
            dress: "لباس مجلسی",
            pants: "شلوار و دامن",
            shoes: "کفش زنانه",
            bag: "شومیز و بلوز",
            accessory: "اکسسوری",
          };
          return p.category === categoryMap[activeCategory];
        });

  const productsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <section dir="rtl" className="w-full py-10 sm:py-14 lg:py-16 select-none">
      <div className="mx-auto w-full">
        <div className="mb-7">
          <SectionHeader
            icon={FireIcon}
            titlePrimary="جدیدترین"
            titleSecondary="محصولات"
            watermarkText="NEW PRODUCTS"
            watermarkTextMobile="NEW"
            subtitleMain="آخرین و جدیدترین محصولات"
            subtitleHighlight="جدیدترین"
            subtitleSub="با بهترین کیفیت و قیمت مناسب"
            showSubtitle={true}
            showButton={true}
            buttonText="مشاهده همه محصولات"
            buttonTextMobile="مشاهده همه"
            buttonHref="/products"
          />
        </div>

        {/* نوار فیلتر موبایل */}
        <CategoryMobileFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setCurrentPage={setCurrentPage}
        />

        {/* جعبه اصلی (بدون رنگ پس‌زمینه و پدینگ) */}
        <div className="relative rounded-[32px]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[235px_minmax(0,1fr)]">
            
            {/* سایدبار دسکتاپ */}
            <div className="hidden lg:block">
              <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setCurrentPage={setCurrentPage}
              />
            </div>

            {/* بخش نمایش محصولات */}
            <div className="relative min-w-0">
              {/* دکمه‌های پیجینیشن دسکتاپ */}
              {totalPages > 1 && (
                <div className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronUpIcon}
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    aria-label="محصولات قبلی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />

                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronDownIcon}
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                    aria-label="محصولات بعدی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />
                </div>
              )}

              {/* گرید محصولات */}
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="col-span-full text-center py-12 text-gray-400"
                  >
                    <span className="text-4xl block mb-3">🛍️</span>
                    <p className="text-sm">محصولی در این دسته‌بندی یافت نشد</p>
                  </motion.div>
                )}
              </motion.div>

              {/* دکمه‌های پیجینیشن موبایل */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6 xl:hidden">
                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronUpIcon}
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    aria-label="محصولات قبلی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />

                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronDownIcon}
                    onClick={handleNext}
                    disabled={currentPage >= totalPages - 1}
                    aria-label="محصولات بعدی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (val) => {
    if (!val) return "";
    if (!mounted) return val.toString();
    return new Intl.NumberFormat("fa-IR").format(val);
  };

  const productHref = product.href || `/products/${product.id}`;
  const categoryBadgeText = product.categoryBadge || product.category || "پیشنهاد ویژه";
  const discountText = product.discount ? `${product.discount}%` : null;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <Link
        href={productHref}
        className="group/card relative w-full flex flex-row items-center gap-3 rounded-[2rem] bg-primary/5 p-2.5 text-secondary border border-cart-boarder shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-md cursor-pointer overflow-hidden"
      >
        {/* واترمارک NEW با افکت درخشش (Glow) در زمان هاور */}
        <span className="pointer-events-none absolute left-1 bottom-1 z-0 select-none font-black text-6xl tracking-tighter text-primary/5 transition-all duration-500 ease-out group-hover/card:text-primary/25 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_15px_rgba(229,193,88,0.4)]">
          NEW
        </span>

        {/* افکت گذر نور (Shine/Glow effect) در زمان هاور */}
        <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover/card:animate-shine group-hover/card:opacity-100 z-10" />

        {/* ۱. بخش تصویر محصول */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4),0_8px_16px_-6px_rgba(229,193,88,0.15)] z-10">
          <motion.img
            src={product.image}
            alt={product.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />

          {/* بج تخفیف شیشه‌ای */}
          {discountText && (
            <div className="absolute top-0 right-3 sm:right-4 z-20 overflow-hidden rounded-b-xl rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-1 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
              <span className="font-black text-[10px] sm:text-xs text-primary/90">
                {discountText}
              </span>
            </div>
          )}
        </div>

        {/* ۲. بخش اطلاعات */}
        <div className="flex-1 min-w-0 text-right flex flex-col justify-between gap-1 py-0.5 relative z-10">
          <div className="flex flex-col gap-1 w-full min-w-0">
            {/* بج عنوان/دسته‌بندی */}
            <div>
              <span className="inline-block text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                {categoryBadgeText}
              </span>
            </div>

            {/* عنوان */}
            <h3 className="text-xs sm:text-sm font-bold text-product-title transition-colors group-hover/card:text-primary leading-snug line-clamp-2 break-words">
              {product.title}
            </h3>

            {/* توضیحات */}
            {product.description && (
              <p className="line-clamp-1 text-[10px] font-medium text-[#6E6868]">
                {product.description}
              </p>
            )}
          </div>

          {/* بخش قیمت */}
          <div className="mt-1 flex flex-col">
            {product.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg font-black text-[#263238] tabular-nums tracking-tighter">
                {formatPrice(product.price)}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">
                تومان
              </span>
            </div>
          </div>
        </div>

        {/* دکمه افزودن آیکونی سمت چپ وسط کارت */}
        <div className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 bg-primary text-white rounded-md sm:rounded-lg flex items-center justify-center opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 shadow-lg shadow-primary/30">
          <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
        </div>
      </Link>
    </motion.div>
  );
}