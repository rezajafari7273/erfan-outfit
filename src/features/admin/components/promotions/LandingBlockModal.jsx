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

function LandingBlockSkeleton() {
  return (
    <div className="space-y-4 animate-pulse p-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
        <div className="h-9 bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 bg-admin-border/30 rounded-xl"></div>
        <div className="h-20 bg-admin-border/30 rounded-xl"></div>
      </div>
    </div>
  );
}

const BLOCK_TYPES = [
  { value: "heroBanner", label: "هیرو بنر" },
  { value: "productSlider", label: "اسلایدر محصولات" },
  { value: "bannerGrid", label: "گرید بنر" },
];

export default function LandingBlockModal({
  isOpen,
  onClose,
  editingItem,
  landingId,
  categories = [],
  products = [],
  onSuccess,
}) {
  const [form, setForm] = useState({
    landing: landingId || "",
    block_type: "heroBanner",
    order: 0,
    title: "",
    subtitle: "",
    button_text: "",
    button_link: "",
    more_link: "",
    product_limit: 10,
    product_ids: "",
    filter_category: "",
    filter_has_discount: false,
    image: null,
    video: null,
    image_url: null,
    video_url: null,
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
        .getLandingBlockById(editingItem.id)
        .then((res) => {
          const d = res?.data !== undefined ? res.data : res;
          setForm({
            landing: d.landing || landingId || "",
            block_type: d.block_type || "heroBanner",
            order: d.order || 0,
            title: d.title || "",
            subtitle: d.subtitle || "",
            button_text: d.button_text || "",
            button_link: d.button_link || "",
            more_link: d.more_link || "",
            product_limit: d.product_limit || 10,
            product_ids: (d.product_ids || []).join(","),
            filter_category: d.filter_category || "",
            filter_has_discount: d.filter_has_discount || false,
            image: null,
            video: null,
            image_url: d.image_url,
            video_url: d.video_url,
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setFetching(false));
    } else {
      setForm({
        landing: landingId || "",
        block_type: "heroBanner",
        order: 0,
        title: "",
        subtitle: "",
        button_text: "",
        button_link: "",
        more_link: "",
        product_limit: 10,
        product_ids: "",
        filter_category: "",
        filter_has_discount: false,
        image: null,
        video: null,
        image_url: null,
        video_url: null,
      });
    }
  }, [editingItem, isOpen, landingId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("landing", form.landing);
      fd.append("block_type", form.block_type);
      fd.append("order", form.order);

      if (form.title) fd.append("title", form.title);
      if (form.subtitle) fd.append("subtitle", form.subtitle);
      if (form.button_text) fd.append("button_text", form.button_text);
      if (form.button_link) fd.append("button_link", form.button_link);
      if (form.more_link) fd.append("more_link", form.more_link);
      if (form.product_limit) fd.append("product_limit", form.product_limit);

      if (form.product_ids) {
        form.product_ids
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
          .forEach((id) => fd.append("product_ids", id));
      }

      if (form.filter_category) fd.append("filter_category", form.filter_category);
      if (form.filter_has_discount) fd.append("filter_has_discount", "true");

      if (form.image instanceof File) fd.append("image", form.image);
      if (form.video instanceof File) fd.append("video", form.video);

      if (editingItem) {
        await adminApi.updateLandingBlock(editingItem.id, fd);
      } else {
        await adminApi.createLandingBlock(fd);
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
      <div className="bg-admin-surface text-admin-text rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[92vh] flex flex-col border border-admin-border">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border">
          <h2 className="text-base font-black text-admin-text">
            {editingItem ? "ویرایش بلاک" : "افزودن بلاک جدید"}
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

        {fetching || loading ? (
          <LandingBlockSkeleton />
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
            <div className="grid grid-cols-2 gap-3">
              <Field label="نوع بلاک *">
                <select
                  value={form.block_type}
                  onChange={(e) => setForm({ ...form, block_type: e.target.value })}
                  required
                  className={fieldClass}
                >
                  {BLOCK_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
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

            <Field label="عنوان بلاک">
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

            <div className="grid grid-cols-2 gap-3">
              <Field label="متن دکمه">
                <input
                  type="text"
                  value={form.button_text}
                  onChange={(e) => setForm({ ...form, button_text: e.target.value })}
                  className={fieldClass}
                />
              </Field>
              <Field label="لینک دکمه">
                <input
                  type="url"
                  value={form.button_link}
                  onChange={(e) => setForm({ ...form, button_link: e.target.value })}
                  className={fieldClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="لینک مشاهده همه">
                <input
                  type="text"
                  value={form.more_link}
                  onChange={(e) => setForm({ ...form, more_link: e.target.value })}
                  placeholder="/products?category=x"
                  className={fieldClass}
                />
              </Field>
              <Field label="تعداد نمایش اسلایدر">
                <input
                  type="number"
                  value={form.product_limit}
                  onChange={(e) => setForm({ ...form, product_limit: Number(e.target.value) })}
                  className={fieldClass}
                />
              </Field>
            </div>

            {form.block_type === "productSlider" && (
              <div className="p-3 border border-admin-border rounded-xl space-y-3 bg-admin-background">
                <h4 className="text-[11px] font-black text-admin-text">فیلتر اسلایدر</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="دسته‌بندی">
                    <select
                      value={form.filter_category}
                      onChange={(e) => setForm({ ...form, filter_category: e.target.value })}
                      className={fieldClass}
                    >
                      <option value="">همه</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="محصولات خاص (IDs)">
                    <input
                      type="text"
                      value={form.product_ids}
                      onChange={(e) => setForm({ ...form, product_ids: e.target.value })}
                      placeholder="12,15,20"
                      className={fieldClass}
                    />
                  </Field>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-admin-text">
                  <input
                    type="checkbox"
                    checked={form.filter_has_discount}
                    onChange={(e) => setForm({ ...form, filter_has_discount: e.target.checked })}
                    className="w-4 h-4 rounded accent-admin-primary"
                  />
                  <span className="font-bold">فقط محصولات تخفیف‌دار</span>
                </label>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Field label="تصویر">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                  className={fieldClass}
                />
                {form.image_url && (
                  <img src={form.image_url} alt="" className="mt-2 h-16 rounded-lg border border-admin-border object-cover" />
                )}
              </Field>
              <Field label="ویدیو (اختیاری)">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setForm({ ...form, video: e.target.files?.[0] || null })}
                  className={fieldClass}
                />
                {form.video_url && (
                  <p className="mt-2 text-[10px] text-admin-text-muted">ویدیو فعلی دارد</p>
                )}
              </Field>
            </div>

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