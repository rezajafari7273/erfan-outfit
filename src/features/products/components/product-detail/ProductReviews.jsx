"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  StarIcon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  HandThumbUpIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

import "swiper/css";
import "swiper/css/pagination";

// داده‌های نمونه دیدگاه‌ها
const MOCK_REVIEWS = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  user: `کاربر ${i + 1}`,
  date: "۱۴ شهریور ۱۴۰۵",
  rating: 5 - (i % 2),
  comment:
    i % 2 === 0
      ? "کیفیت ساخت محصول فوق‌العاده است. جنس بدنه بسیار محکم و طراحی شیکی دارد. خریدش رو کاملا پیشنهاد می‌کنم. بسته‌بندی هم بسیار تمیز بود و سریع ارسال شد."
      : "محصول خوبیه ولی رنگش با چیزی که تو عکس بود یکم تفاوت داشت. در کل نسبت به قیمتش ارزش خرید داره و کیفیت پارچه‌اش عالیه.",
  likes: 12 + i,
  isBuyer: i % 2 === 0,
}));

export default function ProductReviews() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="pt-6 border-t border-rose-100/60 mb-8">
      {/* هدر بخش دیدگاه‌ها */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-gray-900">دیدگاه‌های کاربران</h2>
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded-full font-faNum">
            {MOCK_REVIEWS.length} نظر
          </span>
        </div>
        <button className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary border border-primary/20 px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer">
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          ثبت دیدگاه جدید
        </button>
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (نمایش ۵تایی + مشاهده بیشتر) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-4">
        <div className="space-y-3.5">
          {MOCK_REVIEWS.slice(0, visibleCount).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {visibleCount < MOCK_REVIEWS.length && (
          <div className="text-center pt-5">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/60 px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-98"
            >
              مشاهده بیشتر
              <ChevronDownIcon className="w-4 h-4 text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 📱 حالت موبایل (سوئیپر ۵تایی + کارت آخر)     */}
      {/* ========================================== */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView={1.15}
          centeredSlides={false}
          modules={[Pagination]}
          className="w-full !pb-4"
        >
          {/* ۵ دیدگاه اول */}
          {MOCK_REVIEWS.slice(0, 5).map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard
                review={review}
                isMobile
                onSelect={() => setSelectedReview(review)}
              />
            </SwiperSlide>
          ))}

          {/* اسلاید آخر: کارت مشاهده همه */}
          <SwiperSlide>
            <div
              onClick={() => setIsMobileModalOpen(true)}
              className="h-full min-h-[190px] bg-gradient-to-br from-rose-50/80 via-surface to-rose-100/40 border border-rose-200/70 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-transform shadow-xs"
            >
              <div className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-xs border border-rose-100 mb-2.5">
                <ChevronDownIcon className="w-5 h-5 rotate-90 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                مشاهده همه نظرات
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1 font-faNum">
                ({MOCK_REVIEWS.length} دیدگاه ثبت شده)
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ========================================== */}
      {/* 📱 Bottom Sheet نمایش متن کامل دیدگاه       */}
      {/* ========================================== */}
      {selectedReview && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          {/* بک‌دراپ */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedReview(null)}
          />

          {/* محتوای باتن شیت همراه با mb-24 */}
          <div className="relative w-full max-h-[80vh] pb-24 bg-white rounded-3xl  shadow-xl z-10 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* دستگیره بالا */}
            <div className="w-full pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* هدر باتن شیت */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 font-faNum">
                دیدگاه کاربر
              </span>
              <button
                onClick={() => setSelectedReview(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* بدنه باتن شیت */}
            <div className="p-5 overflow-y-auto space-y-4 pb-6">
              {/* هدر نظر: کاربر، خریدار، تاریخ */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-800">
                    {selectedReview.user}
                  </span>
                  {selectedReview.isBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <CheckBadgeIcon className="w-3 h-3 text-emerald-600" />
                      خریدار
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-gray-400 font-faNum">
                  {selectedReview.date}
                </span>
              </div>

              {/* امتیاز ستاره‌ای */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) =>
                  i < selectedReview.rating ? (
                    <StarSolidIcon key={i} className="w-4 h-4 text-amber-400" />
                  ) : (
                    <StarIcon key={i} className="w-4 h-4 text-gray-200" />
                  )
                )}
              </div>

              {/* متن کامل دیدگاه */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-xs font-medium text-gray-800 leading-relaxed">
                  {selectedReview.comment}
                </p>
              </div>

              {/* دکمه لایک */}
              <div className="flex items-center justify-end pt-2">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-emerald-600 transition-colors py-1.5 px-3 rounded-xl bg-gray-100/70 hover:bg-emerald-50 cursor-pointer">
                  <HandThumbUpIcon className="w-4 h-4" />
                  <span className="text-xs font-bold font-faNum">
                    مفید بود ({selectedReview.likes})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 📱 مودال تمام‌صفحه موبایل (لیست اسکرولی)   */}
      {/* ========================================== */}
      {isMobileModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 py-3.5 flex items-center justify-between shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-primary" />
              همه دیدگاه‌ها
            </h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isMobile
                onSelect={(selected) => {
                  setIsMobileModalOpen(false);
                  setSelectedReview(selected);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// کامپوننت کارت دیدگاه
function ReviewCard({ review, isMobile = false, onSelect }) {
  return (
    <div
      onClick={isMobile ? onSelect : undefined}
      className={`bg-surface/70 backdrop-blur-xs border border-secondary/15 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:border-rose-200 transition-colors h-full ${
        isMobile ? "cursor-pointer active:scale-[0.99]" : ""
      }`}
    >
      <div>
        {/* هدر کارت: نام کاربر، بج خریدار و تاریخ */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-800">{review.user}</span>
            {review.isBuyer && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                <CheckBadgeIcon className="w-3 h-3 text-emerald-600" />
                خریدار
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-gray-400 font-faNum">
            {review.date}
          </span>
        </div>

        {/* امتیاز ستاره‌ای */}
        <div className="flex items-center gap-0.5 mb-2.5">
          {[...Array(5)].map((_, i) =>
            i < review.rating ? (
              <StarSolidIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <StarIcon key={i} className="w-3.5 h-3.5 text-gray-200" />
            )
          )}
        </div>

        {/* متن نظر - در موبایل حداکثر ۲ خط برای یکنواخت ماندن باکس‌ها */}
        <p
          className={`text-xs font-medium text-gray-700 leading-relaxed ${
            isMobile ? "line-clamp-2" : "line-clamp-3"
          }`}
        >
          {review.comment}
        </p>
      </div>

      {/* بخش پایین کارت */}
      <div className="mt-3 pt-2.5 border-t border-secondary/10 flex items-center justify-between text-gray-400 text-xs">
        {isMobile ? (
          <div className="w-full flex items-center justify-between">
            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
              مشاهده کامل نظر
              <ChevronLeftIcon className="w-3.5 h-3.5" />
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold font-faNum text-gray-400">
              <HandThumbUpIcon className="w-3.5 h-3.5" />
              {review.likes}
            </span>
          </div>
        ) : (
          <div className="w-full flex justify-end">
            <button className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors py-0.5 px-2 rounded-lg hover:bg-emerald-50/50 cursor-pointer">
              <HandThumbUpIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold font-faNum">
                {review.likes}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}