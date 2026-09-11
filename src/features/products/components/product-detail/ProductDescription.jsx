"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentTextIcon,
  ListBulletIcon,
  XMarkIcon,
  ChevronLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/ui/Button";

// داده‌های مشخصات فنی پوشاک
const SPECIFICATIONS = [
  { label: "جنس پارچه", value: "۱۰۰٪ پنبه سوپر شانه شده (Super Combed Cotton)" },
  { label: "قواره و تن‌خور", value: "آزاد و اورسایز (Oversized Fit)" },
  { label: "نوع یقه", value: "گرد کشبافت با دوخت مقاوم" },
  { label: "نوع آستین", value: "آستین کوتاه افتاده (Drop Shoulder)" },
  { label: "کشور تولیدکننده", value: "ایران (پارچه وارداتی ترکیه)" },
  { label: "مناسب فصل", value: "بهار و تابستان" },
  { label: "نوع چاپ", value: "چاپ زول ماندگار با مقاومت بالا در برابر شستشو" },
  { label: "دستورالعمل شستشو", value: "شستشو با آب ۳۰ درجه، بدون استفاده از سفیدکننده" },
];

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("desc"); // 'desc' | 'specs'
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const tabs = [
    { id: "desc", label: "توضیحات", icon: DocumentTextIcon },
    { id: "specs", label: "جدول مشخصات", icon: ListBulletIcon },
  ];

  return (
    <section className="">
      {/* هدر بخش و تب‌ها با انیمیشن لغزنده Framer Motion */}
      <div className="flex items-center gap-1.5 p-1.5 bg-surface/80 font-rokh font-bold backdrop-blur-2xl border border-secondary/10 rounded-2xl mb-6 w-fit shadow-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-2 text-xs lg:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors duration-300 cursor-pointer outline-none focus:outline-none focus:ring-0 select-none ${
                isActive ? "text-primary" : "text-slate-500 hover:text-primary"
              }`}
            >
              {/* پس‌زمینه متحرم اکتیو (Sliding Indicator) */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-secondary/15 border border-secondary/25 rounded-xl shadow-sm shadow-secondary/5"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className={`w-4 h-4 stroke-[2] z-10 transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"
                }`}
              />
              <span className="z-10 mt-1">{tab.label}</span>
              {isActive && (
                <span className="z-10 w-1.5 h-1.5 rounded-full bg-secondary mr-0.5 animate-pulse shadow-[0_0_8px_rgba(var(--secondary),0.6)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* 💻 حالت دسکتاپ (با Framer Motion)          */}
      {/* ========================================== */}
      <div className="hidden lg:block bg-surface/50 backdrop-blur-xl border border-cart-boarder rounded-3xl p-6 shadow-xs overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "desc" ? (
            <motion.div
              key="desc-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <DescriptionContent full />
            </motion.div>
          ) : (
            <motion.div
              key="specs-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <SpecificationsTable specs={SPECIFICATIONS} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================== */}
      {/* 📱 حالت موبایل (خلاصه + دکمه مشاهده کامل)    */}
      {/* ========================================== */}
      <div className="lg:hidden">
        <div className="relative max-h-56 overflow-hidden rounded-3xl bg-surface/60 backdrop-blur-xl p-4 border border-cart-boarder">
          <AnimatePresence mode="wait">
            {activeTab === "desc" ? (
              <motion.div
                key="mobile-desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DescriptionContent />
              </motion.div>
            ) : (
              <motion.div
                key="mobile-specs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SpecificationsTable specs={SPECIFICATIONS.slice(0, 4)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* لایه افکت Fade پایین باکس */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
        </div>

        <div className="mt-3">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-center !text-slate-800 border-slate-200 hover:border-slate-300 rounded-2xl"
            onClick={() => setIsMobileModalOpen(true)}
            icon={ChevronLeftIcon}
            iconPosition="left"
          >
            مشاهده کامل {activeTab === "desc" ? "توضیحات لباس" : "مشخصات و پارچه"}
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 📱 مودال تمام‌صفحه موبایل با AnimatePresence */}
      {/* ========================================== */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col"
          >
            {/* هدر مودال */}
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-secondary" />
                {activeTab === "desc" ? "توضیحات استایل و پارچه" : "مشخصات فنی لباس"}
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="w-10 h-10 rounded-2xl border flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer pointer-events-auto shadow-xs border-gray-200 bg-gray-100/80 text-gray-800 hover:bg-gray-200"
              >
                <XMarkIcon className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* محتوای اسکرولی */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === "desc" ? (
                <DescriptionContent full />
              ) : (
                <SpecificationsTable specs={SPECIFICATIONS} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// کامپوننت محتوای توضیحات پوشاک
function DescriptionContent({ full = false }) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
      <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8 space-y-3.5 text-xs lg:text-sm text-slate-700 leading-relaxed font-medium">
        <p className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80 shadow-xs">
          این تیشرت با استایل اورسایز و مدرن از پارچه ۱۰۰٪ پنبه سوپر شانه شده
          تولید شده است. بافت تنفس‌پذیر این لباس باعث جلوگیری از تعریق شده و
          احساس لطافت فوق‌العاده‌ای روی پوست ایجاد می‌کند.
        </p>
        <p className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80 shadow-xs">
          طراحی آستین افتاده (Drop Shoulder) و یقه کشبافت مقاوم، تن‌خوری شیک و
          امروزی به آن بخشیده است. این لباس گزینه‌ای عالی برای ست‌های کژوال و
          خیابانی (Streetwear) در تمامی فصول گرم سال به شمار می‌رود.
        </p>
        {full && (
          <p className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80 shadow-xs">
            چاپ به کار رفته در ثبات رنگی بالایی برخوردار است و در اثر شستشو و
            استفاده مداوم پوسته پوسته یا کمرنگ نمی‌شود. برای دوام بیشتر، شستشو با
            آب ۳۰ درجه و پشت‌ورو کردن لباس هنگام اتوکشی توصیه می‌شود.
          </p>
        )}
      </div>

      <div className="order-2 lg:order-1 lg:col-span-5 xl:col-span-4 shrink-0 w-full">
        <div className="relative overflow-hidden rounded-2xl border border-cart-boarder bg-slate-100/50 p-2 shadow-xs group">
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
            alt="جزئیات استایل و پارچه لباس"
            className="w-full h-56 lg:h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

// کامپوننت جدول مشخصات
function SpecificationsTable({ specs }) {
  return (
    <div className="space-y-2.5">
      {specs.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.03 }}
          className="flex items-start text-xs lg:text-sm p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100/80 hover:bg-slate-50 transition-colors"
        >
          <span className="w-1/3 text-slate-400 font-medium shrink-0">
            {item.label}
          </span>
          <span className="w-2/3 text-slate-800 font-bold">
            {item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}