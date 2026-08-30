"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import GlobalSearch from '@/components/common/Header/components/GlobalSearch';
import Backdrop from '@/components/ui/Backdrop';
import {
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  HomeIcon,
  SparklesIcon,
  FireIcon,
  BookOpenIcon,
  CpuChipIcon,
  FaceSmileIcon,
  TrophyIcon,
  GlobeAsiaAustraliaIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  ArrowRightIcon,
  Squares2X2Icon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const megaMenuData = [
  {
    title: 'لوازم الکترونیکی',
    icon: CpuChipIcon,
    items: [
      { name: 'اپل (Apple)', bg: 'bg-primary-500' },
      { name: 'سامسونگ (Samsung)', bg: 'bg-primary-400' },
      { name: 'سونی (Sony)', bg: 'bg-primary-300' },
      { name: 'هواوی (Huawei)', bg: 'bg-primary-500' },
      { name: 'ال‌جی (LG)', bg: 'bg-primary-600' },
      { name: 'شیائومی (Xiaomi)', bg: 'bg-primary-500' },
      { name: 'دِل (Dell)', bg: 'bg-primary-400' },
    ],
  },
  {
    title: 'پوشاک و مد',
    icon: UserIcon,
    items: [
      { name: 'زارا (Zara)', bg: 'bg-primary-500' },
      { name: 'اچ‌اند‌ام (H&M)', bg: 'bg-primary-400' },
      { name: 'گپ (Gap)', bg: 'bg-primary-300' },
      { name: 'نایک (Nike)', bg: 'bg-primary-600' },
      { name: 'آدیداس (Adidas)', bg: 'bg-primary-700' },
      { name: 'پوما (Puma)', bg: 'bg-primary-800' },
    ],
  },
  {
    title: 'لوازم خانگی',
    icon: HomeIcon,
    items: [
      { name: 'بوش (Bosch)', bg: 'bg-primary-500' },
      { name: 'سامسونگ خانگی', bg: 'bg-primary-400' },
      { name: 'ال‌جی خانگی', bg: 'bg-primary-300' },
      { name: 'پاناسونیک (Panasonic)', bg: 'bg-primary-600' },
      { name: 'فیلیپس (Philips)', bg: 'bg-primary-700' },
      { name: 'کنوود (Kenwood)', bg: 'bg-primary-800' },
    ],
  },
  {
    title: 'زیبایی و سلامت',
    icon: FaceSmileIcon,
    items: [
      { name: "لورآل (L'Oréal)", bg: 'bg-primary-500' },
      { name: 'شنل (Chanel)', bg: 'bg-primary-400' },
      { name: 'دیور (Dior)', bg: 'bg-primary-300' },
      { name: 'نیوآ (Nivea)', bg: 'bg-primary-600' },
      { name: 'گرن (Garnier)', bg: 'bg-primary-500' },
      { name: 'وازلین (Vaseline)', bg: 'bg-primary-400' },
    ],
  },
  {
    title: 'ورزشی',
    icon: TrophyIcon,
    items: [
      { name: 'نایک (Nike)', bg: 'bg-primary-600' },
      { name: 'آدیداس (Adidas)', bg: 'bg-primary-700' },
      { name: 'پوما (Puma)', bg: 'bg-primary-800' },
      { name: 'ریبوک (Reebok)', bg: 'bg-primary-500' },
      { name: 'آندر آرمور (Under Armour)', bg: 'bg-primary-600' },
      { name: 'اسکچرز (Skechers)', bg: 'bg-primary-700' },
    ],
  },
  {
    title: 'برندهای ایرانی',
    icon: GlobeAsiaAustraliaIcon,
    items: [
      { name: 'ایران خودرو', bg: 'bg-primary-500' },
      { name: 'سایپا', bg: 'bg-primary-400' },
      { name: 'پارس خودرو', bg: 'bg-primary-300' },
      { name: 'شاتل', bg: 'bg-primary-600' },
      { name: 'صانع (موبایل)', bg: 'bg-primary-500' },
      { name: 'مارال (لوازم خانگی)', bg: 'bg-primary-600' },
    ],
  },
];

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const navLinks = [
    { title: 'صفحه اصلی', href: '/', icon: HomeIcon },
    { title: 'شگفت‌انگیزها', href: '/deals', icon: SparklesIcon, badge: 'ویژه' },
    { title: 'پرفروش‌ترین‌ها', href: '/best-sellers', icon: FireIcon },
    { title: 'وبلاگ', href: '/blog', icon: BookOpenIcon },
  ];

  return (
    <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-secondary/10 shadow-sm">
      {/* Main Bar (منو همبرگری | لوگو در وسط | پروفایل) */}
      <div className="px-4 pt-3 pb-6 flex items-center justify-between relative">
        {/* راست: دکمه همبرگری */}
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="باز کردن منو"
            className="p-2 rounded-full bg-gray-100 border border-secondary/10 text-secondary active:scale-95 transition-all"
          >
            <Bars3Icon className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* وسط: لوگو */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo width={110} height={33} priority={true} />
        </div>

        {/* چپ: پروفایل کاربر */}
        <div className="flex items-center">
          <Link
            href="/login"
            aria-label="ورود / پروفایل کاربر"
            className="p-2.5 rounded-xl border border-secondary/10 bg-gray-100 text-secondary flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <UserIcon className="w-5 h-5 stroke-[1.8]" />
          </Link>
        </div>
      </div>

      {/* ردیف سرچ کامل موبایل */}
      <div className="px-4 pb-3">
        <GlobalSearch />
      </div>

      {/* کامپوننت Reusable بک‌دراپ */}
      <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Drawer Content */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header Drawer */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <Logo width={100} height={30} />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="بستن منو"
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body Drawer */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* باکس موقعیت مکانی */}
          <Link
            href="/location"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-100/70 border border-secondary/10 text-xs text-gray-700"
          >
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-secondary" />
              <span>ارسال به: <strong className="text-gray-900">تهران، سعادت‌آباد</strong></span>
            </div>
            <ChevronLeftIcon className="w-4 h-4 text-gray-400" />
          </Link>

          {/* منوی ناوبری اصلی */}
          <nav className="space-y-1">
            <p className="text-[11px] font-bold text-gray-400 px-2 mb-2 uppercase">دسترسی سریع</p>
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-secondary" />
                    <span>{link.title}</span>
                  </div>
                  {link.badge && (
                    <span className="bg-red-500/10 text-red-500 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* بخش مگامنو (آکاردئونی) */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-[11px] font-bold text-gray-400 px-2 mb-2 uppercase">دسته‌بندی و برندها</p>
            
            <button
              onClick={() => setIsMegaOpen(!isMegaOpen)}
              className="flex items-center justify-between w-full p-3 rounded-xl text-sm font-medium text-gray-800 bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <Squares2X2Icon className="w-5 h-5 text-primary" />
                <span>مگالیست برندها</span>
              </div>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isMegaOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>

            {/* محتوای مگامنو */}
            {isMegaOpen && (
              <div className="mt-2 space-y-2 pr-2">
                {megaMenuData.map((cat, idx) => {
                  const Icon = cat.icon;
                  const isCatOpen = openCategory === idx;
                  return (
                    <div key={idx} className="border-r-2 border-primary/20 mr-2 pr-2">
                      <button
                        onClick={() => toggleCategory(idx)}
                        className="flex items-center justify-between w-full py-2 px-2 text-xs font-semibold text-gray-700 hover:text-primary transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span>{cat.title}</span>
                        </div>
                        <ChevronDownIcon
                          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                            isCatOpen ? 'rotate-180 text-primary' : ''
                          }`}
                        />
                      </button>

                      {/* زیرمجموعه برندها */}
                      {isCatOpen && (
                        <div className="mr-6 my-2 space-y-2">
                          {cat.items.map((brand, bIdx) => (
                            <Link
                              key={bIdx}
                              href="#"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary py-1"
                            >
                              <span className={`w-1.5 h-1.5 ${brand.bg} rounded-full`}></span>
                              {brand.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* بنرهای تصویری مگامنو */}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <div className="relative overflow-hidden rounded-xl h-24">
                    <Image
                      src="/assets/images/banner/banner-four-3.jpg"
                      alt="برندهای لوکس"
                      width={150}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl h-24">
                    <Image
                      src="/assets/images/banner/banner-11.jpg"
                      alt="تکنولوژی پیشرفته"
                      width={150}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* برندهای ویژه امروز */}
                <div className="pt-3">
                  <span className="text-[11px] font-bold text-gray-800 block mb-2">برندهای ویژه امروز</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: 'AP', title: 'اپل', desc: 'تا ۳۰٪ تخفیف' },
                      { code: 'SA', title: 'سامسونگ', desc: 'هدیه خرید' },
                      { code: 'NI', title: 'نایک', desc: 'حراج ویژه' },
                      { code: 'LO', title: 'لورآل', desc: 'کادو رایگان' },
                    ].map((item, index) => (
                      <Link
                        key={index}
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-gray-50"
                      >
                        <div className="w-7 h-7 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-[10px]">{item.code}</span>
                        </div>
                        <div className="truncate">
                          <span className="text-[11px] font-semibold text-gray-800 block truncate">{item.title}</span>
                          <span className="text-[9px] text-gray-500 block truncate">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* دسته‌بندی‌های برتر */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-800 block mb-2">دسته‌بندی‌های برتر</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['گوشی هوشمند', 'لپ‌تاپ گیمینگ', 'لباس ورزشی', 'لوازم آرایشی'].map((cat, index) => (
                      <Link
                        key={index}
                        href="#"
                        onClick={() => setIsOpen(false)}
                        className="px-2.5 py-1 text-[10px] rounded-full border border-gray-200 text-gray-600 bg-white"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* لینک‌های سریع انتهای مگامنو */}
                <div className="pt-3 space-y-2 border-t border-gray-100 mt-3">
                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-600 flex items-center gap-2 py-1"
                  >
                    <BoltIcon className="w-4 h-4 text-primary" />
                    پرطرفدارترین‌ها
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-600 flex items-center gap-2 py-1"
                  >
                    <ClockIcon className="w-4 h-4 text-primary" />
                    جدیدترین برندها
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-gray-600 flex items-center gap-2 py-1"
                  >
                    <ChartBarIcon className="w-4 h-4 text-primary" />
                    پرفروش‌ترین‌ها
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-bold text-primary flex items-center justify-between pt-2"
                  >
                    <span>مشاهده همه برندها</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Drawer (دکمه ورود/ثبت نام) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary text-white font-bold text-xs shadow-md shadow-secondary/20 active:scale-95 transition-all"
          >
            <UserIcon className="w-4 h-4" />
            <span>ورود یا ثبت‌نام در سایت</span>
          </Link>
        </div>
      </aside>
    </header>
  );
}