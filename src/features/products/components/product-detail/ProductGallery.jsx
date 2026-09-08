"use client";

import { useState } from "react";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ProductGallery({ isMobile = false }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80",
  ];

  if (isMobile) {
    return (
      <>
        {/* تصویر پس‌زمینه بدون هیچ پدینگ یا کادر سفید */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={images[selectedImage]}
            alt="تصویر اصلی محصول"
            className="w-full h-full object-cover"
            onClick={() => setIsModalOpen(true)}
          />

          {/* آیکون‌های شناور سمت راست (لایک و اشتراک) */}
          <div className="absolute right-4 top-24 flex flex-col gap-3 z-10">
            <button className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center text-gray-900 active:scale-95 transition-transform">
              <ShareIcon className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/30 shadow-md flex items-center justify-center text-gray-900 active:scale-95 transition-transform hover:text-rose-600">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>

          {/* تصاویر تامبنیل شیشه‌ای شناور روی عکس */}
          <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-2 px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-12 h-12 rounded-2xl overflow-hidden border backdrop-blur-md p-0.5 transition-all ${
                  selectedImage === idx
                    ? "border-white bg-white/60 scale-105 shadow-md ring-2 ring-white/40"
                    : "border-white/30 bg-white/20 opacity-80"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
        </div>

        {/* مودال بزرگنمایی */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between text-white">
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full bg-white/10">
                <XMarkIcon className="w-6 h-6" />
              </button>
              <span className="text-xs text-gray-400">{selectedImage + 1} از {images.length}</span>
            </div>
            <div className="w-full h-[70vh] flex items-center justify-center">
              <img src={images[selectedImage]} alt="تصویر" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center border border-gray-100 rounded-2xl p-4 relative">
      <img src={images[selectedImage]} alt="تصویر محصول" className="w-72 h-72 object-contain" />
      <div className="flex items-center gap-2 mt-4">
        {images.map((img, idx) => (
          <button key={idx} onClick={() => setSelectedImage(idx)} className="w-16 h-16 border rounded-xl overflow-hidden p-1">
            <img src={img} alt="thumb" className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}