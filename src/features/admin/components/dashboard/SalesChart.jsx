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

  const formatPrice = (v) => {
    if (v === null || v === undefined) return "۰";
    return Number(v).toLocaleString("fa-IR");
  };

  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر نمودار و دکمه‌های بازه زمانی */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-sm font-black text-admin-text tracking-tight">نمودار روند فروش</h3>
          <p className="text-[11px] font-bold text-admin-text-muted mt-1">
            درآمد کل بازه:{" "}
            <span className="font-extrabold text-admin-text">
              {formatPrice(data?.total_revenue || 0)} تومان
            </span>
            {" · "}
            تعداد سفارش:{" "}
            <span className="font-extrabold text-admin-text">
              {Number(data?.total_orders || 0).toLocaleString("fa-IR")}
            </span>
          </p>
        </div>

        {/* دکمه‌های انتخاب بازه */}
        <div className="flex gap-1 bg-admin-background p-1 rounded-xl border border-admin-border/50">
          {RANGES.map((r) => {
            const isActive = range === r.key;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => onRangeChange(r.key)}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-admin-primary text-white shadow-sm"
                    : "text-admin-text-muted hover:text-admin-text hover:bg-admin-surface"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* وضعیت بارگذاری یا نبود داده */}
      {loading ? (
        <div className="h-64 flex items-center justify-center text-xs font-bold text-admin-text-muted">
          در حال دریافت اطلاعات نمودار...
        </div>
      ) : points.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-xs font-bold text-admin-text-muted">
          داده‌ای برای نمایش در این بازه وجود ندارد
        </div>
      ) : (
        /* نمایش نمودار Recharts */
        <div className="w-full h-64 dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "var(--admin-text-muted, #94a3b8)", fontWeight: 600 }}
                stroke="transparent"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--admin-text-muted, #94a3b8)", fontWeight: 600 }}
                stroke="transparent"
                tickFormatter={(v) => Number(v).toLocaleString("fa-IR")}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--admin-surface, #ffffff)",
                  borderColor: "var(--admin-border, #e2e8f0)",
                  borderRadius: "16px",
                  color: "var(--admin-text, #0f172a)",
                  direction: "rtl",
                  fontSize: "11px",
                  fontWeight: "bold",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => {
                  if (name === "revenue")
                    return [Number(value).toLocaleString("fa-IR") + " تومان", "درآمد"];
                  if (name === "orders")
                    return [Number(value).toLocaleString("fa-IR") + " عدد", "تعداد سفارش"];
                  return [value, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f43f5e"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}