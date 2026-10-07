"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const fieldClass =
  "w-full px-3 py-2 border border-admin-border rounded-xl bg-admin-surface text-admin-text text-xs focus:outline-none focus:ring-2 focus:ring-admin-primary transition-all";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1">{label}</label>
      {children}
    </div>
  );
}

function FlashSaleSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-16 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-32 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-admin-border/60 rounded"></div>
          <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-admin-border/60 rounded"></div>
          <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
        </div>
      </div>
      <div className="h-4 w-16 bg-admin-border/50 rounded"></div>
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
        product: editingItem.product?.id || editingItem.product || "",
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
        err?.response?.data?.detail ||
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
      <div className="bg-admin-surface text-admin-text rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingItem ? "ویرایش فروش فلش" : "افزودن فروش فلش"}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-admin-danger/10 border border-admin-danger/20 text-admin-danger text-xs font-bold rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <FlashSaleSkeleton />
        ) : (
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
                    {p.title || p.name}
                  </option>
                ))}
              </select>
            </Field>

            {selectedProduct && (
              <div className="p-2 bg-admin-background rounded-lg text-[10px] text-admin-text-muted border border-admin-border">
                قیمت اصلی: <b>{Number(selectedProduct.base_price || selectedProduct.price || 0).toLocaleString("fa-IR")}</b> ریال
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

            <label className="flex items-center gap-2 cursor-pointer pt-2 text-admin-text">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded accent-admin-primary"
              />
              <span className="font-bold">فعال</span>
            </label>

            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-admin-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-admin-border text-admin-text hover:bg-admin-background transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-admin-primary text-button-text font-bold hover:bg-admin-primary-hover disabled:opacity-50 transition-colors"
              >
                ذخیره
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}