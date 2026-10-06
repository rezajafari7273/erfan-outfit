"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const TABS = [
  { key: "main", label: "اطلاعات اصلی" },
  { key: "pricing", label: "قیمت و تخفیف" },
  { key: "services", label: "خدمات" },
  { key: "variants", label: "رنگ و سایز" },
  { key: "attributes", label: "ویژگی‌ها" },
  { key: "images", label: "گالری" },
];

const emptyForm = {
  title: "",
  slug: "",
  brand: "",
  gender_label: "unisex",
  type: "simple",
  category: "",
  vendor: "",
  base_price: "",
  discount_percent: 0,
  short_description: "",
  description: "",
  warranty_text: "",
  delivery_text: "",
  is_active: true,
  is_featured: false,
  services: {
    express_delivery: true,
    support_24_7: true,
    cash_on_delivery: false,
    return_7_days: true,
    authenticity_guarantee: true,
  },
  variants: [],
  attributes: [],
  images: [],
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

// اسکلتون بارگذاری محتوای مدال
function ModalSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse select-none">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-10 bg-admin-border/50 rounded-xl"></div>
        <div className="h-10 bg-admin-border/50 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-10 bg-admin-border/40 rounded-xl"></div>
        <div className="h-10 bg-admin-border/40 rounded-xl"></div>
        <div className="h-10 bg-admin-border/40 rounded-xl"></div>
      </div>
      <div className="h-24 bg-admin-border/40 rounded-xl"></div>
    </div>
  );
}

