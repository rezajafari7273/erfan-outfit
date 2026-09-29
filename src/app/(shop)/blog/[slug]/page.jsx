"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  UserIcon,
  EyeIcon,
  CalendarIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowRightIcon,
  TagIcon,
} from "@heroicons/react/24/solid";

const SAMPLE_ARTICLE = {
  title: "راهنمای کامل ست کردن استایل پاییزه با رنگ‌های ترند سال",
  category: "استایل و مد",
  author: "تیم تحریریه",
  authorRole: "نویسنده ارشد مد و فشن",
  readTime: "۵ دقیقه",
  views: "۱.۲k",
  date: "۱۲ شهریور ۱۴۰۵",
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
  tags: ["استایل پاییزه", "ترند ۲۰۲۶", "ترکیب رنگ", "پوشاک زنانه"],
};

export default function ArticleDetailPage() {
  return (
    <main dir="rtl" className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb & دکمه بازگشت */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-900 transition-colors">
            مجله
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
            {SAMPLE_ARTICLE.title}
          </span>
        </div>
        <Link
          href="/blog"
          className="flex items-center gap-1 font-bold text-slate-700 hover:text-slate-900 transition-colors"
        >
          <span>بازگشت</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* هدر مقاله */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          #{SAMPLE_ARTICLE.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {SAMPLE_ARTICLE.title}
        </h1>

        {/* متادیتای مقاله */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-b border-slate-100 pb-4">
          <span className="flex items-center gap-1">
            <UserIcon className="w-4 h-4 text-primary" />
            {SAMPLE_ARTICLE.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            {SAMPLE_ARTICLE.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4 text-slate-400" />
            {SAMPLE_ARTICLE.readTime} زمان مطالعه
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4 text-amber-500" />
            {SAMPLE_ARTICLE.views} بازدید
          </span>
        </div>
      </div>

      {/* تصویر شاخص */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <Image
          src={SAMPLE_ARTICLE.image}
          alt={SAMPLE_ARTICLE.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* بدنه اصلی مقاله */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* متن مقاله */}
        <article className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* فهرست مطالب */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <h4 className="text-sm font-black text-slate-900">فهرست مطالب مقاله:</h4>
            <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 space-y-1 font-medium">
              <li>مقدمه‌ای بر رنگ‌های ترند فصل پاییز</li>
              <li>چگونه رنگ‌های گرم را با یکدیگر ست کنیم؟</li>
              <li>اکسسوری‌های ضروری برای استایل پاییزه</li>
            </ul>
          </div>

          <p>
            فصل پاییز همواره یکی از جذاب‌ترین فصل‌ها برای علاقه‌مندان به مد و استایل است. تنوع بالای پوشاک در این فصل، امکان لایه‌بندی (Layering) و ترکیب رنگ‌های مختلف را برای شما فراهم می‌سازد.
          </p>

          <h2 className="text-lg sm:text-xl font-black text-slate-900 pt-4">
            ۱. انتخاب پالت رنگی مناسب
          </h2>
          <p>
            رنگ‌های خردلی، شتري، زیتونی و زرشکی از جمله رنگ‌های همیشگی و ترند فصل پاییز هستند. شما می‌توانید با ترکیب این رنگ‌ها همراه با پارچه‌های کتان یا چرم، استایلی منحصر به فرد داشته باشید.
          </p>

          {/* اقتباس / نقل قول */}
          <blockquote className="p-4 rounded-2xl bg-slate-100 border-r-4 border-slate-900 text-slate-800 font-bold text-xs sm:text-sm my-4">
            "استایل پاییزه یعنی تعادل بین راحتی، گرما و هماهنگی رنگ‌های طبیعت."
          </blockquote>

          <h2 className="text-lg sm:text-xl font-black text-slate-900 pt-4">
            ۲. اهمیت اکسسوری‌ها
          </h2>
          <p>
            استفاده از شال‌گردن‌های پشمی با طرح‌های چهارخانه یا کلاه‌های بافتنی می‌تواند نقطه عطف استایل شما باشد.
          </p>

          {/* برچسب‌ها (Tags) */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <TagIcon className="w-4 h-4 text-slate-400" />
            {SAMPLE_ARTICLE.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* سایبار (اشتراک گذاری و اطلاعات نویسنده) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* کارت نویسنده */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-slate-600 font-bold text-xl">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">{SAMPLE_ARTICLE.author}</h4>
              <p className="text-xs text-slate-500 font-medium">{SAMPLE_ARTICLE.authorRole}</p>
            </div>
          </div>

          {/* دکمه‌های اشتراک گذاری */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800">اشتراک‌گذاری مقاله</h4>
            <div className="flex items-center justify-around">
              <button className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-slate-700 transition-all">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-slate-700 transition-all">
                <BookmarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}