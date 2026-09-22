"use client";

import { adminApi } from "@/features/admin/api/adminApi";

const STATUS_OPTIONS = [
  { value: "pending", label: "در انتظار پرداخت", color: "text-amber-700 bg-amber-100" },
  { value: "paid", label: "پرداخت شده", color: "text-emerald-700 bg-emerald-100" },
  { value: "processing", label: "در حال آماده‌سازی", color: "text-blue-700 bg-blue-100" },
  { value: "shipped", label: "ارسال شده", color: "text-indigo-700 bg-indigo-100" },
  { value: "delivered", label: "تحویل شده", color: "text-emerald-700 bg-emerald-100" },
  { value: "cancelled", label: "لغو شده", color: "text-rose-700 bg-rose-100" },
  { value: "refunded", label: "مسترد شده", color: "text-slate-700 bg-slate-100" },
];

export function statusInfo(status) {
  return STATUS_OPTIONS.find((s) => s.value === status) || { label: status, color: "bg-slate-100 text-slate-700" };
}

export default function OrderStatusSelect({ order, onUpdated }) {
  const current = statusInfo(order.status);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === order.status) return;
    try {
      await adminApi.updateOrderStatus(order.id, newStatus);
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("خطا در تغییر وضعیت");
    }
  };

  return (
    <select
      value={order.status}
      onChange={handleChange}
      className={`text-[11px] font-bold px-2 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-rose-500 cursor-pointer ${current.color}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}