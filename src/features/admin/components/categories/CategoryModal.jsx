"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const emptyForm = {
  parent: "",
  name: "",
  slug: "",
  description: "",
  image: null,
  season: "all_season",
  style: "all_style",
  min_age: 0,
  max_age: 100,
  gender: "unisex",
  sort_order: 0,
  is_active: true,
  show_in_menu: true,
  is_featured: false,
  is_collection: false,
  code: "",
  icon_name: "",
  theme_color: "blue",
};

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

export default function CategoryModal({
  isOpen,
  onClose,
  editingCategory,
  defaultParent = null,
  categories = [],
  onSuccess,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingCategory) {
      setFormData({
        parent: editingCategory.parent || "",
        name: editingCategory.name || "",
        slug: editingCategory.slug || "",
        description: editingCategory.description || "",
        image: null,
        season: editingCategory.season || "all_season",
        style: editingCategory.style || "all_style",
        min_age: editingCategory.min_age || 0,
        max_age: editingCategory.max_age || 100,
        gender: editingCategory.gender || "unisex",
        sort_order: editingCategory.sort_order || 0,
        is_active: editingCategory.is_active ?? true,
        show_in_menu: editingCategory.show_in_menu ?? true,
        is_featured: editingCategory.is_featured ?? false,
        is_collection: editingCategory.is_collection ?? false,
        code: editingCategory.code || "",
        icon_name: editingCategory.icon_name || "",
        theme_color: editingCategory.theme_color || "blue",
      });
    } else {
      setFormData({
        ...emptyForm,
        parent: defaultParent || "",
      });
    }
  }, [editingCategory, defaultParent, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const parentOptions = (() => {
    const map = {};
    categories.forEach((c) => {
      map[c.id] = { ...c, children: [] };
    });
    const roots = [];
    categories.forEach((c) => {
      if (c.parent && map[c.parent]) map[c.parent].children.push(map[c.id]);
      else roots.push(map[c.id]);
    });
    const out = [];
    const walk = (nodes, depth) => {
      nodes.forEach((n) => {
        if (editingCategory && n.id === editingCategory.id) return;
        out.push({ id: n.id, label: "— ".repeat(depth) + n.name });
        walk(n.children, depth + 1);
      });
    };
    walk(roots, 0);
    return out;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      const appendIf = (k, v) => {
        if (v === "" || v === null || v === undefined) return;
        if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
        else fd.append(k, v);
      };

      [
        "parent",
        "name",
        "slug",
        "description",
        "season",
        "style",
        "min_age",
        "max_age",
        "gender",
        "sort_order",
        "is_active",
        "show_in_menu",
        "is_featured",
        "is_collection",
        "code",
        "icon_name",
        "theme_color",
      ].forEach((k) => {
        appendIf(k, formData[k]);
      });

      if (formData.image instanceof File) fd.append("image", formData.image);

      if (editingCategory) {
        await adminApi.updateCategory(editingCategory.id, fd);
      } else {
        await adminApi.createCategory(fd);
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("Category save error:", err);
      const msg =
        err?.detail || err?.message || (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
      setError(`خطا: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[92vh] flex flex-col border border-admin-border/70">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <h2 className="text-base sm:text-lg font-black text-admin-text tracking-tight">
            {editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
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

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="نام دسته‌بندی *">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={fieldClass}
              />
            </Field>
            <Field label="اسلاگ (اختیاری)">
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label="دسته‌بندی مادر">
            <select
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">— بدون والد (دسته اصلی) —</option>
              {parentOptions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="توضیحات">
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className={fieldClass}
            />
          </Field>

          <Field label="تصویر شاخص">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFormData({ ...formData, image: f });
              }}
              className={fieldClass}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="فصل">
              <select
                name="season"
                value={formData.season}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="spring">بهار</option>
                <option value="summer">تابستان</option>
                <option value="fall">پاییز</option>
                <option value="winter">زمستان</option>
                <option value="all_season">چهار فصل</option>
              </select>
            </Field>
            <Field label="سبک">
              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="casual">کژوال</option>
                <option value="formal">رسمی</option>
                <option value="sport">ورزشی</option>
                <option value="all_style">همه سبک‌ها</option>
              </select>
            </Field>
            <Field label="جنسیت">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="male">مردانه</option>
                <option value="female">زنانه</option>
                <option value="unisex">عمومی</option>
                <option value="kids">بچه‌گانه</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="حداقل سن">
              <input
                type="number"
                name="min_age"
                value={formData.min_age}
                onChange={handleChange}
                className={fieldClass}
              />
            </Field>
            <Field label="حداکثر سن">
              <input
                type="number"
                name="max_age"
                value={formData.max_age}
                onChange={handleChange}
                className={fieldClass}
              />
            </Field>
            <Field label="ترتیب نمایش">
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleChange}
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="کد کوتاه">
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="WIN / CAS"
                className={fieldClass}
              />
            </Field>
            <Field label="نام آیکون Heroicon">
              <input
                type="text"
                name="icon_name"
                value={formData.icon_name}
                onChange={handleChange}
                placeholder="SparklesIcon"
                className={fieldClass}
              />
            </Field>
            <Field label="رنگ تم">
              <select
                name="theme_color"
                value={formData.theme_color}
                onChange={handleChange}
                className={fieldClass}
              >
                <option value="blue">آبی</option>
                <option value="pink">صورتی</option>
                <option value="emerald">زمردی</option>
                <option value="rose">قرمز</option>
                <option value="amber">طلایی</option>
                <option value="cyan">فیروزه‌ای</option>
                <option value="indigo">نیلی</option>
              </select>
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
              />
              <span>فعال</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text">
              <input
                type="checkbox"
                name="show_in_menu"
                checked={formData.show_in_menu}
                onChange={handleChange}
                className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
              />
              <span>نمایش در مگامنو</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-admin-border/70 text-amber-500 focus:ring-amber-500/50"
              />
              <span>محبوب / داغ</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-admin-text">
              <input
                type="checkbox"
                name="is_collection"
                checked={formData.is_collection}
                onChange={handleChange}
                className="w-4 h-4 rounded border-admin-border/70 text-violet-500 focus:ring-violet-500/50"
              />
              <span>کالکشن ویژه</span>
            </label>
          </div>

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
              {loading ? "در حال ذخیره..." : "ذخیره دسته‌بندی"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}