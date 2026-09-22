"use client";

import { useState, useMemo } from "react";
import { useCategories } from "@/features/admin/hooks/useCategories";
import { adminApi } from "@/features/admin/api/adminApi";
import CategoryTree from "@/features/admin/components/categories/CategoryTree";
import CategoryModal from "@/features/admin/components/categories/CategoryModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function AdminCategoriesPage() {
  const { categories, loading, params, updateParams, refetch } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [defaultParent, setDefaultParent] = useState(null);

  // باز/بسته کردن درخت
  const [expanded, setExpanded] = useState(() => new Set());

  // اول بار همه باز باشن
  useMemo(() => {
    if (categories.length > 0 && expanded.size === 0) {
      setExpanded(new Set(categories.map((c) => c.id)));
    }
  }, [categories]);

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setDefaultParent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setDefaultParent(null);
    setIsModalOpen(true);
  };

  const handleAddChild = (parent) => {
    setEditingCategory(null);
    setDefaultParent(parent.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (cat) => {
    if (cat.children_count > 0) {
      if (!confirm(`این دسته ${cat.children_count} زیردسته دارد. حذف شود؟`)) return;
    } else {
      if (!confirm(`حذف دسته «${cat.name}»؟`)) return;
    }
    try {
      await adminApi.deleteCategory(cat.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف دسته‌بندی (ممکن است محصولی به آن وابسته باشد)");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await adminApi.updateCategory(id, { is_active: false }, true);
      // برای toggle واقعی، بهتره endpoint مجزا داشته باشیم. فعلاً از partial update استفاده می‌کنیم.
    } catch (err) {
      console.error(err);
    }
  };

  // نزدیک‌ترین کار برای toggle: مستقیم از partial update با مقدار معکوس
  const handleToggleActiveSafe = async (id) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    try {
      const fd = new FormData();
      fd.append("is_active", cat.is_active ? "false" : "true");
      await adminApi.updateCategory(id, fd, true);
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
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-xs text-slate-500 mt-1">
            {categories.length > 0 ? `${categories.length} دسته‌بندی ثبت شده` : "افزودن، ویرایش و مدیریت دسته‌بندی‌ها"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="بروزرسانی"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>افزودن دسته‌بندی جدید</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در نام یا اسلاگ..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : (
          <CategoryTree
            categories={categories}
            expanded={expanded}
            onToggleExpand={toggleExpand}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
            onAddChild={handleAddChild}
            onToggleActive={handleToggleActiveSafe}
          />
        )}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingCategory={editingCategory}
        categories={categories}
        onSuccess={refetch}
      />
    </div>
  );
}