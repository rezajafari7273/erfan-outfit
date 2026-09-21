'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { adminApi } from '@/features/admin/api/adminApi';

export default function AdminHeader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      // ارسال درخواست خروج به بک‌اند (در صورت نیاز به پاکسازی سشن در سرور)
      await adminApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // پاکسازی اطلاعات احراز هویت از حافظه مرورگر
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // هدایت کاربر به صفحه لاگین ادمین
      router.push('/admin-panel/login');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 dir-rtl">
      <div className="text-sm font-bold text-slate-700">
        مدیریت فروشگاه
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          مشاهده سایت ↗
        </Link>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          <span>{loading ? 'در حال خروج...' : 'خروج'}</span>
        </button>
      </div>
    </header>
  );
}