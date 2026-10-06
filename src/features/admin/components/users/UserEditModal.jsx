"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon } from "@heroicons/react/24/outline";

const fieldClass =
  "w-full px-3.5 py-2.5 border border-admin-border/70 rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/50 font-bold";

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
      const msg =
        err?.detail ||
        err?.message ||
        (typeof err === "object" ? JSON.stringify(err) : "خطای نامشخص");
      setError(`خطا: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-lg p-6 relative border border-admin-border/70">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <h2 className="text-base font-black text-admin-text tracking-tight">
            ویرایش کاربر <span className="font-mono">{user?.phone}</span>
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
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            در حال بارگذاری اطلاعات...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <Field label="نام">
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="نام خانوادگی">
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="ایمیل">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={fieldClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="کد ملی">
                <input
                  type="text"
                  value={formData.national_id}
                  onChange={(e) =>
                    setFormData({ ...formData, national_id: e.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
              <Field label="تاریخ تولد">
                <input
                  type="date"
                  value={formData.birth_date || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, birth_date: e.target.value })
                  }
                  className={fieldClass}
                />
              </Field>
            </div>

            <Field label="تصویر آواتار">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    avatar: e.target.files?.[0] || null,
                  })
                }
                className={fieldClass}
              />
            </Field>

            <div className="flex justify-end gap-2 pt-4 mt-4 border-t border-admin-border/70">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-admin-border/70 text-admin-text-muted hover:text-admin-text hover:bg-admin-background font-bold transition"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-admin-primary text-white font-bold hover:opacity-90 disabled:opacity-50 transition shadow-md shadow-admin-primary/20"
              >
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}