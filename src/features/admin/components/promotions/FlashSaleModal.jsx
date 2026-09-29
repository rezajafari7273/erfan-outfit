"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const fieldClass =
  "w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      {children}
    </div>
  );
}

const toLocalDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function FlashSaleModal({ isOpen, onClose, editingItem, products = [], onSuccess }) {
  const [formData, setFormData] = useState({
    product: "",
    discount_price: 0,
    start_time: "",
    end_time: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingItem) {
      setFormData({
        product: editingItem.product || "",
        discount_price: editingItem.discount_price || 0,
        start_time: toLocalDateTime(editingItem.start_time),
        end_time: toLocalDateTime(editingItem.end_time),
        is_active: editingItem.is_active ?? true,
      });
    } else {
      setFormData({ product: "", discount_price: 0, start_time: "", end_time: "", is_active: true });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.id === Number(formData.product));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...formData,
        product: Number(formData.product),
        discount_price: Number(formData.discount_price),
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      };

      if (editingItem) {
        await adminApi.updateFlashSale(editingItem.id, payload);
      } else {
        await adminApi.createFlashSale(payload);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      const msg =
        err?.detail ||
        err?.message ||
        (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
      setError(`خطا: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
            {editingItem ? "ویرایش فروش فلش" : "افزودن فروش فلش"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <Field label="محصول *">
            <select
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              required
              className={fieldClass}
            >
              <option value="">انتخاب کنید...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </Field>

          {selectedProduct && (
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] text-slate-500">
              قیمت اصلی: <b>{Number(selectedProduct.base_price || 0).toLocaleString("fa-IR")}</b> ریال
              {selectedProduct.discount_percent > 0 && ` · تخفیف فعلی: ${selectedProduct.discount_percent}%`}
            </div>
          )}

          <Field label="قیمت تخفیف‌خورده (ریال) *">
            <input
              type="number"
              value={formData.discount_price}
              onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
              required
              className={fieldClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="زمان شروع *">
              <input
                type="datetime-local"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
            <Field label="زمان پایان *">
              <input
                type="datetime-local"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 rounded text-rose-600"
            />
            <span className="font-bold">فعال</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50"
            >
              {loading ? "..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}