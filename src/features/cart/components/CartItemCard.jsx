"use client";

import { PlusIcon, MinusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CartItemCard({ item, onIncrease, onDecrease }) {
  return (
    <div className="border border-rose-100/80 rounded-3xl p-4 sm:p-5 bg-white/80 backdrop-blur-md shadow-xs transition-all hover:border-rose-200 flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold">
        تصویر محصول
      </div>

      <div className="flex-1 w-full space-y-2 text-right">
        <h3 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500 font-bold">
          <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg">
            رنگ: <span className="text-gray-800">{item.color}</span>
          </span>
          <span className="bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg">
            سایز: <span className="text-gray-800">{item.size}</span>
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">{item.seller}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100/80">
          <div className="flex items-center gap-2 border border-rose-100 bg-rose-50/30 rounded-xl p-1">
            <button
              type="button"
              onClick={() => onIncrease(item.id)}
              className="w-7 h-7 rounded-lg bg-white border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <PlusIcon className="w-3.5 h-3.5 stroke-2" />
            </button>

            <span className="text-xs font-black text-gray-800 px-2 tabular-nums">
              {item.quantity.toLocaleString("fa-IR")}
            </span>

            <button
              type="button"
              onClick={() => onDecrease(item.id)}
              className="w-7 h-7 rounded-lg bg-white border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              {item.quantity === 1 ? (
                <TrashIcon className="w-3.5 h-3.5 stroke-2 text-rose-500" />
              ) : (
                <MinusIcon className="w-3.5 h-3.5 stroke-2" />
              )}
            </button>
          </div>

          <div className="text-left">
            {item.discountPercent > 0 && (
              <div className="flex items-center gap-1.5 justify-end">
                <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {item.discountPercent.toLocaleString("fa-IR")}٪
                </span>
                <span className="text-[11px] text-gray-400 line-through tabular-nums">
                  {(item.originalPrice * item.quantity).toLocaleString("fa-IR")}
                </span>
              </div>
            )}
            <div className="text-sm sm:text-base font-black text-gray-900 tabular-nums">
              {(item.price * item.quantity).toLocaleString("fa-IR")}{" "}
              <span className="text-[10px] text-gray-500 font-bold">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}