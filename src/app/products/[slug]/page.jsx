"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import SpecialOffersBox from "@/features/products/components/product-detail/SpecialOffersBox";

export default function ProductPage() {
  const router = useRouter();

  // استیت‌های نوبار و اکشن‌ها
  const [mobileTab, setMobileTab] = useState("info");
  const [desktopTab, setDesktopTab] = useState("desc");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // استیت و رفرنس برای تشخیص چسبیدن کارت به بالای صفحه
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

    container.addEventListener("scroll", handleScroll, { passive: true });
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

  // کامپوننت دکمه‌های هدر
  const HeaderButtons = ({ isPinned = false }) => (
    <div className="flex items-center justify-between w-full transition-all duration-300">
      <button 
        type="button"
        onClick={() => router.back()} 
        className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs outline-none focus:outline-none focus:ring-0 select-none [-webkit-tap-highlight-color:transparent] ${
          isPinned 
            ? "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200" 
            : "border-white/20 bg-black/50 text-white shadow-black/10"
        }`}
        title="بازگشت"
      >
        <XMarkIcon className="w-5 h-5 stroke-1.5" />
      </button>

      <div className="flex items-center gap-2.5 pointer-events-auto">
        <button
          type="button"
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs outline-none focus:outline-none focus:ring-0 select-none [-webkit-tap-highlight-color:transparent] ${
            isPinned 
              ? "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200" 
              : "border-white/20 bg-black/50 text-white shadow-black/10"
          }`}
          title="سبد خرید"
        >
          <ShoppingBagIcon className="w-5 h-5 stroke-1.5" />
        </button>

        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs outline-none focus:outline-none focus:ring-0 select-none [-webkit-tap-highlight-color:transparent] ${
            isPinned 
              ? "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200" 
              : "border-white/20 bg-black/50 text-white shadow-black/10"
          }`}
          title="گزینه‌ها"
        >
          <EllipsisVerticalIcon className="w-5 h-5 stroke-1.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="text-gray-800 text-sm pb-24 lg:pb-12 select-none" dir="rtl">
      
      {/* ============================================================== */}
      {/* 📱 ۱. حالت موبایل                                              */}
      {/* ============================================================== */}
      <div 
        ref={mobileScrollContainerRef}
        className="lg:hidden fixed inset-0 z-50 bg-stone-900 overflow-y-auto"
      >
        
        {/* 🔘 هدر شناور اولیه روی عکس */}
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

          {/* 🔘 هدر جابه‌جاشده */}
          {isScrolledToCard && (
            <div className="sticky top-0 z-30 bg-white pt-2 pb-3 -mx-5 px-5 border-b border-gray-100 shadow-2xs transition-all duration-300">
              <HeaderButtons isPinned={true} />
            </div>
          )}

          {/* 📍 بردکرامپ موبایل */}
          <div className="my-3 pt-1">
            <Breadcrumb items={breadcrumbItems} isCustomPosition={true} />
          </div>

          {/* 🔘 نوبار تب‌های موبایل (اصلاح‌شده برای حذف کامل بردر مشکی و لایت آبی) */}
          <div className="sticky top-[58px] z-20 bg-white py-2 -mx-5 px-5 mb-6 border-b border-gray-100">
            <div className="flex items-center bg-rose-50/70 p-1 font-rokh font-black rounded-2xl relative border border-rose-100">
              
              {/* تب توضیحات */}
              <button
                type="button"
                onClick={() => setMobileTab("info")}
                className={`flex-1 py-2.5 text-xs font-bold cursor-pointer rounded-xl outline-none focus:outline-none focus:ring-0 active:outline-none active:bg-transparent select-none [-webkit-tap-highlight-color:transparent] ${
                  mobileTab === "info"
                    ? "bg-white text-primary shadow-xs"
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                توضیحات
              </button>

              {/* تب نظرات و پرسش‌ها */}
              <button
                type="button"
                onClick={() => setMobileTab("reviews_questions")}
                className={`flex-1 py-2.5 text-xs font-bold cursor-pointer rounded-xl outline-none focus:outline-none focus:ring-0 active:outline-none active:bg-transparent select-none [-webkit-tap-highlight-color:transparent] ${
                  mobileTab === "reviews_questions"
                    ? "bg-white text-primary shadow-xs"
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                نظرات و پرسش‌ها
              </button>

            </div>
          </div>

          {/* محتوای تب‌های موبایل */}
          {mobileTab === "info" ? (
            <div className="space-y-6">
              <ProductInfo onShowMoreFeatures={handleShowMoreFeatures} />
              <div className="my-6">
                <ProductBuyBox />
              </div>

              <ProductFeaturesBadge />
              <ProductSellers />

              <div className="my-6">
                <SpecialOffersBox />
              </div>

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

            </div>
          ) : (
            <div className="space-y-8">
              <ProductReviews />
              <ProductQuestions />
            </div>
          )}
        </div>

        {/* منوی کشویی گزینه‌ها */}
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
              className="fixed inset-0 bg-black/40 transition-opacity"
              onClick={() => setIsBottomSheetOpen(false)}
            />

            <div className="relative w-full max-w-lg bg-white border-t border-gray-100 rounded-t-[32px] p-6 pb-10 shadow-2xl z-50">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200/60 active:scale-[0.98] transition-all cursor-pointer shadow-xs outline-none focus:outline-none focus:ring-0 select-none [-webkit-tap-highlight-color:transparent]"
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
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200/60 active:scale-[0.98] transition-all cursor-pointer shadow-xs outline-none focus:outline-none focus:ring-0 select-none [-webkit-tap-highlight-color:transparent]"
                >
                  <span className="text-sm font-medium text-gray-800">به اشتراک گذاشتن</span>
                  <ShareIcon className="w-5 h-5 text-gray-600 stroke-1.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* نوار ثابت خرید پایینی */}
        <div className="fixed bottom-0 left-3 right-3 z-40 max-w-md mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-gray-200/80 p-3.5 shadow-xl ring-1 ring-black/5 mb-2">
            
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
                    <span className="relative text-[10px] font-black bg-rose-500/10 text-rose-600 border border-rose-500/20 px-2 py-0.5 rounded-full">
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
      {/* 💻 ۲. حالت دسکتاپ                          */}
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

        {/* 🔘 نوبار دسکتاپ */}
        <div className="w-full bg-rose-50/70 rounded-2xl mt-4 py-2.5">
          <div className="flex justify-start">
            <div className="flex items-center font-rokh font-black gap-2 min-w-[500px]">
              
              {/* تب توضیحات محصول */}
              <button
                type="button"
                onClick={() => setDesktopTab("desc")}
                className={`flex-1 py-2.5 px-6 text-sm font-bold cursor-pointer text-center rounded-xl outline-none focus:outline-none focus:ring-0 active:outline-none active:bg-transparent select-none [-webkit-tap-highlight-color:transparent] ${
                  desktopTab === "desc" 
                    ? "bg-white text-primary shadow-xs" 
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                توضیحات محصول
              </button>

              {/* تب نظرات کاربران */}
              <button
                type="button"
                onClick={() => setDesktopTab("reviews")}
                className={`flex-1 py-2.5 px-6 text-sm font-bold cursor-pointer text-center rounded-xl outline-none focus:outline-none focus:ring-0 active:outline-none active:bg-transparent select-none [-webkit-tap-highlight-color:transparent] ${
                  desktopTab === "reviews" 
                    ? "bg-white text-primary shadow-xs" 
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                نظرات کاربران
              </button>

              {/* تب پرسش و پاسخ */}
              <button
                type="button"
                onClick={() => setDesktopTab("questions")}
                className={`flex-1 py-2.5 px-6 text-sm font-bold cursor-pointer text-center rounded-xl outline-none focus:outline-none focus:ring-0 active:outline-none active:bg-transparent select-none [-webkit-tap-highlight-color:transparent] ${
                  desktopTab === "questions" 
                    ? "bg-white text-primary shadow-xs" 
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                پرسش و پاسخ
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

        {/* 🛍️ اسلایدر محصولات مشابه (دسکتاپ) */}
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