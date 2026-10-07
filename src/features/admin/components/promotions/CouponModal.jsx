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

export default function CouponModal({ isOpen, onClose, editingCoupon, promotions = [], onSuccess }) {
  const [formData, setFormData] = useState({
    code: "",
    promotion: "",
    max_uses: 1,
    expires_at: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingCoupon) {
      setFormData({
        code: editingCoupon.code || "",
        promotion: editingCoupon.promotion || "",
        max_uses: editingCoupon.max_uses || 1,
        expires_at: toLocalDateTime(editingCoupon.expires_at),
        is_active: editingCoupon.is_active ?? true,
      });
    } else {
      setFormData({ code: "", promotion: "", max_uses: 1, expires_at: "", is_active: true });
    }
  }, [editingCoupon, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...formData,
        max_uses: Number(formData.max_uses),
        expires_at: new Date(formData.expires_at).toISOString(),
      };

      if (editingCoupon) {
        await adminApi.updateCoupon(editingCoupon.id, payload);
      } else {
        await adminApi.createCoupon(payload);
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
            {editingCoupon ? "ویرایش کوپن" : "افزودن کوپن"}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-admin-danger/10 text-admin-danger text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <Field label="کد تخفیف *">
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              required
              placeholder="WELCOME20"
              className={`${fieldClass} font-mono`}
            />
          </Field>

          <Field label="پروموشن مرتبط *">
            <select
              value={formData.promotion}
              onChange={(e) => setFormData({ ...formData, promotion: e.target.value })}
              required
              className={fieldClass}
            >
              <option value="">انتخاب کنید...</option>
              {promotions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="حداکثر استفاده *">
              <input
                type="number"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>
            <Field label="تاریخ انقضا *">
              <input
                type="datetime-local"
                value={formData.expires_at}
                onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
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