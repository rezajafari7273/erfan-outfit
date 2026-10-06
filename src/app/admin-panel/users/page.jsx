"use client";

import { useState } from "react";
import { useUsers } from "@/features/admin/hooks/useUsers";
import UserDetailModal from "@/features/admin/components/users/UserDetailModal";
import UserEditModal from "@/features/admin/components/users/UserEditModal";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const FILTERS = [
  { key: "is_active", label: "فعال" },
  { key: "is_staff", label: "کارمند" },
  { key: "is_superuser", label: "مدیر ارشد" },
  { key: "is_2fa_enabled", label: "2FA" },
  { key: "is_locked", label: "قفل‌شده" },
];

function UsersTableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border-b border-admin-border/40"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-admin-border/50 shrink-0" />
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="h-4 w-3/4 bg-admin-border/60 rounded-md" />
              <div className="h-3 w-1/2 bg-admin-border/40 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-20 bg-admin-border/50 rounded-md hidden md:block" />
            <div className="h-6 w-16 bg-admin-border/50 rounded-lg" />
            <div className="flex gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminUsersPage() {
  const { users, count, stats, loading, params, updateParams, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const toggleFilter = (key, value) => {
    const current = params[key];
    updateParams({ [key]: current === value ? "" : value });
  };

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت کاربران
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {count > 0 ? `${formatNum(count)} کاربر ثبت‌شده` : "لیست کاربران فروشگاه"}
          </p>
        </div>
        <button
          onClick={refetch}
          className="p-2.5 border border-admin-border/70 bg-admin-surface rounded-xl hover:bg-admin-background text-admin-text-muted hover:text-admin-text transition"
          title="بروزرسانی"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>

      {/* آمار کاربران */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "کل", value: stats.total },
            { label: "فعال", value: stats.active },
            { label: "غیرفعال", value: stats.inactive },
            { label: "کارمند", value: stats.staff },
            { label: "مدیر ارشد", value: stats.superuser },
            { label: "2FA", value: stats.with_2fa },
            { label: "قفل‌شده", value: stats.locked },
          ].map((c) => (
            <div
              key={c.label}
              className="bg-admin-surface p-3.5 rounded-2xl border border-admin-border/70 shadow-sm"
            >
              <div className="text-[10px] font-bold text-admin-text-muted">{c.label}</div>
              <div className="text-base font-black text-admin-text mt-1">
                {formatNum(c.value)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* جستجو و فیلترها */}
      <div className="space-y-3 bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در موبایل، ایمیل، نام یا کد ملی..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60 font-bold"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key, "true")}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition ${
                params[f.key] === "true"
                  ? "bg-admin-primary text-white shadow-sm shadow-admin-primary/20"
                  : "bg-admin-background text-admin-text-muted hover:text-admin-text border border-admin-border/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* جدول کاربران */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <UsersTableSkeleton />
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            کاربری یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background/60 text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">آواتار</th>
                  <th className="p-4">نام</th>
                  <th className="p-4">موبایل</th>
                  <th className="p-4">ایمیل</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">آخرین ورود</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-admin-background/50 transition"
                  >
                    <td className="p-4">
                      {u.avatar ? (
                        <img
                          src={u.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border border-admin-border/70"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-admin-background border border-admin-border/60 flex items-center justify-center">
                          <UserCircleIcon className="w-6 h-6 text-admin-text-muted" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-admin-text">
                      {u.full_name || "—"}
                    </td>
                    <td className="p-4 font-mono font-bold text-admin-text dir-ltr text-right">
                      {u.phone}
                    </td>
                    <td className="p-4 font-bold text-admin-text-muted">
                      {u.email || "—"}
                    </td>
                    <td className="p-4 text-center space-x-1 space-x-reverse">
                      {u.is_superuser && (
                        <span className="text-[9px] bg-violet-500/10 text-violet-500 border border-violet-500/20 px-2 py-0.5 rounded-lg font-bold">
                          مدیر ارشد
                        </span>
                      )}
                      {u.is_staff && !u.is_superuser && (
                        <span className="text-[9px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-lg font-bold">
                          کارمند
                        </span>
                      )}
                      {u.is_locked && (
                        <span className="text-[9px] bg-rose-500/10 text-rose-500 border border-rose-500/20 px-2 py-0.5 rounded-lg font-bold">
                          قفل
                        </span>
                      )}
                      {!u.is_active && (
                        <span className="text-[9px] bg-admin-border/50 text-admin-text-muted border border-admin-border/70 px-2 py-0.5 rounded-lg font-bold">
                          غیرفعال
                        </span>
                      )}
                      {u.is_2fa_enabled && (
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-bold">
                          2FA
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center font-bold text-admin-text-muted">
                      {u.last_login_at
                        ? new Date(u.last_login_at).toLocaleDateString("fa-IR")
                        : "—"}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 bg-admin-background text-admin-text-muted hover:text-admin-text rounded-xl transition"
                          title="مشاهده"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingUser(u)}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserDetailModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
        onUpdated={refetch}
      />

      <UserEditModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onSuccess={refetch}
      />
    </div>
  );
}