"use client";

import { useState, useEffect } from "react";
import { XMarkIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useProfileContext } from "../hooks/useProfileContext";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-sm">ویرایش اطلاعات شخصی</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors cursor-pointer"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="relative w-20 h-20 rounded-2xl bg-rose-50 border border-rose-100 overflow-hidden flex items-center justify-center group">
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
                <span className="text-xl font-bold text-rose-500">
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
            <span className="text-[11px] text-gray-400">
              کلیک جهت تغییر آواتار
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                نام
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                readOnly
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none cursor-default"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                نام خانوادگی
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                readOnly
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none cursor-default"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              شماره موبایل
            </label>
            <input
              type="text"
              value={profile?.phone || ""}
              readOnly
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none dir-ltr text-left cursor-default"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              پست الکترونیک (ایمیل)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none dir-ltr text-left cursor-default"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              کد ملی
            </label>
            <input
              type="text"
              name="national_id"
              maxLength={10}
              value={formData.national_id}
              onChange={handleChange}
              readOnly
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none dir-ltr text-right cursor-default"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-600 mb-1">
              تاریخ تولد
            </label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date || ""}
              onChange={handleChange}
              readOnly
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none dir-ltr text-right cursor-default"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-rose-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "در حال ثبت..." : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}