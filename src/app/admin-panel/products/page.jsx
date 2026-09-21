"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import ProductModal from "@/features/admin/components/products/ProductModal";
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  TrashIcon, 
  PencilSquareIcon, 
  StarIcon, 
  EyeIcon, 
  EyeSlashIcon 
} from "@heroicons/react/24/outline";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // وضعیت مدال
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // دریافت اطلاعات محصولات و دسته‌بندی‌ها
  const fetchData = async () => {
    try {
      setLoading(true);
      
      let productsList = [];
      let categoriesList = [];

      try {
        const prodRes = await adminApi.getProducts({ search: searchQuery });
        // بررسی ایمن ساختار داده‌ها برای جلوگیری از خطای undefined
        if (prodRes) {
          const data = prodRes.data !== undefined ? prodRes.data : prodRes;
          productsList = data.results || data.data || data;
        }
      } catch (err) {
        console.error("Error fetching products API:", err);
      }

      try {
        const catRes = await adminApi.getCategories();
        // بررسی ایمن ساختار داده‌ها برای جلوگیری از خطای undefined
        if (catRes) {
          const data = catRes.data !== undefined ? catRes.data : catRes;
          categoriesList = data.results || data.data || data;
        }
      } catch (err) {
        console.error("Error fetching categories API:", err);
      }

      setProducts(Array.isArray(productsList) ? productsList : []);
      setCategories(Array.isArray(categoriesList) ? categoriesList : []);

    } catch (err) {
      console.error("General error in fetchData:", err);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  // حذف محصول
  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف این محصول اطمینان دارید؟")) return;
    try {
      await adminApi.deleteProduct(id);
      fetchData();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("خطا در حذف محصول");
    }
  };

  // تغییر وضعیت ویژه (Featured)
  const handleToggleFeatured = async (id) => {
    try {
      await adminApi.toggleProductFeatured(id);
      fetchData();
    } catch (err) {
      console.error("Error toggling featured:", err);
    }
  };

  // تغییر وضعیت فعال/غیرفعال (Active)
  const handleToggleActive = async (id) => {
    try {
      await adminApi.toggleProductActive(id);
      fetchData();
    } catch (err) {
      console.error("Error toggling active:", err);
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

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* هدر صفحه و دکمه افزودن */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت محصولات</h1>
          <p className="text-xs text-slate-500 mt-1">افزودن، ویرایش و مدیریت کالاها و مشخصات آن‌ها</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/20"
        >
          <PlusIcon className="w-4 h-4" />
          <span>افزودن محصول جدید</span>
        </button>
      </div>

      {/* ابزار جستجو و فیلتر */}
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در نام محصول، برند یا توضیحات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری اطلاعات...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">هیچ محصولی یافت نشد.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">عنوان محصول</th>
                  <th className="p-4">برند</th>
                  <th className="p-4">دسته‌بندی</th>
                  <th className="p-4">قیمت پایه (تومان)</th>
                  <th className="p-4">تخفیف</th>
                  <th className="p-4 text-center">وضعیت</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{product.title}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{product.brand || "—"}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {categories.find(c => c.id === product.category)?.name || "دسته‌بندی نشده"}
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {product.base_price ? Number(product.base_price).toLocaleString() : "—"}
                    </td>
                    <td className="p-4">
                      {product.discount_percent > 0 ? (
                        <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-lg font-bold">
                          {product.discount_percent}%
                        </span>
                      ) : "—"}
                    </td>
                    <td className="p-4 text-center space-x-2 space-x-reverse">
                      {/* دکمه تغییر وضعیت فعال */}
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        title={product.is_active ? "غیرفعال کردن" : "فعال کردن"}
                        className={`p-1.5 rounded-lg transition ${
                          product.is_active ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        {product.is_active ? <EyeIcon className="w-4 h-4" /> : <EyeSlashIcon className="w-4 h-4" />}
                      </button>

                      {/* دکمه ویژه کردن */}
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        title={product.is_featured ? "حذف از پیشنهاد ویژه" : "افزودن به پیشنهاد ویژه"}
                        className={`p-1.5 rounded-lg transition ${
                          product.is_featured ? "text-amber-500 bg-amber-50 hover:bg-amber-100" : "text-slate-400 bg-slate-100 hover:bg-slate-200"
                        }`}
                      >
                        <StarIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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

      {/* مدال ایجاد و ویرایش محصول */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingProduct={editingProduct}
        categories={categories}
        onSuccess={fetchData}
      />
    </div>
  );
}