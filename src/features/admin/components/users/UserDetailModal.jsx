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
  ShieldExclamationIcon,
  UserCircleIcon,
  BanknotesIcon,
  GiftIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

function UserDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse select-none">
      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 bg-admin-border/40 rounded-2xl shrink-0" />
        <div className="grid grid-cols-2 gap-3 flex-1">
          <div className="h-8 bg-admin-border/40 rounded-xl" />
          <div className="h-8 bg-admin-border/40 rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-16 bg-admin-border/40 rounded-2xl" />
        <div className="h-16 bg-admin-border/40 rounded-2xl" />
        <div className="h-16 bg-admin-border/40 rounded-2xl" />
      </div>
      <div className="h-24 bg-admin-border/40 rounded-2xl" />
    </div>
  );
}

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

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[92vh] flex flex-col border border-admin-border/70">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-admin-text tracking-tight">
              {data?.full_name || data?.phone || "..."}
            </h2>
            {data?.is_locked && (
              <span className="text-[11px] px-2.5 py-1 rounded-xl font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                قفل شده
              </span>
            )}
            {data?.is_superuser && (
              <span className="text-[11px] px-2.5 py-1 rounded-xl font-bold bg-violet-500/10 text-violet-500 border border-violet-500/20">
                مدیر ارشد
              </span>
            )}
            {data?.is_staff && !data?.is_superuser && (
              <span className="text-[11px] px-2.5 py-1 rounded-xl font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                کارمند
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-admin-text-muted hover:text-admin-text hover:bg-admin-background transition"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <UserDetailSkeleton />
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* اطلاعات پایه کاربر */}
            <div className="flex items-start gap-4 p-4 bg-admin-background/50 rounded-2xl border border-admin-border/60">
              {data.profile?.avatar ? (
                <img
                  src={data.profile.avatar}
                  alt=""
                  className="w-20 h-20 rounded-2xl object-cover border border-admin-border/70 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-admin-surface border border-admin-border/70 flex items-center justify-center shrink-0">
                  <UserCircleIcon className="w-10 h-10 text-admin-text-muted" />
                </div>
              )}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold flex items-center gap-1">
                    <PhoneIcon className="w-3 h-3" /> موبایل
                  </div>
                  <div className="font-bold text-admin-text mt-0.5 dir-ltr text-right font-mono">
                    {data.phone}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold flex items-center gap-1">
                    <EnvelopeIcon className="w-3 h-3" /> ایمیل
                  </div>
                  <div className="font-bold text-admin-text mt-0.5">
                    {data.email || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    کد ملی
                  </div>
                  <div className="font-bold text-admin-text mt-0.5 font-mono">
                    {data.profile?.national_id || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    تاریخ عضویت
                  </div>
                  <div className="font-bold text-admin-text mt-0.5">
                    {new Date(data.date_joined).toLocaleDateString("fa-IR")}
                  </div>
                </div>
              </div>
            </div>

            {/* کارت‌های آماری */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold flex items-center gap-1">
                  <BanknotesIcon className="w-3.5 h-3.5" /> کیف پول
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  {formatNum(data.wallet_balance)}
                </div>
              </div>
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold flex items-center gap-1">
                  <GiftIcon className="w-3.5 h-3.5" /> امتیاز وفاداری
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  {formatNum(data.loyalty_points)}
                </div>
              </div>
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold flex items-center gap-1">
                  <ShoppingBagIcon className="w-3.5 h-3.5" /> سفارشات
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  {formatNum(data.orders_count)}
                </div>
              </div>
            </div>

            {/* سایز و اندازه‌های بدن */}
            {data.body_measurement && (
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold mb-2">
                  اندازه‌های بدن
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-bold text-admin-text">
                  {data.body_measurement.height && (
                    <div>قد: <span className="font-mono">{data.body_measurement.height}</span></div>
                  )}
                  {data.body_measurement.weight && (
                    <div>وزن: <span className="font-mono">{data.body_measurement.weight}</span></div>
                  )}
                  {data.body_measurement.chest && (
                    <div>سینه: <span className="font-mono">{data.body_measurement.chest}</span></div>
                  )}
                  {data.body_measurement.waist && (
                    <div>کمر: <span className="font-mono">{data.body_measurement.waist}</span></div>
                  )}
                  {data.body_measurement.hip && (
                    <div>باسن: <span className="font-mono">{data.body_measurement.hip}</span></div>
                  )}
                </div>
              </div>
            )}

            {/* لیست آدرس‌ها */}
            {data.addresses && data.addresses.length > 0 && (
              <div>
                <div className="text-[10px] text-admin-text-muted font-bold mb-2 flex items-center gap-1">
                  <MapPinIcon className="w-3.5 h-3.5" /> آدرس‌های ثبت‌شده
                </div>
                <div className="space-y-2">
                  {data.addresses.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 bg-admin-background/60 border border-admin-border/60 rounded-2xl"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-admin-text">{a.title}</span>
                        {a.is_default && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-bold">
                            پیش‌فرض
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-admin-text-muted font-bold">
                        {a.province} · {a.city} · {a.full_address}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* لاگ OTP اخیر */}
            {data.recent_otps && data.recent_otps.length > 0 && (
              <div>
                <div className="text-[10px] text-admin-text-muted font-bold mb-2">
                  آخرین کدهای یکبارمصرف
                </div>
                <div className="space-y-1.5">
                  {data.recent_otps.slice(0, 5).map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between p-2.5 bg-admin-background/60 border border-admin-border/50 rounded-xl text-[10px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-admin-text">{o.code}</span>
                        <span className="text-admin-text-muted font-bold">{o.purpose_display}</span>
                        {o.is_used && <span className="text-emerald-500 font-bold">✓</span>}
                      </div>
                      <span className="text-admin-text-muted font-bold">
                        {new Date(o.created_at).toLocaleString("fa-IR")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* اکشن‌های مدیریتی */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-admin-border/70">
              <button
                onClick={() => handleAction("toggle_active")}
                className={`px-3 py-2 text-[11px] font-bold rounded-xl text-white transition ${
                  data.is_active
                    ? "bg-slate-600 hover:bg-slate-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {data.is_active ? "غیرفعال کردن" : "فعال کردن"}
              </button>
              <button
                onClick={() => handleAction("toggle_staff")}
                className="px-3 py-2 text-[11px] font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {data.is_staff ? "حذف دسترسی کارمندی" : "ارتقا به کارمند"}
              </button>
              <button
                onClick={() => handleAction("toggle_superuser")}
                className="px-3 py-2 text-[11px] font-bold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
              >
                {data.is_superuser ? "حذف دسترسی مدیر ارشد" : "ارتقا به مدیر ارشد"}
              </button>
              {data.is_locked ? (
                <button
                  onClick={() => handleAction("unlock")}
                  className="px-3 py-2 text-[11px] font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 transition"
                >
                  <LockOpenIcon className="w-3.5 h-3.5" /> رفع قفل
                </button>
              ) : (
                <button
                  onClick={() => handleAction("lock", { seconds: 3600 })}
                  className="px-3 py-2 text-[11px] font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-1 transition"
                >
                  <LockClosedIcon className="w-3.5 h-3.5" /> قفل ۱ ساعت
                </button>
              )}
              {data.is_2fa_enabled && (
                <button
                  onClick={() => handleAction("reset_2fa")}
                  className="px-3 py-2 text-[11px] font-bold rounded-xl bg-amber-500 text-white hover:bg-amber-600 flex items-center gap-1 transition"
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