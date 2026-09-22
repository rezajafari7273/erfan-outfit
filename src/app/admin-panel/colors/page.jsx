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
    if (!confirm(`حذف رنگ «${c.name}»؟`)) return;
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

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت رنگ‌ها</h1>
          <p className="text-xs text-slate-500 mt-1">
            {colors.length > 0 ? `${colors.length} رنگ ثبت شده` : "افزودن، ویرایش و مدیریت رنگ‌های سراسری"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>افزودن رنگ جدید</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در نام یا کد رنگ..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : colors.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">رنگی ثبت نشده است</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">نمایش</th>
                  <th className="p-4">نام رنگ</th>
                  <th className="p-4">کد Hex</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {colors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4">
                      <span
                        className="inline-block w-8 h-8 rounded-lg border-2 border-slate-200 dark:border-slate-700"
                        style={{ backgroundColor: c.hex_code }}
                      />
                    </td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{c.name}</td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{c.hex_code}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(c)}
                        className={`p-1.5 rounded-lg transition ${
                          c.is_active
                            ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {c.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c)}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
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