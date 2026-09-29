"use client";

import React from "react";
import Link from "next/link";
import {
  BuildingOffice2Icon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ScissorsIcon,
  AcademicCapIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function AboutUs() {
  const stats = [
    { id: 1, label: "سال سابقه در صنعت پوشاک", value: "+۱۵" },
    { id: 2, label: "تولید سالانه (قطعه لباس)", value: "+۵۰۰,۰۰۰" },
    { id: 3, label: "پرسنل و خیاطان متخصص", value: "+۱۲۰" },
    { id: 4, label: "رضایت مشتریان و فروشگاه‌ها", value: "۹۸٪" },
  ];

  const features = [
    {
      icon: ScissorsIcon,
      title: "طراحی و برش دقیق صنعتی",
      description:
        "استفاده از مدرن‌ترین دستگاه‌های الگوکشی و برش اتوماتیک (CNC) برای حداقل پرت پارچه و بالاترین دقت در سایزبندی.",
    },
    {
      icon: ShieldCheckIcon,
      title: "کنترل کیفیت ۴ مرحله‌ای",
      description:
        "از بررسی نخ و پارچه ورودی تا بسته‌بندی نهایی، تمامی محصولات توسط تیم کنترل کیفیت (QC) ارزیابی می‌شوند.",
    },
    {
      icon: SparklesIcon,
      title: "پارچه‌های درجه یک و باکیفیت",
      description:
        "تأمین مواد اولیه از معتبرترین بافندگی‌های داخلی و وارداتی با ضمانت عدم آبرفت، پرزدهی و تغییر رنگ.",
    },
    {
      icon: TruckIcon,
      title: "قیمت مستقیم از کارخانه",
      description:
        "حذف کامل واسطه‌ها و دلالان صنعت پوشاک؛ عرضه مستقیم محصولات با قیمتی کاملاً رقابتی به دست مصرف‌کننده.",
    },
  ];

  return (
    <div dir="rtl" className="w-full min-h-screen  text-slate-800 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* ================= HERO SECTION (معرفی اصلی) ================= */}
        <section className="relative overflow-hidden bg-white border border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black">
                <BuildingOffice2Icon className="w-4 h-4" />
                <span>از قلب خط تولید تا کمد شما</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                کارخانه تولید پوشاک <span className="text-primary">آنلاین مد</span>
              </h1>
              
              <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
                ما در کارخانه پوشاک آنلاین مد با تکیه بر دانش متخصصین داخلی، تجهیزات مدرن دوزندگی و اشتیاق به آفرینش زیبایی، فعالیت خود را آغاز کردیم. هدف ما عرضه پوشاکی باکیفیت، خوش‌دوخت و مطابق با ترندهای روز دنیا با قیمتی منصفانه به صورت مستقیم به دست شماست.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/products                                                                                                                                                                                                                                                                                                    "
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/20 hover:opacity-95 transition-all duration-300 hover:scale-105"
                >
                  <span>مشاهده محصولات کارخانه</span>
                  <ArrowLeftIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-200 transition-all"
                >
                  <span>سفارش عمده / تماس با ما</span>
                </Link>
              </div>
            </div>

            {/* تصویر استتیک کارخانه و کارگاه */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                  alt="کارگاه طراحی و تولید پوشاک"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-bold text-primary/90">سالن الگوسازی و دوخت صنعتی</p>
                    <p className="text-sm font-black">ترکیب هنر خیاطی با تکنولوژی روز</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= STATS SECTION (آمار کارخانه) ================= */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
            {stats.map((stat) => (
              <div key={stat.id} className="pt-4 md:pt-0 space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-primary tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STORY & AESTHETIC GALLERY ================= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* متن داستان ما */}
          <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">داستان شکل‌گیری و کیفیت دوخت</h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed text-justify">
                کارخانه ما فعالیت خود را با یک کارگاه منسجم و هدفمند آغاز کرد. با تکیه بر رضایت مشتریان و دقت بی‌نظیر در انتخاب پارچه و دوخت، گام به گام خطوط تولید خود را توسعه دادیم. امروز با بهره‌گیری از تجهیزات اتوماتیک، برش‌های لیزری و سالن‌های مجزا، یکی از برندهای پیشرو در تولید پوشاک باکیفیت داخلی هستیم.
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed text-justify">
                افتخار ما ایجاد اشتغال مستقیم برای خیاطان و طراحان زبده است تا محصولی کاملاً ایرانی با استانداردهای جهانی به دست شما برسد.
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
              <HeartIcon className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs font-bold text-slate-700">تضمین ظرافت در دوخت و ثبات رنگ پارچه‌ها</p>
            </div>
          </div>

          {/* گالری استتیک ۲ تایی */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <div className="h-44 sm:h-48 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm relative group">
              <img
                src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800&auto=format&fit=crop"
                alt="جزئیات پارچه و نخ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                <span className="text-white text-xs font-bold backdrop-blur-md bg-white/20 px-3 py-1 rounded-full">
                  انتخاب بهترین متریال و پارچه‌ها
                </span>
              </div>
            </div>

            <div className="h-44 sm:h-48 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm relative group">
              <img
                src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800&auto=format&fit=crop"
                alt="طراحی و استایل مدرن"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                <span className="text-white text-xs font-bold backdrop-blur-md bg-white/20 px-3 py-1 rounded-full">
                  الگوهای استاندارد و خوش‌فرم
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* ================= FEATURES & ADVANTAGES (چرا تولیدات ما؟) ================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              چرا خرید مستقیم از کارخانه؟
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500">
              مزایای استثنایی حذف واسطه‌ها و خرید مستقیم از خط تولید
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col space-y-3 hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= QUALITY & CERTIFICATES ================= */}
        <section className="bg-primary/5 border border-primary/15 rounded-[2.5rem] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black">
                <span>تضمین ۱۰۰٪ کیفیت</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                تضمین کیفیت دوخت، متریال و ثبات رنگ
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                تمام پوشاک تولیدشده در این مجموعه قبل از ارسال، از نظر سلامت پارچه، استحکام درزها، تقارن و تمیزی دوخت بررسی می‌شوند. در صورت وجود هرگونه ایراد احتمالی، کالا بدون قید و شرط تعویض یا پس گرفته می‌شود.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <span>ضمانت عدم آبرفت و رنگ‌دهی پارچه</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <span>دوخت صنعتی با چرخ‌های ۵ نخ و الیک</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <span>طراحی مطابق با آناتومی و ارگونومی بدن</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />
                  <span>استفاده از خرج‌کار و زیپ‌های درجه یک</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white border border-primary/20 p-6 rounded-3xl text-center space-y-3 w-full max-w-xs shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <ShieldCheckIcon className="w-10 h-10" />
                </div>
                <h4 className="text-base font-black text-slate-900">نماد کیفیت تولید</h4>
                <p className="text-[11px] font-medium text-slate-500">
                  دارای مجوز رسمی از اتحادیه پوشاک و گواهینامه‌های استاندارد کیفی تولید
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA / WHOLESALE & RETAIL ================= */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            آماده همکاری با فروشگاه‌ها، بنکداران و مشتریان تکی
          </h3>
          <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
            چه به دنبال خرید تکی با قیمت مستقیم کارخانه هستید و چه قصد ثبت سفارش عمده و تولید سفارشی را دارید، تیم فروش ما آماده پاسخگویی به شماست.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:opacity-95 transition-all shadow-sm shadow-primary/20"
            >
              فروشگاه و خرید تکی
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold hover:bg-slate-200 transition-colors"
            >
              مشاوره و ثبت سفارش عمده
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}