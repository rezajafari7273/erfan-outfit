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
  ExclamationTriangleIcon,
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
      <div className="p-12 text-center text-xs text-slate-500 dir-rtl">
        در حال بارگذاری داشبورد...
      </div>
    );
  }

  const s = stats || {};

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">داشبورد مدیریت</h1>
        <p className="text-xs text-slate-500 mt-1">خلاصه وضعیت فروشگاه</p>
      </div>

      {/* Stats Cards */}
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

      {/* Revenue Cards */}
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

      {/* Chart */}
      <SalesChart
        data={salesChart}
        range={chartRange}
        onRangeChange={setChartRange}
        loading={chartLoading}
      />

      {/* Grid: Orders + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentOrders orders={recentOrders} />
        <RecentTransactions transactions={recentTransactions} />
      </div>

      {/* Grid: Top + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopProducts products={topProducts} />
        <LowStock products={lowStock} />
      </div>

      {/* Recent Users */}
      <RecentUsers users={recentUsers} />
    </div>
  );
}