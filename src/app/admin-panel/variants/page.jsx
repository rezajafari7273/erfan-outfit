"use client";

import { useState } from "react";
import { useVariants } from "@/features/admin/hooks/useVariants";
import { useCatalog } from "@/features/admin/hooks/useCatalog";
import { adminApi } from "@/features/admin/api/adminApi";
import VariantModal from "@/features/admin/components/variants/VariantModal";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function AdminVariantsPage() {
  const { variants, count, loading, params, updateParams, refetch } = useVariants();
  const { colors, sizes } = useCatalog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  const handleOpenEdit = (v) => {
    setEditingVariant(v);
    setIsModalOpen(true);
  };

  const handleDelete = async (v) => {
    if (!confirm(`حذف واریانت «${v.sku}»؟`)) return;
    try {
      await adminApi.deleteVariant(v.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف واریانت");
    }
  };

  const handleToggleActive = async (v) => {
    try {
      const fd = new FormData();
      fd.append("is_active", v.is_active ? "false" : "true");
      await adminApi.updateVariant(v.id, fd);
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
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت واریانت‌ها</h1>
          <p className="text-xs text-slate-500 mt-1">
            {count > 0 ? `${count} واریانت ثبت شده` : "لیست واریانت‌های همه محصولات"}
          </p>
        </div>
        <button
          onClick={refetch}
          className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در SKU، نام محصول، رنگ یا سایز..."
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
        ) : variants.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">واریانتی ثبت نشده است</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">تصویر</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">محصول</th>
                  <th className="p-4">رنگ</th>
                  <th className="p-4">سایزها</th>
                  <th className="p-4 text-center">موجودی</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {variants.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4">
                      {v.image ? (
                        <img src={v.image} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
                      )}
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">{v.sku}</td>
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-100 max-w-[200px] truncate">
                      {v.product_title}
                    </td>
                    <td className="p-4">
                      {v.color ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-md border border-slate-200 dark:border-slate-700"
                            style={{ backgroundColor: v.color.hex_code }}
                          />
                          <span className="text-slate-700 dark:text-slate-300">{v.color.name}</span>
                        </div>
                      ) : "—"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {(v.sizes || []).map((s) => s.name).join("، ") || "—"}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`font-bold px-2 py-1 rounded-lg ${
                          v.stock_quantity > 5
                            ? "bg-emerald-50 text-emerald-700"
                            : v.stock_quantity > 0
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {v.stock_quantity}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(v)}
                        className={`p-1.5 rounded-lg transition ${
                          v.is_active
                            ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                            : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {v.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(v)}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v)}
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

      <VariantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingVariant={editingVariant}
        colors={colors}
        sizes={sizes}
        onSuccess={refetch}
      />
    </div>
  );
}