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

function LandingPageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-3 w-16 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-28 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-24 bg-admin-border/60 rounded"></div>
        <div className="h-9 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-32 bg-admin-border/60 rounded"></div>
        <div className="h-16 w-full bg-admin-border/40 rounded-xl"></div>
      </div>
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
      <div className="bg-admin-surface text-admin-text rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingItem ? "ویرایش لندینگ" : "افزودن لندینگ"}
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
          <LandingPageSkeleton />
        ) : (
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

            <label className="flex items-center gap-2 cursor-pointer pt-2 text-admin-text">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
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