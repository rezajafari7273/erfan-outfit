"use client";

import { useState } from "react";
import {
  DocumentTextIcon,
  ListBulletIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

// داده‌های نمونه مشخصات فنی
const SPECIFICATIONS = [
  { label: "ابعاد", value: "۱۶۰.۷ در ۷۷.۶ در ۷.۸ میلی‌متر" },
  { label: "وزن", value: "۲۰۶ گرم" },
  { label: "جنس بدنه", value: "فریم آلومینیومی، قاب پشتی شیشه‌ای" },
  { label: "نوع رابط", value: "دانگل USB، بلوتوث نسخه ۵.۲" },
  { label: "دقت حسگر (DPI)", value: "8000 DPI (قابل تنظیم)" },
  { label: "تعداد کلیدها", value: "۱۱ کلید با قابلیت برنامه‌ریزی" },
  { label: "نوع باتری", value: "قابل شارژ لیتیومی ۸۰۰ میلی‌آمپر" },
  { label: "اقلام همراه", value: "کابل شارژ Type-C، دانگل USB، دفترچه راهنما" },
];

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'specs'
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <section className="py-6 border-t border-gray-100">
      {/* هدر بخش و تب‌ها */}
      <div className="flex items-center gap-6 border-b border-gray-100 pb-3 mb-4">
        <button
          onClick={() => setActiveTab("desc")}
          className={`flex items-center gap-2 text-sm font-bold pb-3 -mb-3 border-b-2 transition-colors ${
            activeTab === "desc"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <DocumentTextIcon className="w-5 h-5" />
          توضیحات محصول
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 text-sm font-bold pb-3 -mb-3 border-b-2 transition-colors ${
            activeTab === "specs"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          <ListBulletIcon className="w-5 h-5" />
          مشخصات فنی
        </button>
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (محتوای کامل)               */}
      {/* ========================================== */}
      <div className="hidden lg:block">
        {activeTab === "desc" ? (
          <DescriptionText />
        ) : (
          <SpecificationsTable specs={SPECIFICATIONS} />
        )}
      </div>

      {/* ========================================== */}
      {/* 📱 حالت موبایل (خلاصه + دکمه مشاهده کامل)     */}
      {/* ========================================== */}
      <div className="lg:hidden">
        <div className="relative max-h-48 overflow-hidden rounded-2xl bg-gray-50/60 p-4 border border-gray-100">
          {activeTab === "desc" ? (
            <DescriptionText />
          ) : (
            <SpecificationsTable specs={SPECIFICATIONS.slice(0, 4)} />
          )}

          {/* لایه افکت Fade پایین باکس */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
        </div>

        <button
          onClick={() => setIsMobileModalOpen(true)}
          className="w-full mt-3 py-3 px-4 bg-gray-100 hover:bg-gray-200/80 active:scale-98 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 transition-all"
        >
          مشاهده کامل {activeTab === "desc" ? "توضیحات" : "مشخصات فنی"}
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================== */}
      {/* 📱 مودال تمام‌صفحه موبایل                  */}
      {/* ========================================== */}
      {isMobileModalOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* هدر مودال */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">
              {activeTab === "desc" ? "توضیحات کامل محصول" : "مشخصات فنی کامل"}
            </h3>
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 active:scale-95 transition-transform"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* محتوای اسکرولی */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === "desc" ? (
              <DescriptionText full />
            ) : (
              <SpecificationsTable specs={SPECIFICATIONS} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// کامپوننت متن توضیحات
function DescriptionText({ full = false }) {
  return (
    <div className="space-y-4 text-xs lg:text-sm text-gray-600 leading-relaxed">
      <p>
        این محصول با ارگونومی پیشرفته و متریال باکیفیت طراحی شده تا در استفاده‌های طولانی‌مدت
        خستگی کمتری به دست وارد کند. بهره‌گیری از سنسور اپتیکال دقیق، امکان حرکت روان روی تمامی
        سطوح را فراهم می‌سازد.
      </p>
      <p>
        اتصال دوگانه از طریق دانگل بی سیم 2.4GHz و بلوتوث به شما این امکان را می‌دهد تا به طور همزمان
        به چندین دستگاه متصل شده و تنها با یک کلیک بین آن‌ها جابه‌جا شوید.
      </p>
      {full && (
        <>
          <p>
            باتری لیتیومی قابل شارژ تعبیه شده داخل دستگاه با یک بار شارژ کامل تا چندین هفته استفاده
            مداوم را پاسخگو است. همچنین وجود کلیدهای بی صدا (Silent Click) محیط کاری آرامی را برای شما
            فراهم می‌کند.
          </p>
          <div className="my-4 rounded-2xl overflow-hidden border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80"
              alt="جزئیات محصول"
              className="w-full h-48 lg:h-64 object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
}

// کامپوننت جدول مشخصات
function SpecificationsTable({ specs }) {
  return (
    <div className="space-y-2">
      {specs.map((item, idx) => (
        <div
          key={idx}
          className="flex items-start text-xs lg:text-sm p-3 rounded-xl bg-gray-50/80 border border-gray-100/60"
        >
          <span className="w-1/3 text-gray-400 font-medium shrink-0">{item.label}</span>
          <span className="w-2/3 text-gray-800 font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}