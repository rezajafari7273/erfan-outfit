"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// مپینگ وضعیت‌های سفارش هماهنگ با تم سیستم
const STATUS_MAP = {
  pending: { label: "در انتظار پرداخت", cls: "bg-amber-500/10 text-amber-500 border border-amber-500/20" },
  paid: { label: "پرداخت شده", cls: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" },
  processing: { label: "در حال آماده‌سازی", cls: "bg-blue-500/10 text-blue-500 border border-blue-500/20" },
  shipped: { label: "ارسال شده", cls: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" },
  delivered: { label: "تحویل شده", cls: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" },
  cancelled: { label: "لغو شده", cls: "bg-rose-500/10 text-rose-500 border border-rose-500/20" },
  refunded: { label: "مسترد شده", cls: "bg-admin-background text-admin-text-muted border border-admin-border/60" },
};

export default function RecentOrders({ orders = [] }) {
  const formatPrice = (v) => {
    if (v === null || v === undefined) return "۰";
    return Number(v).toLocaleString("fa-IR");
  };

  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر کامپوننت */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-admin-text tracking-tight">آخرین سفارشات</h3>
        <Link
          href="/admin-panel/orders"
          className="text-[11px] font-bold text-admin-primary hover:underline flex items-center gap-0.5 transition-all"
        >
          <span>مشاهده همه</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* وضعیت عدم وجود داده */}
      {orders.length === 0 ? (
        <div className="text-center py-8 text-xs font-bold text-admin-text-muted">
          هنوز سفارشی ثبت نشده است
        </div>
      ) : (
        /* لیست سفارشات */
        <div className="space-y-1.5">
          {orders.map((o) => {
            const st = STATUS_MAP[o.status] || {
              label: o.status || "نامشخص",
              cls: "bg-admin-background text-admin-text-muted border border-admin-border/60",
            };

            return (
              <div
                key={o.id || o.order_number}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-admin-background/70 border border-transparent hover:border-admin-border/50 transition-all duration-200"
              >
                {/* شماره سفارش، وضعیت و مشخصات مشتری */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs text-admin-text dir-ltr">
                      #{o.order_number || o.id}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold shrink-0 ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="text-[10px] font-bold text-admin-text-muted mt-1 truncate">
                    {o.user_name || o.customer_name || o.user_phone || "کاربر مهمان"}
                    {o.items_count && (
                      <span> · {Number(o.items_count).toLocaleString("fa-IR")} قلم کالا</span>
                    )}
                  </div>
                </div>

                {/* مبلغ کل سفارش */}
                <div className="text-xs font-black text-admin-text whitespace-nowrap mr-3 shrink-0">
                  {formatPrice(o.total_price || o.total_amount)} <span className="text-[10px] font-bold text-admin-text-muted">تومان</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}