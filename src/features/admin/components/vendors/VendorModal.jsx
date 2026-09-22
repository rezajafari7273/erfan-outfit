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

export default function VendorModal({ isOpen, onClose, editingVendor, onSuccess }) {
  const [formData, setFormData] = useState({
    store_name: "",
    description: "",
    store_phone: "",
    store_address: "",
    national_id: "",
    logo: null,
    business_license: null,
    is_official: false,
    is_featured: false,
    is_active: true,
    satisfaction_rate: 0,
    performance: "good",
    commission_rate: 0,
    delivery_method: "",
    warranty_text: "",
    kyc_status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    if (editingVendor) {
      setFormData({
        store_name: editingVendor.store_name || "",
        description: editingVendor.description || "",
        store_phone: editingVendor.store_phone || "",
        store_address: editingVendor.store_address || "",
        national_id: editingVendor.national_id || "",
        logo: null,
        business_license: null,
        is_official: editingVendor.is_official ?? false,
        is_featured: editingVendor.is_featured ?? false,
        is_active: editingVendor.is_active ?? true,
        satisfaction_rate: editingVendor.satisfaction_rate || 0,
        performance: editingVendor.performance || "good",
        commission_rate: editingVendor.commission_rate || 0,
        delivery_method: editingVendor.delivery_method || "",
        warranty_text: editingVendor.warranty_text || "",
        kyc_status: editingVendor.kyc_status || "pending",
      });
    } else {
      setFormData({
        store_name: "", description: "", store_phone: "", store_address: "",
        national_id: "", logo: null, business_license: null,
        is_official: false, is_featured: false, is_active: true,
        satisfaction_rate: 0, performance: "good", commission_rate: 0,
        delivery_method: "", warranty_text: "", kyc_status: "pending",
      });
    }
  }, [editingVendor, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      ["store_name", "description", "store_phone", "store_address",
       "national_id", "satisfaction_rate", "performance", "commission_rate",
       "delivery_method", "warranty_text", "kyc_status",
       "is_official", "is_featured", "is_active"].forEach((k) => {
        const v = formData[k];
        if (v === "" || v === null || v === undefined) return;
        if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
        else fd.append(k, v);
      });

      if (formData.logo instanceof File) fd.append("logo", formData.logo);
      if (formData.business_license instanceof File) fd.append("business_license", formData.business_license);

      if (editingVendor) {
        await adminApi.updateVendor(editingVendor.id, fd);
      } else {
        await adminApi.createVendor(fd);
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
            {editingVendor ? "ویرایش فروشنده" : "افزودن فروشنده جدید"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="نام فروشگاه *">
              <input type="text" name="store_name" value={formData.store_name} onChange={handleChange} required className={fieldClass} />
            </Field>
            <Field label="تلفن فروشگاه">
              <input type="text" name="store_phone" value={formData.store_phone} onChange={handleChange} className={fieldClass} />
            </Field>
          </div>

          <Field label="توضیحات">
            <textarea name="description" rows="2" value={formData.description} onChange={handleChange} className={fieldClass} />
          </Field>

          <Field label="آدرس فروشگاه">
            <textarea name="store_address" rows="2" value={formData.store_address} onChange={handleChange} className={fieldClass} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="کد ملی">
              <input type="text" name="national_id" value={formData.national_id} onChange={handleChange} className={fieldClass} />
            </Field>
            <Field label="درصد رضایت">
              <input type="number" step="0.01" name="satisfaction_rate" value={formData.satisfaction_rate} onChange={handleChange} className={fieldClass} />
            </Field>
            <Field label="درصد کمیسیون">
              <input type="number" step="0.01" name="commission_rate" value={formData.commission_rate} onChange={handleChange} className={fieldClass} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="عملکرد">
              <select name="performance" value={formData.performance} onChange={handleChange} className={fieldClass}>
                <option value="excellent">عالی</option>
                <option value="good">خوب</option>
                <option value="average">متوسط</option>
                <option value="poor">ضعیف</option>
              </select>
            </Field>
            <Field label="وضعیت KYC">
              <select name="kyc_status" value={formData.kyc_status} onChange={handleChange} className={fieldClass}>
                <option value="pending">در انتظار بررسی</option>
                <option value="approved">تأیید شده</option>
                <option value="rejected">رد شده</option>
                <option value="suspended">معلق</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="روش تحویل">
              <input type="text" name="delivery_method" value={formData.delivery_method} onChange={handleChange} className={fieldClass} />
            </Field>
            <Field label="متن گارانتی">
              <input type="text" name="warranty_text" value={formData.warranty_text} onChange={handleChange} className={fieldClass} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="لوگو">
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })} className={fieldClass} />
            </Field>
            <Field label="جواز کسب">
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, business_license: e.target.files?.[0] || null })} className={fieldClass} />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-4 h-4 rounded text-rose-600" />
              <span className="font-bold">فعال</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_official" checked={formData.is_official} onChange={handleChange} className="w-4 h-4 rounded text-blue-600" />
              <span className="font-bold">فروشنده رسمی</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 rounded text-amber-500" />
              <span className="font-bold">منتخب</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              انصراف
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50 transition shadow-lg shadow-rose-600/20">
              {loading ? "در حال ذخیره..." : "ذخیره فروشنده"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}