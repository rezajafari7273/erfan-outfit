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
} from "@heroicons/react/24/outline";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState(null);
  const [salesChart, setSalesChart] = useState({ points: [], total_revenue: 0, total_orders: 0 });
  const [chartRange, setChartRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  // ---------- لود اولیه ----------
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, chartRes] = await Promise.allSettled([
          adminApi.getDashboardStats(),
          adminApi.getSalesChart(chartRange),
        ]);
        if (statsRes.status === "fulfilled") {
          const d = statsRes.value?.data !== undefined ? statsRes.value.data : statsRes.value;
          setStats(d);
        }
        if (chartRes.status === "fulfilled") {
          const d = chartRes.value?.data !== undefined ? chartRes.value.data : chartRes.value;
          setSalesChart(d);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
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
    return () => { cancelled = true; };
  }, [chartRange]);

  const s = stats || {};

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  const cards = [
    { title: "درآمد کل", value: formatNum(s.total_revenue) + " ریال", icon: BanknotesIcon, color: "bg-emerald-50 text-emerald-600" },
    { title: "درآمد امروز", value: formatNum(s.revenue_today) + " ریال", icon: CalendarDaysIcon, color: "bg-blue-50 text-blue-600" },
    { title: "درآمد این ماه", value: formatNum(s.revenue_this_month) + " ریال", icon: ArrowTrendingUpIcon, color: "bg-violet-50 text-violet-600" },
    { title: "میانگین هر سفارش", value: formatNum(s.avg_order_value) + " ریال", icon: ChartBarIcon, color: "bg-amber-50 text-amber-600" },
    { title: "کل سفارشات", value: formatNum(s.total_orders), icon: ShoppingCartIcon, color: "bg-rose-50 text-rose-600" },
    { title: "پرداخت‌شده", value: formatNum(s.paid_orders), icon: ShoppingCartIcon, color: "bg-emerald-50 text-emerald-600" },
    { title: "تحویل‌شده", value: formatNum(s.delivered_orders), icon: ShoppingCartIcon, color: "bg-blue-50 text-blue-600" },
    { title: "در انتظار پرداخت", value: formatNum(s.pending_orders), icon: ClockIcon, color: "bg-amber-50 text-amber-600" },
  ];

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-500 dir-rtl">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">آمار و تحلیل</h1>
        <p className="text-xs text-slate-500 mt-1">گزارش کامل فروش و عملکرد فروشگاه</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-[10px] font-bold text-slate-500 mb-1">{c.title}</p>
            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <SalesChart
        data={salesChart}
        range={chartRange}
        onRangeChange={setChartRange}
        loading={chartLoading}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-rose-500 to-rose-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-[11px] opacity-80 font-bold">درآمد کل</p>
          <p className="text-2xl font-black mt-2">{formatNum(s.total_revenue)}</p>
          <p className="text-[10px] opacity-70 mt-1">ریال</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-[11px] opacity-80 font-bold">سفارشات پرداخت‌شده</p>
          <p className="text-2xl font-black mt-2">{formatNum(s.paid_orders)}</p>
          <p className="text-[10px] opacity-70 mt-1">سفارش</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-[11px] opacity-80 font-bold">میانگین ارزش سفارش</p>
          <p className="text-2xl font-black mt-2">{formatNum(s.avg_order_value)}</p>
          <p className="text-[10px] opacity-70 mt-1">ریال</p>
        </div>
      </div>
    </div>
  );
}