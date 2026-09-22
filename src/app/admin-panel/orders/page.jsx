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

export default function AdminOrdersPage() {
  const { orders, count, stats, loading, params, updateParams, refetch } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت سفارشات</h1>
          <p className="text-xs text-slate-500 mt-1">
            {count > 0 ? `${count} سفارش` : "لیست سفارشات فروشگاه"}
          </p>
        </div>
        <button
          onClick={refetch}
          className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STATUS_FILTERS.slice(1).map((f) => {
            const cnt = stats.by_status?.[f.value] || 0;
            const inf = statusInfo(f.value);
            return (
              <button
                key={f.value}
                onClick={() => updateParams({ status: params.status === f.value ? "" : f.value })}
                className={`p-3 rounded-xl border transition text-right ${
                  params.status === f.value
                    ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                }`}
              >
                <div className="text-[10px] font-bold text-slate-500">{f.label}</div>
                <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                  {Number(cnt).toLocaleString("fa-IR")}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در شماره سفارش، موبایل یا ایمیل..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <select
          value={params.payment_method}
          onChange={(e) => updateParams({ payment_method: e.target.value })}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">همه روش‌های پرداخت</option>
          <option value="online">آنلاین</option>
          <option value="cod">پرداخت در محل</option>
          <option value="wallet">کیف پول</option>
          <option value="bnpl">اعتباری</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">سفارشی یافت نشد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">شماره سفارش</th>
                  <th className="p-4">مشتری</th>
                  <th className="p-4">تعداد اقلام</th>
                  <th className="p-4">مبلغ نهایی</th>
                  <th className="p-4">روش پرداخت</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4">تاریخ</th>
                  <th className="p-4 text-center">جزئیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-100 font-mono">
                      {o.order_number}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-700 dark:text-slate-300">
                        {o.user_name || "—"}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{o.user_phone}</div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {o.items_count} قلم
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                      {Number(o.total_price).toLocaleString("fa-IR")} ریال
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {o.payment_method_display}
                    </td>
                    <td className="p-4">
                      <OrderStatusSelect order={o} onUpdated={refetch} />
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(o.created_at).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
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