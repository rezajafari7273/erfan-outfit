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

export default function LandingPageModal({ isOpen, onClose, editingItem, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    meta_title: "",
    meta_description: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingItem) {
      setForm({
        title: editingItem.title || "",
        slug: editingItem.slug || "",
        meta_title: editingItem.meta_title || "",
        meta_description: editingItem.meta_description || "",
        is_active: editingItem.is_active ?? true,
      });
    } else {
      setForm({ title: "", slug: "", meta_title: "", meta_description: "", is_active: true });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...form };
      if (!payload.slug) delete payload.slug;

      if (editingItem) {
        await adminApi.updateLanding(editingItem.id, payload);
      } else {
        await adminApi.createLanding(payload);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      const msg = err?.detail || err?.message || (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
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
            {editingItem ? "ویرایش لندینگ" : "افزودن لندینگ"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <Field label="عنوان *">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className={fieldClass}
            />
          </Field>

          <Field label="اسلاگ (اختیاری، خودکار)">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={fieldClass}
            />
          </Field>

          <Field label="Meta Title">
            <input
              type="text"
              value={form.meta_title}
              onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
              className={fieldClass}
            />
          </Field>

          <Field label="Meta Description">
            <textarea
              rows="2"
              value={form.meta_description}
              onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
              className={fieldClass}
            />
          </Field>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
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