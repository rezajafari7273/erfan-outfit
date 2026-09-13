"use client";

import { TruckIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function FreeShippingBar({ progressPercent, remainingForFreeShipping }) {
  return (
    <div className="border border-rose-100 rounded-3xl p-4 sm:p-5 bg-white/80 backdrop-blur-md shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0">
            <TruckIcon className="w-5 h-5 stroke-1.5" />
          </div>
          <div>
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs sm:text-sm font-bold text-gray-800">
                فقط{" "}
                <span className="text-rose-600 font-black tabular-nums">
                  {remainingForFreeShipping.toLocaleString("fa-IR")}
                </span>{" "}
                تومان دیگر تا <span className="text-emerald-600">ارسال رایگان</span>
              </p>
            ) : (
              <p className="text-xs sm:text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                <SparklesIcon className="w-4 h-4 text-amber-500" />
                تبریک! ارسال سفارش شما رایگان شد.
              </p>
            )}
          </div>
        </div>
        <span className="text-[11px] font-bold text-gray-500 self-end sm:self-auto tabular-nums">
          {progressPercent.toLocaleString("fa-IR")}٪
        </span>
      </div>

      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}