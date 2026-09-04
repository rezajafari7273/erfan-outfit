"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PhoneIcon,
  EnvelopeIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer dir="rtl" className="w-full pt-12 pb-6 text-secondary select-none">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* کادر اصلی فوتر با استایل پالت طلایی/شیشه‌ای شما */}
        <div className="relative rounded-[2.5rem] bg-primary/5 border border-cart-boarder p-6 sm:p-10 shadow-lg backdrop-blur-md">
          
          {/* ۱. ستون‌های راهنما، دسترسی، خدمات و آدرس‌ها */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-primary/15">
            
            {/* ستون ۱: راهنمای خرید */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                <h3 className="text-base font-black text-product-title">
                  راهنمای خرید
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs font-bold text-[#6E6868]">
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  ثبت سفارش
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  نحوه ارسال سفارش
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  شیوه‌های پرداخت
                </li>
              </ul>
            </div>

            {/* ستون ۲: دسترسی سریع */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                <h3 className="text-base font-black text-product-title">
                  دسترسی سریع
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs font-bold text-[#6E6868]">
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  تماس با ما
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  فروشگاه
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  وبلاگ
                </li>
              </ul>
            </div>

            {/* ستون ۳: خدمات مشتریان */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                <h3 className="text-base font-black text-product-title">
                  خدمات مشتریان
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs font-bold text-[#6E6868]">
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  سوالات متداول
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  حریم خصوصی
                </li>
                <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  نحوه بازگشت وجه
                </li>
              </ul>
            </div>

            {/* ستون ۴: آدرس فروشگاه‌ها */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                <h3 className="text-base font-black text-product-title">
                  آدرس فروشگاه‌ها
                </h3>
              </div>
              <div className="space-y-3 text-xs font-medium text-[#6E6868] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p>تهران - خیابان سعادت آباد - کوچه ۱۴ - پلاک ۴۳ - طبقه دوم</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p>شیراز - خیابان مطهری - کوچه ۵ - پلاک ۱۰ - طبقه سوم</p>
                </div>
              </div>
            </div>

          </div>

          {/* ۲. نوار ارتباطی و شبکه‌های اجتماعی */}
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-primary/15">
            {/* ایمیل و تلفن */}
            <div className="flex items-center gap-6 text-xs font-bold text-[#263238]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <span className="tabular-nums">۰۲۱ - ۴۵۶۷۸۹۰</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <span className="tabular-nums">support@website.com</span>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#6E6868]">
                ما را در <strong className="text-primary font-black">شبکه‌های اجتماعی</strong> دنبال کنید!
              </span>
              <div className="flex items-center gap-2">
                {["whatsapp", "telegram", "instagram"].map((social, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300"
                  >
                    <span className="text-xs font-black uppercase">{social[0]}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ۳. درباره ما، لوگو و نمادهای اعتماد */}
          <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* لوگو و متن معرفی */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-primary/10 border border-primary/20 rounded-[2rem] p-4 flex-1">
              <div className="w-24 h-20 bg-primary text-white rounded-[1.5rem] flex items-center justify-center font-black text-lg shadow-md flex-shrink-0">
                لوگو
              </div>
              <p className="text-xs font-medium text-[#6E6868] leading-relaxed text-center sm:text-right">
                ما اینجا هستیم تا تجربه‌ای متفاوت از خرید آنلاین را برای شما بسازیم. کیفیت، اصالت و رضایت شما هدف اصلی ماست.{" "}
                <Link href="#" className="text-primary font-bold hover:underline">
                  مشاهده بیشتر ...
                </Link>
              </p>
            </div>

            {/* نمادهای اعتماد */}
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-20 h-20 rounded-[1.5rem] bg-white border border-cart-boarder p-2 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[10px] font-bold text-gray-400">نماد {item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ۴. دکمه بازگشت به بالا */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              <span>بازگشت به بالا</span>
              <ChevronUpIcon className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

        {/* ۵. کپی‌رایت و لینک‌های انتهایی */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-bold text-[#6E6868]">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">
              پیگیری سفارش
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-primary transition-colors">
              شرایط و ضوابط
            </Link>
          </div>
          <p>© کلیه حقوق مادی و معنوی برای این سایت محفوظ می‌افتد.</p>
        </div>
      </div>
    </footer>
  );
}