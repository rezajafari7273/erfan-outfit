"use client";

import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

import ProductBreadcrumb from "@/features/products/components/product-detail/ProductBreadcrumb";
import ProductGallery from "@/features/products/components/product-detail/ProductGallery";
import ProductInfo from "@/features/products/components/product-detail/ProductInfo";
import ProductBuyBox from "@/features/products/components/product-detail/ProductBuyBox";
import ProductFeaturesBadge from "@/features/products/components/product-detail/ProductFeaturesBadge";
import ProductSellers from "@/features/products/components/product-detail/ProductSellers";

export default function ProductPage() {
  const router = useRouter();

  return (
    <div className=" text-gray-800 font-sans text-sm pb-24 lg:pb-12" dir="rtl">
      
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

        {/* بخش اصلی عکس: ارتفاع دقیق ۵۵ درصد ارتفاع گوشی */}
        <div className="relative w-full h-[55vh]">
          <ProductGallery isMobile={true} />
        </div>

        {/* کارت کشویی اطلاعات (Button Sheet) که از روی عکس بالا می‌آید */}
        <div className="relative z-20 bg-white rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] px-5 pt-3 pb-24 min-h-[50vh] -mt-6">
          
          {/* دستگیره شیت */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

          {/* اطلاعات محصول */}
          <ProductInfo />

          {/* باکس خرید */}
          <div className="my-6">
            <ProductBuyBox />
          </div>

          <ProductFeaturesBadge />
          <ProductSellers />
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
      </div>

    </div>
  );
}