export default function ProductModal({
  isOpen,
  onClose,
  editingProduct,
  categories = [],
  colors = [],
  sizes = [],
  vendors = [],
  onSuccess,
}) {
  const [activeTab, setActiveTab] = useState("main");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const [newVariant, setNewVariant] = useState({
    color_id: "",
    size_ids: [],
    stock_quantity: 0,
    is_active: true,
    image: null,
    preview: null,
  });
  const [newAttribute, setNewAttribute] = useState({
    key: "",
    value: "",
    is_specification: false,
    sort_order: 0,
  });
  const [newImage, setNewImage] = useState({
    file: null,
    preview: null,
    is_main: false,
    sort_order: 0,
    alt_text: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    if (editingProduct) {
      setFetching(true);
      adminApi
        .getProductById(editingProduct.id)
        .then((data) => {
          const p = data?.data !== undefined ? data.data : data;
          setFormData({
            title: p.title || "",
            slug: p.slug || "",
            brand: p.brand || "",
            gender_label: p.gender_label || "unisex",
            type: p.type || "simple",
            category: p.category || "",
            vendor: p.vendor || "",
            base_price: p.base_price || "",
            discount_percent: p.discount_percent || 0,
            short_description: p.short_description || "",
            description: p.description || "",
            warranty_text: p.warranty_text || "",
            delivery_text: p.delivery_text || "",
            is_active: p.is_active ?? true,
            is_featured: p.is_featured ?? false,
            services: p.services || emptyForm.services,
            variants: (p.variants || []).map((v) => ({
              id: v.id,
              sku: v.sku,
              color_id: v.color?.id || "",
              color_obj: v.color,
              size_ids: (v.sizes || []).map((s) => s.id),
              size_objs: v.sizes || [],
              stock_quantity: v.stock_quantity || 0,
              is_active: v.is_active ?? true,
              image: null,
              image_url: v.image,
            })),
            attributes: p.attributes || [],
            images: (p.images || []).map((img) => ({
              id: img.id,
              file: null,
              file_url: img.file,
              is_main: img.is_main,
              sort_order: img.sort_order,
              alt_text: img.alt_text || "",
            })),
          });
        })
        .catch((err) => {
          console.error(err);
          setError("خطا در بارگذاری اطلاعات محصول");
        })
        .finally(() => setFetching(false));
    } else {
      setFormData(emptyForm);
    }

    setActiveTab("main");
    setError("");
    setNewVariant({ color_id: "", size_ids: [], stock_quantity: 0, is_active: true, image: null, preview: null });
    setNewAttribute({ key: "", value: "", is_specification: false, sort_order: 0 });
    setNewImage({ file: null, preview: null, is_main: false, sort_order: 0, alt_text: "" });
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleServiceChange = (key, value) => {
    setFormData((prev) => ({ ...prev, services: { ...prev.services, [key]: value } }));
  };

  const addVariant = () => {
    if (!newVariant.color_id && newVariant.size_ids.length === 0) {
      alert("حداقل یک رنگ یا سایز انتخاب کنید");
      return;
    }
    const colorObj = colors.find((c) => c.id === Number(newVariant.color_id));
    const sizeObjs = sizes.filter((s) => newVariant.size_ids.includes(s.id));
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          tempId: Date.now(),
          color_id: newVariant.color_id ? Number(newVariant.color_id) : null,
          color_obj: colorObj,
          size_ids: newVariant.size_ids,
          size_objs: sizeObjs,
          stock_quantity: Number(newVariant.stock_quantity) || 0,
          is_active: newVariant.is_active,
          image: newVariant.image,
          preview: newVariant.preview,
        },
      ],
    }));
    setNewVariant({ color_id: "", size_ids: [], stock_quantity: 0, is_active: true, image: null, preview: null });
  };

  const removeVariant = (index) =>
    setFormData((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));

  const addAttribute = () => {
    if (!newAttribute.key || !newAttribute.value) return;
    setFormData((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { ...newAttribute, tempId: Date.now() }],
    }));
    setNewAttribute({ key: "", value: "", is_specification: false, sort_order: 0 });
  };

  const removeAttribute = (index) =>
    setFormData((prev) => ({ ...prev, attributes: prev.attributes.filter((_, i) => i !== index) }));

  const addImage = () => {
    if (!newImage.file) return;
    setFormData((prev) => ({ ...prev, images: [...prev.images, { ...newImage, tempId: Date.now() }] }));
    setNewImage({ file: null, preview: null, is_main: false, sort_order: 0, alt_text: "" });
  };

  const removeImage = (index) =>
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();

      [
        "title",
        "slug",
        "brand",
        "gender_label",
        "type",
        "category",
        "vendor",
        "base_price",
        "discount_percent",
        "short_description",
        "description",
        "warranty_text",
        "delivery_text",
        "is_active",
        "is_featured",
      ].forEach((k) => {
        const v = formData[k];
        if (v === "" || v === null || v === undefined) return;
        if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
        else fd.append(k, v);
      });

      Object.entries(formData.services || {}).forEach(([k, v]) => {
        fd.append(`services.${k}`, v ? "true" : "false");
      });

      formData.variants.forEach((v, i) => {
        if (v.id) fd.append(`variants[${i}].id`, v.id);
        if (v.color_id) fd.append(`variants[${i}].color_id`, v.color_id);
        (v.size_ids || []).forEach((sid) => fd.append(`variants[${i}].size_ids`, sid));
        fd.append(`variants[${i}].stock_quantity`, v.stock_quantity);
        fd.append(`variants[${i}].is_active`, v.is_active ? "true" : "false");
        if (v.image instanceof File) fd.append(`variants[${i}].image`, v.image);
      });

      formData.attributes.forEach((a, i) => {
        if (a.id) fd.append(`attributes[${i}].id`, a.id);
        fd.append(`attributes[${i}].key`, a.key);
        fd.append(`attributes[${i}].value`, a.value);
        fd.append(`attributes[${i}].is_specification`, a.is_specification ? "true" : "false");
        fd.append(`attributes[${i}].sort_order`, a.sort_order);
      });

      formData.images.forEach((img, i) => {
        if (img.id) fd.append(`images[${i}].id`, img.id);
        if (img.file instanceof File) fd.append(`images[${i}].file`, img.file);
        fd.append(`images[${i}].is_main`, img.is_main ? "true" : "false");
        fd.append(`images[${i}].sort_order`, img.sort_order);
        if (img.alt_text) fd.append(`images[${i}].alt_text`, img.alt_text);
      });

      if (editingProduct) {
        await adminApi.updateProduct(editingProduct.id, fd);
      } else {
        await adminApi.createProduct(fd);
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error("Save Product Error:", err);
      const msg =
        err?.detail || err?.message || (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
      setError(`خطا در ذخیره‌سازی: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl p-6 relative max-h-[92vh] flex flex-col border border-admin-border/70">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <h2 className="text-base sm:text-lg font-black text-admin-text tracking-tight">
            {editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
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

        {fetching ? (
          <ModalSkeleton />
        ) : (
          <>
            {/* تب‌ها */}
            <div className="flex gap-2 border-b border-admin-border/70 pb-3 mb-4 text-xs font-bold overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                    activeTab === t.key
                      ? "bg-admin-primary text-white shadow-md shadow-admin-primary/20"
                      : "bg-admin-background text-admin-text-muted hover:text-admin-text"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {activeTab === "main" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="عنوان محصول *">
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Field label="دسته‌بندی *">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className={fieldClass}
                      >
                        <option value="">انتخاب کنید...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="فروشنده *">
                      <select
                        name="vendor"
                        value={formData.vendor}
                        onChange={handleChange}
                        required
                        className={fieldClass}
                      >
                        <option value="">انتخاب کنید...</option>
                        {vendors.map((v) => (
                          <option key={v.id} value={v.user || v.id}>
                            {v.store_name || v.user_phone || v.id}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="برند">
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="جنسیت">
                      <select
                        name="gender_label"
                        value={formData.gender_label}
                        onChange={handleChange}
                        className={fieldClass}
                      >
                        <option value="unisex">مشترک</option>
                        <option value="male">مردانه</option>
                        <option value="female">زنانه</option>
                        <option value="kids">بچه‌گانه</option>
                      </select>
                    </Field>
                    <Field label="نوع محصول">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={fieldClass}
                      >
                        <option value="simple">ساده</option>
                        <option value="variable">دارای متغیر</option>
                        <option value="set_package">پک / ست</option>
                        <option value="digital">دیجیتال</option>
                        <option value="preorder">پیش‌خرید</option>
                        <option value="custom_tailoring">شخصی‌دوزی</option>
                        <option value="limited_edition">نسخه محدود</option>
                        <option value="subscription_box">اشتراک دوره‌ای</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="توضیح کوتاه">
                    <textarea
                      name="short_description"
                      rows="2"
                      value={formData.short_description}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="توضیح کامل">
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="متن گارانتی">
                      <input
                        type="text"
                        name="warranty_text"
                        value={formData.warranty_text}
                        onChange={handleChange}
                        className={fieldClass}
                      />
                    </Field>
                    <Field label="متن نحوه ارسال">
                      <input
                        type="text"
                        name="delivery_text"
                        value={formData.delivery_text}
                        onChange={handleChange}
                        className={fieldClass}
                      />
                    </Field>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
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
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-admin-border/70 text-amber-500 focus:ring-amber-500/50"
                      />
                      <span>پیشنهاد ویژه</span>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="قیمت پایه (تومان) *">
                    <input
                      type="number"
                      name="base_price"
                      value={formData.base_price}
                      onChange={handleChange}
                      required
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="درصد تخفیف (0-100)">
                    <input
                      type="number"
                      name="discount_percent"
                      min="0"
                      max="100"
                      value={formData.discount_percent}
                      onChange={handleChange}
                      className={fieldClass}
                    />
                  </Field>
                </div>
              )}

              {activeTab === "services" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries({
                    express_delivery: "تحویل اکسپرس",
                    support_24_7: "پشتیبانی ۲۴/۷",
                    cash_on_delivery: "پرداخت در محل",
                    return_7_days: "۷ روز ضمانت بازگشت",
                    authenticity_guarantee: "ضمانت اصالت",
                  }).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2.5 p-3.5 border border-admin-border/70 rounded-xl cursor-pointer bg-admin-background/50 hover:bg-admin-background transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services?.[key] ?? false}
                        onChange={(e) => handleServiceChange(key, e.target.checked)}
                        className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
                      />
                      <span className="font-bold text-admin-text">{label}</span>
                    </label>
                  ))}
                </div>
              )}

              {activeTab === "variants" && (
                <div className="space-y-4">
                  <div className="p-4 border border-admin-border/70 rounded-xl space-y-3 bg-admin-background/40">
                    <h3 className="font-black text-admin-text">افزودن واریانت (رنگ + سایز)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="رنگ">
                        <select
                          value={newVariant.color_id}
                          onChange={(e) =>
                            setNewVariant({ ...newVariant, color_id: e.target.value })
                          }
                          className={fieldClass}
                        >
                          <option value="">—</option>
                          {colors.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.hex_code})
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="موجودی">
                        <input
                          type="number"
                          value={newVariant.stock_quantity}
                          onChange={(e) =>
                            setNewVariant({ ...newVariant, stock_quantity: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="تصویر واریانت">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f)
                              setNewVariant({
                                ...newVariant,
                                image: f,
                                preview: URL.createObjectURL(f),
                              });
                          }}
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <Field label="سایزها">
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((s) => {
                          const checked = newVariant.size_ids.includes(s.id);
                          return (
                            <label
                              key={s.id}
                              className={`px-3 py-1.5 rounded-xl border cursor-pointer font-bold transition ${
                                checked
                                  ? "bg-admin-primary text-white border-admin-primary"
                                  : "bg-admin-surface border-admin-border/70 text-admin-text-muted"
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={checked}
                                onChange={(e) => {
                                  const ids = e.target.checked
                                    ? [...newVariant.size_ids, s.id]
                                    : newVariant.size_ids.filter((x) => x !== s.id);
                                  setNewVariant({ ...newVariant, size_ids: ids });
                                }}
                              />
                              {s.name}
                            </label>
                          );
                        })}
                      </div>
                    </Field>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-xl font-bold hover:opacity-90 transition"
                    >
                      <PlusIcon className="w-4 h-4" /> افزودن واریانت
                    </button>
                  </div>

                  {formData.variants.length > 0 && (
                    <div className="space-y-2">
                      {formData.variants.map((v, i) => (
                        <div
                          key={v.id || v.tempId}
                          className="flex items-center gap-3 p-3 border border-admin-border/70 rounded-xl bg-admin-surface"
                        >
                          {v.preview || v.image_url ? (
                            <img
                              src={v.preview || v.image_url}
                              alt=""
                              className="w-12 h-12 rounded-xl object-cover border border-admin-border/50"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-admin-border/40" />
                          )}
                          <div className="flex-1">
                            <div className="font-bold text-admin-text">
                              {v.color_obj?.name || "—"}
                              {v.sku && (
                                <span className="text-admin-text-muted mr-2">[{v.sku}]</span>
                              )}
                            </div>
                            <div className="text-admin-text-muted mt-1">
                              {(v.size_objs?.map((s) => s.name) || []).join("، ") || "—"} ·
                              موجودی: {v.stock_quantity}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVariant(i)}
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "attributes" && (
                <div className="space-y-4">
                  <div className="p-4 border border-admin-border/70 rounded-xl space-y-3 bg-admin-background/40">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="عنوان ویژگی">
                        <input
                          type="text"
                          value={newAttribute.key}
                          onChange={(e) =>
                            setNewAttribute({ ...newAttribute, key: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="مقدار">
                        <input
                          type="text"
                          value={newAttribute.value}
                          onChange={(e) =>
                            setNewAttribute({ ...newAttribute, value: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="ترتیب">
                        <input
                          type="number"
                          value={newAttribute.sort_order}
                          onChange={(e) =>
                            setNewAttribute({ ...newAttribute, sort_order: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 font-bold text-admin-text">
                      <input
                        type="checkbox"
                        checked={newAttribute.is_specification}
                        onChange={(e) =>
                          setNewAttribute({ ...newAttribute, is_specification: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
                      />
                      <span>در جدول مشخصات فنی نمایش داده شود</span>
                    </label>
                    <button
                      type="button"
                      onClick={addAttribute}
                      className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-xl font-bold hover:opacity-90 transition"
                    >
                      <PlusIcon className="w-4 h-4" /> افزودن ویژگی
                    </button>
                  </div>

                  {formData.attributes.length > 0 && (
                    <div className="space-y-2">
                      {formData.attributes.map((a, i) => (
                        <div
                          key={a.id || a.tempId}
                          className="flex items-center gap-3 p-3 border border-admin-border/70 rounded-xl bg-admin-surface"
                        >
                          <div className="flex-1">
                            <div className="font-bold text-admin-text">{a.key}</div>
                            <div className="text-admin-text-muted mt-1">
                              {a.value}
                              {a.is_specification && " · مشخصات فنی"}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttribute(i)}
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "images" && (
                <div className="space-y-4">
                  <div className="p-4 border border-admin-border/70 rounded-xl space-y-3 bg-admin-background/40">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="فایل تصویر *">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f)
                              setNewImage({ ...newImage, file: f, preview: URL.createObjectURL(f) });
                          }}
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="متن جایگزین (alt)">
                        <input
                          type="text"
                          value={newImage.alt_text}
                          onChange={(e) =>
                            setNewImage({ ...newImage, alt_text: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="ترتیب">
                        <input
                          type="number"
                          value={newImage.sort_order}
                          onChange={(e) =>
                            setNewImage({ ...newImage, sort_order: e.target.value })
                          }
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 font-bold text-admin-text">
                      <input
                        type="checkbox"
                        checked={newImage.is_main}
                        onChange={(e) =>
                          setNewImage({ ...newImage, is_main: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-admin-border/70 text-admin-primary focus:ring-admin-primary/50"
                      />
                      <span>تصویر اصلی</span>
                    </label>
                    <button
                      type="button"
                      onClick={addImage}
                      className="flex items-center gap-2 px-4 py-2 bg-admin-primary text-white rounded-xl font-bold hover:opacity-90 transition"
                    >
                      <PlusIcon className="w-4 h-4" /> افزودن تصویر
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {formData.images.map((img, i) => (
                        <div key={img.id || img.tempId} className="relative group">
                          <img
                            src={img.preview || img.file_url}
                            alt=""
                            className="w-full aspect-square object-cover rounded-xl border border-admin-border/70"
                          />
                          {img.is_main && (
                            <span className="absolute top-1 right-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              اصلی
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute top-1 left-1 p-1 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                          >
                            <TrashIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                  {loading ? "در حال ذخیره..." : "ذخیره محصول"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}