"use client";

import { useState, useEffect } from "react";
import {
  XMarkIcon,
  CameraIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { useProfileContext } from "../hooks/useProfileContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveAvatar(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

export default function UserProfileEditModal({ isOpen, onClose }) {
  const { profile, updateProfile, loading } = useProfileContext();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    national_id: "",
    birth_date: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isOpen && profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        national_id: profile.national_id || "",
        birth_date: profile.birth_date || "",
      });
      setPreviewAvatar(resolveAvatar(profile.avatar));
      setAvatarFile(null);
      setFormError("");
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    try {
      let payload;

      if (avatarFile) {
        const data = new FormData();
        Object.keys(formData).forEach((k) => {
          if (formData[k] !== "" && formData[k] !== null && formData[k] !== undefined) {
            data.append(k, formData[k]);
          }
        });
        data.append("avatar", avatarFile);
        payload = data;
      } else {
        const cleanData = { ...formData };
        Object.keys(cleanData).forEach((k) => {
          if (cleanData[k] === "" || cleanData[k] === null || cleanData[k] === undefined) {
            delete cleanData[k];
          }
        });
        payload = cleanData;
      }

      await updateProfile(payload);
      onClose();
    } catch (err) {
      if (err && typeof err === "object") {
        const firstKey = Object.keys(err)[0];
        const val = err[firstKey];
        setFormError(
          Array.isArray(val)
            ? val[0]
            : typeof val === "string"
            ? val
            : "اطلاعات ارسالی نامعتبر است."
        );
      } else {
        setFormError("خطا در به‌روزرسانی اطلاعات.");
      }
    }
  };

  // کلاس مشترک برای افزایش ارتفاع و بهبود پدینگ تمام اینپوت‌ها
  const inputHeightClass = "py-3 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-5" dir="rtl">
        {/* هدر مدال */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">ویرایش اطلاعات شخصی</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* بخش آواتار */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-20 h-20 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center group shadow-xs">
              {previewAvatar ? (
                <img
                  src={previewAvatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xl font-bold text-indigo-600">
                  {formData.first_name ? formData.first_name[0] : "؟"}
                </span>
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                <CameraIcon className="w-6 h-6" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              کلیک جهت تغییر آواتار
            </span>
          </div>

          {/* نام و نام خانوادگی */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="نام"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="نام"
              startIcon={UserIcon}
              className={inputHeightClass}
            />

            <Input
              label="نام خانوادگی"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="نام خانوادگی"
              startIcon={UserIcon}
              className={inputHeightClass}
            />
          </div>

          {/* شماره موبایل (غیرقابل تغییر) */}
          <Input
            label="شماره موبایل (غیرقابل تغییر)"
            type="text"
            value={profile?.phone || profile?.phone_number || ""}
            disabled
            startIcon={PhoneIcon}
            className={`${inputHeightClass} font-fanum text-left dir-ltr`}
          />

          {/* پست الکترونیک */}
          <Input
            label="پست الکترونیک (ایمیل)"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            startIcon={EnvelopeIcon}
            className={`${inputHeightClass} text-left dir-ltr`}
          />

          {/* کد ملی (قابل ویرایش) */}
          <Input
            label="کد ملی"
            type="text"
            name="national_id"
            maxLength={10}
            value={formData.national_id}
            onChange={handleChange}
            placeholder="کد ملی ۱۰ رقمی"
            startIcon={IdentificationIcon}
            className={`${inputHeightClass}  font-fanum text-right dir-ltr`}
          />

          {/* تاریخ تولد */}
          <Input
            label="تاریخ تولد"
            type="date"
            name="birth_date"
            value={formData.birth_date || ""}
            onChange={handleChange}
            startIcon={CalendarIcon}
            className={`${inputHeightClass} font-fanum text-right dir-ltr`}
          />

          {/* دکمه‌های اقدام */}
          <div className="pt-2 flex gap-2">
            <Button
              type="submit"
              variant="gradient"
              size="md"
              loading={loading}
              className="flex-1"
            >
              ذخیره تغییرات
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
            >
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}