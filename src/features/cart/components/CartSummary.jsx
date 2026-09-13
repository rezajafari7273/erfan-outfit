"use client";

import { useState } from "react";
import { TagIcon, ShieldCheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button"; // مسیر ایمپورت را بر اساس ساختار پروژه خود چک کنید

export default function CartSummary({
  totalItemsCount,
  rawTotalPrice,
  totalDiscount,
  finalPrice,
  isFreeShipping,
  onApplyCoupon,
  appliedDiscount,
}) {
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyCoupon(couponCode);
  };

  return (
    <div className="border border-rose-100 rounded-3xl p-5 bg-white/80 backdrop-blur-md shadow-xs space-y-4">
      <h3 className="font-bold text-sm text-gray-800 pb-3 border-b border-gray-100">
        اطلاعات پرداخت
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <TagIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="کد تخفیف (مثال: off20)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full bg-gray-50/80 border border-gray-200 text-xs font-bold rounded-2xl pr-9 pl-3 py-2.5 outline-none focus:border-rose-400 focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>
        <Button type="submit" variant="primary" size="md" className="shrink-0">
          اعمال
        </Button>
      </form>

      <div className="space-y-3 text-xs pt-2">
        <div className="flex items-center justify-between text-gray-600 font-bold">
          <span>قیمت کالاها ({totalItemsCount.toLocaleString("fa-IR")})</span>
          <span className="tabular-nums font-black text-gray-800">
            {rawTotalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex items-center justify-between text-rose-600 font-bold">
            <span>سود شما از خرید</span>
            <span className="tabular-nums font-black">
              {totalDiscount.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}

        {appliedDiscount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-bold">
            <span>کد تخفیف</span>
            <span className="tabular-nums font-black">
              {appliedDiscount.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-600 font-bold">
          <span>هزینه ارسال</span>
          <span>
            {isFreeShipping ? (
              <span className="text-emerald-600 font-black">رایگان</span>
            ) : (
              <span className="tabular-nums text-gray-800 font-black">۴۹,۰۰۰ تومان</span>
            )}
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="font-black text-sm text-gray-900">مبلغ قابل پرداخت</span>
          <div className="text-left">
            <span className="text-base sm:text-lg font-black text-rose-600 tabular-nums">
              {finalPrice.toLocaleString("fa-IR")}
            </span>
            <span className="text-[10px] text-gray-500 font-bold mr-1">تومان</span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        icon={ArrowLeftIcon}
        iconPosition="left"
        className="w-full font-black rounded-2xl"
      >
        تکمیل و ثبت سفارش
      </Button>

      <div className="pt-2 text-[11px] text-gray-500 flex items-center justify-center gap-1.5 border-t border-gray-100">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>گارانتی بازگشت وجه و ضمانت اصالت کالا</span>
      </div>
    </div>
  );
}