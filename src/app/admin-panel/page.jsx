'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/features/admin/api/adminApi';
import { 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  UserGroupIcon, 
  BanknotesIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error('خطا در دریافت آمار:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">در حال دریافت اطلاعات داشبورد...</div>;
  }

  const cards = [
    { title: 'کل درآمد', value: `${Number(stats?.total_revenue || 0).toLocaleString('fa-IR')} تومان`, icon: BanknotesIcon, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'تعداد محصولات', value: stats?.total_products || 0, icon: ShoppingBagIcon, color: 'bg-blue-50 text-blue-600' },
    { title: 'تعداد سفارشات', value: stats?.total_orders || 0, icon: ShoppingCartIcon, color: 'bg-amber-50 text-amber-600' },
    { title: 'تعداد کاربران', value: stats?.total_users || 0, icon: UsersIcon, color: 'bg-purple-50 text-purple-600' },
    { title: 'تعداد فروشندگان', value: stats?.total_vendors || 0, icon: UserGroupIcon, color: 'bg-indigo-50 text-indigo-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-slate-800">داشبورد مدیریت</h1>
        <span className="text-xs text-slate-400 font-medium">بروزرسانی زنده</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-lg font-black text-slate-900 mt-4">{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}