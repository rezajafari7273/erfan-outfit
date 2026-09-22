"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RANGES = [
  { key: "7d", label: "۷ روز" },
  { key: "30d", label: "۳۰ روز" },
  { key: "12m", label: "۱۲ ماه" },
];

export default function SalesChart({ data, range, onRangeChange, loading }) {
  const points = data?.points || [];

  const formatPrice = (v) => Number(v).toLocaleString("fa-IR");

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">نمودار فروش</h3>
          <p className="text-[11px] text-slate-500 mt-1">
            درآمد کل بازه: <span className="font-bold text-slate-700 dark:text-slate-300">
              {formatPrice(data?.total_revenue || 0)} ریال
            </span>
            {" · "}
            تعداد سفارش: <span className="font-bold text-slate-700 dark:text-slate-300">
              {Number(data?.total_orders || 0).toLocaleString("fa-IR")}
            </span>
          </p>
        </div>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => onRangeChange(r.key)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                range === r.key
                  ? "bg-rose-600 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-xs text-slate-500">
          در حال بارگذاری...
        </div>
      ) : points.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-xs text-slate-500">
          داده‌ای برای نمایش وجود ندارد
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d48" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" tickFormatter={(v) => Number(v).toLocaleString("fa-IR")} />
            <Tooltip
              contentStyle={{ direction: "rtl", fontSize: 12, borderRadius: 12, border: "1px solid #e2e8f0" }}
              formatter={(value, name) => {
                if (name === "revenue") return [Number(value).toLocaleString("fa-IR") + " ریال", "درآمد"];
                if (name === "orders") return [Number(value).toLocaleString("fa-IR"), "سفارش"];
                return [value, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#e11d48"
              strokeWidth={2}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}