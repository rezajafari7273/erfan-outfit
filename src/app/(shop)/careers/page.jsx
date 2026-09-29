"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  UserPlusIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  MapPinIcon,
  ClockIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";

// داده‌های نمونه برای موقعیت‌های شغلی فعال در کارخانه
const factoryJobs = [
  {
    id: 1,
    title: "خیاط راسته‌دوز حرفه‌ای",
    category: "خط تولید و دوخت",
    location: "کارخانه (تهران / شهرک صنعتی)",
    type: "تمام وقت",
    salary: "توافقی + بیمه + مزایا",
    experience: "حداقل ۲ سال سابقه",
    description: "جهت کار در خط تولید پوشاک، تسلط کامل به چرخ راسته‌دوز و سرعت عمل بالا.",
  },
  {
    id: 2,
    title: "چرخ‌کار و زیگزالدوز",
    category: "خط تولید و دوخت",
    location: "کارخانه (تهران / شهرک صنعتی)",
    type: "تمام وقت",
    salary: "طبق وزارت کار + پاداش تولید",
    experience: "۱ سال سابقه مرتبط",
    description: "جهت دوخت و بسته‌بندی نهایی، منظم و مسئولیت‌پذیر.",
  },
  {
    id: 3,
    title: "نیروی ساده انبار و بسته‌بندی",
    category: "انبارداری و لجستیک",
    location: "انبار مرکزی",
    type: "تمام وقت / شیفتی",
    salary: "وزارت کار + بیمه تامین اجتماعی",
    experience: "بدون نیاز به سابقه",
    description: "جهت چیدمان، بسته‌بندی سفارشات و بارگیری محصولات.",
  },
];

