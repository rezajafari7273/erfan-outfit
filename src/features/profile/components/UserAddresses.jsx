"use client";

import { PlusIcon, MapPinIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UserAddresses({ addresses }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-rokh font-black text-gray-900 text-base">آدرس‌های ثبت‌شده</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-primary bg-rose-50 px-3 py-2 rounded-xl border border-rose-100 hover:bg-rose-100/70 transition-all cursor-pointer outline-none select-none [-webkit-tap-highlight-color:transparent]"
        >
          <PlusIcon className="w-4 h-4 stroke-2" />
          <span>افزودن آدرس جدید</span>
        </button>
      </div>

      {addresses.map((addr) => (
        <div key={addr.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-gray-800 text-xs">{addr.title}</span>
              {addr.isDefault && (
                <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">پیش‌فرض</span>
              )}
            </div>
            <button type="button" className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer outline-none">
              <TrashIcon className="w-4 h-4 stroke-1.5" />
            </button>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-medium">{addr.address}</p>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span>کد پستی: {addr.postalCode}</span>
            <span>گیرنده: {addr.receiver} ({addr.phone})</span>
          </div>
        </div>
      ))}
    </div>
  );
}