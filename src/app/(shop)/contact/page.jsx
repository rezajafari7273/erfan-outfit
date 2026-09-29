"use client";

import React from "react";
import {
  PhoneIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  MapPinIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  TruckIcon,
  LifebuoyIcon, // به‌جای HeadphoneIcon
  CreditCardIcon,
  HomeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

// ایمپورت کامپوننت شبکه‌های اجتماعی شما
import SocialLinks from "@/components/common/SocialLinks";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen  text-slate-800 py-8 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ۱. بخش بالای صفحه (Breadcrumb + Header + تصویر سه بعدی) */}
        <div className="relative bg-gradient-to-b from-white/80 to-transparent rounded-3xl p-6 md:p-10 overflow-hidden">
          {/* نوار بالایی */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium border border-indigo-100/50">
              <PhoneIcon className="w-3.5 h-3.5 text-secondary" />
              <span>تماس با ما</span>
            </div>

            
          </div>

          {/* عنوان و توضیحات اصلی */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex-1 text-center md:text-right space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-rokh font-bold text-slate-900 tracking-tight">
                با ما در ارتباط باشید
              </h1>
              <div className="w-12 h-1 bg-primary rounded-full mx-auto md:mx-0" />
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg leading-relaxed pt-1 font-medium">
                ما همیشه آماده پاسخگویی به سوالات و پیشنهادات شما هستیم.
                <br className="hidden sm:inline" />
                برای ارتباط با تیم پشتیبانی و دریافت راهنمایی، از راه‌های زیر با ما در تماس باشید.
              </p>
            </div>

          {/* جایگزین ۲: کارت وضعیت پشتیبانی آنلاین */}
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                <ChatBubbleLeftEllipsisIcon className="text-secondary w-5 h-5" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-800"></span>
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800">پشتیبانی زنده</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">آنلاین</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">میانگین زمان پاسخگویی: ۵ دقیقه</p>
            </div>
          </div>
          </div>
        </div>

        {/* ۲. بخش اصلی (شبکه‌بندی ۲ ستونه) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ستون راست (اطلاعات تماس + نقشه) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100/80 space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <UserIcon className="text-secondary w-5 h-5" />
                </div>
                
                <h2 className="text-base font-rokh font-bold text-slate-900">اطلاعات تماس</h2>
              </div>
              <p className="text-xs text-slate-400 pr-8">برای ارتباط سریع‌تر از طریق راه‌های زیر با ما در تماس باشید.</p>
            </div>

            {/* کارت‌های ۳ گانه (تلفن، موبایل، ایمیل) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block font-medium">شماره تماس</span>
                  <a href="tel:02155678910" className="text-xs font-bold text-slate-800 font-fanum dir-ltr block truncate">
                    021-5567-8910
                  </a>
                </div>
              </div>

              <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <DevicePhoneMobileIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block font-medium">شماره موبایل</span>
                  <a href="tel:09905734901" className="text-xs font-bold text-slate-800 font-fanum dir-ltr block truncate">
                    09905734901
                  </a>
                </div>
              </div>

              <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block font-medium">ایمیل</span>
                  <a href="mailto:info@site.com" className="text-xs font-bold text-slate-800 dir-ltr block truncate">
                    info@site.com
                  </a>
                </div>
              </div>
            </div>

            {/* کارت آدرس */}
            <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">آدرس فروشگاه</span>
                <p className="text-xs font-bold text-slate-800 font-fanum mt-0.5">
                  تهران، سعادت‌آباد، کوچه ۵، پلاک ۱۲
                </p>
              </div>
            </div>

            {/* بخش نقشه */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 h-52 bg-slate-100 group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-85"
                style={{
                  backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/51.3890,35.7219,13,0/600x300?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ')`,
                  backgroundColor: '#e5e7eb'
                }}
              >
                <div className="w-full h-full bg-[#e8ecef] relative flex items-center justify-center">
                  <div className="absolute w-full h-0.5 bg-white top-1/3 -rotate-6" />
                  <div className="absolute w-full h-1 bg-white top-2/3 rotate-12" />
                  <div className="absolute h-full w-1 bg-white left-1/3" />
                  <div className="absolute h-full w-0.5 bg-emerald-100 left-2/3" />
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/30 animate-ping absolute -inset-1" />
                  <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg relative z-10 rotate-45">
                    <MapPinIcon className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-xs font-bold text-slate-600">
                <button className="px-2.5 py-1.5 hover:bg-slate-50 border-b border-slate-100">+</button>
                <button className="px-2.5 py-1.5 hover:bg-slate-50">-</button>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-700 px-3 py-1.5 rounded-xl shadow-md border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-indigo-600" />
                <span>مشاهده در نقشه</span>
              </a>
            </div>
          </div>

          {/* ستون چپ (راه‌های ارتباطی دیگر + ساعات کاری) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100/80 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <ChatBubbleLeftEllipsisIcon className="text-secondary w-5 h-5" />
                </div>
                <h2 className="text-base font-rokh font-bold text-slate-900">راه‌های ارتباطی دیگر</h2>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer group">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">پشتیبانی آنلاین</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">پاسخگویی سریع در ساعات کاری</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer group">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">ارسال ایمیل</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">در هر زمان می‌توانید برای ما ایمیل بفرستید</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <EnvelopeIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-50/70 hover:bg-slate-50 transition-colors p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">شبکه‌های اجتماعی</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">ما را در شبکه‌های اجتماعی دنبال کنید</p>
                  </div>
                  <SocialLinks size="sm" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100/80 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900">ساعات کاری</h2>
              </div>

              <div className="space-y-2.5 text-xs font-medium text-slate-600 font-fanum pt-1">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span>شنبه تا چهارشنبه</span>
                  <span className="font-bold text-slate-800 dir-ltr">۹:۰۰ الی ۱۸:۰۰</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>پنج‌شنبه</span>
                  <span className="font-bold text-slate-800 dir-ltr">۹:۰۰ الی ۱۴:۰۰</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ۳. بنر مزایا و ویژگی‌ها */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-100">
            
            <div className="flex items-center gap-3 pt-4 md:pt-0">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">تضمین اصالت کالا</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">تمامی محصولات با ضمانت اصالت</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 pr-0 md:pr-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <TruckIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">ارسال سریع</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">تحویل در کوتاه‌ترین زمان</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 pr-0 md:pr-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <LifebuoyIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">پشتیبانی ۲۴ ساعته</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">پاسخگویی قبل و بعد از خرید</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 md:pt-0 pr-0 md:pr-4">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <CreditCardIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">پرداخت امن</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">با درگاه‌های معتبر بانکی</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}