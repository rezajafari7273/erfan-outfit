'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronDownIcon,
  CpuChipIcon,
  UserIcon,
  HomeIcon,
  FaceSmileIcon,
  TrophyIcon,
  GlobeAsiaAustraliaIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import PromotionRenderer from '@/components/promotions/PromotionRenderer';

export default function MegaMenu() {
  return (
    <li className="group/megalist static">
      <Link
        href="#"
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors py-4"
      >
        مگالیست منو
        <ChevronDownIcon className="w-4 h-4 stroke-[2]" />
      </Link>

      <div className="absolute top-full right-0 left-0 w-full bg-white border-b border-gray-200 shadow-2xl opacity-0 invisible group-hover/megalist:opacity-100 group-hover/megalist:visible transition-all duration-300 z-40 transform translate-y-2 group-hover/megalist:translate-y-0 overflow-x-auto overflow-y-auto max-h-[80vh]">
        <div className="container mx-auto px-8 py-10 min-w-[720px]">
          <div className="grid grid-cols-5 gap-8">
            {/* Column 1: Most popular brands */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {/* Electronics brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <CpuChipIcon className="w-4 h-4 text-primary-500" />
                  لوازم الکترونیکی
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'اپل (Apple)', bg: 'bg-primary-500' },
                    { name: 'سامسونگ (Samsung)', bg: 'bg-primary-400' },
                    { name: 'سونی (Sony)', bg: 'bg-primary-300' },
                    { name: 'هواوی (Huawei)', bg: 'bg-primary-500' },
                    { name: 'ال‌جی (LG)', bg: 'bg-primary-600' },
                    { name: 'شیائومی (Xiaomi)', bg: 'bg-primary-500' },
                    { name: 'دِل (Dell)', bg: 'bg-primary-400' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clothing and fashion brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <UserIcon className="w-4 h-4 text-primary-500" />
                  پوشاک و مد
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'زارا (Zara)', bg: 'bg-primary-500' },
                    { name: 'اچ‌اند‌ام (H&M)', bg: 'bg-primary-400' },
                    { name: 'گپ (Gap)', bg: 'bg-primary-300' },
                    { name: 'نایک (Nike)', bg: 'bg-primary-600' },
                    { name: 'آدیداس (Adidas)', bg: 'bg-primary-700' },
                    { name: 'پوما (Puma)', bg: 'bg-primary-800' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Home appliance brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <HomeIcon className="w-4 h-4 text-primary-500" />
                  لوازم خانگی
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'بوش (Bosch)', bg: 'bg-primary-500' },
                    { name: 'سامسونگ خانگی', bg: 'bg-primary-400' },
                    { name: 'ال‌جی خانگی', bg: 'bg-primary-300' },
                    { name: 'پاناسونیک (Panasonic)', bg: 'bg-primary-600' },
                    { name: 'فیلیپس (Philips)', bg: 'bg-primary-700' },
                    { name: 'کنوود (Kenwood)', bg: 'bg-primary-800' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beauty and health brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <FaceSmileIcon className="w-4 h-4 text-primary-500" />
                  زیبایی و سلامت
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: "لورآل (L'Oréal)", bg: 'bg-primary-500' },
                    { name: 'شنل (Chanel)', bg: 'bg-primary-400' },
                    { name: 'دیور (Dior)', bg: 'bg-primary-300' },
                    { name: 'نیوآ (Nivea)', bg: 'bg-primary-600' },
                    { name: 'گرن (Garnier)', bg: 'bg-primary-500' },
                    { name: 'وازلین (Vaseline)', bg: 'bg-primary-400' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sports brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <TrophyIcon className="w-4 h-4 text-primary-500" />
                  ورزشی
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'نایک (Nike)', bg: 'bg-primary-600' },
                    { name: 'آدیداس (Adidas)', bg: 'bg-primary-700' },
                    { name: 'پوما (Puma)', bg: 'bg-primary-800' },
                    { name: 'ریبوک (Reebok)', bg: 'bg-primary-500' },
                    { name: 'آندر آرمور (Under Armour)', bg: 'bg-primary-600' },
                    { name: 'اسکچرز (Skechers)', bg: 'bg-primary-700' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Iranian brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 flex items-center gap-2 text-gray-900">
                  <GlobeAsiaAustraliaIcon className="w-4 h-4 text-primary-500" />
                  برندهای ایرانی
                </h4>
                <ul className="space-y-3">
                  {[
                    { name: 'ایران خودرو', bg: 'bg-primary-500' },
                    { name: 'سایپا', bg: 'bg-primary-400' },
                    { name: 'پارس خودرو', bg: 'bg-primary-300' },
                    { name: 'شاتل', bg: 'bg-primary-600' },
                    { name: 'صانع (موبایل)', bg: 'bg-primary-500' },
                    { name: 'مارال (لوازم خانگی)', bg: 'bg-primary-600' },
                  ].map((brand, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-2"
                      >
                        <span className={`w-2 h-2 ${brand.bg} rounded-full`}></span>
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 2: Brand images & Dynamic Promotions */}
            <div className="col-span-2">
              {/* رندر بنرهای مگامنو به صورت پویا با گرید ۲ تایی */}
              <div className="mb-6">
                <PromotionRenderer
                  type="smallBanner"
                  slotKey="megaMenu"
                  className="grid-cols-2 gap-4"
                />
              </div>

              {/* Special brands */}
              <div className="space-y-4">
                <h4 className="font-black text-sm mb-4 text-gray-900">
                  برندهای ویژه امروز
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { code: 'AP', title: 'اپل', desc: 'تا ۳۰٪ تخفیف' },
                    { code: 'SA', title: 'سامسونگ', desc: 'هدیه خرید' },
                    { code: 'NI', title: 'نایک', desc: 'حراج ویژه' },
                    { code: 'LO', title: 'لورآل', desc: 'کادو رایگان' },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary-500 transition-all group/item"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-sm">
                          {item.code}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-800 group-hover/item:text-primary-500">
                          {item.title}
                        </span>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Top category */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-black text-sm mb-4 text-gray-900">
                  دسته‌بندی‌های برتر
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'گوشی‌های هوشمند',
                    'لپ‌تاپ‌های گیمینگ',
                    'لباس ورزشی',
                    'لوازم آرایشی',
                    'اسباب‌بازی',
                  ].map((cat, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="px-3 py-1.5 text-xs rounded-full border border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-500 transition-all"
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
                  className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-1"
                >
                  <BoltIcon className="w-4 h-4" />
                  پرطرفدارترین‌ها
                </Link>
                <Link
                  href="#"
                  className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-1"
                >
                  <ClockIcon className="w-4 h-4" />
                  جدیدترین برندها
                </Link>
                <Link
                  href="#"
                  className="text-xs text-gray-500 hover:text-primary-500 transition-colors flex items-center gap-1"
                >
                  <ChartBarIcon className="w-4 h-4" />
                  پرفروش‌ترین‌ها
                </Link>
              </div>
              <Link
                href="#"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
              >
                مشاهده همه برندها
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}