'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bars3Icon,
  UserIcon,
  SparklesIcon,
  HeartIcon,
  TrophyIcon,
  ShoppingBagIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import PromotionRenderer from '@/components/promotions/PromotionRenderer';

export default function MegaMenu({ isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <li 
      className="group/megalist relative py-2 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* تیتر مگامنو */}
      <div className="text-sm font-medium text-gray-900 flex items-center gap-1.5 transition-colors hover:text-primary-500">
        <Bars3Icon className="w-4 h-4 stroke-[1.8]" />
        <span>دسته‌بندی پوشاک</span>
      </div>

      {/* خط زیرین هاور */}
      <div
        className={`absolute -bottom-[12px] right-0 left-0 h-[2px] bg-primary rounded-full z-20 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* منوی بازشونده مگامنو */}
      <div className="fixed top-[60px] right-0 left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-40 overflow-x-auto overflow-y-auto max-h-[80vh] opacity-0 invisible -translate-y-3 group-hover/megalist:opacity-100 group-hover/megalist:visible group-hover/megalist:translate-y-0 transition-all duration-300 ease-out">
        <div className="container mx-auto px-8 py-10 min-w-[720px]">
          <div className="grid grid-cols-5 gap-8">
            
            {/* Column 1: Main Categories Grid (3 Top, 2 Bottom) با پدینگ راست pr-3 برای هدایت به چپ */}
            <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-8 pr-3">
              
              {/* گزینه ۱: پوشاک مردانه */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <UserIcon className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>پوشاک مردانه</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'پیراهن و تیشرت', bg: 'bg-blue-500' },
                    { name: 'شلوار جين و کتان', bg: 'bg-blue-400' },
                    { name: 'کت و شلوار رسمی', bg: 'bg-blue-600' },
                    { name: 'هودی و سویشرت', bg: 'bg-blue-500' },
                    { name: 'کاپشن و پالتو', bg: 'bg-blue-700' },
                    { name: 'لباس ورزشی مردانه', bg: 'bg-blue-500' },
                    { name: 'لباس زیر و خواب', bg: 'bg-blue-400' },
                  ].map((cat, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="group/item text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${cat.bg} rounded-full transition-transform group-hover/item:scale-125 shrink-0`}></span>
                        <span className="transition-all duration-200 group-hover/item:text-blue-600 group-hover/item:-translate-x-1">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* گزینه ۲: پوشاک زنانه */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <SparklesIcon className="w-4 h-4 text-pink-500 shrink-0" />
                  <span>پوشاک زنانه</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'مانتو، پالتو و بارانی', bg: 'bg-pink-500' },
                    { name: 'شومیز و بلوز', bg: 'bg-pink-400' },
                    { name: 'پیراهن و لباس مجلسی', bg: 'bg-pink-600' },
                    { name: 'شلوار و سرهمی', bg: 'bg-pink-500' },
                    { name: 'تاپ و تیشرت زنانه', bg: 'bg-pink-400' },
                    { name: 'لباس ورزشی زنانه', bg: 'bg-pink-600' },
                    { name: 'شال و روسری', bg: 'bg-pink-500' },
                  ].map((cat, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="group/item text-xs text-gray-500 hover:text-pink-600 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${cat.bg} rounded-full transition-transform group-hover/item:scale-125 shrink-0`}></span>
                        <span className="transition-all duration-200 group-hover/item:text-pink-600 group-hover/item:-translate-x-1">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* گزینه ۳: کیف، کفش و اکسسوری */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <ShoppingBagIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>کیف، کفش و اکسسوری</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'کفش اسپرت و کتانی', bg: 'bg-emerald-500' },
                    { name: 'کفش رسمی و چرم', bg: 'bg-emerald-600' },
                    { name: 'کیف دستی و دوشی', bg: 'bg-emerald-400' },
                    { name: 'کوله‌پشتی و ساک ورزشی', bg: 'bg-emerald-500' },
                    { name: 'عینک آفتابی', bg: 'bg-emerald-600' },
                    { name: 'ساعت مچی و زیورآلات', bg: 'bg-emerald-500' },
                    { name: 'کمربند و کراوات', bg: 'bg-emerald-400' },
                  ].map((cat, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="group/item text-xs text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${cat.bg} rounded-full transition-transform group-hover/item:scale-125 shrink-0`}></span>
                        <span className="transition-all duration-200 group-hover/item:text-emerald-600 group-hover/item:-translate-x-1">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* گزینه ۴: پوشاک بچگانه */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <HeartIcon className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>پوشاک بچگانه</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'لباس نوزادی', bg: 'bg-rose-400' },
                    { name: 'پوشاک پسرانه', bg: 'bg-rose-500' },
                    { name: 'پوشاک دخترانه', bg: 'bg-rose-400' },
                    { name: 'کفش بچگانه', bg: 'bg-rose-600' },
                    { name: 'ست‌های خانگی بچگانه', bg: 'bg-rose-500' },
                  ].map((cat, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="group/item text-xs text-gray-500 hover:text-rose-600 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${cat.bg} rounded-full transition-transform group-hover/item:scale-125 shrink-0`}></span>
                        <span className="transition-all duration-200 group-hover/item:text-rose-600 group-hover/item:-translate-x-1">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* گزینه ۵: برندهای بین‌المللی */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <TrophyIcon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>برندهای بین‌المللی</span>
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'زارا (Zara)', bg: 'bg-amber-500' },
                    { name: 'نایک (Nike)', bg: 'bg-amber-600' },
                    { name: 'آدیداس (Adidas)', bg: 'bg-amber-400' },
                    { name: 'اچ‌اند‌ام (H&M)', bg: 'bg-amber-500' },
                    { name: 'مانگو (Mango)', bg: 'bg-amber-600' },
                    { name: 'پوما (Puma)', bg: 'bg-amber-500' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="group/item text-xs text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full transition-transform group-hover/item:scale-125 shrink-0`}></span>
                        <span className="transition-all duration-200 group-hover/item:text-amber-600 group-hover/item:-translate-x-1">{brand.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Column 2: Promotions & Special Collections */}
            <div className="col-span-2">
              <div className="mb-6">
                <PromotionRenderer
                  type="smallBanner"
                  slotKey="megaMenu"
                  className="grid-cols-2 gap-4"
                />
              </div>

              {/* Special Collections */}
              <div className="space-y-4">
                <h4 className="font-rokh font-black text-sm mb-4 text-gray-900">
                  کالکشن‌های ما
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { code: 'WIN', title: 'کالکشن زمستانه', desc: 'جدیدترین مدل‌های فصل' },
                    { code: 'CAS', title: 'استایل کژوال و روزمره', desc: 'راحت و کاربردی' },
                    { code: 'OFF', title: 'استایل رسمی و اداری', desc: 'شیک و منحصر‌به‌فرد' },
                    { code: 'BIG', title: 'پوشاک سایز بزرگ', desc: 'تنوع بالا و سایزبندی کامل' },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-amber-400/80 hover:bg-gradient-to-r hover:from-amber-50/60 hover:to-orange-50/40 transition-all duration-300 group/item hover:shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-100/60 group-hover/item:bg-gradient-to-tr group-hover/item:from-amber-500 group-hover/item:to-orange-400 flex items-center justify-center shrink-0 transition-all duration-300">
                        <span className="text-amber-700 group-hover/item:text-white font-bold text-xs transition-colors duration-300">
                          {item.code}
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-semibold text-gray-800 group-hover/item:text-amber-600 transition-colors duration-300 block truncate">
                          {item.title}
                        </span>
                        <p className="text-[11px] text-gray-500 truncate">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top Fashion Categories */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-rokh font-black text-sm mb-4 text-gray-900">
                  محبوب‌ترین دسته‌ها
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'کتانی مردانه',
                    'مانتو تابستانی',
                    'هودی اسپرت',
                    'کیف چرم زنانه',
                    'عینک آفتابی',
                    'کاپشن دخترانه',
                  ].map((cat, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="px-3 py-1.5 text-xs rounded-full border border-gray-200 text-gray-700 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/60 transition-all duration-200"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom line with quick links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link
                  href="#"
                  className="group/quick text-xs text-gray-500 hover:text-amber-500 transition-colors flex items-center gap-1"
                >
                  <BoltIcon className="w-4 h-4 text-amber-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-amber-500">پرطرفدارترین استایل‌ها</span>
                </Link>
                <Link
                  href="#"
                  className="group/quick text-xs text-gray-500 hover:text-cyan-500 transition-colors flex items-center gap-1"
                >
                  <ClockIcon className="w-4 h-4 text-cyan-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-cyan-500">کالکشن‌های جدید</span>
                </Link>
                <Link
                  href="#"
                  className="group/quick text-xs text-gray-500 hover:text-indigo-500 transition-colors flex items-center gap-1"
                >
                  <ChartBarIcon className="w-4 h-4 text-indigo-500 transition-transform group-hover/quick:scale-110" />
                  <span className="transition-colors group-hover/quick:text-indigo-500">پرفروش‌ترین‌های فصل</span>
                </Link>
              </div>

              {/* دکمه مشاهده همه محصولات */}
              <Link
                href="#"
                className="group/all text-sm font-bold font-rokh hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <span>مشاهده همه محصولات پوشاک</span>
                <ArrowRightIcon className="w-4 h-4 group-hover/all:text-primary rotate-180 transition-transform duration-200 group-hover/all:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}