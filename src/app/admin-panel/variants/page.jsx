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
  PhotoIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

function VariantsTableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border-b border-admin-border/40"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-admin-border/60 shrink-0" />
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="h-4 w-3/4 bg-admin-border/60 rounded-md" />
              <div className="h-3 w-1/2 bg-admin-border/40 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-20 bg-admin-border/50 rounded-md hidden md:block" />
            <div className="h-4 w-16 bg-admin-border/50 rounded-md hidden sm:block" />
            <div className="w-12 h-6 bg-admin-border/60 rounded-lg" />
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminVariantsPage() {
  const { variants, count, loading, params, updateParams, refetch } = useVariants();
  const { colors, sizes, loading: catalogLoading } = useCatalog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);

  const handleOpenCreate = () => {
    setEditingVariant(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVariant(v);
    setIsModalOpen(true);
  };

  const handleDelete = async (v) => {
    if (!confirm(`آیا از حذف واریانت با کد شناسه «${v.sku}» اطمینان دارید؟`)) return;
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

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت واریانت‌ها
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {count > 0
              ? `${formatNum(count)} واریانت ثبت شده در انبار`
              : "لیست دقیق تنوع رنگی، سایز و موجودی همه محصولات"}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleOpenCreate}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-admin-primary text-white rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-admin-primary/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>افزودن واریانت</span>
          </button>
          <button
            onClick={refetch}
            className="p-2.5 border border-admin-border/70 bg-admin-surface rounded-xl hover:bg-admin-background text-admin-text-muted hover:text-admin-text transition flex items-center gap-2 text-xs font-bold"
            title="بروزرسانی لیست"
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span className="hidden sm:inline">بروزرسانی</span>
          </button>
        </div>
      </div>

      {/* جستجو */}
      <div className="bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در SKU، نام محصول، رنگ یا سایز..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
      </div>

      {/* جدول واریانت‌ها */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <VariantsTableSkeleton />
        ) : variants.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            هیچ واریانتی ثبت نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background/60 text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">تصویر</th>
                  <th className="p-4">SKU شناسه</th>
                  <th className="p-4">محصول</th>
                  <th className="p-4">رنگ</th>
                  <th className="p-4">سایزها</th>
                  <th className="p-4 text-center">موجودی انبار</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {variants.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-admin-background/50 transition"
                  >
                    <td className="p-4">
                      {v.image ? (
                        <img
                          src={v.image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover border border-admin-border/70 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-admin-background border border-admin-border/50 flex items-center justify-center text-admin-text-muted shrink-0">
                          <PhotoIcon className="w-5 h-5 opacity-40" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-mono text-admin-text-muted dir-ltr text-right">
                      {v.sku}
                    </td>
                    <td className="p-4 font-bold text-admin-text max-w-[200px] truncate">
                      {v.product_title || "—"}
                    </td>
                    <td className="p-4">
                      {v.color ? (
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-admin-border/80 shadow-inner shrink-0"
                            style={{ backgroundColor: v.color.hex_code }}
                          />
                          <span className="font-bold text-admin-text">
                            {v.color.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-admin-text-muted">—</span>
                      )}
                    </td>
                    <td className="p-4 font-bold text-admin-text-muted">
                      {(v.sizes || []).map((s) => s.name).join("، ") || "—"}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`font-black text-[11px] px-2.5 py-1 rounded-xl border ${
                          v.stock_quantity > 5
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : v.stock_quantity > 0
                            ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        }`}
                      >
                        {formatNum(v.stock_quantity)} عدد
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleActive(v)}
                        title={v.is_active ? "غیرفعال کردن" : "فعال کردن"}
                        className={`p-1.5 rounded-xl transition ${
                          v.is_active
                            ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                            : "bg-admin-border/40 text-admin-text-muted hover:bg-admin-border/70"
                        }`}
                      >
                        {v.is_active ? (
                          <EyeIcon className="w-4 h-4" />
                        ) : (
                          <EyeSlashIcon className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(v)}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(v)}
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

      <VariantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingVariant={editingVariant}
        colors={colors}
        sizes={sizes}
        catalogLoading={catalogLoading}
        onSuccess={refetch}
      />
    </div>
  );
}