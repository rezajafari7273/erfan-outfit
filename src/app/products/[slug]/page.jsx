"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  XMarkIcon, 
  ShoppingBagIcon, 
  EllipsisVerticalIcon,
  HeartIcon,
  ShareIcon 
} from "@heroicons/react/24/outline";

import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";

import ProductGallery from "@/features/products/components/product-detail/ProductGallery";
import ProductInfo from "@/features/products/components/product-detail/ProductInfo";
import ProductBuyBox from "@/features/products/components/product-detail/ProductBuyBox";
import ProductFeaturesBadge from "@/features/products/components/product-detail/ProductFeaturesBadge";
import ProductSellers from "@/features/products/components/product-detail/ProductSellers";

import ProductDescription from "@/features/products/components/product-detail/ProductDescription";
import ProductReviews from "@/features/products/components/product-detail/ProductReviews";
import ProductQuestions from "@/features/products/components/product-detail/ProductQuestions";

import RelatedProductsSlider from "@/features/products/components/product-detail/RelatedProductsSlider";
import SuggestedProductsSlider from "@/features/products/components/product-detail/SuggestedProductsSlider";

export default function ProductPage() {
  const router = useRouter();

  // استیت‌های نوبار و اکشن‌ها
  const [mobileTab, setMobileTab] = useState("info");
  const [desktopTab, setDesktopTab] = useState("desc");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // استیت و رفرنس برای تشخیص چسبیدن کارت به بالای صفحه (تعریف صحیح useRef با مقدار null)
  const [isScrolledToCard, setIsScrolledToCard] = useState(false);
  const mobileScrollContainerRef = useRef(null);

  // داده‌های نمونه برای بردکرامپ محصول
  const breadcrumbItems = [
    { label: "پوشاک مردانه", href: "/category/men" },
    { label: "پیراهن", href: "/category/shirts" },
    { label: "پیراهن کتان آستین بلند OverSize" },
  ];

  // لیسنر اسکرول برای موبایل
  useEffect(() => {
    const container = mobileScrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.42; 
      if (container.scrollTop >= threshold) {
        setIsScrolledToCard(true);
      } else {
        setIsScrolledToCard(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // هندلر کلیک دکمه مشاهده ویژگی‌ها
  const handleShowMoreFeatures = () => {
    setDesktopTab("desc");
    setMobileTab("info");

    setTimeout(() => {
      const targetId = window.innerWidth < 1024 ? "product-description-mobile" : "product-description";
      const element = document.getElementById(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // کامپوننت دکمه‌های هدر (بدون تایپ‌دهی TS برای جلوگیری از خطای Build در فایل .jsx)
  const HeaderButtons = ({ isPinned = false }) => (
    <div className="flex items-center justify-between w-full transition-all duration-300">
      <button 
        onClick={() => router.back()} 
        className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs ${
          isPinned 
            ? "border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200" 
            : "border-white/20 bg-black/40 text-white backdrop-blur-xl shadow-black/10"
        }`}
        title="بازگشت"
      >
        <XMarkIcon className="w-5 h-5 stroke-1.5" />
      </button>

      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          type="button"
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs ${
            isPinned 
              ? "border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200" 
              : "border-white/20 bg-black/40 text-white backdrop-blur-xl shadow-black/10"
          }`}
          title="سبد خرید"
        >
          <ShoppingBagIcon className="w-5 h-5 stroke-1.5" />
        </button>

        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs ${
            isPinned 
              ? "border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200" 
              : "border-white/20 bg-black/40 text-white backdrop-blur-xl shadow-black/10"
          }`}
          title="گزینه‌ها"
        >
          <EllipsisVerticalIcon className="w-5 h-5 stroke-1.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="text-gray-800 text-sm pb-24 lg:pb-12" dir="rtl">
      
      {/* ============================================================== */}
      {/* 📱 ۱. حالت موبایل                                             */}
      {/* ============================================================== */}
      <div 
        ref={mobileScrollContainerRef}
        className="lg:hidden fixed inset-0 z-50 bg-stone-900 overflow-y-auto"
      >
        
        {/* 🔘 هدر شناور اولیه روی عکس (وقتی اسکرول پایینه) */}
        {!isScrolledToCard && (
          <div className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none transition-opacity duration-300">
            <HeaderButtons isPinned={false} />
          </div>
        )}

        {/* بخش اصلی عکس */}
        <div className="relative w-full h-[55vh]">
          <ProductGallery isMobile={true} />
        </div>

        {/* کارت کشویی اطلاعات */}
        <div className="relative z-20 bg-white rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] px-5 pt-3 pb-24 min-h-[50vh] -mt-6">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />

          {/* 🔘 هدر جابه‌جاشده (وقتی کارت به بالای صفحه می‌رسه) */}
          {isScrolledToCard && (
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md pt-2 pb-3 -mx-5 px-5 border-b border-gray-100 shadow-2xs transition-all duration-300">
              <HeaderButtons isPinned={true} />
            </div>
          )}

          {/* 📍 بردکرامپ موبایل */}
          <div className="my-3 pt-1">
            <Breadcrumb items={breadcrumbItems} isCustomPosition={true} />
          </div>

          {/* 🔘 نوبار تب‌های موبایل با رنگ اکستنت Rose */}
          <div className="sticky top-[58px] z-20 bg-white/95 backdrop-blur-md py-2 -mx-5 px-5 mb-6 border-b border-gray-100 transition-all duration-200">
            <div className="flex items-center bg-rose-50/70 p-1 font-rokh font-black rounded-2xl relative border border-rose-100">
              
              {/* تب توضیحات */}
              <button
                type="button"
                onClick={() => setMobileTab("info")}
                className={`relative flex-1 py-2.5 text-xs font-bold transition-colors duration-200 cursor-pointer z-10 ${
                  mobileTab === "info" ? "text-primary" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {mobileTab === "info" && (
                  <motion.div
                    layoutId="activeMobileTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-rose-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">توضیحات</span>
              </button>

              {/* تب نظرات و پرسش‌ها */}
              <button
                type="button"
                onClick={() => setMobileTab("reviews_questions")}
                className={`relative flex-1 py-2.5 text-xs font-bold transition-colors duration-200 cursor-pointer z-10 ${
                  mobileTab === "reviews_questions" ? "text-primary" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {mobileTab === "reviews_questions" && (
                  <motion.div
                    layoutId="activeMobileTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-rose-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">نظرات و پرسش‌ها</span>
              </button>

            </div>
          </div>

          {/* محتوای تب‌های موبایل همراه با انیمیشن Fade & Slide */}
          <AnimatePresence mode="wait">
            {mobileTab === "info" ? (
              <motion.div
                key="info-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <ProductInfo onShowMoreFeatures={handleShowMoreFeatures} />
                <div className="my-6">
                  <ProductBuyBox />
                </div>
                <ProductFeaturesBadge />
                <ProductSellers />
                <div id="product-description-mobile" className="pt-2">
                  <ProductDescription />
                </div>

                {/* 🛍️ اسلایدر محصولات مشابه (موبایل) */}
                <div className="mt-8 border-t border-gray-100 pt-6">
                  <RelatedProductsSlider categoryId="shirts" />
                </div>

                {/* 💡 اسلایدر محصولات پیشنهادی (موبایل) */}
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <SuggestedProductsSlider categoryId="shirts" />
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="reviews-tab"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6"
              >
                <ProductReviews />
                <ProductQuestions />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/*  منوی کشویی گزینه‌ها */}
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
              className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
              onClick={() => setIsBottomSheetOpen(false)}
            />

            <div className="relative w-full max-w-lg bg-[#FAF8F5]/90 border-t border-white/80 rounded-t-[32px] p-6 pb-10 backdrop-blur-2xl shadow-2xl z-50 transition-transform duration-300">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/70 hover:bg-white/90 border border-[#E5E3DC] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                  </span>
                  <HeartIcon className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Product", url: window.location.href });
                    }
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/70 hover:bg-white/90 border border-[#E5E3DC] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                >
                  <span className="text-sm font-medium text-gray-800">به اشتراک گذاشتن</span>
                  <ShareIcon className="w-5 h-5 text-gray-600 stroke-1.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* نوار ثابت خرید گلس مورفیسم (Glassmorphic) */}
        <div className="fixed bottom-0 left-3 right-3 z-40 max-w-md mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-2xl border border-white/80 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-black/5">
            
            {/* افکت نورپردازی لبه بالای گلس (Glow Effect) */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="flex items-center justify-between gap-3">
              
              <Button
                variant="gradient"
                size="md"
                icon={ShoppingBagIcon}
                iconPosition="right"
                className="flex-1 !py-3.5 text-xs"
              >
                افزودن به سبد خرید
              </Button>

              <div className="flex flex-col items-end justify-center shrink-0 pl-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-30 animate-ping" />
                    <span className="relative text-[10px] font-black bg-rose-500/10 text-rose-600 border border-rose-500/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      ٪۳۲
                    </span>
                  </span>
                  
                  <span className="text-[11px] font-medium text-gray-400 line-through decoration-rose-500/50">
                    ۷,۱۰۰,۰۰۰
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-base font-black tracking-tight text-gray-900">
                    ۴,۷۹۹,۰۰۰
                  </span>
                  <span className="text-[10px] font-bold text-gray-500">تومان</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/*  ۲. حالت دسکتاپ                          */}
      {/* ========================================== */}
      <div className="hidden lg:block container space-y-8 mx-auto py-4">
        
        {/* 📍 بردکرامپ دسکتاپ */}
        <div className="mb-2">
          <Breadcrumb items={breadcrumbItems} isCustomPosition={true} />
        </div>
        
        <div className="grid grid-cols-12 gap-6 items-start mt-4">
          <div className="col-span-4"><ProductGallery isMobile={false} /></div>
          <div className="col-span-5"><ProductInfo onShowMoreFeatures={handleShowMoreFeatures} /></div>
          <div className="col-span-3"><ProductBuyBox /></div>
        </div>

        <ProductFeaturesBadge />
        <ProductSellers />

        {/* 🔘 نوبار دسکتاپ با پس‌زمینه تمام‌عرض */}
        <div className="w-full bg-rose-50/70 rounded-2xl mt-4 py-2.5">
          <div className="flex justify-start">
            <div className="flex items-center font-rokh font-black gap-2 min-w-[500px]">
              
              {/* تب توضیحات محصول */}
              <button
                type="button"
                onClick={() => setDesktopTab("desc")}
                className={`relative flex-1 py-2.5 px-6 text-sm font-bold transition-colors duration-200 cursor-pointer z-10 text-center ${
                  desktopTab === "desc" ? "text-primary" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {desktopTab === "desc" && (
                  <motion.div
                    layoutId="activeDesktopTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-rose-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">توضیحات محصول</span>
              </button>

              {/* تب نظرات کاربران */}
              <button
                type="button"
                onClick={() => setDesktopTab("reviews")}
                className={`relative flex-1 py-2.5 px-6 text-sm font-bold transition-colors duration-200 cursor-pointer z-10 text-center ${
                  desktopTab === "reviews" ? "text-primary" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {desktopTab === "reviews" && (
                  <motion.div
                    layoutId="activeDesktopTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-rose-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">نظرات کاربران</span>
              </button>

              {/* تب پرسش و پاسخ */}
              <button
                type="button"
                onClick={() => setDesktopTab("questions")}
                className={`relative flex-1 py-2.5 px-6 text-sm font-bold transition-colors duration-200 cursor-pointer z-10 text-center ${
                  desktopTab === "questions" ? "text-primary" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {desktopTab === "questions" && (
                  <motion.div
                    layoutId="activeDesktopTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-rose-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">پرسش و پاسخ</span>
              </button>

            </div>
          </div>
        </div>

        {/* محتوای تب انتخاب شده در دسکتاپ */}
        <div id="product-description">
          {desktopTab === "desc" && <ProductDescription />}
          {desktopTab === "reviews" && <ProductReviews />}
          {desktopTab === "questions" && <ProductQuestions />}
        </div>

        {/*  اسلایدر محصولات مشابه (دسکتاپ) */}
        <div className="pt-8 border-t border-gray-100">
          <RelatedProductsSlider categoryId="shirts" />
        </div>

        {/* 💡 اسلایدر محصولات پیشنهادی (دسکتاپ) */}
        <div className="pt-8 border-t border-gray-100">
          <SuggestedProductsSlider categoryId="shirts" />
        </div>

      </div>

    </div>
  );
}