"use client";

import { ChevronLeftIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function UserOrdersList({ orders }) {
  return (
    <div className="space-y-4">
      <h3 className="font-rokh font-black text-gray-900 text-base mb-2">سفارش‌های اخیر</h3>
      
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {order.status === "delivered" ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
              ) : (
                <ClockIcon className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-xs font-bold text-gray-800">{order.statusText}</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">{order.date}</span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <span className="text-gray-700 font-medium">{item.name} ({item.color})</span>
                <span className="font-bold text-gray-900">{item.price} تومان</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-gray-400">مبلغ کل: </span>
              <span className="font-black text-gray-900 text-sm">{order.totalPrice}</span>
              <span className="text-[10px] text-gray-500 mr-1">تومان</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer outline-none select-none [-webkit-tap-highlight-color:transparent]"
            >
              <span>جزئیات سفارش</span>
              <ChevronLeftIcon className="w-4 h-4 stroke-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}