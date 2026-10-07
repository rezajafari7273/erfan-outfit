"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DestinationSection, {
  emptyDestination,
  destinationToFormData,
  destinationFromApi,
} from "./DestinationSection";

const fieldClass =
  "w-full px-3 py-2 border border-admin-border rounded-xl bg-admin-surface text-admin-text text-xs focus:outline-none focus:ring-2 focus:ring-admin-primary";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1">{label}</label>
      {children}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="flex-1 space-y-4 animate-pulse pr-1">
      <div className="space-y-1.5">
        <div className="h-3 bg-admin-border/50 rounded w-16"></div>
        <div className="h-9 bg-admin-border/30 rounded-xl w-full"></div>
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-admin-border/50 rounded w-20"></div>
        <div className="h-10 bg-admin-border/30 rounded-xl w-full"></div>
      </div>
      <div className="p-4 border border-admin-border/40 rounded-xl space-y-3">
        <div className="h-3 bg-admin-border/50 rounded w-28"></div>
        <div className="h-9 bg-admin-border/30 rounded-xl w-full"></div>
      </div>
    </div>
  );
}

export default function TopBannerModal({
  isOpen,
  onClose,
  editingItem,
  products = [],
  landings = [],
  categories = [],
  colors = [],
  sizes = [],
  onSuccess,
}) {
  const [form, setForm] = useState({ title: "", image: null, is_active: true, ...emptyDestination });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingItem) {
      setFetching(true);
      adminApi
        .getTopBannerById(editingItem.id)
        .then((res) => {
          const d = res?.data !== undefined ? res.data : res;
          setForm({
            title: d.title || "",
            image: null,
            is_active: d.is_active ?? true,
            ...destinationFromApi(d),
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    } else {
      setForm({ title: "", image: null, is_active: true, ...emptyDestination });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("is_active", form.is_active ? "true" : "false");
      if (form.image instanceof File) fd.append("image", form.image);
      destinationToFormData(fd, form);

      if (editingItem) {
        await adminApi.updateTopBanner(editingItem.id, fd);
      } else {
        await adminApi.createTopBanner(fd);
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
      <div className="bg-admin-surface rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[92vh] flex flex-col border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingItem ? "ویرایش تاپ بنر" : "افزودن تاپ بنر"}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-admin-primary-soft text-admin-danger text-xs font-bold rounded-xl border border-admin-danger/20">{error}</div>}

        {fetching ? (
          <FormSkeleton />
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
            <Field label="عنوان *">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className={fieldClass}
              />
            </Field>

            <Field label={editingItem ? "تصویر (خالی = بدون تغییر)" : "تصویر *"}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                required={!editingItem}
                className={fieldClass}
              />
              {editingItem?.image && (
                <img src={editingItem.image} alt="" className="mt-2 h-20 rounded-lg border border-admin-border object-cover" />
              )}
            </Field>

            <DestinationSection
              form={form}
              setForm={setForm}
              products={products}
              landings={landings}
              categories={categories}
              colors={colors}
              sizes={sizes}
            />

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
                {loading ? "..." : "ذخیره"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}