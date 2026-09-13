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
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import "swiper/css";

// داده‌های نمونه با پشتیبانی از چندین پاسخ برای هر پرسش
const MOCK_QUESTIONS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  user: `کاربر ${i + 1}`,
  date: "۱۰ شهریور ۱۴۰۵",
  question:
    i % 2 === 0
      ? "آیا این محصول گارانتی شرکتی هم دارد؟ شرایط استفاده از گارانتی به چه صورت است و در صورت بروز مشکل باید به کجا مراجعه کنیم؟"
      : "زمان دقیق ارسال برای شهرستان‌ها چقدر است؟",
  answers:
    i % 3 === 0
      ? [
          {
            id: 1,
            author: "پشتیبانی فنی",
            date: "۱۰ شهریور ۱۴۰۵",
            text: "سلام وقت بخیر. بله، تمامی محصولات دارای ۱۸ ماه گارانتی معتبر شرکتی به همراه کد رجیستری هستند.",
          },
          {
            id: 2,
            author: "تأمین‌کننده رسمی",
            date: "۱۱ شهریور ۱۴۰۵",
            text: "جهت استفاده از خدمات گارانتی، نگهداری جعبه محصول به همراه کارت گارانتی الزامی است.",
          },
        ]
      : [
          {
            id: 1,
            author: "پشتیبانی فروش",
            date: "۱۰ شهریور ۱۴۰۵",
            text: "ارسال برای شهرستان‌ها بین ۲ تا ۴ روز کاری زمان می‌برد.",
          },
        ],
}));

export default function ProductQuestions() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

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
              <QuestionCard
                data={q}
                isMobile
                onSelect={() => setSelectedQuestion(q)}
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
                مشاهده همه پرسش‌ها
              </span>
              <span className="text-[11px] text-gray-500 font-medium mt-1 font-faNum">
                ({MOCK_QUESTIONS.length} پرسش ثبت شده)
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ========================================== */}
      {/* 📱 Bottom Sheet نمایش جزئیات پرسش انتخابی  */}
      {/* ========================================== */}
      {selectedQuestion && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          {/* بک‌دراپ */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedQuestion(null)}
          />

          {/* محتوای باتن شیت */}
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl pb-24 shadow-xl z-10 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* دستگیره بالا */}
            <div className="w-full pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            {/* هدر باتن شیت */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 font-faNum">
                پرسش شماره {selectedQuestion.id}
              </span>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* بدنه باتن شیت */}
            <div className="p-5 overflow-y-auto space-y-5 pb-10">
              {/* پرسش کامل */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">
                    {selectedQuestion.user}
                  </span>
                  <span className="text-[10px] font-medium text-gray-400 font-faNum">
                    {selectedQuestion.date}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <QuestionMarkCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-gray-900 leading-relaxed">
                    {selectedQuestion.question}
                  </p>
                </div>
              </div>

              {/* لیست پاسخ‌ها */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-primary" />
                  <span>پاسخ‌ها ({selectedQuestion.answers?.length || 0})</span>
                </div>

                {selectedQuestion.answers && selectedQuestion.answers.length > 0 ? (
                  selectedQuestion.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="bg-rose-50/60 border border-rose-100 p-3.5 rounded-2xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-primary">
                          {ans.author}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400 font-faNum">
                          {ans.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed font-medium">
                        {ans.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-2">
                    هنوز پاسخی برای این پرسش ثبت نشده است.
                  </p>
                )}
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
              همه پرسش‌ها و پاسخ‌ها
            </h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
            {MOCK_QUESTIONS.map((q) => (
              <QuestionCard
                key={q.id}
                data={q}
                isMobile
                onSelect={(selected) => {
                  setIsMobileModalOpen(false);
                  setSelectedQuestion(selected);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// کامپوننت کارت پرسش به همراه مدیریت قطع شدن متن و دکمه ادامه در موبایل
function QuestionCard({ data, isMobile = false, onSelect }) {
  const primaryAnswer = data.answers && data.answers[0];
  const totalAnswers = data.answers ? data.answers.length : 0;

  return (
    <div
      onClick={isMobile ? onSelect : undefined}
      className={`bg-surface/70 backdrop-blur-xs border border-secondary/15 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:border-rose-200 transition-colors h-full ${
        isMobile ? "cursor-pointer active:scale-[0.99]" : ""
      }`}
    >
      <div>
        {/* پرسش */}
        <div className="flex items-start gap-2.5 mb-3">
          <QuestionMarkCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-800">{data.user}</span>
              <span className="text-[10px] font-medium text-gray-400 font-faNum">
                {data.date}
              </span>
            </div>
            <p
              className={`text-xs font-semibold text-gray-900 leading-relaxed ${
                isMobile ? "line-clamp-2" : ""
              }`}
            >
              {data.question}
            </p>
          </div>
        </div>

        {/* اولین پاسخ */}
        {primaryAnswer && (
          <div className="mr-2 pr-3 border-r-2 border-primary bg-rose-50/50 p-3 rounded-l-xl border-y border-l border-rose-100/60">
            <div className="flex items-center justify-between mb-1 text-primary">
              <div className="flex items-center gap-1.5">
                <ChatBubbleLeftRightIcon className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{primaryAnswer.author}</span>
              </div>
              {totalAnswers > 1 && (
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold font-faNum">
                  {totalAnswers} پاسخ
                </span>
              )}
            </div>
            <p
              className={`text-xs text-gray-600 leading-relaxed font-medium ${
                isMobile ? "line-clamp-2" : ""
              }`}
            >
              {primaryAnswer.text}
            </p>
          </div>
        )}
      </div>

      {/* لینک مشاهده کامل در حالت موبایل */}
      {isMobile && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-end gap-1 text-[11px] font-bold text-primary">
          <span>مشاهده پاسخ‌ها و متن کامل</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}