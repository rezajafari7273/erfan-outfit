// src/components/common/Footer.jsx
"use client";

import Link from "next/link";
import {
  ChevronUpIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* بخش اصلی فوتر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ستون ۱: آدرس فروشگاه‌ها */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-800 border-r-4 border-pink-500 pr-3">
              آدرس فروشگاه‌ها
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">تهران</p>
                  <p>خیابان سعادت آباد - کوچه ۱۴ - پلاک ۴۳</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">شیراز</p>
                  <p>خیابان مطهری - کوچه ۵ - پلاک ۱۰</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center text-pink-500 shrink-0 mt-0.5">
                  🏢
                </span>
                <p>طبقه سوم</p>
              </div>
            </div>
          </div>

          {/* ستون ۲: دسترسی سریع */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-800 border-r-4 border-pink-500 pr-3">
              دســترسی سریع
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-pink-500 transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-pink-500 transition-colors">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-pink-500 transition-colors">
                  نحوه بازگشت وجه
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون ۳: راهنمای خرید */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-800 border-r-4 border-pink-500 pr-3">
              راهنمای خرید
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/order" className="text-gray-600 hover:text-pink-500 transition-colors">
                  ثبت سفارش
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-pink-500 transition-colors">
                  نحوه ارسال سفارش
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-gray-600 hover:text-pink-500 transition-colors">
                  شیوه‌های پرداخت
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون ۴: ارتباط با ما */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-gray-800 border-r-4 border-pink-500 pr-3">
              ارتباط با ما
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-gray-700 font-medium">۰۲۱ - ۴۵۶۷۸۹</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-gray-700">support@website.com</span>
              </div>
            </div>

            {/* شبکه‌های اجتماعی - با ایموجی */}
            <div className="pt-2">
              <p className="text-sm font-medium text-gray-700 mb-3">ما را در شبکه‌های اجتماعی دنبال کنید!</p>
              <div className="flex items-center gap-3">
                <Link href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-xl">
                  📸
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-xl">
                  ✈️
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-xl">
                  💬
                </Link>
                <Link href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 text-xl">
                  🐦
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* بخش توضیحات فروشگاه */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              ما اینجاییم تا تجربه‌ای متفاوت از خرید پوشاک زنانه رو برات بسازیم؛ جایی که مد، کیفیت و راحتی در کنار هم قرار می‌گیریم. هدف ما فقط فروش لباس نیست، بلکه کمک می‌کنیم استایلی داشته باشی که بازتاب شخصیت و زیبایی خاص خودته.
            </p>
            <Link href="/about" className="inline-block mt-3 text-pink-500 font-bold text-sm hover:text-pink-600 transition-colors">
              مشاهده بیشتر ...
            </Link>
          </div>
        </div>

        {/* بخش پایین فوتر */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* لوگو */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <span className="text-white font-bold text-lg">ش</span>
              </div>
              <span className="text-lg font-black text-gray-800">شیک‌پوش</span>
            </div>

            {/* لینک‌های پایین */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-pink-500 transition-colors">
                شرایط و ضوابط
              </Link>
              <span className="w-px h-4 bg-gray-300"></span>
              <Link href="/track-order" className="hover:text-pink-500 transition-colors">
                پیگیری سفارش
              </Link>
            </div>

            {/* دکمه بازگشت به بالا */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-pink-500 hover:text-white rounded-full text-sm font-medium text-gray-700 transition-all duration-300 group"
            >
              <span>بازگشت به بالا</span>
              <ChevronUpIcon className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* کپی‌رایت و طراح */}
          <div className="mt-4 text-center text-xs text-gray-400">
            <p>طراحی شده توسط <span className="text-gray-600 font-medium">امیرحسین محمدی</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}