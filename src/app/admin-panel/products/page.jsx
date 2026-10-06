"use client";

import { useState } from "react";
import { useProducts } from "@/features/admin/hooks/useProducts";
import { useCatalog } from "@/features/admin/hooks/useCatalog";
import { adminApi } from "@/features/admin/api/adminApi";
import ProductModal from "@/features/admin/components/products/ProductModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  PencilSquareIcon,
  StarIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

// اسکلتون بارگذاری جدول محصولات
function ProductsSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse select-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 p-3 border-b border-admin-border/50"
        >
          <div className="w-10 h-10 rounded-xl bg-admin-border/50 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 bg-admin-border/60 rounded-md"></div>
            <div className="h-3 w-24 bg-admin-border/40 rounded-md"></div>
          </div>
          <div className="h-4 w-20 bg-admin-border/40 rounded-md"></div>
          <div className="h-4 w-16 bg-admin-border/40 rounded-md"></div>
          <div className="w-16 h-8 bg-admin-border/50 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}

export default function AdminProductsPage() {
  const { products, count, loading, params, updateParams, refetch } = useProducts();
  const { categories, colors, sizes, vendors } = useCatalog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این محصول اطمینان دارید؟")) return;
    try {
      await adminApi.deleteProduct(id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول");
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await adminApi.toggleProductFeatured(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await adminApi.toggleProductActive(id);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت محصولات
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {count > 0 ? `${formatNum(count)} محصول ثبت شده` : "افزودن، ویرایش و مدیریت کالاها"}
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-admin-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-admin-primary/20"
        >
          <PlusIcon className="w-4 h-4" />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      {/* جستجو */}
      <div className="flex items-center gap-4 bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در نام، برند یا توضیحات..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <ProductsSkeleton />
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            هیچ محصولی یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">تصویر</th>
                  <th className="p-4">عنوان</th>
                  <th className="p-4">برند</th>
                  <th className="p-4">دسته‌بندی</th>
                  <th className="p-4">قیمت پایه</th>
                  <th className="p-4">تخفیف</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-admin-background/50 transition duration-150"
                  >
                    <td className="p-4">
                      {p.main_image ? (
                        <img
                          src={p.main_image}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover border border-admin-border/50"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-admin-border/40" />
                      )}
                    </td>
                    <td className="p-4 font-bold text-admin-text">{p.title}</td>
                    <td className="p-4 text-admin-text-muted">{p.brand || "—"}</td>
                    <td className="p-4 text-admin-text-muted">{p.category_name || "—"}</td>
                    <td className="p-4 font-black text-admin-text">
                      {p.base_price ? `${formatNum(p.base_price)} تومان` : "—"}
                    </td>
                    <td className="p-4">
                      {p.discount_percent > 0 ? (
                        <span className="px-2 py-1 bg-admin-primary/10 text-admin-primary border border-admin-primary/20 rounded-lg font-bold">
                          {formatNum(p.discount_percent)}٪
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-4 text-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleToggleActive(p.id)}
                        title={p.is_active ? "غیرفعال کردن" : "فعال کردن"}
                        className={`p-1.5 rounded-lg transition ${
                          p.is_active
                            ? "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20"
                            : "text-admin-text-muted bg-admin-border/40 hover:bg-admin-border/70"
                        }`}
                      >
                        {p.is_active ? (
                          <EyeIcon className="w-4 h-4" />
                        ) : (
                          <EyeSlashIcon className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(p.id)}
                        title={p.is_featured ? "حذف از ویژه" : "افزودن به ویژه"}
                        className={`p-1.5 rounded-lg transition ${
                          p.is_featured
                            ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20"
                            : "text-admin-text-muted bg-admin-border/40 hover:bg-admin-border/70"
                        }`}
                      >
                        <StarIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-lg transition"
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

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
        categories={categories}
        colors={colors}
        sizes={sizes}
        vendors={vendors}
        onSuccess={refetch}
      />
    </div>
  );
}