"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// مپینگ وضعیت تراکنش‌ها هماهنگ با تم سیستم
const STATUS_MAP = {
  pending: { label: "در انتظار", cls: "bg-amber-500/10 text-amber-500 border border-amber-500/20" },
  success: { label: "موفق", cls: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" },
  failed: { label: "ناموفق", cls: "bg-rose-500/10 text-rose-500 border border-rose-500/20" },
  refunded: { label: "مسترد شده", cls: "bg-admin-background text-admin-text-muted border border-admin-border/60" },
};

export default function RecentTransactions({ transactions = [] }) {
  const formatPrice = (v) => {
    if (v === null || v === undefined) return "۰";
    return Number(v).toLocaleString("fa-IR");
  };

  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر کامپوننت */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-admin-text tracking-tight">آخرین تراکنش‌ها</h3>
        <Link
          href="/admin-panel/transactions"
          className="text-[11px] font-bold text-admin-primary hover:underline flex items-center gap-0.5 transition-all"
        >
          <span>مشاهده همه</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* وضعیت عدم وجود داده */}
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-xs font-bold text-admin-text-muted">
          تراکنشی ثبت نشده است
        </div>
      ) : (
        /* لیست تراکنش‌ها */
        <div className="space-y-1.5">
          {transactions.map((t) => {
            const st = STATUS_MAP[t.status] || {
              label: t.status || "نامشخص",
              cls: "bg-admin-background text-admin-text-muted border border-admin-border/60",
            };

            return (
              <div
                key={t.id || t.transaction_id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-admin-background/70 border border-transparent hover:border-admin-border/50 transition-all duration-200"
              >
                {/* شناسه/سفارش، وضعیت و درگاه */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs text-admin-text dir-ltr">
                      #{t.order_id || t.order_number || t.id}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-admin-text-muted mt-1 truncate">
                    {t.user_phone || t.user_fullname || "کاربر"}
                    {t.gateway_display && (
                      <span> · درگاه {t.gateway_display}</span>
                    )}
                  </div>
                </div>

                {/* مبلغ تراکنش */}
                <div className="text-xs font-black text-admin-text whitespace-nowrap mr-3 shrink-0">
                  {formatPrice(t.amount)} <span className="text-[10px] font-bold text-admin-text-muted">تومان</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}