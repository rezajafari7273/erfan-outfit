"use client";

import { useState, useRef, useEffect } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  HeartIcon as HeartOutlineIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function ProductGallery({
  product,
  isMobile = false,
  selectedVariant = null,
  onShare = null,
  onFavoriteToggle = null,
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dragStartX = useRef(null);
  const dragEndX = useRef(null);

  // ۱. گالری از product.gallery
  const galleryFromApi = Array.isArray(product?.gallery)
    ? product.gallery.map((g) => g.url).filter(Boolean)
    : [];

  // ۲. تصویر واریانت انتخاب‌شده (اول لیست)
  const variantImage = selectedVariant?.image || null;

  // ۳. تصاویر بقیه واریانت‌ها (بعدش)
  const otherVariantImages = Array.isArray(product?.variants)
    ? product.variants
        .map((v) => v.image)
        .filter((img) => img && img !== variantImage)
    : [];

  // ۴. تصویر اصلی (آخر)
  const mainImage = product?.main_image ? [product.main_image] : [];

  // ترتیب نهایی
  const images = [
    ...new Set([
      ...(variantImage ? [variantImage] : []),
      ...galleryFromApi,
      ...otherVariantImages,
      ...mainImage,
    ]),
  ];

  // وقتی رنگ عوض شد، برو به تصویر اول
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedVariant?.id]);

  // مدیریت تغییر وضعیت علاقه مندی
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
    if (onFavoriteToggle) {
      onFavoriteToggle(!isLiked);
    }
  };

  // مدیریت اشتراک گذاری
  const handleShareClick = async (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title || "محصول",
          url: window.location.href,
        });
      } catch (err) {
        console.log("انصراف از اشتراک‌گذاری", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("لینک محصول کپی شد!");
    }
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-[480px] rounded-3xl border border-[#E0DCD3] bg-[#FAF8F5] flex items-center justify-center">
        <span className="text-gray-400 text-xs">
          تصویری برای این محصول ثبت نشده است.
        </span>
      </div>
    );
  }

  const handleNext = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

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

  // بج‌های گلس‌مورفیسم روی تصویر اصلی - فقط در سایز lg به بالا نمایش داده می‌شوند
  const renderActionBadges = () => (
    <div className="hidden lg:flex flex-col-reverse absolute top-4 right-4 z-10 items-center gap-2">
      {/* دکمه علاقه مندی */}
      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="w-8 h-8 rounded-md border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs outline-none border-white/20 bg-black/30 text-white shadow-black/10"
      >
        {isLiked ? (
          <HeartSolidIcon className="w-3.5 h-3.5 text-primary transition-transform scale-110" />
        ) : (
          <HeartOutlineIcon className="w-3.5 h-3.5 text-primary stroke-1.5" />
        )}
      </button>

      {/* دکمه اشتراک گذاری */}
      <button
        type="button"
        onClick={handleShareClick}
        aria-label="اشتراک‌گذاری"
        className="w-8 h-8 rounded-md border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs outline-none border-white/20 bg-black/30 text-white shadow-black/10"
      >
        <ShareIcon className="w-3.5 h-3.5 text-primary stroke-1.5" />
      </button>
    </div>
  );

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
              isMobileLayout
                ? "w-12 h-12 rounded-xl p-0.5 backdrop-blur-md"
                : "w-16 h-16 rounded-2xl p-0.5"
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
            <img
              src={img}
              alt="thumb"
              className="w-full h-full object-cover rounded-xl"
            />
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
      <div className="relative w-full h-full select-none overflow-hidden">
        {renderActionBadges()}

        <img
          src={images[selectedImage]}
          alt={product?.title || "تصویر اصلی محصول"}
          className="w-full h-full object-cover cursor-pointer z-0"
          onClick={() => setIsModalOpen(true)}
        />

        <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center">
          {renderThumbnails(true)}
        </div>

        {isModalOpen && renderModal()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center relative select-none">
      <div className="relative w-full h-[480px] border border-[#E0DCD3] rounded-3xl p-2 bg-gradient-to-b from-[#FAF8F5] to-[#EAE5DC] overflow-hidden">
        {renderActionBadges()}

        <img
          src={images[selectedImage]}
          alt={product?.title || "تصویر محصول"}
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
        <div className="flex items-center justify-between text-white/80 z-20">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-6 h-6 stroke-1.5" />
          </button>

          <span className="text-xs font-mono tracking-widest text-white/60">
            {String(selectedImage + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

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
              alt={product?.title || "نمای بزرگ محصول"}
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

        <div className="flex items-center justify-center gap-2 z-10 pb-2 overflow-x-auto">
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
              <img
                src={img}
                alt="thumb"
                className="w-full h-full object-cover rounded-lg pointer-events-none"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }
}