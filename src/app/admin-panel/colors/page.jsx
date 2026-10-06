"use client";

import { useState } from "react";
import { useColors } from "@/features/admin/hooks/useColors";
import { adminApi } from "@/features/admin/api/adminApi";
import ColorModal from "@/features/admin/components/colors/ColorModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

// اسکلتون بارگذاری جدول رنگ‌ها
function ColorsTableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border-b border-admin-border/40"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl bg-admin-border/60 shrink-0"></div>
            <div className="space-y-1.5">
              <div className="h-4 w-24 bg-admin-border/60 rounded-md"></div>
              <div className="h-3 w-16 bg-admin-border/40 rounded-md"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-admin-border/50"></div>
            <div className="w-8 h-8 rounded-xl bg-admin-border/50"></div>
            <div className="w-8 h-8 rounded-xl bg-admin-border/50"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminColorsPage() {
  const { colors, loading, params, updateParams, refetch } = useColors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);

  const handleOpenCreate = () => {
    setEditingColor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingColor(c);
    setIsModalOpen(true);
  };

  const handleDelete = async (c) => {
    if (!confirm(`آیا از حذف رنگ «${c.name}» اطمینان دارید؟`)) return;
    try {
      await adminApi.deleteColor(c.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف رنگ (ممکن است در محصولی استفاده شده باشد)");
    }
  };

  const handleToggleActive = async (c) => {
    try {
      await adminApi.updateColor(c.id, {
        name: c.name,
        hex_code: c.hex_code,
        is_active: !c.is_active,
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت رنگ‌ها
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {colors.length > 0
              ? `${formatNum(colors.length)} رنگ ثبت شده`
              : "افزودن، ویرایش و مدیریت رنگ‌های سراسری سیستم"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="p-2.5 border border-admin-border/70 rounded-xl hover:bg-admin-background text-admin-text-muted hover:text-admin-text transition"
            title="بروزرسانی"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-admin-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-admin-primary/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>افزودن رنگ جدید</span>
          </button>
        </div>
      </div>

      {/* جستجو */}
      <div className="bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در نام یا کد رنگ..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
      </div>

      {/* جدول رنگ‌ها */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <ColorsTableSkeleton />
        ) : colors.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            هیچ رنگی ثبت نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background/60 text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">نمایش</th>
                  <th className="p-4">نام رنگ</th>
                  <th className="p-4">کد Hex</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {colors.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-admin-background/50 transition"
                  >
                    <td className="p-4">
                      <span
                        className="inline-block w-8 h-8 rounded-xl border-2 border-admin-border/80 shadow-inner"
                        style={{ backgroundColor: c.hex_code }}
                      />
                    </td>
                    <td className="p-4 font-bold text-admin-text">{c.name}</td>
                    <td className="p-4 font-mono text-admin-text-muted dir-ltr text-right">
                      {c.hex_code}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(c)}
                        title={c.is_active ? "غیرفعال کردن" : "فعال کردن"}
                        className={`p-1.5 rounded-xl transition ${
                          c.is_active
                            ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                            : "bg-admin-border/40 text-admin-text-muted hover:bg-admin-border/70"
                        }`}
                      >
                        {c.is_active ? (
                          <EyeIcon className="w-4 h-4" />
                        ) : (
                          <EyeSlashIcon className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c)}
                          className="p-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition"
                          title="حذف"
                        >
                          <TrashIcon className="w-4 h-4" />
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

      <ColorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingColor={editingColor}
        onSuccess={refetch}
      />
    </div>
  );
}