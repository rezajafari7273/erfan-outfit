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

// اسکلتون بارگذاری درخت دسته‌بندی‌ها
function CategoryTreeSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 border-b border-admin-border/40"
          style={{ paddingRight: `${(i % 3) * 20 + 12}px` }}
        >
          <div className="w-4 h-4 rounded bg-admin-border/60 shrink-0"></div>
          <div className="w-9 h-9 rounded-xl bg-admin-border/50 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-admin-border/60 rounded-md"></div>
            <div className="h-3 w-20 bg-admin-border/40 rounded-md"></div>
          </div>
          <div className="w-24 h-8 bg-admin-border/50 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}

export default function AdminCategoriesPage() {
  const { categories, loading, params, updateParams, refetch } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [defaultParent, setDefaultParent] = useState(null);

  const [expanded, setExpanded] = useState(() => new Set());

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
      if (!confirm(`این دسته ${cat.children_count} زیردسته دارد. آیا از حذف مطمئن هستید؟`)) return;
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

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت دسته‌بندی‌ها
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {categories.length > 0
              ? `${formatNum(categories.length)} دسته‌بندی ثبت شده`
              : "افزودن، ویرایش و مدیریت ساختار درختی کالاها"}
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
            <span>افزودن دسته‌بندی جدید</span>
          </button>
        </div>
      </div>

      {/* جستجو */}
      <div className="bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در نام یا اسلاگ..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
      </div>

      {/* درخت دسته‌بندی‌ها */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden p-3">
        {loading ? (
          <CategoryTreeSkeleton />
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
        defaultParent={defaultParent}
        categories={categories}
        onSuccess={refetch}
      />
    </div>
  );
}