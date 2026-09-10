"use client";

import { useState, useRef } from "react";
import { 
  HeartIcon, 
  ShareIcon, 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

export default function ProductGallery({ isMobile = false }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dragStartX = useRef(null);
  const dragEndX = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80",
  ];

  const handleNext = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // منطق Swipe مخصوص مودال
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragEndX.current = null;
  };

  const handleTouchMove = (e) => {
    dragEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!dragStartX.current || !dragEndX.current) return;
    const distance = dragStartX.current - dragEndX.current;
    if (distance > 40) handleNext();
    else if (distance < -40) handlePrev();

    dragStartX.current = null;
    dragEndX.current = null;
  };

  const renderThumbnails = (isMobileLayout = false) => {
    const hasMore = images.length > 4;
    const visibleImages = hasMore ? images.slice(0, 3) : images.slice(0, 4);

    return (
      <div className={`flex items-center gap-2 ${isMobileLayout ? "px-4" : "mt-3"}`}>
        {visibleImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedImage(idx)}
            className={`${
              isMobileLayout ? "w-12 h-12 rounded-xl p-0.5 backdrop-blur-md" : "w-16 h-16 rounded-2xl p-0.5"
            } border overflow-hidden transition-all duration-200 cursor-pointer ${
              selectedImage === idx
                ? isMobileLayout
                  ? "border-white bg-white/60"
                  : "border-[#333] bg-white"
                : isMobileLayout
                  ? "border-white/20 bg-white/10 opacity-70"
                  : "border-[#E5E3DC] bg-[#FAF8F5] opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="thumb" className="w-full h-full object-cover rounded-xl" />
          </button>
        ))}

        {hasMore && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={`${
              isMobileLayout 
                ? "w-12 h-12 rounded-xl border-white/20 bg-white/10 text-white backdrop-blur-md" 
                : "w-16 h-16 rounded-2xl border-[#E5E3DC] bg-[#FAF8F5] text-[#333] hover:border-[#333]"
            } border flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95`}
          >
            <EllipsisHorizontalIcon className={isMobileLayout ? "w-5 h-5" : "w-6 h-6"} />
          </button>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="absolute inset-0 w-full h-full select-none overflow-hidden">
        {/* تصویر اصلی محصول */}
        <img
          src={images[selectedImage]}
          alt="تصویر اصلی محصول"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />

        {/* هدر شناور با دکمه‌های شیشه‌ای مدرن و لوکس */}
        <div className="absolute top-5 left-4 right-4 z-20 flex items-center justify-between">
          {/* دکمه بستن شیشه‌ای */}
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all duration-200 cursor-pointer shadow-lg shadow-black/5"
          >
            <XMarkIcon className="w-5 h-5 stroke-1.5" />
          </button>

          {/* گروه دکمه‌های سمت راست */}
          <div className="flex items-center gap-2.5">
            {/* دکمه سبد خرید شیشه‌ای */}
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all duration-200 cursor-pointer shadow-lg shadow-black/5"
              title="سبد خرید"
            >
              <ShoppingBagIcon className="w-5 h-5 stroke-1.5" />
            </button>

            {/* دکمه سه نقطه عمودی شیشه‌ای */}
            <button
              type="button"
              onClick={() => setIsBottomSheetOpen(true)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white active:scale-90 transition-all duration-200 cursor-pointer shadow-lg shadow-black/5"
              title="گزینه‌ها"
            >
              <EllipsisVerticalIcon className="w-5 h-5 stroke-1.5" />
            </button>
          </div>
        </div>

        {/* تامبنیل‌های پایین */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center">
          {renderThumbnails(true)}
        </div>

        {/* باتن شیت شیک و لوکس برای حالت موبایل */}
        {isBottomSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* دیو پس‌زمینه تاریک با کلیک برای بستن */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsBottomSheetOpen(false)}
            />

            {/* محتوای اصلی Bottom Sheet */}
            <div className="relative w-full max-w-lg bg-[#141416]/90 border-t border-white/15 rounded-t-[32px] p-6 pb-8 backdrop-blur-2xl shadow-2xl z-10 transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
              {/* دستگیره بالای باتن شیت (Drag Handle) */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              <div className="flex flex-col gap-2">
                {/* گزینه افزودن به علاقه‌مندی‌ها */}
                <button
                  type="button"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-sm font-medium text-white/90">
                    {isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                  </span>
                  <HeartIcon className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-white/70"}`} />
                </button>

                {/* گزینه به اشتراک گذاشتن */}
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: "Product", url: window.location.href });
                    }
                    setIsBottomSheetOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span className="text-sm font-medium text-white/90">به اشتراک گذاشتن</span>
                  <ShareIcon className="w-5 h-5 text-white/70 stroke-1.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* مودال بزرگ‌نمایی */}
        {isModalOpen && renderModal()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative select-none">
      <div className="w-full h-[420px] border border-[#E0DCD3] rounded-3xl p-2 bg-gradient-to-b from-[#FAF8F5] to-[#EAE5DC] overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt="تصویر محصول" 
          className="w-full h-full object-cover rounded-2xl cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {renderThumbnails(false)}

      {isModalOpen && renderModal()}
    </div>
  );

  function renderModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col justify-between p-6 sm:p-8 select-none">
        {/* هدر ساده مودال */}
        <div className="flex items-center justify-between text-white/80 z-20">
          <button 
            type="button"
            onClick={() => setIsModalOpen(false)} 
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-6 h-6 stroke-1.5" />
          </button>
          
          <span className="text-xs font-mono tracking-widest text-white/60">
            0{selectedImage + 1} / 0{images.length}
          </span>
        </div>

        {/* عکس مودال همراه با درگ/لمس */}
        <div 
          className="relative w-full h-[65vh] flex items-center justify-center my-auto cursor-grab active:cursor-grabbing touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          <button 
            type="button"
            onClick={handlePrev}
            className="absolute right-2 sm:right-8 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer active:scale-95"
          >
            <ChevronRightIcon className="w-5 h-5 stroke-1.5" />
          </button>

          <div className="w-full h-full flex items-center justify-center p-2">
            <img 
              src={images[selectedImage]} 
              alt="نمای بزرگ محصول" 
              className="max-w-full max-h-full h-full w-auto object-contain select-none pointer-events-none"
            />
          </div>

          <button 
            type="button"
            onClick={handleNext}
            className="absolute left-2 sm:left-8 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeftIcon className="w-5 h-5 stroke-1.5" />
          </button>
        </div>

        {/* تامبنیل‌های مودال */}
        <div className="flex items-center justify-center gap-2 z-10 pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl overflow-hidden border p-0.5 transition-all cursor-pointer ${
                selectedImage === idx
                  ? "border-white/80 bg-white/20 opacity-100"
                  : "border-white/10 bg-black/20 opacity-40 hover:opacity-80"
              }`}
            >
              <img src={img} alt="thumb" className="w-full h-full object-cover rounded-lg pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    );
  }
}