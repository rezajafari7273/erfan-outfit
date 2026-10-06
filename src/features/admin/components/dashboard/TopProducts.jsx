"use client";

import Link from "next/link";
import { ChevronLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function TopProducts({ products = [] }) {
  const formatPrice = (v) => {
    if (v === null || v === undefined) return "۰";
    return Number(v).toLocaleString("fa-IR");
  };

  // استایل‌دهی مدال رتبه‌بندی محصولات
  const getRankBadgeClass = (index) => {
    switch (index) {
      case 0:
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      case 1:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
      case 2:
        return "bg-orange-500/10 text-orange-500 border-orange-500/30";
      default:
        return "bg-admin-background text-admin-text-muted border-admin-border/60";
    }
  };

  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر کامپوننت */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-admin-text tracking-tight">پرفروش‌ترین محصولات</h3>
        <Link
          href="/admin-panel/products"
          className="text-[11px] font-bold text-admin-primary hover:underline flex items-center gap-0.5 transition-all"
        >
          <span>مدیریت محصولات</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* وضعیت عدم وجود داده */}
      {products.length === 0 ? (
        <div className="text-center py-8 text-xs font-bold text-admin-text-muted">
          هنوز فروشی ثبت نشده است
        </div>
      ) : (
        /* لیست محصولات پرفروش */
        <div className="space-y-2.5">
          {products.map((p, i) => (
            <div
              key={p.id || i}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-admin-background/70 border border-transparent hover:border-admin-border/50 transition-all duration-200"
            >
              {/* نشان رتبه */}
              <div
                className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-xl text-[11px] font-black border ${getRankBadgeClass(
                  i
                )}`}
              >
                {Number(i + 1).toLocaleString("fa-IR")}
              </div>

              {/* تصویر محصول */}
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title || p.name || ""}
                  className="w-11 h-11 rounded-xl object-cover border border-admin-border/60 bg-admin-background shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-admin-background border border-admin-border/60 flex items-center justify-center shrink-0 text-admin-text-muted/50">
                  <PhotoIcon className="w-5 h-5" />
                </div>
              )}

              {/* عنوان و آمار فروش */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-admin-text truncate">
                  {p.title || p.name}
                </div>
                <div className="text-[10px] font-bold text-admin-text-muted mt-1 truncate">
                  <span className="text-admin-text font-black">
                    {Number(p.total_sold || p.sales_count || 0).toLocaleString("fa-IR")}
                  </span>{" "}
                  فروش ·{" "}
                  <span>
                    {formatPrice(p.total_revenue || p.revenue)} تومان
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}