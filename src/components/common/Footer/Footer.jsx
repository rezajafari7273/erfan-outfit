"use client";

import React from "react";
import Link from "next/link";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import SocialLinks from "../SocialLinks";
import Logo from "@/components/ui/Logo"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer dir="rtl" className="w-full pt-12 pb-12 select-none">
      <div className="mx-auto w-full px-8 flex flex-col items-center">
        
        {/* کادر اصلی فوتر */}
        <div className="relative z-10 w-full rounded-[2.5rem] bg-slate-50/90 border border-slate-200/80 p-6 sm:p-10 shadow-sm text-slate-800 backdrop-blur-md">
          
          {/* بخش اصلی: لینک‌ها در راست + کارت‌ها، نقشه و شبکه‌های اجتماعی در چپ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200/80 items-start">
            
            {/* سمت راست: ۳ ستون لینک (۷ ستون از ۱۲ ستون) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* ستون ۱ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  <h3 className="text-base font-black text-slate-900">
                    راهنمای خرید
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                  <li className="hover:text-primary transition-colors cursor-pointer">ثبت سفارش</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">نحوه ارسال</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">شیوه‌های پرداخت</li>
                </ul>
              </div>

              {/* ستون ۲ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  <h3 className="text-base font-black text-slate-900">
                    دسترسی سریع
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                  <li className="hover:text-primary transition-colors cursor-pointer">تماس با ما</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">فروشگاه</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">وبلاگ</li>
                </ul>
              </div>

              {/* ستون ۳ */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-primary rounded-full" />
                  <h3 className="text-base font-black text-slate-900">
                    خدمات مشتریان
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs font-semibold text-slate-600">
                  <li className="hover:text-primary transition-colors cursor-pointer">سوالات متداول</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">حریم خصوصی</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">بازگشت وجه</li>
                </ul>
              </div>

            </div>

            {/* سمت چپ: کارت‌ها + نقشه + شبکه‌های اجتماعی (۵ ستون از ۱۲ ستون) */}
            <div className="lg:col-span-5 flex flex-col gap-4 w-full mr-auto">
              
              {/* گرید کارت‌ها و نقشه */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start w-full">
                
                {/* ۳ کارت عمودی اطلاعات */}
                <div className="md:col-span-5 flex flex-col gap-2.5 w-full">
                  
                  {/* کارت ۱: واحد پشتیبانی */}
                  <div className="bg-white border border-slate-200/80 rounded-[1.25rem] p-3 flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 text-right">
                      <h4 className="text-[11px] font-black text-slate-900">
                        واحد <span className="text-primary">پشتیبانی</span>
                      </h4>
                      <p className="text-[10px] font-bold text-slate-600 tabular-nums">۰۲۱ - ۵۵۶۷۸۹۵</p>
                      <p className="text-[10px] font-bold text-slate-600 tabular-nums">۰۲۱ - ۵۵۷۸۶۵۴</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* کارت ۲: آدرس فروشگاه */}
                  <div className="bg-white border border-slate-200/80 rounded-[1.25rem] p-3 flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 text-right">
                      <h4 className="text-[11px] font-black text-slate-900">
                        آدرس <span className="text-primary">فروشگاه</span>
                      </h4>
                      <p className="text-[9px] font-semibold text-slate-600 leading-tight">
                        تهران - سعادت آباد - کوچه ۵ - پلاک ۱۲
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <MapPinIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* کارت ۳: ایمیل پشتیبانی */}
                  <div className="bg-white border border-slate-200/80 rounded-[1.25rem] p-3 flex items-center justify-between shadow-sm">
                    <div className="space-y-0.5 text-right">
                      <h4 className="text-[11px] font-black text-slate-900">
                        ایمیل <span className="text-primary">پشتیبانی</span>
                      </h4>
                      <p className="text-[10px] font-bold text-slate-600">info@site.com</p>
                      <p className="text-[10px] font-bold text-slate-600">support@site.com</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <EnvelopeIcon className="w-4 h-4" />
                    </div>
                  </div>

                </div>

                {/* بخش نقشه */}
                <div className="md:col-span-7 h-[11.25rem] w-full rounded-[1.5rem] overflow-hidden border border-slate-200/80 shadow-inner relative bg-slate-100">
                  <img
                    src="/images/map-placeholder.png"
                    alt="موقعیت روی نقشه"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>

              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-slate-200/80 rounded-[1.25rem] px-4 py-2.5 shadow-sm">
                <span className="text-xs font-bold text-slate-700">
                  ما را در <span className="text-primary font-black">شبکه‌های اجتماعی</span> دنبال کنید:
                </span>
                <SocialLinks />
              </div>

            </div>

          </div>

          {/* درباره ما، لوگو و نمادها */}
      
<div className="pt-8 pb-8 flex flex-col lg:flex-row items-center justify-between gap-6">
  
  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-slate-200/80 rounded-[2rem] p-4 flex-1 shadow-sm w-full">
    <Logo width={140} height={42} className="flex-shrink-0" />
    
    <div className="space-y-1 text-center sm:text-right">
      {/* شعار برند */}
      <p className="text-xs font-black text-primary">
        آنلاین مد؛ استایل خاص، انتخاب بی‌دردسر
      </p>
      {/* متن معرفی کوتاه بدون لینک مشاهده بیشتر */}
      <p className="text-xs font-semibold text-slate-600 leading-relaxed">
        ما با ارائه جدیدترین ترندهای پوشاک و تضمین اصالت و کیفیت، همراه همیشگی استایل شما هستیم.
      </p>
    </div>
  </div>

  <div className="flex items-center gap-3">
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="w-20 h-20 rounded-[1.5rem] bg-white border border-slate-200 p-2 flex items-center justify-center shadow-sm"
      >
        <span className="text-[10px] font-bold text-slate-500">نماد {item}</span>
      </div>
    ))}
  </div>

</div>
          {/* کپی‌رایت */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-slate-500">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-slate-900 transition-colors">
                پیگیری سفارش
              </Link>
              <span>|</span>
              <Link href="#" className="hover:text-slate-900 transition-colors">
                شرایط و ضوابط
              </Link>
            </div>
            <p>© کلیه حقوق مادی و معنوی برای این سایت محفوظ می‌باشد.</p>
          </div>

          {/* دکمه بازگشت به بالا */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              <span>بازگشت به بالا</span>
              <ChevronUpIcon className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}