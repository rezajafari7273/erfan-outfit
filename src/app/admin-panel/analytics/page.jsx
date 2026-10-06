"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import SalesChart from "@/features/admin/components/dashboard/SalesChart";
import {
  BanknotesIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

// اسکلتون اختصاصی هماهنگ با دیزاین سیستم
function AnalyticsSkeleton() {
  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl animate-pulse select-none">
      <div className="bg-admin-surface p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70">
        <div className="h-6 w-36 bg-admin-border/60 rounded-lg mb-2"></div>
        <div className="h-4 w-56 bg-admin-border/40 rounded-lg"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-admin-surface p-4 rounded-2xl border border-admin-border/70 space-y-3"
          >
            <div className="w-9 h-9 rounded-xl bg-admin-border/50"></div>
            <div className="h-3 w-20 bg-admin-border/40 rounded-md"></div>
            <div className="h-5 w-28 bg-admin-border/60 rounded-lg"></div>
          </div>
        ))}
      </div>

      <div className="bg-admin-surface h-80 rounded-2xl sm:rounded-3xl border border-admin-border/70"></div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-admin-border/40 rounded-2xl sm:rounded-3xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState({ points: [], total_revenue: 0, total_orders: 0 });
  const [chartRange, setChartRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  // ---------- لود اولیه ----------
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, chartRes] = await Promise.allSettled([
          adminApi.getDashboardStats(),
          adminApi.getSalesChart(chartRange),
        ]);

        if (!cancelled) {
          if (statsRes.status === "fulfilled") {
            const d = statsRes.value?.data !== undefined ? statsRes.value.data : statsRes.value;
            setStats(d);
          }
          if (chartRes.status === "fulfilled") {
            const d = chartRes.value?.data !== undefined ? chartRes.value.data : chartRes.value;
            setSalesChart(d);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- تغییر بازه نمودار ----------
  useEffect(() => {
    if (loading) return;
    let cancelled = false;
    const run = async () => {
      setChartLoading(true);
      try {
        const res = await adminApi.getSalesChart(chartRange);
        const d = res?.data !== undefined ? res.data : res;
        if (!cancelled) setSalesChart(d);
      } finally {
        if (!cancelled) setChartLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [chartRange]);

  const s = stats || {};

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  // کارت‌ها با متغیرهای اختصاصی تم
  const cards = [
    {
      title: "درآمد کل",
      value: `${formatNum(s.total_revenue)} تومان`,
      icon: BanknotesIcon,
    },
    {
      title: "درآمد امروز",
      value: `${formatNum(s.revenue_today)} تومان`,
      icon: CalendarDaysIcon,
    },
    {
      title: "درآمد این ماه",
      value: `${formatNum(s.revenue_this_month)} تومان`,
      icon: ArrowTrendingUpIcon,
    },
    {
      title: "میانگین هر سفارش",
      value: `${formatNum(s.avg_order_value)} تومان`,
      icon: ChartBarIcon,
    },
    {
      title: "کل سفارشات",
      value: `${formatNum(s.total_orders)} سفارش`,
      icon: ShoppingCartIcon,
    },
    {
      title: "پرداخت‌شده",
      value: `${formatNum(s.paid_orders)} سفارش`,
      icon: CheckCircleIcon,
    },
    {
      title: "تحویل‌شده",
      value: `${formatNum(s.delivered_orders)} سفارش`,
      icon: TruckIcon,
    },
    {
      title: "در انتظار پرداخت",
      value: `${formatNum(s.pending_orders)} سفارش`,
      icon: ClockIcon,
    },
  ];

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
          آمار و تحلیل فروش
        </h1>
        <p className="text-xs font-bold text-admin-text-muted mt-1">
          گزارش جامع عملکرد مالی، وضعیت سفارش‌ها و روندهای فروشگاه
        </p>
      </div>

      {/* گرید آمار سریع - تماماً ست‌شده با تم اختصاصی */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm hover:border-admin-primary/50 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 border bg-admin-primary/10 text-admin-primary border-admin-primary/20">
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-bold text-admin-text-muted mb-1">{c.title}</p>
            <p className="text-sm font-black text-admin-text truncate">{c.value}</p>
          </div>
        ))}
      </div>

      {/* نمودار فروش */}
      <SalesChart
        data={salesChart}
        range={chartRange}
        onRangeChange={setChartRange}
        loading={chartLoading}
      />

      {/* کارت‌های خلاصه پایین - هماهنگ با CSS Variables */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* کل درآمد */}
        <div className="bg-admin-surface p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm relative overflow-hidden">
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-admin-primary/10 rounded-full blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-admin-text-muted">درآمد کل سیستم</p>
          <p className="text-2xl font-black text-admin-text mt-2 tracking-tight">
            {formatNum(s.total_revenue)}
          </p>
          <p className="text-[10px] font-bold text-admin-primary mt-1">تومان</p>
        </div>

        {/* سفارشات موفق */}
        <div className="bg-admin-surface p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm relative overflow-hidden">
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-admin-primary/10 rounded-full blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-admin-text-muted">سفارشات پرداخت‌شده</p>
          <p className="text-2xl font-black text-admin-text mt-2 tracking-tight">
            {formatNum(s.paid_orders)}
          </p>
          <p className="text-[10px] font-bold text-admin-primary mt-1">سفارش موفق</p>
        </div>

        {/* میانگین سبد خرید */}
        <div className="bg-admin-surface p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm relative overflow-hidden">
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-admin-primary/10 rounded-full blur-xl pointer-events-none" />
          <p className="text-xs font-bold text-admin-text-muted">میانگین ارزش هر سفارش</p>
          <p className="text-2xl font-black text-admin-text mt-2 tracking-tight">
            {formatNum(s.avg_order_value)}
          </p>
          <p className="text-[10px] font-bold text-admin-primary mt-1">تومان</p>
        </div>
      </div>
    </div>
  );
}