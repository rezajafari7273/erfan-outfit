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
    "کیفیت ساخت محصول فوق‌العاده است. جنس بدنه بسیار محکم و طراحی شیکی دارد. خریدش رو کاملا پیشنهاد می‌کنم.",
  likes: 12 + i,
  isBuyer: i % 2 === 0,
}));

export default function ProductReviews() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="py-6 border-t border-gray-100">
      {/* هدر بخش دیدگاه‌ها */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">دیدگاه‌های کاربران</h2>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
            {MOCK_REVIEWS.length} نظر
          </span>
        </div>
        <button className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors">
          <PlusIcon className="w-4 h-4" />
          ثبت دیدگاه جدید
        </button>
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (نمایش ۵تایی + مشاهده بیشتر) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-4">
        <div className="space-y-4">
          {MOCK_REVIEWS.slice(0, visibleCount).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {visibleCount < MOCK_REVIEWS.length && (
          <div className="text-center pt-4">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-6 py-2.5 rounded-xl transition-colors"
            >
              مشاهده بیشتر
              <ChevronDownIcon className="w-4 h-4" />
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
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}

          {/* اسلاید آخر: کارت مشاهده همه */}
          <SwiperSlide>
            <div
              onClick={() => setIsMobileModalOpen(true)}
              className="h-full min-h-[180px] bg-gradient-to-br from-rose-50 to-rose-100/60 border border-rose-200/60 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-sm mb-3">
                <ChevronDownIcon className="w-6 h-6 -rotate-90" />
              </div>
              <span className="text-sm font-bold text-gray-900">مشاهده همه نظرات</span>
              <span className="text-xs text-gray-500 mt-1">
                ({MOCK_REVIEWS.length} دیدگاه ثبت شده)
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ========================================== */}
      {/* 📱 مودال تمام‌صفحه موبایل (لیست اسکرولی)   */}
      {/* ========================================== */}
      {isMobileModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* هدر مودال */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">همه دیدگاه‌ها</h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* لیست اسکرولی کامل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MOCK_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// کامپوننت کارت دیدگاه
function ReviewCard({ review }) {
  return (
    <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-800">{review.user}</span>
            {review.isBuyer && (
              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-md border border-emerald-200/50">
                خریدار
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400">{review.date}</span>
        </div>

        {/* امتیاز ستاره‌ای */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) =>
            i < review.rating ? (
              <StarSolidIcon key={i} className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <StarIcon key={i} className="w-3.5 h-3.5 text-gray-300" />
            )
          )}
        </div>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{review.comment}</p>
      </div>

      <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-gray-200/40 text-gray-400 text-xs">
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
          <HandThumbUpIcon className="w-4 h-4" />
          <span className="text-[11px]">{review.likes}</span>
        </button>
      </div>
    </div>
  );
}