"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import "swiper/css";

// داده‌های نمونه پرسش و پاسخ
const MOCK_QUESTIONS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  user: `کاربر ${i + 1}`,
  date: "۱۰ شهریور ۱۴۰۵",
  question: "آیا این محصول گارانتی شرکتی هم دارد؟",
  answer:
    "سلام وقت بخیر. بله، تمامی محصولات دارای ۱۸ ماه گارانتی معتبر شرکتی به همراه کد رجیستری هستند.",
}));

export default function ProductQuestions() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <section className="py-6 border-t border-gray-100">
      {/* هدر بخش پرسش‌ها */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">پرسش و پاسخ</h2>
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
            {MOCK_QUESTIONS.length} پرسش
          </span>
        </div>
        <button className="text-xs font-bold text-gray-700 hover:text-gray-900 flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-xl transition-colors">
          <PlusIcon className="w-4 h-4" />
          ثبت پرسش جدید
        </button>
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (نمایش ۵تایی + مشاهده بیشتر) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-4">
        <div className="space-y-4">
          {MOCK_QUESTIONS.slice(0, visibleCount).map((q) => (
            <QuestionCard key={q.id} data={q} />
          ))}
        </div>

        {visibleCount < MOCK_QUESTIONS.length && (
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
        <Swiper spaceBetween={12} slidesPerView={1.15} className="w-full !pb-4">
          {/* ۵ پرسش اول */}
          {MOCK_QUESTIONS.slice(0, 5).map((q) => (
            <SwiperSlide key={q.id}>
              <QuestionCard data={q} />
            </SwiperSlide>
          ))}

          {/* اسلاید آخر: کارت مشاهده همه */}
          <SwiperSlide>
            <div
              onClick={() => setIsMobileModalOpen(true)}
              className="h-full min-h-[180px] bg-gradient-to-br from-gray-100 to-gray-200/60 border border-gray-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-transform"
            >
              <div className="w-12 h-12 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-sm mb-3">
                <ChevronDownIcon className="w-6 h-6 -rotate-90" />
              </div>
              <span className="text-sm font-bold text-gray-900">مشاهده همه پرسش‌ها</span>
              <span className="text-xs text-gray-500 mt-1">
                ({MOCK_QUESTIONS.length} پرسش ثبت شده)
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
            <h3 className="font-bold text-gray-900 text-base">همه پرسش‌ها و پاسخ‌ها</h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* لیست اسکرولی کامل */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MOCK_QUESTIONS.map((q) => (
              <QuestionCard key={q.id} data={q} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// کامپوننت کارت پرسش
function QuestionCard({ data }) {
  return (
    <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between">
      <div>
        {/* پرسش */}
        <div className="flex items-start gap-2 mb-3">
          <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-800">{data.user}</span>
              <span className="text-[10px] text-gray-400">{data.date}</span>
            </div>
            <p className="text-xs font-medium text-gray-900 leading-relaxed">
              {data.question}
            </p>
          </div>
        </div>

        {/* پاسخ */}
        {data.answer && (
          <div className="mr-3 pr-3 border-r-2 border-rose-400 bg-white/60 p-2.5 rounded-l-xl">
            <div className="flex items-center gap-1.5 mb-1 text-rose-600">
              <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">پاسخ پشتیبانی</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{data.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}