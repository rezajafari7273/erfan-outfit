"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// آیکون اختصاصی خط‌کش/متر
function RulerIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v16.5h16.5V3.75H3.75zM7.5 7.5h.008v.008H7.5V7.5zm0 4.5h.008v.008H7.5V12zm0 4.5h.008v.008H7.5v-.008zm4.5-9h.008v.008H12V7.5zm0 4.5h.008v.008H12V12zm0 4.5h.008v.008H12v-.008zm4.5-9h.008v.008H16.5V7.5zm0 4.5h.008v.008H16.5V12z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 8.25h3m-3 3.75h4.5m-4.5 3.75h3"
      />
    </svg>
  );
}

const SIZE_DATA = {
  tshirt: {
    title: "تی‌شرت و پولوشرت",
    description: "اندازه‌ها بر اساس ابعاد روی لباس در حالت پهن‌شده (تخت) به سانتی‌متر می‌باشند.",
    imageNote: "عرض سینه از زیر بغل تا زیر بغل، و قد لباس از سرشانه تا پایین محاسبه می‌شود.",
    headers: ["سایز", "عرض سینه (A)", "قد لباس (B)", "عرض سرشانه (C)"],
    rows: [
      { size: "S (کوچک)", chest: "۴۸", length: "۶۸", shoulder: "۴۲" },
      { size: "M (متوسط)", chest: "۵۱", length: "۷۱", shoulder: "۴۴" },
      { size: "L (بزرگ)", chest: "۵۴", length: "۷۴", shoulder: "۴۶" },
      { size: "XL (خیلی بزرگ)", chest: "۵۸", length: "۷۶", shoulder: "۴۹" },
      { size: "2XL (دو ایکس بزرگ)", chest: "۶۲", length: "۷۹", shoulder: "۵۲" },
    ],
  },
  hoodie: {
    title: "هودی و دورس",
    description: "هودی‌ها به صورت Free/Casual Fit طراحی شده‌اند و استایل آزادتر و لش‌تری دارند.",
    imageNote: "قد آستین از مچ تا دوخت سرشانه اندازه‌گیری می‌شود.",
    headers: ["سایز", "عرض سینه (A)", "قد هودی (B)", "قد آستین (C)"],
    rows: [
      { size: "M (متوسط)", chest: "۵۵", length: "۷۰", shoulder: "۶۲" },
      { size: "L (بزرگ)", chest: "۵۸", length: "۷۳", shoulder: "۶۴" },
      { size: "XL (خیلی بزرگ)", chest: "۶۲", length: "۷۶", shoulder: "۶۶" },
      { size: "2XL (دو ایکس بزرگ)", chest: "۶۶", length: "۷۸", shoulder: "۶۷" },
    ],
  },
  shirt: {
    title: "پیراهن مردانه",
    description: "مناسب برای پیراهن‌های رسمی و اسپرت. اندازه‌ها طبق استاندارد دور یقه و سینه است.",
    imageNote: "برای پیراهن‌های رسمی، اندازه دور یقه دقیق اهمیت بالایی دارد.",
    headers: ["سایز", "دور یقه", "عرض سینه (A)", "قد پیراهن (B)", "قد آستین"],
    rows: [
      { size: "S (۳۷-۳۸)", chest: "۵۰", length: "۷۲", shoulder: "۶۳" },
      { size: "M (۳۹-۴۰)", chest: "۵۳", length: "۷۵", shoulder: "۶۴" },
      { size: "L (۴۱-۴۲)", chest: "۵۶", length: "۷۷", shoulder: "۶۵" },
      { size: "XL (۴۳-۴۴)", chest: "۶۰", length: "۷۹", shoulder: "۶۶" },
      { size: "2XL (۴۵-۴۶)", chest: "۶۴", length: "۸۱", shoulder: "۶۷" },
    ],
  },
  pants: {
    title: "شلوار جین و کتان",
    description: "سایزبندی بر اساس فاق متوسط و استاندارد تنظیم شده است.",
    imageNote: "عرض کمر را از چپ به راست در حالت تخت اندازه‌گیری کنید.",
    headers: ["سایز (ایران/اروپا)", "عرض کمر", "قد شلوار", "عرض ران"],
    rows: [
      { size: "30 (Small)", chest: "۳۸", length: "۱۰۲", shoulder: "۲۸" },
      { size: "32 (Medium)", chest: "۴۰", length: "۱۰۴", shoulder: "۳۰" },
      { size: "34 (Large)", chest: "۴۴", length: "۱۰۵", shoulder: "۳۲" },
      { size: "36 (X-Large)", chest: "۴۷", length: "۱۰۶", shoulder: "۳۴" },
      { size: "38 (2X-Large)", chest: "۵۰", length: "۱۰۸", shoulder: "۳۶" },
    ],
  },
};

