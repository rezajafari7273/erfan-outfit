"use client";

import { useState, useEffect } from "react";
import { PlusIcon, MapPinIcon, TrashIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

  // فراخوانی مجدد آدرس‌ها در زمان Mount شدن کامپوننت
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
    <div className="space-y-4">
      {/* هدر بخش آدرس‌ها */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-rokh font-black text-gray-900 text-base">آدرس‌های ثبت‌شده</h3>
        {!showForm && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 text-xs font-bold text-primary bg-rose-50 px-3 py-2 rounded-xl border border-rose-100 hover:bg-rose-100/70 transition-all cursor-pointer outline-none select-none"
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            <span>افزودن آدرس جدید</span>
          </button>
        )}
      </div>

      {/* فرم ایجاد و ویرایش آدرس */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="font-bold text-gray-800 text-xs">
              {editingId ? "ویرایش آدرس" : "افزودن آدرس جدید"}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">عنوان آدرس (خانه، محل کار)</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="مثلاً: خانه"
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">نام گیرنده</label>
                <input
                  type="text"
                  name="receiver_name"
                  required
                  value={formData.receiver_name}
                  onChange={handleChange}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">شماره تماس گیرنده</label>
                <input
                  type="text"
                  name="receiver_phone"
                  required
                  value={formData.receiver_phone}
                  onChange={handleChange}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none dir-ltr text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">استان</label>
                <input
                  type="text"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="مثلاً: تهران"
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">شهر</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="مثلاً: تهران"
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">کد پستی (۱۰ رقمی)</label>
                <input
                  type="text"
                  name="postal_code"
                  maxLength={10}
                  required
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none dir-ltr text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">نشانی کامل</label>
              <textarea
                name="full_address"
                rows={3}
                required
                value={formData.full_address}
                onChange={handleChange}
                placeholder="خیابان، پلاک، واحد..."
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:border-rose-500 outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="is_default"
                name="is_default"
                checked={formData.is_default}
                onChange={handleChange}
                className="rounded text-rose-500 focus:ring-rose-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="is_default" className="text-xs font-bold text-gray-700 cursor-pointer">
                تنظیم به‌عنوان آدرس پیش‌فرض
              </label>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="submit"
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-rose-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {actionLoading ? "در حال ثبت..." : editingId ? "ویرایش آدرس" : "ذخیره آدرس"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      )}

      {/* حالت لیست خالی */}
      {!hasAddresses && !showForm && (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
            <MapPinIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-800 text-xs">هنوز هیچ آدرسی ثبت نکرده‌اید</p>
            <p className="text-[11px] text-gray-400">برای ارسال سریع‌تر سفارش‌ها، اولین آدرس خود را ثبت کنید.</p>
          </div>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-5 py-2.5 rounded-xl shadow-xs hover:bg-rose-700 transition-all cursor-pointer outline-none"
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            <span>افزودن اولین آدرس</span>
          </button>
        </div>
      )}

      {/* نمایش لیست آدرس‌ها */}
      {hasAddresses &&
        addresses.map((addr) => (
          <div key={addr.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-rose-500" />
                <span className="font-bold text-gray-800 text-xs">{addr.title}</span>
                {(addr.is_default || addr.isDefault) && (
                  <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                    پیش‌فرض
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(addr)}
                  className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer outline-none"
                  title="ویرایش"
                >
                  <PencilSquareIcon className="w-4 h-4 stroke-1.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer outline-none"
                  title="حذف"
                >
                  <TrashIcon className="w-4 h-4 stroke-1.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              {addr.province && addr.city ? `${addr.province}، ${addr.city}، ` : ""}
              {addr.full_address || addr.address}
            </p>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>کد پستی: {addr.postal_code || addr.postalCode}</span>
              <span>
                گیرنده: {addr.receiver_name || addr.receiver} ({addr.receiver_phone || addr.phone_number || addr.phone})
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}