export default function JoinAndCareersPage() {
  const [activeTab, setActiveTab] = useState("jobs"); 
  const [selectedJob, setSelectedJob] = useState(null); 

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* هدر اصلی */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black">
            <UserGroupIcon className="w-4 h-4 text-primary" />
            فرصت‌های شغلی و همکاری
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary font-rokh leading-tight">
            به تیم تولید و شبکه فروش ما بپیوندید
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
            موقعیت‌های شغلی فعال کارخانه را مشاهده کنید و جهت ارسال رزومه با ما در تماس باشید، یا به‌جای آن به‌عنوان فروشنده ثبت‌نام نمایید.
          </p>
        </div>

        {/* تب‌های سوییچ بین فرصت‌های شغلی و ثبت‌نام فروشنده */}
        <div className="flex justify-center">
          <div className="bg-slate-200/70 p-1 rounded-2xl flex items-center gap-2 max-w-md w-full">
            <Button
              variant={activeTab === "jobs" ? "solid" : "ghost"}
              size="sm"
              icon={BriefcaseIcon}
              iconPosition="left"
              onClick={() => setActiveTab("jobs")}
              className={`flex-1 !rounded-xl !py-2.5 transition-all duration-300 ${
                activeTab === "jobs"
                  ? "!bg-white !text-slate-900 shadow-sm"
                  : "!text-slate-600 hover:!text-slate-900"
              }`}
            >
              فرصت‌های شغلی کارخانه
            </Button>
            <Button
              variant={activeTab === "seller" ? "solid" : "ghost"}
              size="sm"
              icon={BuildingStorefrontIcon}
              iconPosition="left"
              onClick={() => setActiveTab("seller")}
              className={`flex-1 !rounded-xl !py-2.5 transition-all duration-300 ${
                activeTab === "seller"
                  ? "!bg-white !text-slate-900 shadow-sm"
                  : "!text-slate-600 hover:!text-slate-900"
              }`}
            >
              ثبت‌نام فروشنده
            </Button>
          </div>
        </div>

        {/* تب ۱: آگهی‌های شغلی کارخانه */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-rokh sm:text-lg font-black text-primary">
                موقعیت‌های شغلی آماده جذب ({factoryJobs.length})
              </h2>
              <span className="text-xs text-slate-400 font-medium">بروزرسانی روزانه</span>
            </div>

            {/* کارت‌های موقعیت‌های شغلی */}
            <div className="grid grid-cols-1 gap-4">
              {factoryJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                        {job.category}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-800">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 font-semibold pt-1">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4 text-slate-400" />
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        <BanknotesIcon className="w-4 h-4 text-slate-400" />
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 border-t md:border-t-0 md:border-r border-slate-100 pt-4 md:pt-0 md:pr-6 flex items-center">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ChevronLeftIcon}
                      iconPosition="right"
                      onClick={() => setSelectedJob(job)}
                      className="w-full md:w-auto"
                    >
                     ارسال درخواست
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* تب ۲: ثبت‌نام فروشنده */}
        {activeTab === "seller" && (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full" />
                  فروشنده شوید و محصولات را عرضه کنید
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  جهت دریافت نمایندگی یا ثبت به عنوان فروشنده آنلاین محصولات کارخانه اقدام کنید.
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                icon={UserPlusIcon}
                iconPosition="right"
                className="w-full md:w-auto shrink-0"
              >
                تکمیل فرم ثبت‌نام فروشنده
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xs font-bold text-slate-800">تامین مستقیم از کارخانه</h3>
                <p className="text-[11px] text-slate-500 font-medium">دسترسی به محصولات با قیمت عمده و بدون واسطه.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xs font-bold text-slate-800">پنل مدیریت سفارشات</h3>
                <p className="text-[11px] text-slate-500 font-medium">مشاهده لحظه‌ای موجودی و ثبت آسان سفارشات.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xs font-bold text-slate-800">پشتیبانی اختصاصی</h3>
                <p className="text-[11px] text-slate-500 font-medium">پاسخگویی سریع کارشناسان فروش کارخانه.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* مودال اطلاعات تماس */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-xl border border-slate-100 animate-fadeIn">
            
            <Button
              variant="ghost"
              size="xs"
              icon={XMarkIcon}
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 left-5 !p-1.5 !text-slate-400 hover:!text-slate-600 !rounded-lg"
              aria-label="بستن"
            />

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-primary bg-slate-100 px-2.5 py-0.5 rounded-md">
                اطلاعات ارتباطی منابع انسانی
              </span>
              <h3 className="text-lg font-black text-slate-900">
                درخواست برای {selectedJob.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                جهت مصاحبه یا ارسال رزومه می‌توانید مستقیم با واحد مربوطه در تماس باشید.
              </p>
            </div>

            {/* کارت‌های اطلاعات تماس */}
            <div className="space-y-3">
              <a
                href="tel:02112345678"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all group"
              >
                <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 hover:text-white transition-all duration-300 group shadow-lg shadow-secondary-500/10">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400">تماس مستقیم با کارشناس جذب</p>
                  <p className="text-xs sm:text-sm font-black text-slate-800 dir-ltr text-right">
                    ۰۲۱-۱۲۳۴۵۶۷۸
                  </p>
                </div>
              </a>

              <a
                href="mailto:hr@factory.com"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-all group"
              >
                <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 hover:text-white transition-all duration-300 group shadow-lg shadow-secondary-500/10">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400">ارسال رزومه از طریق ایمیل</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 truncate dir-ltr text-right">
                    hr@factory.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 hover:text-white transition-all duration-300 group shadow-lg shadow-secondary-500/10">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400">ساعات پاسخگویی و مراجعه</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed mt-0.5">
                    شنبه تا چهارشنبه: ۸:۰۰ الی ۱۶:۰۰
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 hover:text-white transition-all duration-300 group shadow-lg shadow-secondary-500/10">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold text-slate-400">آدرس مراجعه حضوری</p>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed mt-0.5">
                    {selectedJob.location}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="soft"
              size="md"
              onClick={() => setSelectedJob(null)}
              className="w-full !bg-slate-100 hover:!bg-slate-200 !text-slate-700"
            >
              بستن
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}