"use client";

import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  ChevronLeftIcon,
  SparklesIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import Divider from "@/components/ui/Divider";

// وارد کردن Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


import SizeGuideModal from "./SizeGuideModal"; 
import SpecialOffersBox from "./SpecialOffersBox";

// آرایه ویژگی‌ها برای رندر آسان و تمیز
const FEATURES_LIST = [
  { title: "جنس پارچه", value: "کتان ۱۰۰٪ پنبه" },
  { title: "نوع تن‌خور", value: "آزاد (OverSize)" },
  { title: "مناسب فصل", value: "پاییز و زمستان" },
  { title: "نحوه شست‌وشو", value: "ماشین شست‌وشو (۳۰ درجه)" },
];

export default function ProductInfo({ onShowMoreFeatures, audioSrc }) {
  const [selectedColor, setSelectedColor] = useState("مشکی");
  const [selectedSize, setSelectedSize] = useState("L");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const currentAudioUrl = audioSrc || "/assets/Almaxanim.mp3";

  const colors = [
    { name: "مشکی", bgClass: "bg-black" },
    { name: "سفید", bgClass: "bg-white border border-gray-300" },
    { name: "کرم", bgClass: "bg-[#E6D7C3]" },
  ];

  const sizes = ["S", "M", "L", "XL", "2XL"];

  // راه‌اندازی Wavesurfer نسخه میله‌ای
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#DDD6FE", // violet-200 (رنگ میله‌های غیرفعال)
      progressColor: "#7C3AED", // violet-600 (رنگ میله‌های پرشده)
      barWidth: 2, // ضخامت میله‌ها
      barGap: 2, // فاصله بین میله‌ها
      barRadius: 2, // گردی لبه میله‌ها
      cursorWidth: 0, // حذف خط قرمز/نشانگر
      height: 26, // ارتفاع موج
      url: currentAudioUrl,
      normalize: true, // نرمال‌سازی ولوم برای نمایش زیباتر میله‌ها
    });

    wavesurferRef.current = ws;

    ws.on("ready", () => setIsLoaded(true));
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => setIsPlaying(false));

    return () => {
      ws.destroy();
    };
  }, [currentAudioUrl]);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handleShowMoreClick = () => {
    if (onShowMoreFeatures) {
      onShowMoreFeatures();
    } else {
      const element = document.getElementById("product-description");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* برند و عنوان محصول */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold font-rokh bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200">
            مردانه
          </span>
        </div>

        <h1 className="text-base lg:text-lg font-bold text-gray-900 mt-2 leading-relaxed">
          پیراهن مردانه کتان آستین بلند مدل OverSize، دوخت صنعتی با پارچه پنبه ۱۰۰٪ طبیعی
        </h1>
      </div>

      <Divider variant="gradient" color="primary" />

      {/* امتیاز و نظرات */}
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <span className="text-amber-500 font-bold flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-amber-400" />
          <span className="text-text-primary">۴.۷ </span>
          <span className="text-gray-400 font-normal">(امتیاز ۱۲۸ خریدار)</span>
        </span>

        <button className="flex items-center justify-center text-xs font-bold text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full hover:bg-primary-hover/10 transition-colors cursor-pointer">
          ۴۵ دیدگاه
        </button>
        <button className="flex items-center justify-center text-xs font-bold text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-full hover:bg-primary-hover/10 transition-colors cursor-pointer">
          ۱۲ پرسش
        </button>
      </div>

      {/* باکس مرور هوش مصنوعی */}
      <div className="pt-2">
        <div className="bg-violet-50/70 border border-violet-200/80 rounded-2xl p-2.5 px-3 flex items-center justify-between gap-3 shadow-xs select-none overflow-hidden">
          {/* بخش عنوان و لوگوی AI (راست‌چین) */}
          <div className="text-right shrink-0 flex items-center gap-1.5 sm:gap-2">
            <SparklesIcon className="w-5 h-5 text-violet-600 shrink-0 animate-pulse" />
            <div>
              <div className="text-xs font-bold text-violet-950 whitespace-nowrap">
                معرفی محصول
              </div>
              <div className="text-[10px] text-violet-600/90 font-medium whitespace-nowrap">
                توسط هوش مصنوعی
              </div>
            </div>
          </div>

          {/* بخش پلیر و Waveform میله‌ای */}
          <div className="flex items-center gap-2.5 [direction:ltr] min-w-0 flex-1 justify-start">
            <button
              type="button"
              onClick={toggleAudio}
              disabled={!isLoaded}
              className="w-9 h-9 rounded-full bg-white text-violet-600 shadow-md flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 z-10"
            >
              {isPlaying ? (
                <PauseIcon className="w-4 h-4 text-violet-600" />
              ) : (
                <PlayIcon className="w-4 h-4 text-violet-600 ml-0.5" />
              )}
            </button>

            {/* کانتینر رندر میله‌های صوتی توسط wavesurfer */}
            <div
              ref={containerRef}
              className="flex-1 min-w-0 cursor-pointer overflow-hidden max-w-[180px] sm:max-w-none"
            />
          </div>
        </div>
      </div>

      {/* انتخاب رنگ */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500">رنگ:</span>
          <span className="font-bold text-sm">{selectedColor}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {colors.map((color) => {
            const isSelected = selectedColor === color.name;

            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-secondary/50 bg-gray-300 text-primary shadow-md"
                    : "border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-secondary hover:bg-gray-200"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 border border-black/10 ${color.bgClass}`}
                />
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* انتخاب سایز */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">سایز:</span>
            <span className="font-bold text-sm">{selectedSize}</span>
          </div>

          {/* جایگزینی دکمه قبلی با مودال راهنمای سایز */}
          <SizeGuideModal />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                selectedSize === size
                  ? "border-secondary/50 bg-gray-300 text-primary shadow-md"
                  : "border border-secondary/10 bg-gray-200/60 backdrop-blur-md text-secondary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* ویژگی‌های لباس */}
      <div className="pt-2 border-t border-gray-100">
        <span className="font-bold text-sm block mb-3">ویژگی‌ها</span>

        <div className="block lg:hidden">
          <Swiper
            spaceBetween={8}
            slidesPerView={2.2}
            grabCursor={true}
            className="w-full !py-1"
          >
            {FEATURES_LIST.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-surface border border-cart-boarder backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] rounded-xl p-3 h-full">
                  <span className="text-xs text-gray-400 block mb-1">
                    {item.title}
                  </span>
                  <span className="text-xs font-bold text-gray-700 block truncate">
                    {item.value}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          className={`hidden lg:grid gap-2 ${
            FEATURES_LIST.length > 2 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {FEATURES_LIST.map((item, index) => (
            <div
              key={index}
              className="bg-surface border border-cart-boarder backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] rounded-xl p-3"
            >
              <span className="text-xs text-gray-400 block mb-1">
                {item.title}
              </span>
              <span className="text-xs font-bold text-gray-700 block">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* دکمه مشاهده همه ویژگی‌ها */}
      <Divider variant="gradient" color="primary" className="hidden lg:flex">
        <button
          onClick={handleShowMoreClick}
          className="text-xs text-primary font-bold flex items-center gap-1.5 border border-secondary/15 bg-gray-200/50 backdrop-blur-md px-3.5 py-2 rounded-xl hover:bg-gray-300/60 hover:border-secondary/30 transition-all cursor-pointer shadow-xs"
        >
          <span>مشاهده همه ویژگی‌ها</span>
          <ChevronLeftIcon className="w-4 h-4 text-primary" />
        </button>
      </Divider>

      {/* باکس ارسال رایگان و اقساط */}
      <div className="hidden lg:block">
        <SpecialOffersBox />
      </div>
    </div>
  );
}