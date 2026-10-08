"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  ChevronLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// 1. ایمپورت کامپوننت Alert
import Alert from "@/components/ui/Alert";

import "swiper/css";
import "swiper/css/pagination";

// داده‌های نمونه ...
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
        ]
      : [],
}));

export default function ProductQuestions() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // ---- استیت ثبت پرسش جدید ----
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---- استیت Toast Alert ----
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 4000);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAddQuestionOpen(false);
      setQuestionText("");

      // نمایش Toast Alert انیمیشنی
      triggerToast("پرسش شما با موفقیت ثبت شد و پس از بررسی پاسخ داده خواهد شد.");
    }, 800);
  };

  return (
    <section className="pt-6 border-t border-rose-100/60 mb-8 relative">
      {/* 🔔 Toast Alert بالای صفحه با استفاده از Alert Component */}
      {toast.show && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[120] w-[92%] max-w-md animate-in slide-in-from-top-6 fade-in duration-300 shadow-2xl">
          <Alert
            variant="success"
            title="ثبت موفقیت‌آمیز"
            icon={<CheckCircleIcon className="w-5 h-5 text-success" />}
            className="bg-white/95 backdrop-blur-md shadow-xl border-emerald-200"
          >
            {toast.message}
          </Alert>
        </div>
      )}

      {/* هدر بخش پرسش‌ها */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-bold text-gray-900">پرسش و پاسخ</h2>
          <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded-full font-faNum">
            {MOCK_QUESTIONS.length} پرسش
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAddQuestionOpen(true)}
          className="text-xs font-bold text-primary hover:text-white bg-primary/10 hover:bg-primary border border-primary/20 px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer relative z-10"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          ثبت پرسش جدید
        </button>
      </div>

      {/* 💻 حالت دسکتاپ */}
      <div className="hidden lg:block space-y-4">
        <div className="space-y-3.5">
          {MOCK_QUESTIONS.slice(0, visibleCount).map((q) => (
            <QuestionCard key={q.id} data={q} />
          ))}
        </div>

        {visibleCount < MOCK_QUESTIONS.length && (
          <div className="text-center pt-5">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/60 px-6 py-2.5 rounded-xl transition-all cursor-pointer active:scale-98"
            >
              مشاهده بیشتر
              <ChevronDownIcon className="w-4 h-4 text-primary" />
            </button>
          </div>
        )}
      </div>

      {/* 📱 حالت موبایل */}
      <div className="lg:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView={1.15}
          modules={[Pagination]}
          className="w-full !pb-4"
        >
          {MOCK_QUESTIONS.slice(0, 5).map((q) => (
            <SwiperSlide key={q.id}>
              <QuestionCard
                data={q}
                isMobile
                onSelect={() => setSelectedQuestion(q)}
              />
            </SwiperSlide>
          ))}

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

      {/* ✍️ مودال ثبت پرسش جدید */}
      {isAddQuestionOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsAddQuestionOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <QuestionMarkCircleIcon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  ثبت پرسش جدید درباره این محصول
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddQuestionOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmitQuestion}
              className="p-6 space-y-5 overflow-y-auto"
            >
              {/* استفاده از Alert variant warning درون خود فرم برای راهنمایی */}
              <Alert variant="warning" title="راهنمایی">
                سوالات شما پس از تایید توسط پشتیبان در سایت قرار می‌گیرد. لطفاً از پرسیدن سوالات نامربوط یا درج شماره تماس خودداری فرمایید.
              </Alert>

              {/* متن پرسش */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  متن پرسش <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="پرسش خود درباره گارانتی، ارسال، ویژگی‌ها یا نحوه استفاده محصول را مطرح کنید..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* دکمه‌های فرم */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddQuestionOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !questionText.trim()}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  {isSubmitting ? "در حال ثبت..." : "ثبت و ارسال پرسش"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📱 Bottom Sheet نمایش جزئیات پرسش انتخابی */}
      {selectedQuestion && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedQuestion(null)}
          />

          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl pb-24 shadow-xl z-10 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="w-full pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>

            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 font-faNum">
                پرسش شماره {selectedQuestion.id}
              </span>
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 pb-10">
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
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
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

      {/* 📱 مودال تمام‌صفحه موبایل */}
      {isMobileModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col">
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 py-3.5 flex items-center justify-between shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-primary" />
              همه پرسش‌ها و پاسخ‌ها
            </h3>
            <button
              type="button"
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

      {isMobile && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-end gap-1 text-[11px] font-bold text-primary">
          <span>مشاهده پاسخ‌ها و متن کامل</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}