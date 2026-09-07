import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function InteractiveProductCard({ onPlayVideo }) {
  const variants = [
    {
      id: "green",
      name: "سبز",
      colorCode: "#2a9d8f",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // لینک نمونه embed ویدیو
    },
    {
      id: "blue",
      name: "آبی",
      colorCode: "#0077b6",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "orange",
      name: "نارنجی",
      colorCode: "#f4a261",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=500&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "purple",
      name: "بنفش",
      colorCode: "#7209b7",
      image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const availableSizes = ["S", "M", "L", "XL"];

  const handlePlayVideoClick = (e) => {
    e.stopPropagation();
    if (onPlayVideo) {
      onPlayVideo({
        id: `${selectedVariant.id}-${Date.now()}`, // اضافه کردن آی‌دی یکتا برای اجبار به رندر مجدد
        title: `معرفی هودی دورس اسپرت (${selectedVariant.name})`,
        videoUrl: selectedVariant.videoUrl,
      });
    }
  };

  return (
    <div className="group/card relative w-full lg:w-[275px] flex flex-row lg:flex-col items-center gap-3 lg:gap-0 rounded-[2rem] bg-primary/5 p-2.5 lg:p-2 text-secondary border border-cart-boarder shadow-xl transition-all duration-500 ease-out hover:-translate-y-1 lg:hover:-translate-y-2 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_20px_35px_-15px_rgba(229,193,88,0.25)] hover:shadow-primary/20 cursor-pointer">
      {/* ۱. بخش تصویر محصول */}
      <div className="relative h-32 w-32 sm:h-36 sm:w-36 lg:h-70 lg:w-full flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-black/20 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.4),0_8px_16px_-6px_rgba(229,193,88,0.15)]">
        {/* دکمه پخش ویدیو */}
        <button
          onClick={handlePlayVideoClick}
          title="پخش ویدیوی محصول"
          className="absolute top-2 left-2 z-30 w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-rose-900 transition-all duration-300"
        >
          <PlayIcon className="w-4 h-4 translate-x-0.5" />
        </button>

        {/* انیمیشن تعویض عکس */}
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedVariant.id}
            src={selectedVariant.image}
            alt={`هودی رنگ ${selectedVariant.name}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* بج تخفیف شیشه‌ای */}
        <div className="absolute top-0 right-5 lg:right-5 z-20 overflow-hidden rounded-b-xl rounded-t-none bg-white/10 backdrop-blur-md border border-t-0 border-white/30 px-0.5 py-0.25 lg:py-2.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
          <span className="font-black text-[10px] lg:text-sm text-primary/90">۱۲٪</span>
        </div>

        {/* پلت رنگی شیشه‌ای */}
        <div className="absolute bottom-1.5 lg:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1 rounded-full bg-white/10 backdrop-blur-md border border-white/30 p-1 lg:p-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-1 lg:gap-1.5">
            {variants.map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(item);
                }}
                title={item.name}
                className={`relative h-2.5 w-2.5 lg:h-3.5 lg:w-3.5 rounded-full border border-white/40 shadow-sm transition-all duration-300 ${
                  selectedVariant.id === item.id
                    ? "scale-125 ring-1 ring-white ring-offset-1 ring-offset-black/50"
                    : "opacity-75 hover:opacity-100 hover:scale-110"
                }`}
                style={{ backgroundColor: item.colorCode }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ۲. بخش اطلاعات */}
      <div className="flex-1 w-full min-w-0 text-right flex flex-col justify-between lg:justify-start gap-2.5 lg:gap-3 px-1 py-1 lg:px-4 lg:py-3.5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm lg:text-base font-bold text-[#131925] truncate">
              هودی دورس اسپرت
            </h3>
            <span className="text-[9px] lg:text-[10px] font-extrabold text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md px-2 lg:px-2.5 py-0.5 rounded-md shadow-sm shrink-0">
              {selectedVariant.name}
            </span>
          </div>
          <p className="text-[10px] lg:text-[11px] font-medium text-slate-500 line-clamp-2 lg:truncate">
            دوخت پریمیوم، پارچه داخل کُرک بسیار گرم و راحت برای استفاده روزمره
          </p>
        </div>

        <div className="hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-cart-boarder to-transparent" />

        <div className="flex items-end justify-between gap-1 mt-1 lg:mt-0">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] lg:text-[9px] font-bold text-slate-400">سایزها:</span>
            <div className="flex items-center gap-1">
              {availableSizes.map((size, index) => (
                <span
                  key={index}
                  className="flex h-4 w-5 lg:h-[22px] lg:w-[26px] items-center justify-center rounded-md lg:rounded-lg text-primary border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-[8px] lg:text-[10px] font-bold shadow-sm transition-colors cursor-default"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end leading-none shrink-0">
            <span className="text-[10px] lg:text-xs font-bold text-slate-400 line-through decoration-slate-600 mb-0.5 lg:mb-1">
              ۸۵۰,۰۰۰
            </span>
            <div className="flex items-baseline gap-0.5 lg:gap-1">
              <span className="text-sm lg:text-[17px] font-black text-emerald-700 tracking-tight">
                ۶۹۰,۰۰۰
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold text-slate-500">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}