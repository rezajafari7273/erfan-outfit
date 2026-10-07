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
  "w-full px-3 py-2 border border-admin-border rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition-all";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-admin-text mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function BannerSliderModal({
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
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: null,
    order: 0,
    is_active: true,
    ...emptyDestination,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingItem) {
      setFetching(true);
      adminApi
        .getBannerSliderById(editingItem.id)
        .then((res) => {
          const d = res?.data !== undefined ? res.data : res;
          setForm({
            title: d.title || "",
            subtitle: d.subtitle || "",
            image: null,
            order: d.order || 0,
            is_active: d.is_active ?? true,
            ...destinationFromApi(d),
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    } else {
      setForm({
        title: "", subtitle: "", image: null, order: 0, is_active: true, ...emptyDestination,
      });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      if (form.title) fd.append("title", form.title);
      if (form.subtitle) fd.append("subtitle", form.subtitle);
      fd.append("order", form.order);
      fd.append("is_active", form.is_active ? "true" : "false");
      if (form.image instanceof File) fd.append("image", form.image);
      destinationToFormData(fd, form);

      if (editingItem) {
        await adminApi.updateBannerSlider(editingItem.id, fd);
      } else {
        await adminApi.createBannerSlider(fd);
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
            {editingItem ? "ویرایش اسلاید" : "افزودن اسلاید"}
          </h2>
          <button onClick={onClose} className="text-admin-text-muted hover:text-admin-text">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-admin-danger/10 text-admin-danger text-xs font-bold rounded-xl">{error}</div>}

        {fetching ? (
          <div className="p-12 text-center text-xs text-admin-text-muted">در حال بارگذاری...</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
            <div className="grid grid-cols-2 gap-3">
              <Field label="عنوان">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="زیرعنوان">
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  className={fieldClass}
                />
              </Field>
            </div>

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

            <Field label="ترتیب نمایش">
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className={fieldClass}
              />
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

            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
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
        )}
      </div>
    </div>
  );
}