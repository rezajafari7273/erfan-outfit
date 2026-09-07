"use client";

import { useState } from "react";
import {
  HeartIcon,
  ShareIcon,
  BellIcon,
  ChartBarIcon,
  QueueListIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://via.placeholder.com/600x600/f3f4f6/000000?text=Mouse+1",
    "https://via.placeholder.com/600x600/f3f4f6/000000?text=Mouse+2",
    "https://via.placeholder.com/600x600/f3f4f6/000000?text=Mouse+3",
  ];

  return (
    <div className="flex flex-col items-center border border-gray-100 rounded-2xl p-4 relative">
      <div className="w-full flex items-center justify-between text-rose-600 font-bold mb-2">
        <span className="text-sm">پیشنهاد شگفت‌انگیز</span>
        <div className="flex items-center gap-1 text-xs bg-rose-50 px-2 py-1 rounded-md">
          <ClockIcon className="w-3.5 h-3.5" />
          <span dir="ltr">۲۶ : ۵۴ : ۴۲</span>
          <span className="bg-rose-600 text-white px-1.5 py-0.5 rounded text-[10px] mr-1">
            ۴۷٪ فروش رفته
          </span>
        </div>
      </div>

      <div className="relative w-full flex justify-center py-4">
        <div className="absolute right-0 top-0 flex flex-col gap-4 text-gray-400">
          <button className="hover:text-rose-500 transition-colors"><HeartIcon className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><ShareIcon className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><BellIcon className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><ChartBarIcon className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><QueueListIcon className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><ClipboardDocumentCheckIcon className="w-5 h-5" /></button>
        </div>

        <img
          src={images[selectedImage]}
          alt="تصویر محصول"
          className="w-72 h-72 object-contain"
        />
      </div>

      <div className="flex items-center gap-2 mt-4 overflow-x-auto w-full justify-center">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`w-16 h-16 border rounded-xl overflow-hidden p-1 transition-all ${
              selectedImage === idx
                ? "border-rose-500 ring-1 ring-rose-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt="thumbnail"
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      <div className="w-full flex items-center justify-between text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
          <InformationCircleIcon className="w-3.5 h-3.5" />
          گزارش مشخصات کالا
        </span>
        <span>DKP-19255465</span>
      </div>
    </div>
  );
}