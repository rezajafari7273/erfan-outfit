"use client";

import Skeleton from "@/components/ui/Skeleton";
import { useDashboardSearch } from "@/features/admin/hooks/useDashboardSearch";
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
  } = useDashboardSearch({ mode: "client" });

  if (loading) {
    return (
      <div className="space-y-6 dir-rtl p-1 sm:p-2 select-none">
        <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl border border-admin-border/70 flex justify-between">
          <Skeleton className="h-8 w-48 bg-admin-border/40" />
          <Skeleton className="h-8 w-32 bg-admin-border/30" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-admin-surface border border-admin-border/70" />
          ))}
        </div>
      </div>
    );
  }

  const s = stats || {};

  return (
    <div className="space-y-6 dir-rtl select-none pb-8">
      {/* 1. هدر عنوان صفحه */}
      <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-admin-text tracking-tight">
              داشبورد مدیریت
            </h1>
            <p className="text-xs text-admin-text-muted font-bold">
              خلاصه وضعیت کلی و آمار لحظه‌ای فروشگاه
            </p>
          </div>
        </div>
      </div>

      {/* 2. کارت‌های آمار اصلی */}
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

      {/* 3. کارت‌های آمار درآمد */}
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

      {/* 4. نمودار فروش */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-6 overflow-hidden">
        <SalesChart
          data={salesChart}
          range={chartRange}
          onRangeChange={setChartRange}
          loading={chartLoading}
        />
      </div>

      {/* 5. جداول سفارش‌ها و تراکنش‌ها */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-5">
          <RecentOrders orders={recentOrders} />
        </div>
        <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-5">
          <RecentTransactions transactions={recentTransactions} />
        </div>
      </div>

      {/* 6. جداول محصولات برتر و کم‌موجودی */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-5">
          <TopProducts products={topProducts} />
        </div>
        <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-5">
          <LowStock products={lowStock} />
        </div>
      </div>

      {/* 7. لیست آخرین کاربران */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm p-4 sm:p-5">
        <RecentUsers users={recentUsers} />
      </div>
    </div>
  );
}