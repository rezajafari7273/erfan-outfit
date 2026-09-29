"use client";

import { useState } from "react";
import { useUsers } from "@/features/admin/hooks/useUsers";
import { adminApi } from "@/features/admin/api/adminApi";
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

export default function AdminUsersPage() {
  const { users, count, stats, loading, params, updateParams, refetch } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const toggleFilter = (key, value) => {
    const current = params[key];
    updateParams({ [key]: current === value ? "" : value });
  };

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت کاربران</h1>
          <p className="text-xs text-slate-500 mt-1">
            {count > 0 ? `${count} کاربر` : "لیست کاربران فروشگاه"}
          </p>
        </div>
        <button
          onClick={refetch}
          className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Stats */}
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
            <div key={c.label} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-bold text-slate-500">{c.label}</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-100 mt-1">
                {Number(c.value).toLocaleString("fa-IR")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search + Filters */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در موبایل، ایمیل، نام یا کد ملی..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key, "true")}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                params[f.key] === "true"
                  ? "bg-rose-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">کاربری یافت نشد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4">
                      {u.avatar ? (
                        <img src={u.avatar} alt="" className="w-10 h-10 rounded-full object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <UserCircleIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{u.full_name || "—"}</td>
                    <td className="p-4 font-mono text-slate-700 dark:text-slate-300">{u.phone}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{u.email || "—"}</td>
                    <td className="p-4 text-center space-x-1 space-x-reverse">
                      {u.is_superuser && <span className="text-[9px] bg-violet-100 text-violet-700 px-1.5 py-0.5 rounded font-bold">مدیر ارشد</span>}
                      {u.is_staff && !u.is_superuser && <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">کارمند</span>}
                      {u.is_locked && <span className="text-[9px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-bold">قفل</span>}
                      {!u.is_active && <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">غیرفعال</span>}
                      {u.is_2fa_enabled && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">2FA</span>}
                    </td>
                    <td className="p-4 text-center text-slate-500">
                      {u.last_login_at ? new Date(u.last_login_at).toLocaleDateString("fa-IR") : "—"}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg"
                          title="مشاهده"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingUser(u)}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg"
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