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

export default function UserEditModal({ isOpen, onClose, user, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    national_id: "",
    birth_date: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen || !user) return;
    setFetching(true);
    adminApi
      .getUserDetail(user.id)
      .then((res) => {
        const d = res?.data !== undefined ? res.data : res;
        setFormData({
          email: d.email || "",
          first_name: d.profile?.first_name || "",
          last_name: d.profile?.last_name || "",
          national_id: d.profile?.national_id || "",
          birth_date: d.profile?.birth_date || "",
          avatar: null,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setFetching(false));
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v === "" || v === null || v === undefined) return;
        if (v instanceof File) fd.append(k, v);
        else fd.append(k, v);
      });

      await adminApi.updateUser(user.id, fd);
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100">
            ویرایش کاربر {user?.phone}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-rose-100 text-rose-700 text-xs font-bold rounded-xl">{error}</div>}

        {fetching ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <Field label="نام">
                <input type="text" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className={fieldClass} />
              </Field>
              <Field label="نام خانوادگی">
                <input type="text" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className={fieldClass} />
              </Field>
            </div>

            <Field label="ایمیل">
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={fieldClass} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="کد ملی">
                <input type="text" value={formData.national_id} onChange={(e) => setFormData({ ...formData, national_id: e.target.value })} className={fieldClass} />
              </Field>
              <Field label="تاریخ تولد">
                <input type="date" value={formData.birth_date || ""} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} className={fieldClass} />
              </Field>
            </div>

            <Field label="آواتار">
              <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, avatar: e.target.files?.[0] || null })} className={fieldClass} />
            </Field>

            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                انصراف
              </button>
              <button type="submit" disabled={loading} className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 disabled:opacity-50">
                {loading ? "در حال ذخیره..." : "ذخیره"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}