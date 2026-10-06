"use client";

import Link from "next/link";
import { ChevronLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function LowStock({ products = [] }) {
  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر کامپوننت */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-4 h-4 text-rose-500 shrink-0" />
          <h3 className="text-sm font-black text-admin-text tracking-tight">
            محصولات کم‌موجود
          </h3>
        </div>
        <Link
          href="/admin-panel/inventory"
          className="text-[11px] font-bold text-admin-primary hover:underline flex items-center gap-0.5 transition-all"
        >
          <span>مدیریت انبار</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* وضعیت عدم وجود داده */}
      {products.length === 0 ? (
        <div className="text-center py-8 text-xs font-bold text-admin-text-muted">
          همه محصولات موجودی کافی دارند
        </div>
      ) : (
        /* لیست محصولات کم موجود */
        <div className="space-y-2.5">
          {products.map((p) => {
            const totalStock = Number(p.total_stock || p.stock || 0);

            return (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition-all duration-200"
              >
                {/* عنوان و مجموع موجودی */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-admin-text truncate">
                    {p.title || p.name}
                  </span>
                  <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2.5 py-0.5 rounded-lg shrink-0 shadow-sm">
                    {totalStock.toLocaleString("fa-IR")} عدد
                  </span>
                </div>

                {/* تنوع کالاها (تک‌رنگ/سایز) */}
                {p.variants && p.variants.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.variants.map((v, idx) => {
                      const qty = Number(v.stock_quantity ?? v.stock ?? 0);
                      const isZero = qty === 0;

                      return (
                        <span
                          key={v.variant_id || v.id || idx}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                            isZero
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                              : "bg-admin-surface border-admin-border/70 text-admin-text-muted"
                          }`}
                        >
                          {v.color_name || v.size_name || v.name || "تنوع"} ·{" "}
                          <span className={isZero ? "font-black" : "text-admin-text"}>
                            {qty.toLocaleString("fa-IR")}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}