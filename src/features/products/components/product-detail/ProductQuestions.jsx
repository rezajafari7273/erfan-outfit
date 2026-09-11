"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
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
    <section className="pt-6 border-t border-rose-100/60">
      {/* هدر بخش پرسش‌ها */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-gray-900">پرسش و پاسخ</h2>
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded-full font-faNum">
            {MOCK_QUESTIONS.length} پرسش
          </span>
        </div>
        <button className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary border border-primary/20 px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer">
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          ثبت پرسش جدید
        </button>
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (نمایش ۵تایی + مشاهده بیشتر) */}
      {/* ========================================== */}
      <div className="hidden lg:block space-y-4">
        <div className="space-y-3.5">
          {MOCK_QUESTIONS.slice(0, visibleCount).map((q) => (
            <QuestionCard key={q.id} data={q} />
          ))}
        </div>

        {visibleCount < MOCK_QUESTIONS.length && (
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
              className="h-full min-h-[190px] bg-gradient-to-br from-rose-50/80 via-surface to-rose-100/40 border border-rose-200/70 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer active:scale-98 transition-transform shadow-xs"
            >
              <div className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-xs border border-rose-100 mb-2.5">
                <ChevronDownIcon className="w-5 h-5 rotate-90 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-gray-900">مشاهده همه پرسش‌ها</span>
              <span className="text-[11px] text-gray-500 font-medium mt-1 font-faNum">
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
        <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col">
          {/* هدر مودال */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 py-3.5 flex items-center justify-between shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-primary" />
              همه پرسش‌ها و پاسخ‌ها
            </h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* لیست اسکرولی کامل با افزودن pb-28 جهت جلوگیری از اورلپ با دکمه خرید */}
          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
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
    <div className="bg-surface/70 backdrop-blur-xs border border-secondary/15 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:border-rose-200 transition-colors">
      <div>
        {/* پرسش */}
        <div className="flex items-start gap-2.5 mb-3">
          <QuestionMarkCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-800">{data.user}</span>
              <span className="text-[10px] font-medium text-gray-400 font-faNum">{data.date}</span>
            </div>
            <p className="text-xs font-semibold text-gray-900 leading-relaxed">
              {data.question}
            </p>
          </div>
        </div>

        {/* پاسخ */}
        {data.answer && (
          <div className="mr-2 pr-3 border-r-2 border-primary bg-rose-50/50 p-3 rounded-l-xl border-y border-l border-rose-100/60">
            <div className="flex items-center gap-1.5 mb-1 text-primary">
              <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">پاسخ پشتیبانی</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">{data.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}