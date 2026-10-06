"use client";

import { useState } from "react";
import { useOrders } from "@/features/admin/hooks/useOrders";
import OrderStatusSelect, { statusInfo } from "@/features/admin/components/orders/OrderStatusSelect";
import OrderDetailModal from "@/features/admin/components/orders/OrderDetailModal";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const STATUS_FILTERS = [
  { value: "", label: "همه" },
  { value: "pending", label: "در انتظار" },
  { value: "paid", label: "پرداخت‌شده" },
  { value: "processing", label: "آماده‌سازی" },
  { value: "shipped", label: "ارسال‌شده" },
  { value: "delivered", label: "تحویل‌شده" },
  { value: "cancelled", label: "لغو‌شده" },
];

function OrdersTableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border-b border-admin-border/40"
        >
          <div className="space-y-2 flex-1 max-w-xs">
            <div className="h-4 w-1/2 bg-admin-border/60 rounded-md font-mono" />
            <div className="h-3 w-3/4 bg-admin-border/40 rounded-md" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-16 bg-admin-border/50 rounded-md hidden md:block" />
            <div className="h-4 w-24 bg-admin-border/60 rounded-md" />
            <div className="w-24 h-7 bg-admin-border/50 rounded-xl" />
            <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminOrdersPage() {
  const { orders, count, stats, loading, params, updateParams, refetch } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت سفارشات
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {count > 0 ? `${formatNum(count)} سفارش ثبت شده` : "لیست سفارشات فروشگاه"}
          </p>
        </div>
        <button
          onClick={refetch}
          className="p-2.5 border border-admin-border/70 bg-admin-surface rounded-xl hover:bg-admin-background text-admin-text-muted hover:text-admin-text transition flex items-center gap-2 text-xs font-bold"
          title="بروزرسانی لیست"
        >
          <ArrowPathIcon className="w-4 h-4" />
          <span className="hidden sm:inline">بروزرسانی</span>
        </button>
      </div>

      {/* آمار وضعیت‌ها */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STATUS_FILTERS.slice(1).map((f) => {
            const cnt = stats.by_status?.[f.value] || 0;
            const isSelected = params.status === f.value;
            return (
              <button
                key={f.value}
                onClick={() =>
                  updateParams({ status: isSelected ? "" : f.value })
                }
                className={`p-3.5 rounded-2xl border transition text-right ${
                  isSelected
                    ? "border-admin-primary bg-admin-primary/10 text-admin-primary shadow-sm"
                    : "border-admin-border/70 bg-admin-surface text-admin-text-muted hover:border-admin-border hover:text-admin-text"
                }`}
              >
                <div className="text-[10px] font-bold">{f.label}</div>
                <div className="text-lg font-black text-admin-text mt-1">
                  {formatNum(cnt)}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* فیلتر و جستجو */}
      <div className="flex flex-col sm:flex-row gap-3 bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در شماره سفارش، موبایل یا ایمیل..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
        <select
          value={params.payment_method || ""}
          onChange={(e) => updateParams({ payment_method: e.target.value })}
          className="px-3.5 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all font-bold"
        >
          <option value="">همه روش‌های پرداخت</option>
          <option value="online">آنلاین</option>
          <option value="cod">پرداخت در محل</option>
          <option value="wallet">کیف پول</option>
          <option value="bnpl">اعتباری</option>
        </select>
      </div>

      {/* جدول سفارشات */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <OrdersTableSkeleton />
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            سفارشی یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background/60 text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">شماره سفارش</th>
                  <th className="p-4">مشتری</th>
                  <th className="p-4">اقلام</th>
                  <th className="p-4">مبلغ نهایی</th>
                  <th className="p-4">روش پرداخت</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4">تاریخ ثبت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-admin-background/50 transition"
                  >
                    <td className="p-4 font-bold text-admin-text font-mono dir-ltr text-right">
                      {o.order_number}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-admin-text">
                        {o.user_name || "—"}
                      </div>
                      <div className="text-[10px] text-admin-text-muted mt-0.5 dir-ltr text-right font-mono">
                        {o.user_phone}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-admin-text-muted">
                      {formatNum(o.items_count)} قلم
                    </td>
                    <td className="p-4 font-black text-admin-text">
                      {formatNum(o.total_price)}{" "}
                      <span className="text-[10px] font-normal text-admin-text-muted">
                        تومان
                      </span>
                    </td>
                    <td className="p-4 font-bold text-admin-text-muted">
                      {o.payment_method_display}
                    </td>
                    <td className="p-4">
                      <OrderStatusSelect order={o} onUpdated={refetch} />
                    </td>
                    <td className="p-4 text-admin-text-muted font-bold">
                      {new Date(o.created_at).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
                        title="مشاهده جزئیات"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onUpdated={refetch}
      />
    </div>
  );
}