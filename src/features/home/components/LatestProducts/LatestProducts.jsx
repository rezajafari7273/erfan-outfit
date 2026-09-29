"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import SectionHeader from "@/components/common/SectionHeader";
import CategorySidebar from "./components/CategorySidebar";
import CategoryMobileFilter from "./components/CategoryMobileFilter";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 20 },
  },
};

export default function LatestProducts({
  latestData = {},
  selectedCategory = "all",
  latestPage = 1,
  isLatestLoading = false,
  changeCategory,
  changeLatestPage,
}) {
  const categories = latestData?.categories || [];
  const products = latestData?.products || [];
  const pagination = latestData?.pagination || {};
  
  const totalPages = pagination.totalPages || pagination.total_pages || 1;

  const handlePrevious = () => {
    if (latestPage > 1 && changeLatestPage) {
      changeLatestPage(latestPage - 1);
    }
  };

  const handleNext = () => {
    if (latestPage < totalPages && changeLatestPage) {
      changeLatestPage(latestPage + 1);
    }
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
            iconColor="text-fuchsia-300"
            highlightColor="text-fuchsia-600"
            buttonHref="/products"
          />
        </div>

        <CategoryMobileFilter
          categories={categories}
          activeCategory={selectedCategory}
          setActiveCategory={changeCategory}
        />

        <div className="relative rounded-[32px]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[235px_minmax(0,1fr)]">
            <div className="hidden lg:block">
              <CategorySidebar
                categories={categories}
                activeCategory={selectedCategory}
                setActiveCategory={changeCategory}
              />
            </div>

            <div className="relative min-w-0">
              {totalPages > 1 && (
                <div className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronUpIcon}
                    onClick={handlePrevious}
                    disabled={latestPage <= 1 || isLatestLoading}
                    aria-label="محصولات قبلی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />

                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronDownIcon}
                    onClick={handleNext}
                    disabled={latestPage >= totalPages || isLatestLoading}
                    aria-label="محصولات بعدی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />
                </div>
              )}

              <motion.div
                key={`${selectedCategory}-${latestPage}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {isLatestLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="h-32 bg-primary/5 rounded-[2rem] animate-pulse" />
                  ))
                ) : products.length > 0 ? (
                  products.map((product) => (
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6 xl:hidden">
                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronUpIcon}
                    onClick={handlePrevious}
                    disabled={latestPage <= 1 || isLatestLoading}
                    aria-label="محصولات قبلی"
                    className="!p-0 h-10 w-10 !rounded-[10px]"
                  />

                  <Button
                    variant="gradient"
                    size="sm"
                    icon={ChevronDownIcon}
                    onClick={handleNext}
                    disabled={latestPage >= totalPages || isLatestLoading}
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
  const categoryBadgeText = product.categoryBadge || product.category || "جدید";
  const discountText = product.discount ? `${product.discount}%` : null;
  const image = product.image || product.cover_image || "/images/placeholder.png";
  const title = product.title || product.name;
  const price = product.price || 0;
  const originalPrice = product.originalPrice || product.old_price;

  return (
    <motion.div variants={itemVariants} className="w-full">
      <Link
        href={productHref}
        className="group/card relative w-full flex flex-row items-center gap-3 rounded-[2rem] bg-primary/5 p-2.5 text-secondary border border-cart-boarder shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-md cursor-pointer overflow-hidden"
      >
        <span className="pointer-events-none absolute left-1 bottom-1 z-0 select-none font-black text-6xl tracking-tighter text-primary/5 transition-all duration-500 ease-out group-hover/card:text-primary/25 group-hover/card:scale-110 group-hover/card:drop-shadow-[0_0_15px_rgba(229,193,88,0.4)]">
          NEW
        </span>

        <div className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1000 group-hover/card:animate-shine group-hover/card:opacity-100 z-10" />

        <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4),0_8px_16px_-6px_rgba(229,193,88,0.15)] z-10">
          <motion.img
            src={image}
            alt={title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-500"
          />

          {discountText && (
            <div className="absolute top-0 right-3 sm:right-4 z-20 overflow-hidden rounded-b-xl rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-1 py-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
              <span className="font-black text-[10px] sm:text-xs text-primary/90">
                {discountText}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 text-right flex flex-col justify-between gap-1 py-0.5 relative z-10">
          <div className="flex flex-col gap-1 w-full min-w-0">
            <div>
              <span className="inline-block text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
                {categoryBadgeText}
              </span>
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-product-title transition-colors group-hover/card:text-primary leading-snug line-clamp-2 break-words">
              {title}
            </h3>

            {product.description && (
              <p className="line-clamp-1 text-[10px] font-medium text-[#6E6868]">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-1 flex flex-col">
            {originalPrice > price && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold line-through decoration-red-400/50 tabular-nums">
                  {formatPrice(originalPrice)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="text-base sm:text-lg font-black text-[#263238] tabular-nums tracking-tighter">
                {formatPrice(price)}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold">
                تومان
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 bg-primary text-white rounded-md sm:rounded-lg flex items-center justify-center opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 shadow-lg shadow-primary/30">
          <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
        </div>
      </Link>
    </motion.div>
  );
}