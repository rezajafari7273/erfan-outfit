"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";

export default function ProductModal({ isOpen, onClose, editingProduct, categories, onSuccess }) {
  const [activeTab, setActiveTab] = useState("main");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    brand: "",
    gender_label: "unisex",
    type: "simple",
    category: "",
    base_price: "",
    discount_percent: 0,
    short_description: "",
    description: "",
    warranty_text: "گارانتی اصالت و سلامت فیزیکی کالا",
    delivery_text: "ارسال پیشتاز پستی",
    intro_video: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || "",
        slug: editingProduct.slug || "",
        brand: editingProduct.brand || "",
        gender_label: editingProduct.gender_label || "unisex",
        type: editingProduct.type || "simple",
        category: editingProduct.category || "",
        base_price: editingProduct.base_price || "",
        discount_percent: editingProduct.discount_percent || 0,
        short_description: editingProduct.short_description || "",
        description: editingProduct.description || "",
        warranty_text: editingProduct.warranty_text || "گارانتی اصالت و سلامت فیزیکی کالا",
        delivery_text: editingProduct.delivery_text || "ارسال پیشتاز پستی",
        intro_video: editingProduct.intro_video || "",
        is_active: editingProduct.is_active ?? true,
        is_featured: editingProduct.is_featured ?? false,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        brand: "",
        gender_label: "unisex",
        type: "simple",
        category: "",
        base_price: "",
        discount_percent: 0,
        short_description: "",
        description: "",
        warranty_text: "گارانتی اصالت و سلامت فیزیکی کالا",
        delivery_text: "ارسال پیشتاز پستی",
        intro_video: "",
        is_active: true,
        is_featured: false,
      });
    }
    setActiveTab("main");
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingProduct) {
        await adminApi.updateProduct(editingProduct.id, formData);
      } else {
        await adminApi.createProduct(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Save Product Error:", err);
      setError("خطا در ذخیره‌سازی اطلاعات محصول. لطفاً فیلدها را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800">
        
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
            {editingProduct ? "ویرایش مشخصات محصول" : "افزودن محصول جدید"}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        {/* تب‌های داخلی مدال */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("main")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "main" ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            اطلاعات اصلی
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pricing")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "pricing" ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            قیمت و تخفیف
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "details" ? "bg-rose-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            توضیحات و ارسال
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          {activeTab === "main" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">عنوان محصول</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">برند</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">دسته‌بندی</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100 bg-white"
                  >
                    <option value="">انتخاب دسته‌بندی...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name || cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">جنسیت</label>
                  <select
                    name="gender_label"
                    value={formData.gender_label}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100 bg-white"
                  >
                    <option value="unisex">مشترک / عمومی</option>
                    <option value="men">مردانه</option>
                    <option value="women">زنانه</option>
                    <option value="kids">بچگانه</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">نوع محصول</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100 bg-white"
                  >
                    <option value="simple">ساده</option>
                    <option value="tailoring">سفارشی دوزی</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="font-bold text-slate-700 dark:text-slate-300">محصول فعال باشد</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span className="font-bold text-slate-700 dark:text-slate-300">پیشنهاد ویژه</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">قیمت پایه (تومان)</label>
                  <input
                    type="number"
                    name="base_price"
                    value={formData.base_price}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">درصد تخفیف (0 تا 100)</label>
                  <input
                    type="number"
                    name="discount_percent"
                    min="0"
                    max="100"
                    value={formData.discount_percent}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">توضیحات کوتاه</label>
                <textarea
                  name="short_description"
                  rows="2"
                  value={formData.short_description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">توضیحات کامل</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">متن گارانتی</label>
                  <input
                    type="text"
                    name="warranty_text"
                    value={formData.warranty_text}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">متن نحوه ارسال</label>
                  <input
                    type="text"
                    name="delivery_text"
                    value={formData.delivery_text}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50 transition shadow-lg shadow-rose-600/20"
            >
              {loading ? "در حال ذخیره..." : "ذخیره محصول"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}