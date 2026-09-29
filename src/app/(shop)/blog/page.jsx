"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ClockIcon,
  UserIcon,
  EyeIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const ARTICLES = [
  {
    id: "art-1",
    slug: "autumn-style-guide",
    title: "راهنمای کامل ست کردن استایل پاییزه با رنگ‌های ترند سال",
    summary:
      "بررسی جدیدترین ترکیب‌های رنگی و اکسسوری‌های محبوب برای ساخت یک استایل جذاب و کژوال در فصل پاییز...",
    category: "استایل و مد",
    author: "تیم تحریریه",
    readTime: "۵ دقیقه",
    views: "۱.۲k",
    date: "۱۲ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    href: "/blog/autumn-style-guide",
    featured: true,
  },
  {
    id: "art-2",
    slug: "fabric-types-guide",
    title: "چگونه جنس پارچه پوشاک را مثل یک حرفه‌ای تشخیص دهیم؟",
    summary:
      "نکات کلیدی برای بررسی الیاف طبیعی و مصنوعی هنگام خرید لباس آنلاین و راهکارهای نگهداری...",
    category: "راهنمای خرید",
    author: "علی محمدی",
    readTime: "۴ دقیقه",
    views: "۸۵۰",
    date: "۱۰ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    href: "/blog/fabric-types-guide",
  },
  {
    id: "art-3",
    slug: "essential-accessories",
    title: "۱۰ اکسسوری ضروری که استایل شما را دگرگون می‌کنند",
    summary:
      "معرفی اکسسوری‌های کوچکی که نقش بسیار بزرگی در جذابیت ظاهری شما ایفا می‌کنند...",
    category: "اکسسوری",
    author: "سارا راد",
    readTime: "۳ دقیقه",
    views: "۹۲۰",
    date: "۰۸ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    href: "/blog/essential-accessories",
  },
  {
    id: "art-4",
    slug: "winter-clothes-care",
    title: "اصول نگهداری و شستشوی لباس‌های زمستانه و کاپشن",
    summary:
      "چگونه عمر کاپشن‌ها و پالتوهای اورجینال خود را با شستشوی صحیح افزایش دهیم...",
    category: "نگهداری پوشاک",
    author: "تیم پشتیبانی",
    readTime: "۶ دقیقه",
    views: "۱.۵k",
    date: "۰۵ شهریور ۱۴۰۵",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?w=600&q=80",
    href: "/blog/winter-clothes-care",
  },
];

const CATEGORIES = ["همه", "استایل و مد", "راهنمای خرید", "اکسسوری", "نگهداری پوشاک"];

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory =
      selectedCategory === "همه" || article.category === selectedCategory;
    const matchesSearch =
      article.title.includes(searchQuery) ||
      article.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <main dir="rtl" className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* هدر صفحه و سرچ */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-primary/10 rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
        {/* الگوی تزئینی پس‌زمینه */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-sm">
            <BookOpenIcon className="w-4 h-4 text-primary" />
            مجله و اخبار مد
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            جدیدترین مقالات و راهنمای استایل
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            مطالب خواندنی درباره مد، پوشاک و تکنیک‌های استایلینگ برای داشتن پوششی جذاب‌تر.
          </p>

          {/* باکس جستجو */}
          <div className="relative pt-2">
            <input
              type="text"
              placeholder="جستجو در بین مقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-11 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute right-4 top-5.5" />
          </div>
        </div>
      </div>

      {/* مقاله ویژه (Featured Article) */}
      {selectedCategory === "همه" && !searchQuery && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-black text-slate-800">مقاله ویژه هفته</h2>
          </div>
          <Link
            href={featuredArticle.href}
            className="group grid grid-cols-1 md:grid-cols-12 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="relative h-64 md:h-auto md:col-span-7 overflow-hidden">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 bg-primary text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                پیشنهاد سردبیر
              </span>
            </div>
            <div className="p-6 sm:p-8 md:col-span-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="text-primary">#{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-slate-400" />
                  {featuredArticle.readTime} مطالعه
                </span>
                <span className="flex items-center gap-1 font-bold text-primary group-hover:-translate-x-1 transition-transform">
                  خواندن مقاله
                  <ArrowLeftIcon className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* دسته بندی ها */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* شبکه‌بندی کارت‌های مقالات */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group relative flex flex-col justify-between rounded-[2rem] bg-primary/5 p-3.5 border border-neutral-200 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-primary/10 hover:border-[#e5c158] hover:shadow-[0_15px_30px_-10px_rgba(229,193,88,0.22)] cursor-pointer overflow-hidden h-full w-full"
            >
              <div className="flex flex-col flex-1">
                <div className="relative h-48 w-full overflow-hidden rounded-[1.5rem] bg-black/20 shadow-md flex-shrink-0">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold text-[11px] shadow-md">
                    <span className="text-primary ml-1">#</span>
                    {article.category}
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-medium text-[10px]">
                    <ClockIcon className="w-3 h-3 text-primary" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                      <span className="flex items-center gap-1 text-[#6E6868]">
                        <UserIcon className="w-3.5 h-3.5 text-primary" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <EyeIcon className="w-3.5 h-3.5 text-amber-500" />
                        {article.views}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-800 transition-colors group-hover:text-primary leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </div>

                  <p className="text-xs font-medium text-gray-500 line-clamp-2 leading-relaxed mt-auto">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-3 border-t border-primary/10 flex-shrink-0">
                <span className="text-[11px] font-bold text-gray-400">{article.date}</span>
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs group-hover:-translate-x-1 transition-transform duration-300">
                  <span>ادامه مطلب</span>
                  <ArrowLeftIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


    </main>
  );
}