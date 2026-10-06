"use client";

import { adminApi } from "@/features/admin/api/adminApi";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "در انتظار پرداخت",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    value: "paid",
    label: "پرداخت شده",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    value: "processing",
    label: "در حال آماده‌سازی",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    value: "shipped",
    label: "ارسال شده",
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    value: "delivered",
    label: "تحویل شده",
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    value: "cancelled",
    label: "لغو شده",
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  {
    value: "refunded",
    label: "مسترد شده",
    color: "bg-admin-border/40 text-admin-text-muted border-admin-border/60",
  },
];

export function statusInfo(status) {
  return (
    STATUS_OPTIONS.find((s) => s.value === status) || {
      label: status,
      color: "bg-admin-border/40 text-admin-text-muted border-admin-border/60",
    }
  );
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
      alert("خطا در تغییر وضعیت سفارش");
    }
  };

  return (
    <select
      value={order.status}
      onChange={handleChange}
      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-admin-primary/50 cursor-pointer transition-all ${current.color}`}
    >
      {STATUS_OPTIONS.map((s) => (
        <option
          key={s.value}
          value={s.value}
          className="bg-admin-surface text-admin-text"
        >
          {s.label}
        </option>
      ))}
    </select>
  );
}