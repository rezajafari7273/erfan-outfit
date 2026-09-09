"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

import ProductBreadcrumb from "@/features/products/components/product-detail/ProductBreadcrumb";
import ProductGallery from "@/features/products/components/product-detail/ProductGallery";
import ProductInfo from "@/features/products/components/product-detail/ProductInfo";
import ProductBuyBox from "@/features/products/components/product-detail/ProductBuyBox";
import ProductFeaturesBadge from "@/features/products/components/product-detail/ProductFeaturesBadge";
import ProductSellers from "@/features/products/components/product-detail/ProductSellers";

// کامپوننت‌های جدید اضافه شده
import ProductDescription from "@/features/products/components/product-detail/ProductDescription";
import ProductReviews from "@/features/products/components/product-detail/ProductReviews";
import ProductQuestions from "@/features/products/components/product-detail/ProductQuestions";

export default function ProductPage() {
  const router = useRouter();

  // استیت نوبار موبایل: 'info' | 'reviews_questions'
  const [mobileTab, setMobileTab] = useState("info");

  // استیت نوبار دسکتاپ: 'desc' | 'reviews' | 'questions'
  const [desktopTab, setDesktopTab] = useState("desc");

  return (
    <div className="text-gray-800 font-sans text-sm pb-24 lg:pb-12" dir="rtl">
      
      {/* ============================================================== */}
      {/* 📱 ۱. حالت موبایل                                               */}
      {/* ============================================================== */}
      <div className="lg:hidden fixed inset-0 z-50 bg-stone-900 overflow-y-auto">
        
        {/* هدر شیشه‌ای و شفاف بالای عکس */}
        <div className="fixed top-0 left-0 right-0 z-30 px-4 pt-4 pb-2 flex items-center gap-2 bg-gradient-to-b from-black/60 via-black/20 to-transparent">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center text-gray-900 active:scale-95 transition-transform shrink-0"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* بخش اصلی عکس: ارتفاع ۵۵ درصد ارتفاع گوشی */}
        <div className="relative w-full h-[55vh]">
          <ProductGallery isMobile={true} />
        </div>

        {/* کارت کشویی اطلاعات (Button Sheet) */}
        <div className="relative z-20 bg-white rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] px-5 pt-3 pb-24 min-h-[50vh] -mt-6">
          
          {/* دستگیره شیت */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* بردکرامپ موبایل */}
          <div className="mb-4">
            <ProductBreadcrumb />
          </div>

          {/* 🔘 نوبار موبایل (توضیحات | نظرات و پرسش‌ها) */}
          <div className="flex items-center bg-gray-100 p-1 rounded-2xl mb-6">
            <button
              onClick={() => setMobileTab("info")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mobileTab === "info"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              توضیحات
            </button>
            <button
              onClick={() => setMobileTab("reviews_questions")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                mobileTab === "reviews_questions"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              نظرات و پرسش‌ها
            </button>
          </div>

          {/* محتوای تب‌های موبایل */}
          {mobileTab === "info" ? (
            <>
              <ProductInfo />
              <div className="my-6">
                <ProductBuyBox />
              </div>
              <ProductFeaturesBadge />
              <ProductSellers />
              <ProductDescription />
            </>
          ) : (
            <div className="space-y-6">
              <ProductReviews />
              <ProductQuestions />
            </div>
          )}
        </div>

        {/* نوار ثابت خرید پایین */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-100 p-3 flex items-center justify-between shadow-2xl">
          <button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors">
            افزودن به سبد خرید
          </button>
          <div className="text-left">
            <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full ml-1">
              ۳۲٪
            </span>
            <span className="text-xs text-gray-400 line-through">۷,۱۰۰,۰۰۰</span>
            <div className="text-sm font-black text-gray-900">
              ۴,۷۹۹,۰۰۰ <span className="text-[10px] font-normal">تومان</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* 💻 ۲. حالت دسکتاپ                          */}
      {/* ========================================== */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-4">
        <ProductBreadcrumb />
        
        <div className="grid grid-cols-12 gap-6 items-start mt-4">
          <div className="col-span-4"><ProductGallery isMobile={false} /></div>
          <div className="col-span-5"><ProductInfo /></div>
          <div className="col-span-3"><ProductBuyBox /></div>
        </div>

        <ProductFeaturesBadge />
        <ProductSellers />

        {/* 🔘 نوبار دسکتاپ بعد از فروشندگان */}
        <div className="mt-10 border-b border-gray-200">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setDesktopTab("desc")}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                desktopTab === "desc"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              توضیحات محصول
            </button>

            <button
              onClick={() => setDesktopTab("reviews")}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                desktopTab === "reviews"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              نظرات کاربران
            </button>

            <button
              onClick={() => setDesktopTab("questions")}
              className={`pb-4 text-sm font-bold border-b-2 transition-all ${
                desktopTab === "questions"
                  ? "border-rose-600 text-rose-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              پرسش و پاسخ
            </button>
          </div>
        </div>

        {/* محتوای تب انتخاب شده در دسکتاپ */}
        <div className="mt-6">
          {desktopTab === "desc" && <ProductDescription />}
          {desktopTab === "reviews" && <ProductReviews />}
          {desktopTab === "questions" && <ProductQuestions />}
        </div>
      </div>

    </div>
  );
}