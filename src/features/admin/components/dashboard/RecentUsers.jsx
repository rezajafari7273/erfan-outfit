"use client";

import Link from "next/link";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/24/outline";

export default function RecentUsers({ users = [] }) {
  return (
    <div className="bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm dir-rtl select-none">
      {/* هدر کامپوننت */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-black text-admin-text tracking-tight">آخرین کاربران ثبت‌نامی</h3>
        <Link
          href="/admin-panel/users"
          className="text-[11px] font-bold text-admin-primary hover:underline flex items-center gap-0.5 transition-all"
        >
          <span>مدیریت کاربران</span>
          <ChevronLeftIcon className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* وضعیت عدم وجود داده */}
      {users.length === 0 ? (
        <div className="text-center py-8 text-xs font-bold text-admin-text-muted">
          هنوز کاربری ثبت نشده است
        </div>
      ) : (
        /* لیست کاربران */
        <div className="space-y-1.5">
          {users.map((u) => {
            const displayName = u.full_name || u.name || u.username;
            const firstChar = displayName ? displayName.trim().charAt(0) : null;

            return (
              <div
                key={u.id || u.phone}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-admin-background/70 border border-transparent hover:border-admin-border/50 transition-all duration-200"
              >
                {/* آواتار کاربر */}
                <div className="w-9 h-9 rounded-xl bg-admin-primary/10 text-admin-primary font-black text-xs flex items-center justify-center shrink-0 border border-admin-primary/20">
                  {firstChar ? firstChar : <UserIcon className="w-4 h-4" />}
                </div>

                {/* اطلاعات کاربر */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-admin-text truncate">
                    {displayName || "کاربر جدید"}
                  </div>
                  <div className="text-[10px] font-bold text-admin-text-muted mt-0.5 dir-ltr text-right truncate">
                    {u.phone || u.email || "بدون شماره"}
                  </div>
                </div>

                {/* وضعیت فعال / غیرفعال */}
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-lg font-bold shrink-0 border ${
                    u.is_active ?? true
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-admin-background text-admin-text-muted border-admin-border/60"
                  }`}
                >
                  {u.is_active ?? true ? "فعال" : "غیرفعال"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}