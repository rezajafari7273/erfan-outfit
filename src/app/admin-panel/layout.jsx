"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/features/admin/components/common/AdminSidebar";
import AdminHeader from "@/features/admin/components/common/AdminHeader";
import AdminGuard from "@/features/admin/components/auth/AdminGuard";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // اگر کاربر در صفحه لاگین ادمین باشد، گارد، سایدبار و هدر رندر نمی‌شوند
  if (pathname === "/admin-panel/login") {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800" dir="rtl">
        {/* سایدبار ثابت ادمین */}
        <AdminSidebar />

        {/* محتوای اصلی */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}