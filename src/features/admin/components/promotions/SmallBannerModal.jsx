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
  "w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500";

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      {children}
    </div>
  );
}

const SLOT_OPTIONS = [
  { value: "searchModal", label: "مودال جستجو" },
  { value: "megaMenu", label: "مگا منو" },
  { value: "hamburgerMenu", label: "منوی همبرگری" },
  { value: "homeMiddle", label: "میانه صفحه اصلی" },
  { value: "homeBottom", label: "پایین صفحه اصلی" },
];

export default function SmallBannerModal({
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
    image: null,
    slot_key: "searchModal",
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
        .getSmallBannerById(editingItem.id)
        .then((res) => {
          const d = res?.data !== undefined ? res.data : res;
          setForm({
            title: d.title || "",
            image: null,
            slot_key: d.slot_key || "searchModal",
            order: d.order || 0,
            is_active: d.is_active ?? true,
            ...destinationFromApi(d),
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    } else {
      setForm({
        title: "", image: null, slot_key: "searchModal", order: 0, is_active: true, ...emptyDestination,
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
      fd.append("slot_key", form.slot_key);
      fd.append("order", form.order);
      fd.append("is_active", form.is_active ? "true" : "false");
      if (form.image instanceof File) fd.append("image", form.image);
      destinationToFormData(fd, form);

      if (editingItem) {
        await adminApi.updateSmallBanner(editingItem.id, fd);
      } else {
        await adminApi.createSmallBanner(fd);
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
            {editingItem ? "ویرایش اسمال بنر" : "افزودن اسمال بنر"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        {fetching ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
            <Field label="عنوان">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={fieldClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="اسلات *">
                <select
                  value={form.slot_key}
                  onChange={(e) => setForm({ ...form, slot_key: e.target.value })}
                  required
                  className={fieldClass}
                >
                  {SLOT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="ترتیب نمایش">
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
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
                <img src={editingItem.image} alt="" className="mt-2 h-20 rounded-lg border" />
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
        )}
      </div>
    </div>
  );
}