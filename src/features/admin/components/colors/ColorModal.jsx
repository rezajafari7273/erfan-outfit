"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const fieldClass =
  "w-full px-3.5 py-2.5 border border-admin-border/70 rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/50";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1.5 text-xs">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ColorModal({ isOpen, onClose, editingColor, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    hex_code: "#000000",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingColor) {
      setFormData({
        name: editingColor.name || "",
        hex_code: editingColor.hex_code || "#000000",
        is_active: editingColor.is_active ?? true,
      });
    } else {
      setFormData({ name: "", hex_code: "#000000", is_active: true });
    }
  }, [editingColor, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingColor) {
        await adminApi.updateColor(editingColor.id, formData);
      } else {
        await adminApi.createColor(formData);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      const msg =
        err?.detail || err?.message || (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
      setError(`خطا: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md p-6 relative border border-admin-border/70">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <h2 className="text-base font-black text-admin-text tracking-tight">
            {editingColor ? "ویرایش رنگ" : "افزودن رنگ جدید"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <Field label="نام رنگ *">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="مثال: قرمز اناری"
              className={fieldClass}
            />
          </Field>

          <Field label="کد رنگ (Hex)">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.hex_code}
                onChange={(e) =>
                  setFormData({ ...formData, hex_code: e.target.value.toUpperCase() })
                }
                className="w-12 h-10 rounded-xl border border-admin-border/70 cursor-pointer bg-admin-background shrink-0 p-1"
              />
              <input
                type="text"
                value={formData.hex_code}
                onChange={(e) =>
                  setFormData({ ...formData, hex_code: e.target.value.toUpperCase() })
                }
                placeholder="#000000"
                className={`${fieldClass} font-mono dir-ltr text-right`}
              />
            </div>
          </Field>

          <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text pt-1">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
            />
            <span>فعال</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-admin-border/70">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-admin-border/70 text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-admin-primary text-white font-bold hover:opacity-90 disabled:opacity-50 transition shadow-lg shadow-admin-primary/20"
            >
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}