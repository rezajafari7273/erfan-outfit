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

function PromotionSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-16 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-admin-border/60 rounded"></div>
        <div className="h-16 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      </div>
    </div>
  );
}

const toLocalDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function PromotionModal({ isOpen, onClose, editingPromotion, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_type: "percentage",
    discount_value: 0,
    start_date: "",
    end_date: "",
    is_active: true,
    usage_limit: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingPromotion) {
      setFormData({
        title: editingPromotion.title || "",
        description: editingPromotion.description || "",
        discount_type: editingPromotion.discount_type || "percentage",
        discount_value: editingPromotion.discount_value || 0,
        start_date: toLocalDateTime(editingPromotion.start_date),
        end_date: toLocalDateTime(editingPromotion.end_date),
        is_active: editingPromotion.is_active ?? true,
        usage_limit: editingPromotion.usage_limit || 0,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        discount_type: "percentage",
        discount_value: 0,
        start_date: "",
        end_date: "",
        is_active: true,
        usage_limit: 0,
      });
    }
  }, [editingPromotion, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...formData,
        discount_value: Number(formData.discount_value),
        usage_limit: Number(formData.usage_limit),
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
      };

      if (editingPromotion) {
        await adminApi.updatePromotion(editingPromotion.id, payload);
      } else {
        await adminApi.createPromotion(payload);
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
      <div className="bg-admin-surface text-admin-text rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingPromotion ? "ویرایش پروموشن" : "افزودن پروموشن"}
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
          <PromotionSkeleton />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <Field label="عنوان *">
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>

            <Field label="توضیحات">
              <textarea
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={fieldClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="نوع تخفیف">
                <select
                  value={formData.discount_type}
                  onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                  className={fieldClass}
                >
                  <option value="percentage">درصدی</option>
                  <option value="fixed">مبلغ ثابت</option>
                </select>
              </Field>
              <Field label={formData.discount_type === "percentage" ? "درصد (0-100)" : "مبلغ (ریال)"}>
                <input
                  type="number"
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
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

            <Field label="محدودیت استفاده (0 = نامحدود)">
              <input
                type="number"
                value={formData.usage_limit}
                onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                className={fieldClass}
              />
            </Field>

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