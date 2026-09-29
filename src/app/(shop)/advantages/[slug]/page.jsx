import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { advantagesData } from "@/data/advantages";

// در Next.js 15 و 16، مقادیر params به‌صورت Promise دریافت می‌شوند
export default async function AdvantageDetailPage({ params }) {
  const { slug } = await params;

  // یافتن آیتم مربوطه بر اساس slug
  const advantage = advantagesData.find((item) => item.slug === slug);

  // اگر آیتم یافت نشد، صفحه 404 رندر شود
  if (!advantage) {
    notFound();
  }

  const { title, details, icon: Icon } = advantage;

  return (
    <main dir="rtl" className="min-h-screen py-12 px-4 sm:px-8 bg-slate-50/50">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* نوار مسیریابی (Breadcrumb) */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            صفحه اصلی
          </Link>
          <ChevronLeftIcon className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-bold">{title}</span>
        </div>

        {/* کارت اصلی جزئیات */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* هدر */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            {Icon && (
              <div className="w-14 h-14 rounded-2xl border border-secondary/10 bg-gray-200/60 backdrop-blur-md   transition-all duration-300 group shadow-lg shadow-secondary-500/10 flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-secondary" />
              </div>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-rokh font-bold text-primary">
                {title}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                {details?.headline}
              </p>
            </div>
          </div>

          {/* خلاصه */}
          {details?.summary && (
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 sm:p-5 text-sm font-medium text-slate-700 leading-relaxed">
              {details.summary}
            </div>
          )}

          {/* بخش‌های توضیحات کامل */}
          {details?.sections?.length > 0 && (
            <div className="space-y-6">
              {details.sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-primary rounded-full" />
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed pr-3">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}

// برای تولید استاتیک مسیرها در زمان Build (اختیاری)
export async function generateStaticParams() {
  return advantagesData.map((item) => ({
    slug: item.slug,
  }));
}