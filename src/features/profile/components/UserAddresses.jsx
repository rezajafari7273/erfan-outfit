"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  MapPinIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useProfileContext } from "../hooks/useProfileContext";

export default function UserAddresses() {
  const { addresses, fetchAddresses, createAddress, updateAddress, deleteAddress } = useProfileContext();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    receiver_name: "",
    receiver_phone: "",
    province: "",
    city: "",
    postal_code: "",
    full_address: "",
    is_default: false,
  });

  useEffect(() => {
    if (fetchAddresses) {
      fetchAddresses();
    }
  }, [fetchAddresses]);

  const resetForm = () => {
    setFormData({
      title: "",
      receiver_name: "",
      receiver_phone: "",
      province: "",
      city: "",
      postal_code: "",
      full_address: "",
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
    setFormError("");
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleOpenEdit = (addr) => {
    setFormData({
      title: addr.title || "",
      receiver_name: addr.receiver_name || addr.receiver || "",
      receiver_phone: addr.receiver_phone || addr.phone_number || addr.phone || "",
      province: addr.province || "",
      city: addr.city || "",
      postal_code: addr.postal_code || addr.postalCode || "",
      full_address: addr.full_address || addr.address || "",
      is_default: addr.is_default || addr.isDefault || false,
    });
    setEditingId(addr.id);
    setShowForm(true);
    setFormError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError("");

    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await createAddress(formData);
      }
      resetForm();
    } catch (err) {
      if (err && typeof err === "object") {
        const firstKey = Object.keys(err)[0];
        const val = err[firstKey];
        setFormError(
          Array.isArray(val)
            ? `${firstKey}: ${val[0]}`
            : typeof val === "string"
            ? val
            : "اطلاعات وارد شده نامعتبر است."
        );
      } else {
        setFormError("خطا در ثبت آدرس. لطفا مجددا تلاش کنید.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("آیا از حذف این آدرس اطمینان دارید؟")) {
      try {
        await deleteAddress(id);
      } catch (err) {
        console.error("خطا در حذف آدرس:", err);
      }
    }
  };

  const hasAddresses = addresses && addresses.length > 0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
      {/* هدر بخش آدرس‌ها */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
            <MapPinIcon className="w-5 h-5" />
          </div>
          <h3 className="font-rokh font-bold text-slate-900 text-lg">آدرس‌های ثبت‌شده</h3>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl border border-primary/20 transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            <span>افزودن آدرس جدید</span>
          </button>
        )}
      </div>

      {/* فرم ایجاد و ویرایش آدرس */}
      {showForm && (
        <div className="bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200/60 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <h4 className="font-bold text-slate-800 text-sm">
              {editingId ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold border border-rose-100">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                عنوان آدرس (خانه، محل کار)
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="مثلاً: خانه"
                className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  نام گیرنده
                </label>
                <input
                  type="text"
                  name="receiver_name"
                  required
                  value={formData.receiver_name}
                  onChange={handleChange}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  شماره تماس گیرنده
                </label>
                <input
                  type="text"
                  name="receiver_phone"
                  required
                  value={formData.receiver_phone}
                  onChange={handleChange}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  استان
                </label>
                <input
                  type="text"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="مثلاً: تهران"
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  شهر
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="مثلاً: تهران"
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  کد پستی (۱۰ رقمی)
                </label>
                <input
                  type="text"
                  name="postal_code"
                  maxLength={10}
                  required
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dir-ltr text-right font-fanum"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                نشانی کامل
              </label>
              <textarea
                name="full_address"
                rows={3}
                required
                value={formData.full_address}
                onChange={handleChange}
                placeholder="خیابان، پلاک، واحد..."
                className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="is_default"
                name="is_default"
                checked={formData.is_default}
                onChange={handleChange}
                className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="is_default"
                className="text-xs font-bold text-slate-700 cursor-pointer select-none"
              >
                تنظیم به‌عنوان آدرس پیش‌فرض
              </label>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50 shadow-md shadow-primary/20 cursor-pointer"
              >
                {actionLoading ? "در حال ثبت..." : editingId ? "ویرایش آدرس" : "ذخیره آدرس"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-slate-200/70 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      )}

      {/* حالت لیست خالی */}
      {!hasAddresses && !showForm && (
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200/60 text-center space-y-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto border border-primary/20 shadow-xs">
            <MapPinIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-800 text-xs">هنوز هیچ آدرسی ثبت نکرده‌اید</p>
            <p className="text-[11px] text-slate-400">
              برای ارسال سریع‌تر سفارش‌ها، اولین آدرس خود را ثبت کنید.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-5 py-2.5 rounded-xl shadow-md shadow-primary/20 hover:opacity-90 transition-all cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            <span>افزودن اولین آدرس</span>
          </button>
        </div>
      )}

      {/* نمایش لیست آدرس‌ها */}
      {hasAddresses && (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200/60 space-y-3.5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-slate-900 text-xs">{addr.title}</span>
                  {(addr.is_default || addr.isDefault) && (
                    <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold border border-primary/20">
                      پیش‌فرض
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(addr)}
                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer"
                    title="ویرایش"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {addr.province && addr.city ? `${addr.province}، ${addr.city}، ` : ""}
                {addr.full_address || addr.address}
              </p>

              <div className="pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <span className="font-fanum">
                  کد پستی: {addr.postal_code || addr.postalCode}
                </span>
                <span className="font-fanum">
                  گیرنده: {addr.receiver_name || addr.receiver} (
                  {addr.receiver_phone || addr.phone_number || addr.phone})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}