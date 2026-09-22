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

export default function VariantModal({
  isOpen,
  onClose,
  editingVariant,
  colors = [],
  sizes = [],
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    color_id: "",
    size_ids: [],
    stock_quantity: 0,
    is_active: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingVariant) {
      setFormData({
        color_id: editingVariant.color?.id || "",
        size_ids: (editingVariant.sizes || []).map((s) => s.id),
        stock_quantity: editingVariant.stock_quantity || 0,
        is_active: editingVariant.is_active ?? true,
        image: null,
        image_url: editingVariant.image,
      });
    } else {
      setFormData({
        color_id: "",
        size_ids: [],
        stock_quantity: 0,
        is_active: true,
        image: null,
      });
    }
  }, [editingVariant, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      if (formData.color_id) fd.append("color_id", formData.color_id);
      formData.size_ids.forEach((sid) => fd.append("size_ids", sid));
      fd.append("stock_quantity", formData.stock_quantity);
      fd.append("is_active", formData.is_active ? "true" : "false");
      if (formData.image instanceof File) fd.append("image", formData.image);

      if (editingVariant) {
        await adminApi.updateVariant(editingVariant.id, fd);
      } else {
        await adminApi.createVariant(fd);
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
            {editingVariant ? "ویرایش واریانت" : "افزودن واریانت جدید"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
          <Field label="رنگ">
            <select
              value={formData.color_id}
              onChange={(e) => setFormData({ ...formData, color_id: e.target.value })}
              className={fieldClass}
            >
              <option value="">— بدون رنگ —</option>
              {colors.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.hex_code})</option>
              ))}
            </select>
          </Field>

          <Field label="سایزها">
            <div className="flex flex-wrap gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800">
              {sizes.length === 0 ? (
                <span className="text-slate-400">سایزی ثبت نشده است</span>
              ) : (
                sizes.map((s) => {
                  const checked = formData.size_ids.includes(s.id);
                  return (
                    <label
                      key={s.id}
                      className={`px-3 py-1.5 rounded-lg border cursor-pointer transition ${
                        checked
                          ? "bg-rose-600 text-white border-rose-600"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={checked}
                        onChange={(e) => {
                          const ids = e.target.checked
                            ? [...formData.size_ids, s.id]
                            : formData.size_ids.filter((x) => x !== s.id);
                          setFormData({ ...formData, size_ids: ids });
                        }}
                      />
                      {s.name}
                    </label>
                  );
                })
              )}
            </div>
          </Field>

          <Field label="موجودی انبار">
            <input
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
              className={fieldClass}
            />
          </Field>

          <Field label="تصویر واریانت">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFormData({ ...formData, image: f });
              }}
              className={fieldClass}
            />
            {formData.image_url && !formData.image && (
              <div className="mt-2">
                <img src={formData.image_url} alt="" className="w-16 h-16 rounded-lg object-cover border" />
              </div>
            )}
          </Field>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 rounded text-rose-600"
            />
            <span className="font-bold">فعال</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50 transition shadow-lg shadow-rose-600/20"
            >
              {loading ? "در حال ذخیره..." : "ذخیره واریانت"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}