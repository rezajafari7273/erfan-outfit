"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const fieldClass =
  "w-full px-3 py-2 border border-admin-border rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition-all";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1">{label}</label>
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
      <div className="bg-admin-surface rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingItem ? "ویرایش BOGO" : "افزودن پیشنهاد بخر یکی ببر یکی"}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-admin-danger/10 text-admin-danger text-xs font-bold rounded-xl">{error}</div>}

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
              className="w-4 h-4 rounded text-admin-primary focus:ring-admin-primary border-admin-border bg-admin-background"
            />
            <span className="font-bold text-admin-text">فعال</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-admin-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-admin-border text-admin-text hover:bg-admin-background transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-admin-primary text-button-text font-bold hover:bg-admin-primary-hover disabled:opacity-50 transition-all shadow-md shadow-admin-primary/10"
            >
              {loading ? "..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}