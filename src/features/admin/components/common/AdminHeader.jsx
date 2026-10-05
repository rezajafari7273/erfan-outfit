"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  UserIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { adminApi } from "@/features/admin/api/adminApi";

export default function AdminHeader({ onOpenMobileSidebar }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await adminApi.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/admin-panel/login");
    }
  };

  return (
    <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 bg-admin-surface border-b border-admin-border dir-rtl select-none">
      {/* Right: hamburger + title */}
      <div className="flex items-center gap-2.5">
        {/* Hamburger - mobile only */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-admin-text hover:bg-admin-background transition-colors"
          aria-label="باز کردن منو"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        <span className="text-sm font-black text-admin-text tracking-tight">
          پنل مدیریت فروشگاه
        </span>
        <span className="hidden sm:flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-admin-success opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-admin-success" />
        </span>
      </div>

      {/* Left: actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* User info - desktop only */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full bg-admin-background border border-admin-border">
          <div className="w-7 h-7 rounded-full bg-admin-primary flex items-center justify-center text-white">
            <UserIcon className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="text-right">
            <p className="text-[11px] font-black text-admin-text leading-none">مدیر سیستم</p>
            <p className="text-[9px] font-bold text-admin-primary mt-0.5">ادمین ارشد</p>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-admin-border my-auto" />

        {/* View site - hide text on mobile */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 py-1.5 px-3.5 rounded-full border border-admin-border bg-admin-background text-xs font-bold text-admin-primary hover:bg-admin-primary-soft transition-all duration-300 group"
        >
          <span>مشاهده سایت</span>
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>

        {/* Mobile view site (icon only) */}
        <Link
          href="/"
          target="_blank"
          className="sm:hidden p-2 rounded-full border border-admin-border bg-admin-background text-admin-primary hover:bg-admin-primary-soft transition-colors"
          aria-label="مشاهده سایت"
        >
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-bold text-admin-danger bg-admin-danger/10 hover:bg-admin-danger/20 border border-admin-danger/30 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          <ArrowRightStartOnRectangleIcon className="w-4 h-4 stroke-[2]" />
          <span className="hidden sm:inline">{loading ? "در حال خروج..." : "خروج"}</span>
        </button>
      </div>
    </header>
  );
}