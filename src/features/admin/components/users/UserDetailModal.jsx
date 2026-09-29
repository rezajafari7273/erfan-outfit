"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import {
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  LockClosedIcon,
  LockOpenIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  UserCircleIcon,
  BanknotesIcon,
  GiftIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function UserDetailModal({ isOpen, onClose, user, onUpdated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !user) return;
    setLoading(true);
    adminApi
      .getUserDetail(user.id)
      .then((res) => {
        const d = res?.data !== undefined ? res.data : res;
        setData(d);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleAction = async (action, payload = {}) => {
    try {
      await adminApi.userAction(user.id, action, payload);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("خطا در عملیات");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
              {data?.full_name || data?.phone || "..."}
            </h2>
            {data?.is_locked && (
              <span className="text-[11px] px-2 py-1 rounded-lg font-bold bg-rose-100 text-rose-700">قفل شده</span>
            )}
            {data?.is_superuser && (
              <span className="text-[11px] px-2 py-1 rounded-lg font-bold bg-violet-100 text-violet-700">مدیر ارشد</span>
            )}
            {data?.is_staff && !data?.is_superuser && (
              <span className="text-[11px] px-2 py-1 rounded-lg font-bold bg-blue-100 text-blue-700">کارمند</span>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* Header Info */}
            <div className="flex items-start gap-4">
              {data.profile?.avatar ? (
                <img src={data.profile.avatar} alt="" className="w-20 h-20 rounded-xl object-cover border" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <UserCircleIcon className="w-10 h-10 text-slate-400" />
                </div>
              )}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <PhoneIcon className="w-3 h-3" /> موبایل
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.phone}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <EnvelopeIcon className="w-3 h-3" /> ایمیل
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.email || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">کد ملی</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.profile?.national_id || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">تاریخ عضویت</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                    {new Date(data.date_joined).toLocaleDateString("fa-IR")}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <BanknotesIcon className="w-3 h-3" /> کیف پول
                </div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">
                  {Number(data.wallet_balance || 0).toLocaleString("fa-IR")}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <GiftIcon className="w-3 h-3" /> امتیاز وفاداری
                </div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">
                  {Number(data.loyalty_points || 0).toLocaleString("fa-IR")}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <ShoppingBagIcon className="w-3 h-3" /> سفارشات
                </div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">
                  {Number(data.orders_count || 0).toLocaleString("fa-IR")}
                </div>
              </div>
            </div>

            {/* Body Measurement */}
            {data.body_measurement && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold mb-2">اندازه‌های بدن</div>
                <div className="grid grid-cols-4 gap-2 text-[10px]">
                  {data.body_measurement.height && <div>قد: <b>{data.body_measurement.height}</b></div>}
                  {data.body_measurement.weight && <div>وزن: <b>{data.body_measurement.weight}</b></div>}
                  {data.body_measurement.chest && <div>سینه: <b>{data.body_measurement.chest}</b></div>}
                  {data.body_measurement.waist && <div>کمر: <b>{data.body_measurement.waist}</b></div>}
                  {data.body_measurement.hip && <div>باسن: <b>{data.body_measurement.hip}</b></div>}
                </div>
              </div>
            )}

            {/* Addresses */}
            {data.addresses && data.addresses.length > 0 && (
              <div>
                <div className="text-[10px] text-slate-500 font-bold mb-2 flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" /> آدرس‌ها
                </div>
                <div className="space-y-2">
                  {data.addresses.map((a) => (
                    <div key={a.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{a.title}</span>
                        {a.is_default && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">پیش‌فرض</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {a.province} · {a.city} · {a.full_address}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OTP Log */}
            {data.recent_otps && data.recent_otps.length > 0 && (
              <div>
                <div className="text-[10px] text-slate-500 font-bold mb-2">آخرین کدهای یکبارمصرف</div>
                <div className="space-y-1">
                  {data.recent_otps.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold">{o.code}</span>
                        <span className="text-slate-500">{o.purpose_display}</span>
                        {o.is_used && <span className="text-emerald-600 font-bold">✓</span>}
                      </div>
                      <span className="text-slate-500">
                        {new Date(o.created_at).toLocaleString("fa-IR")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleAction("toggle_active")}
                className={`px-3 py-2 text-[11px] font-bold rounded-lg text-white ${data.is_active ? "bg-slate-600 hover:bg-slate-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
              >
                {data.is_active ? "غیرفعال کردن" : "فعال کردن"}
              </button>
              <button
                onClick={() => handleAction("toggle_staff")}
                className="px-3 py-2 text-[11px] font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                {data.is_staff ? "حذف کارمندی" : "کارمند کردن"}
              </button>
              <button
                onClick={() => handleAction("toggle_superuser")}
                className="px-3 py-2 text-[11px] font-bold rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              >
                {data.is_superuser ? "حذف مدیریت ارشد" : "مدیر ارشد کردن"}
              </button>
              {data.is_locked ? (
                <button
                  onClick={() => handleAction("unlock")}
                  className="px-3 py-2 text-[11px] font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1"
                >
                  <LockOpenIcon className="w-3.5 h-3.5" /> رفع قفل
                </button>
              ) : (
                <button
                  onClick={() => handleAction("lock", { seconds: 3600 })}
                  className="px-3 py-2 text-[11px] font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-1"
                >
                  <LockClosedIcon className="w-3.5 h-3.5" /> قفل ۱ ساعت
                </button>
              )}
              {data.is_2fa_enabled && (
                <button
                  onClick={() => handleAction("reset_2fa")}
                  className="px-3 py-2 text-[11px] font-bold rounded-lg bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-1"
                >
                  <ShieldExclamationIcon className="w-3.5 h-3.5" /> ریست 2FA
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}