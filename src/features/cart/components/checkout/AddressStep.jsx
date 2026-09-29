"use client";

import { useState, useEffect } from "react";
import {
  MapPinIcon,
  PlusIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useProfileContext } from "@/features/profile/context/ProfileContext";

export default function AddressStep({ onNext, onBack }) {
  const {
    addresses,
    fetchAddresses,
    createAddress,
  } = useProfileContext();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("express");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // دریافت آدرس‌ها هنگام لود کامپوننت
  useEffect(() => {
    if (fetchAddresses) {
      fetchAddresses();
    }
  }, [fetchAddresses]);

  // ست کردن آدرس پیش‌فرض پس از دریافت داده‌ها
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(
        (a) => a.is_default || a.isDefault
      );
      setSelectedAddressId(defaultAddr ? defaultAddr.id : addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

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
    setFormError("");
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError("");

    try {
      const newAddress = await createAddress(formData);
      // در صورت موفقیت، آدرس جدید به‌صورت خودکار انتخاب می‌شود
      if (newAddress && newAddress.id) {
        setSelectedAddressId(newAddress.id);
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

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert("لطفاً یک آدرس را برای ارسال سفارش انتخاب کنید.");
      return;
    }

    const selectedObj = addresses.find((a) => a.id === selectedAddressId);
    onNext({
      selectedAddress: selectedObj,
      shippingMethod,
    });
  };

  const hasAddresses = addresses && addresses.length > 0;

  return (
    <div className="space-y-6 dir-rtl">
      {/* بخش انتخاب آدرس */}
      <div className="border border-rose-100 rounded-3xl p-5 bg-white/80 backdrop-blur-md shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-rose-500" />
            انتخاب آدرس تحویل سفارش
          </h3>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            <span>افزودن آدرس جدید</span>
          </button>
        </div>

        {/* لیست آدرس‌ها */}
        {hasAddresses ? (
          <div className="space-y-3">
            {addresses.map((addr) => {
              const id = addr.id;
              const title = addr.title || "آدرس";
              const receiver = addr.receiver_name || addr.receiver || "";
              const phone =
                addr.receiver_phone || addr.phone_number || addr.phone || "";
              const fullAddress =
                addr.full_address || addr.address || "";
              const postalCode = addr.postal_code || addr.postalCode || "";
              const isDefault = addr.is_default || addr.isDefault;

              return (
                <label
                  key={id}
                  className={`block p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedAddressId === id
                      ? "border-rose-500 bg-rose-50/20 shadow-xs"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="selected_address"
                      checked={selectedAddressId === id}
                      onChange={() => setSelectedAddressId(id)}
                      className="mt-1 text-rose-600 focus:ring-rose-500 cursor-pointer"
                    />
                    <div className="space-y-1 text-xs text-gray-600 flex-1">
                      <div className="font-black text-gray-900 text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{title}</span>
                          {isDefault && (
                            <span className="text-[10px] bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                              پیش‌فرض
                            </span>
                          )}
                        </div>
                        <span className="text-gray-600 font-normal text-xs">
                          {receiver} ({phone})
                        </span>
                      </div>
                      <p className="leading-relaxed font-medium">
                        {addr.province && addr.city
                          ? `${addr.province}، ${addr.city}، `
                          : ""}
                        {fullAddress}
                      </p>
                      <p className="text-gray-500 font-fanum">
                        کد پستی: {postalCode}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        ) : (
          /* در صورت نداشتن هیچ آدرسی */
          <div className="text-center py-8 space-y-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-xs font-bold text-gray-600">
              هنوز آدرسی برای حساب شما ثبت نشده است.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <PlusIcon className="w-4 h-4 stroke-2" />
              <span>ثبت اولین آدرس</span>
            </button>
          </div>
        )}
      </div>

      {/* بخش روش ارسال */}
      <div className="border border-rose-100 rounded-3xl p-5 bg-white/80 backdrop-blur-md shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2 pb-3 border-b border-gray-100">
          <TruckIcon className="w-5 h-5 text-rose-500" />
          روش ارسال
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setShippingMethod("express")}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              shippingMethod === "express"
                ? "border-rose-500 bg-rose-50/20 shadow-xs"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-bold text-xs text-gray-800">
              ارسال پیشتاز (۲ تا ۳ روز کاری)
            </div>
            <div className="text-[11px] text-gray-500 mt-1 font-fanum">
              ۴۹,۰۰۰ تومان
            </div>
          </div>
        </div>
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="outline" onClick={onBack}>
          بازگشت به سبد خرید
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          disabled={!selectedAddressId}
        >
          ادامه و انتخاب روش پرداخت
        </Button>
      </div>

      {/* مودال افزودن آدرس جدید */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl w-full max-w-lg space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-800 text-sm">
                افزودن آدرس جدید
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

            <form onSubmit={handleCreateAddress} className="space-y-3 text-right">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  عنوان آدرس (خانه، محل کار)
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="مثلاً: خانه"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    نام گیرنده
                  </label>
                  <input
                    type="text"
                    name="receiver_name"
                    required
                    value={formData.receiver_name}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    شماره تماس گیرنده
                  </label>
                  <input
                    type="text"
                    name="receiver_phone"
                    required
                    value={formData.receiver_phone}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all dir-ltr text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    استان
                  </label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="مثلاً: تهران"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    شهر
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="مثلاً: تهران"
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    کد پستی (۱۰ رقمی)
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    maxLength={10}
                    required
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition-all dir-ltr text-right font-fanum"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  نشانی کامل
                </label>
                <textarea
                  name="full_address"
                  rows={2}
                  required
                  value={formData.full_address}
                  onChange={handleChange}
                  placeholder="خیابان، پلاک، واحد..."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none resize-none transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal_is_default"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor="modal_is_default"
                  className="text-xs font-bold text-slate-700 cursor-pointer select-none"
                >
                  تنظیم به‌عنوان آدرس پیش‌فرض
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {actionLoading ? "در حال ثبت..." : "ثبت و انتخاب آدرس"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}