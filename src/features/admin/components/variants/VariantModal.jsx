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

function ModalSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-10 bg-admin-border/40 rounded-xl" />
      <div className="h-24 bg-admin-border/40 rounded-2xl" />
      <div className="h-10 bg-admin-border/40 rounded-xl" />
      <div className="h-10 bg-admin-border/40 rounded-xl" />
    </div>
  );
}

export default function VariantModal({
  isOpen,
  onClose,
  editingVariant,
  colors = [],
  sizes = [],
  catalogLoading = false,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    color_id: "",
    size_ids: [],
    stock_quantity: 0,
    is_active: true,
    image: null,
    image_url: "",
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
        image_url: editingVariant.image || "",
      });
    } else {
      setFormData({
        color_id: "",
        size_ids: [],
        stock_quantity: 0,
        is_active: true,
        image: null,
        image_url: "",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border/70 max-h-[92vh] flex flex-col">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <h2 className="text-base font-black text-admin-text tracking-tight">
            {editingVariant ? "ویرایش واریانت" : "افزودن واریانت جدید"}
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

        {catalogLoading ? (
          <ModalSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto space-y-4 text-xs pr-1"
          >
            {/* انتخاب رنگ */}
            <Field label="انتخاب رنگ">
              <select
                value={formData.color_id}
                onChange={(e) =>
                  setFormData({ ...formData, color_id: e.target.value })
                }
                className={fieldClass}
              >
                <option value="">— بدون رنگ اختصاصی —</option>
                {colors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.hex_code})
                  </option>
                ))}
              </select>
            </Field>

            {/* انتخاب چیپسی سایزها */}
            <Field label="سایزهای اختصاص‌یافته">
              <div className="flex flex-wrap gap-2 p-3 border border-admin-border/70 rounded-2xl bg-admin-background/50 max-h-36 overflow-y-auto">
                {sizes.length === 0 ? (
                  <span className="text-admin-text-muted font-bold">
                    سایزی در سیستم تعریف نشده است.
                  </span>
                ) : (
                  sizes.map((s) => {
                    const checked = formData.size_ids.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer transition-all ${
                          checked
                            ? "bg-admin-primary text-white border-admin-primary shadow-md shadow-admin-primary/20"
                            : "bg-admin-surface border-admin-border/70 text-admin-text-muted hover:text-admin-text hover:border-admin-border"
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

            {/* موجودی انبار */}
            <Field label="موجودی موجود در انبار">
              <input
                type="number"
                value={formData.stock_quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock_quantity: Number(e.target.value),
                  })
                }
                className={fieldClass}
              />
            </Field>

            {/* آپلود تصویر */}
            <Field label="تصویر اختصاصی واریانت">
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
                <div className="mt-3 flex items-center gap-3 p-2 bg-admin-background rounded-2xl border border-admin-border/70">
                  <img
                    src={formData.image_url}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover border border-admin-border/50 shrink-0"
                  />
                  <span className="text-[11px] font-bold text-admin-text-muted">
                    تصویر فعلی واریانت
                  </span>
                </div>
              )}
            </Field>

            {/* وضعیت فعال */}
            <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text pt-1">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
              />
              <span>فعال و قابل سفارش</span>
            </label>

            {/* دکمه‌های اکشن */}
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
                {loading ? "در حال ذخیره..." : "ذخیره واریانت"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}