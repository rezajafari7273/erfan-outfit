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

export default function BogoModal({ isOpen, onClose, editingItem, products = [], onSuccess }) {
  const [formData, setFormData] = useState({
    buy_product: "",
    get_product: "",
    quantity_required: 1,
    quantity_free: 1,
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingItem) {
      setFormData({
        buy_product: editingItem.buy_product || "",
        get_product: editingItem.get_product || "",
        quantity_required: editingItem.quantity_required || 1,
        quantity_free: editingItem.quantity_free || 1,
        start_date: toLocalDateTime(editingItem.start_date),
        end_date: toLocalDateTime(editingItem.end_date),
        is_active: editingItem.is_active ?? true,
      });
    } else {
      setFormData({
        buy_product: "",
        get_product: "",
        quantity_required: 1,
        quantity_free: 1,
        start_date: "",
        end_date: "",
        is_active: true,
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...formData,
        buy_product: Number(formData.buy_product),
        get_product: Number(formData.get_product),
        quantity_required: Number(formData.quantity_required),
        quantity_free: Number(formData.quantity_free),
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
      };

      if (editingItem) {
        await adminApi.updateBogoOffer(editingItem.id, payload);
      } else {
        await adminApi.createBogoOffer(payload);
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
            {editingItem ? "ویرایش BOGO" : "افزودن پیشنهاد بخر یکی ببر یکی"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <Field label="محصول خریداری‌شده *">
            <select
              value={formData.buy_product}
              onChange={(e) => setFormData({ ...formData, buy_product: e.target.value })}
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

          <Field label="محصول رایگان *">
            <select
              value={formData.get_product}
              onChange={(e) => setFormData({ ...formData, get_product: e.target.value })}
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

          <div className="grid grid-cols-2 gap-3">
            <Field label="تعداد موردنیاز خرید *">
              <input
                type="number"
                min="1"
                value={formData.quantity_required}
                onChange={(e) => setFormData({ ...formData, quantity_required: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
            <Field label="تعداد رایگان *">
              <input
                type="number"
                min="1"
                value={formData.quantity_free}
                onChange={(e) => setFormData({ ...formData, quantity_free: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="تاریخ شروع *">
              <input
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
            <Field label="تاریخ پایان *">
              <input
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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