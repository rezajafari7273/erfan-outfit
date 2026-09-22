"use client";

import { useState } from "react";
import { useSizes } from "@/features/admin/hooks/useSizes";
import { adminApi } from "@/features/admin/api/adminApi";
import SizeModal from "@/features/admin/components/sizes/SizeModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const TYPE_LABELS = {
  clothing: "پوشاک",
  numeric: "عددی",
  shoes: "کفش",
  custom: "سفارشی",
};

export default function AdminSizesPage() {
  const { sizes, loading, params, updateParams, refetch } = useSizes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [typeFilter, setTypeFilter] = useState("");

  const handleOpenCreate = () => {
    setEditingSize(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingSize(s);
    setIsModalOpen(true);
  };

  const handleDelete = async (s) => {
    if (!confirm(`حذف سایز «${s.name}»؟`)) return;
    try {
      await adminApi.deleteSize(s.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف سایز (ممکن است در محصولی استفاده شده باشد)");
    }
  };

  const handleToggleActive = async (s) => {
    try {
      await adminApi.updateSize(s.id, {
        name: s.name,
        size_type: s.size_type,
        sort_order: s.sort_order,
        is_active: !s.is_active,
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = typeFilter ? sizes.filter((s) => s.size_type === typeFilter) : sizes;

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت سایزها</h1>
          <p className="text-xs text-slate-500 mt-1">
            {sizes.length > 0 ? `${sizes.length} سایز ثبت شده` : "افزودن، ویرایش و مدیریت سایزهای سراسری"}
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
            <span>افزودن سایز جدید</span>
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در نام سایز..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="">همه انواع</option>
          {Object.entries(TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">سایزی ثبت نشده است</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">عنوان سایز</th>
                  <th className="p-4">نوع</th>
                  <th className="p-4 text-center">ترتیب</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold text-slate-800 dark:text-slate-100">
                        {s.name}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {TYPE_LABELS[s.size_type] || s.size_type}
                    </td>
                    <td className="p-4 text-center text-slate-600 dark:text-slate-400">{s.sort_order}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(s)}
                        className={`p-1.5 rounded-lg transition ${
                          s.is_active
                            ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {s.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
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

      <SizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingSize={editingSize}
        onSuccess={refetch}
      />
    </div>
  );
}