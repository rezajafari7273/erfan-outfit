"use client";

import React, { useState } from "react";
import {
  HomeIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  UserIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "@/components/ui/Button"; 

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("collect");

  const menuItems = [
    { id: "collect", title: "اطلاعاتی که جمع‌آوری می‌کنیم", icon: DocumentTextIcon },
    { id: "use", title: "چگونه از اطلاعات شما استفاده می‌کنیم", icon: Cog6ToothIcon },
    { id: "share", title: "اشتراک‌گذاری اطلاعات", icon: UserGroupIcon },
    { id: "security", title: "امنیت اطلاعات", icon: LockClosedIcon },
    { id: "cookies", title: "کوکی‌ها (Cookies)", icon: CheckBadgeIcon },
    { id: "rights", title: "حقوق شما", icon: UserIcon },
    { id: "contact", title: "تماس با ما", icon: EnvelopeIcon },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 dir-rtl text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ================= هدر اصلی (Hero Section) ================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-primary/5 p-6 sm:p-10 border border-slate-200/60 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
          {/* افکت‌های گرافیکی پس‌زمینه */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* سمت راست: نوار مسیریابی، عنوان و متن */}
            <div className="space-y-4 max-w-2xl text-right">
              
              {/* Breadcrumb مدرن */}
              <nav className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-xs text-slate-500 shadow-sm backdrop-blur-md">
                <HomeIcon className="w-3.5 h-3.5 text-slate-400" />
                <Link href="/" className="hover:text-primary transition-colors">خانه</Link>
                <span className="text-slate-300">/</span>
                <span className="text-primary font-medium">حریم خصوصی و امنیت</span>
              </nav>

              <h1 className="text-2xl sm:text-4xl font-rokh font-extrabold text-slate-900 tracking-tight leading-tight">
                حریم خصوصی و امنیت
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ما در آنلاین مد به حریم خصوصی شما احترام می‌گذاریم و متعهدیم اطلاعات شخصی شما را با بالاترین استانداردهای امنیتی محافظت کنیم.
              </p>
            </div>

            {/* سمت چپ: کارت شیشه‌ای دکوراتیو */}
            <div className="relative group flex items-center justify-center min-w-[160px] sm:min-w-[200px] h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-md shadow-inner transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 text-white flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white/50">
                <ShieldCheckIcon className="w-9 h-9" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= چیدمان اصلی ۲ ستونه ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ------------ ستون سمت راست/کناری (Sidebar - 4 ستون) ------------ */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            
            {/* کارت فهرست مطالب */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-rokh font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                فهرست مطالب
              </h3>
              
              <nav className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                        <span>{item.title}</span>
                      </div>
                      {isActive && <ChevronLeftIcon className="w-4 h-4 text-primary" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* کارت کوچک امنیت اولویت ماست */}
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl p-6 border border-slate-200/70 shadow-md shadow-slate-100/50 space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                امنیت، اولویت ماست
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                ما از جدیدترین فناوری‌ها برای حفاظت از اطلاعات شخصی و مالی شما استفاده می‌کنیم.
              </p>
            </div>
          </div>

          {/* ------------ ستون اصلی محتوا (Main Content - 8 ستون) ------------ */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* کارت ۱: اطلاعاتی که جمع‌آوری می‌کنیم */}
            <div
              id="collect"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۱
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    اطلاعاتی که جمع‌آوری می‌کنیم
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <DocumentTextIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                ما ممکن است اطلاعاتی مانند نام، نام خانوادگی، شماره تماس، آدرس، ایمیل، اطلاعات پرداخت و جزئیات سفارشات شما را هنگام ثبت‌نام، خرید یا استفاده از بخش‌های مختلف سایت جمع‌آوری کنیم. همچنین ممکن است اطلاعاتی درباره مرورگر، دستگاه و رفتار شما در سایت نیز به‌صورت خودکار جمع‌آوری شود.
              </p>
            </div>

            {/* کارت ۲: چگونه از اطلاعات شما استفاده می‌کنیم */}
            <div
              id="use"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۲
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    چگونه از اطلاعات شما استفاده می‌کنیم
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <Cog6ToothIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                اطلاعات شما برای پردازش سفارش‌ها، بهبود تجربه کاربری، ارسال اطلاعیه‌ها و پیشنهادهای ویژه استفاده می‌شود. ما همچنین ممکن است برای تحلیل و بهبود خدمات خود، از اطلاعات جمع‌آوری‌شده به‌صورت ناشناس استفاده کنیم.
              </p>
            </div>

            {/* کارت ۳: اشتراک‌گذاری اطلاعات */}
            <div
              id="share"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۳
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    اشتراک‌گذاری اطلاعات
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <UserGroupIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                ما اطلاعات شخصی شما را با هیچ شخص ثالثی به‌جز در موارد ضروری و مطابق با قوانین، به اشتراک نمی‌گذاریم. در صورت نیاز به همکاری با شرکت‌های حمل‌ونقل، درگاه‌های پرداخت و ارائه‌دهندگان خدمات، اطلاعات لازم فقط در حد مورد نیاز و با رعایت کامل امنیت منتقل خواهد شد.
              </p>
            </div>

            {/* کارت ۴: امنیت اطلاعات */}
            <div
              id="security"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۴
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    امنیت اطلاعات
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <LockClosedIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                ما از پروتکل‌های امنیتی پیشرفته و استانداردهای بین‌المللی برای حفاظت از اطلاعات شما استفاده می‌کنیم. با این حال هیچ روشی برای انتقال اطلاعات در اینترنت کاملاً امن نیست و ما نمی‌توانیم امنیت مطلق اطلاعات را تضمین کنیم، اما تمام تلاش خود را برای حفظ امنیت آن‌ها بکار می‌گیریم.
              </p>
            </div>

            {/* کارت ۵: کوکی‌ها */}
            <div
              id="cookies"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۵
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    کوکی‌ها (Cookies)
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <CheckBadgeIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                وب‌سایت ما از کوکی‌ها برای بهبود عملکرد، شخصی‌سازی محتوا و ارائه تجربه بهتر استفاده می‌کند. شما می‌توانید از طریق تنظیمات مرورگر خود، کوکی‌ها را غیرفعال کنید، اما ممکن است برخی بخش‌های سایت به‌درستی کار نکنند.
              </p>
            </div>

            {/* کارت ۶: حقوق شما */}
            <div
              id="rights"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۶
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    حقوق شما
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <UserIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                شما حق دارید در هر زمان، به اطلاعات شخصی خود دسترسی داشته باشید، آن‌ها را اصلاح کنید یا درخواست حذف آن‌ها را بدهید. برای این کار می‌توانید از طریق راه‌های ارتباطی با ما در تماس باشید.
              </p>
            </div>

            {/* کارت ۷: تماس با ما */}
            <div
              id="contact"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-3 scroll-mt-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    ۷
                  </span>
                  <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                    تماس با ما
                  </h2>
                </div>
                <div className="w-10 h-10 rounded-xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md shadow-lg shadow-secondary-500/10 flex items-center justify-center font-bold">
                  <EnvelopeIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                در صورت داشتن هرگونه سؤال یا نگرانی درباره حریم خصوصی و امنیت اطلاعات، می‌توانید با ما از طریق راه‌های ارتباطی موجود در سایت تماس بگیرید.
              </p>
            </div>

            {/* کارت بنر ارتباط با پشتیبانی */}
            <section className="mt-6 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white to-primary/5 p-6 sm:p-8 shadow-md shadow-slate-100/50">
              <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                    <ShieldCheckIcon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      سؤالی درباره حریم خصوصی دارید؟
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      تیم پشتیبانی آنلاین مد آماده پاسخگویی به شماست.
                    </p>
                  </div>
                </div>

                <Link href="/contact">
                  <Button variant="gradient" size="lg" icon={EnvelopeIcon} iconPosition="left">
                    تماس با ما
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}