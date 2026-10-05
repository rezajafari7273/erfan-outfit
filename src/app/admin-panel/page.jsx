"use client";

import { useDashboard } from "@/features/admin/hooks/useDashboard";
import StatCard from "@/features/admin/components/dashboard/StatCard";
import SalesChart from "@/features/admin/components/dashboard/SalesChart";
import RecentOrders from "@/features/admin/components/dashboard/RecentOrders";
import TopProducts from "@/features/admin/components/dashboard/TopProducts";
import LowStock from "@/features/admin/components/dashboard/LowStock";
import RecentUsers from "@/features/admin/components/dashboard/RecentUsers";
import RecentTransactions from "@/features/admin/components/dashboard/RecentTransactions";
import {
  ShoppingBagIcon,
  TruckIcon,
  UsersIcon,
  UserGroupIcon,
  BanknotesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboardPage() {
  const {
    stats,
    recentOrders,
    topProducts,
    lowStock,
    recentUsers,
    recentTransactions,
    salesChart,
    chartRange,
    setChartRange,
    loading,
    chartLoading,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-xs font-bold text-admin-text-muted dir-rtl">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-admin-primary border-t-transparent rounded-full animate-spin" />
          <span>در حال بارگذاری اطلاعات داشبورد...</span>
        </div>
      </div>
    );
  }

  const s = stats || {};

  return (
    <div className="space-y-6 dir-rtl">
      {/* Header */}
      <div className="bg-admin-surface p-4 sm:p-6 rounded-2xl border border-admin-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-rokh font-black text-admin-text">
              داشبورد مدیریت
            </h1>
            <p className="text-xs text-admin-text-muted font-bold mt-1.5">
              خلاصه وضعیت کلی و آمار لحظه‌ای فروشگاه
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-admin-success/10 border border-admin-success/20 text-admin-success text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-admin-success animate-ping" />
            سیستم آنلاین است
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="کل محصولات"
          value={s.total_products}
          subtitle={`${(s.active_products || 0).toLocaleString("fa-IR")} فعال · ${(s.featured_products || 0).toLocaleString("fa-IR")} ویژه`}
          icon={ShoppingBagIcon}
          color="rose"
        />
        <StatCard
          title="کل سفارشات"
          value={s.total_orders}
          subtitle={`${(s.pending_orders || 0).toLocaleString("fa-IR")} در انتظار · ${(s.delivered_orders || 0).toLocaleString("fa-IR")} تحویل شده`}
          icon={TruckIcon}
          color="blue"
        />
        <StatCard
          title="کاربران"
          value={s.total_users}
          subtitle={`${(s.new_users_today || 0).toLocaleString("fa-IR")} امروز · ${(s.new_users_this_week || 0).toLocaleString("fa-IR")} این هفته`}
          icon={UsersIcon}
          color="emerald"
        />
        <StatCard
          title="فروشندگان"
          value={s.total_vendors}
          subtitle={`${(s.approved_vendors || 0).toLocaleString("fa-IR")} تأیید شده · ${(s.pending_vendors || 0).toLocaleString("fa-IR")} در انتظار`}
          icon={UserGroupIcon}
          color="violet"
        />
      </div>

      {/* Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="درآمد کل"
          value={s.total_revenue}
          subtitle="مجموع سفارشات پرداخت‌شده"
          icon={BanknotesIcon}
          color="emerald"
        />
        <StatCard
          title="درآمد امروز"
          value={s.revenue_today}
          subtitle={`میانگین هر سفارش: ${Number(s.avg_order_value || 0).toLocaleString("fa-IR")}`}
          icon={ChartBarIcon}
          color="amber"
        />
        <StatCard
          title="درآمد این ماه"
          value={s.revenue_this_month}
          subtitle="از ابتدای ماه جاری"
          icon={BanknotesIcon}
          color="rose"
        />
      </div>

      <SalesChart
        data={salesChart}
        range={chartRange}
        onRangeChange={setChartRange}
        loading={chartLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentOrders orders={recentOrders} />
        <RecentTransactions transactions={recentTransactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopProducts products={topProducts} />
        <LowStock products={lowStock} />
      </div>

      <RecentUsers users={recentUsers} />
    </div>
  );
}