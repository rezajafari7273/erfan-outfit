"use client";

import { ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EmptyCart() {
  return (
    <div className="border border-rose-100 rounded-3xl p-8 bg-white/80 backdrop-blur-md shadow-xs text-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
        <ShoppingBagIcon className="w-10 h-10 stroke-1.5" />
      </div>
      <h3 className="text-base font-black text-gray-800">سبد خرید شما خالی است!</h3>
      <p className="text-xs text-gray-500 leading-relaxed">
        می‌توانید برای مشاهده محصولات بیشتر به صفحه اصلی یا فروشگاه مراجعه کنید.
      </p>
      <button
        type="button"
        className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-6 py-3 rounded-2xl transition-all shadow-xs cursor-pointer"
      >
        <span>مشاهده محصولات</span>
        <ArrowLeftIcon className="w-4 h-4 stroke-2" />
      </button>
    </div>
  );
}