const CATEGORIES = [
  { id: "tshirt", label: "تی‌شرت و پولوشرت", icon: "👕" },
  { id: "hoodie", label: "هودی و دورس", icon: "🧥" },
  { id: "shirt", label: "پیراهن مردانه", icon: "👔" },
  { id: "pants", label: "شلوار جین و کتان", icon: "👖" },
];

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState("tshirt");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // جلوگیری از اسکرول بدنه هنگام باز بودن مودال در موبایل
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileModalOpen]);

  return (
    <section className="py-4">
      {/* دکمه باز کردن راهنمای سایز */}
      <button
        onClick={() => setIsMobileModalOpen(true)}
        className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white border border-primary/20 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
      >
        <RulerIcon className="w-4 h-4 stroke-[2.5]" />
        <span>راهنمای اندازه‌گیری و انتخاب سایز</span>
      </button>

      {/* 💻 حالت دسکتاپ */}
      <div className="hidden lg:block mt-6">
        <SizeGuideContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 📱 مودال تمام‌صفحه موبایل با پورتال به body */}
      {isMobileModalOpen && mounted &&
        createPortal(
          <div className="lg:hidden fixed inset-0 z-[9999] bg-white flex flex-col w-screen h-[100dvh] top-0 left-0 right-0 bottom-0 m-0 p-0 overflow-hidden">
            {/* هدر چسبان مودال */}
            <div className="shrink-0 bg-white border-b border-rose-100 px-4 py-3.5 flex items-center justify-between shadow-2xs w-full">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-primary" />
                راهنمای انتخاب سایز
              </h3>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer shadow-xs border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* محتوای اسکرولی مودال */}
            <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-5 w-full">
              <SizeGuideContent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobile
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

function SizeGuideContent({ activeTab, setActiveTab, isMobile = false }) {
  const currentData = SIZE_DATA[activeTab];

  return (
    <div className="space-y-5 w-full">
      {/* تب‌بار افقی */}
      <div className="w-full overflow-x-auto scrollbar-none pb-1">
        <div className="flex gap-2 p-1 bg-gray-100/80 rounded-2xl border border-rose-100/80 w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-primary shadow-xs scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* کارت اصلی */}
      <div className="bg-white border border-rose-100 rounded-2xl p-4 sm:p-6 shadow-xs w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-rose-100 w-full">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>{CATEGORIES.find((c) => c.id === activeTab)?.icon}</span>
              {currentData.title}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{currentData.description}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg self-start sm:self-auto font-faNum">
            واحد: سانتی‌متر
          </span>
        </div>

        {/* نمای دسکتاپ */}
        {!isMobile && (
          <div className="overflow-x-auto mt-4 w-full">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-rose-50/50 border-b border-rose-100 text-gray-800 text-xs font-bold">
                  {currentData.headers.map((header, index) => (
                    <th key={index} className="py-3 px-4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/60 text-xs font-medium text-gray-700 font-faNum">
                {currentData.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{row.size}</td>
                    <td className="py-3 px-4">{row.chest} cm</td>
                    <td className="py-3 px-4">{row.length} cm</td>
                    <td className="py-3 px-4">{row.shoulder} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* نمای کارت‌های موبایل */}
        {isMobile && (
          <div className="grid grid-cols-1 gap-2.5 mt-4 w-full">
            {currentData.rows.map((row, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-rose-100/80 rounded-xl p-3 font-faNum space-y-2 w-full"
              >
                <div className="flex justify-between items-center border-b border-rose-100/60 pb-1.5">
                  <span className="text-xs font-bold text-gray-900">{row.size}</span>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    استاندارد
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs w-full">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{currentData.headers[1]}</span>
                    <span className="font-bold text-gray-800">{row.chest} cm</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{currentData.headers[2]}</span>
                    <span className="font-bold text-gray-800">{row.length} cm</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <span className="text-[10px] text-gray-400 block mb-0.5">{currentData.headers[3]}</span>
                    <span className="font-bold text-gray-800">{row.shoulder} cm</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 bg-gradient-to-r from-rose-50/80 to-orange-50/30 border border-rose-100/80 rounded-xl p-3 flex gap-2.5 items-start w-full">
          <InformationCircleIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-800 block mb-0.5">نکته اندازه‌گیری:</span>
            <p>{currentData.imageNote}</p>
          </div>
        </div>
      </div>

      {/* ۳ گام اندازه‌گیری */}
      <div className="bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 border border-rose-100/80 rounded-2xl p-4 shadow-2xs w-full">
        <h3 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
          راهنمای ۳ گام برای انتخاب سایز دقیق
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-600 w-full">
          <div className="bg-white/90 p-3 rounded-xl border border-rose-100/70">
            <span className="font-bold text-gray-800 block mb-0.5">۱. پهن کردن لباس</span>
            یکی از لباس‌های خوش‌قواره خود را روی سطح صاف قرار دهید.
          </div>
          <div className="bg-white/90 p-3 rounded-xl border border-rose-100/70">
            <span className="font-bold text-gray-800 block mb-0.5">۲. اندازه‌گیری با متر</span>
            با متر پارچه‌ای، فاصله‌ها را دقیق اندازه‌گیری کنید.
          </div>
          <div className="bg-white/90 p-3 rounded-xl border border-rose-100/70">
            <span className="font-bold text-gray-800 block mb-0.5">۳. تطبیق با جدول</span>
            ابعاد را مقایسه کرده و سایز مناسب خود را انتخاب کنید.
          </div>
        </div>
      </div>
    </div>
  );
}