"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import {
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";

const KYC_MAP = {
  pending: {
    label: "در انتظار بررسی",
    cls: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  approved: {
    label: "تأیید شده",
    cls: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  rejected: {
    label: "رد شده",
    cls: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  suspended: {
    label: "معلق",
    cls: "bg-admin-border/40 text-admin-text-muted border-admin-border/60",
  },
};

function VendorDetailSkeleton() {
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
      <div className="h-20 bg-admin-border/40 rounded-2xl" />
    </div>
  );
}

export default function VendorDetailModal({ isOpen, onClose, vendor, onUpdated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !vendor) return;
    setLoading(true);
    adminApi
      .getVendorById(vendor.id)
      .then((res) => {
        const d = res?.data !== undefined ? res.data : res;
        setData(d);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, vendor]);

  if (!isOpen) return null;

  const handleAction = async (action, reason) => {
    try {
      await adminApi.vendorAction(vendor.id, action, { reason });
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("خطا در تغییر وضعیت فروشنده");
    }
  };

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");
  const st = data ? KYC_MAP[data.kyc_status] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative border border-admin-border/70 max-h-[92vh] flex flex-col">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-admin-text tracking-tight">
              {data?.store_name || "مشخصات فروشگاه"}
            </h2>
            {st && (
              <span
                className={`text-[11px] px-2.5 py-1 rounded-xl font-bold border ${st.cls}`}
              >
                {st.label}
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
          <VendorDetailSkeleton />
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* لوگو و اطلاعات اولیه */}
            <div className="flex items-start gap-4 p-4 bg-admin-background/50 rounded-2xl border border-admin-border/60">
              {data.logo ? (
                <img
                  src={data.logo}
                  alt=""
                  className="w-20 h-20 rounded-2xl object-cover border border-admin-border/70 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-admin-surface border border-admin-border/70 flex items-center justify-center text-admin-text font-black text-xl shrink-0">
                  {(data.store_name || "?").charAt(0)}
                </div>
              )}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    تلفن فروشگاه
                  </div>
                  <div className="font-bold text-admin-text mt-0.5 dir-ltr text-right font-mono">
                    {data.store_phone || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    تلفن کاربر
                  </div>
                  <div className="font-bold text-admin-text mt-0.5 dir-ltr text-right font-mono">
                    {data.user_phone || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    کد ملی
                  </div>
                  <div className="font-bold text-admin-text mt-0.5 font-mono">
                    {data.national_id || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-admin-text-muted font-bold">
                    تعداد محصولات
                  </div>
                  <div className="font-bold text-admin-text mt-0.5">
                    {formatNum(data.products_count)}
                  </div>
                </div>
              </div>
            </div>

            {/* کارت‌های شاخص‌های عملکرد */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold">
                  درصد رضایت
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  %{formatNum(data.satisfaction_rate)}
                </div>
              </div>
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold">
                  عملکرد کلی
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  {data.performance_display || data.performance || "—"}
                </div>
              </div>
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold">
                  نرخ کمیسیون
                </div>
                <div className="font-black text-admin-text text-base mt-1">
                  %{formatNum(data.commission_rate)}
                </div>
              </div>
            </div>

            {data.description && (
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold mb-1">
                  توضیحات
                </div>
                <div className="text-admin-text leading-relaxed font-bold">
                  {data.description}
                </div>
              </div>
            )}

            {data.store_address && (
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] text-admin-text-muted font-bold mb-1">
                  آدرس کسب و کار
                </div>
                <div className="text-admin-text leading-relaxed font-bold">
                  {data.store_address}
                </div>
              </div>
            )}

            {data.business_license && (
              <div>
                <div className="text-[10px] text-admin-text-muted font-bold mb-2">
                  جواز کسب / مدارک
                </div>
                <img
                  src={data.business_license}
                  alt=""
                  className="max-h-48 rounded-2xl border border-admin-border/70 object-cover"
                />
              </div>
            )}

            {/* دکمه‌های عملیات سریع */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-admin-border/70">
              {data.kyc_status !== "approved" && (
                <button
                  onClick={() => handleAction("approve")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white text-[11px] font-bold rounded-xl hover:bg-emerald-700 transition"
                >
                  <CheckCircleIcon className="w-4 h-4" /> تأیید احراز
                </button>
              )}
              {data.kyc_status !== "rejected" && (
                <button
                  onClick={() => handleAction("reject")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 text-white text-[11px] font-bold rounded-xl hover:bg-rose-700 transition"
                >
                  <XCircleIcon className="w-4 h-4" /> رد احراز
                </button>
              )}
              {data.kyc_status !== "suspended" && (
                <button
                  onClick={() => handleAction("suspend")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-600 text-white text-[11px] font-bold rounded-xl hover:bg-slate-700 transition"
                >
                  <PauseCircleIcon className="w-4 h-4" /> تعلیق
                </button>
              )}
              <button
                onClick={() =>
                  adminApi
                    .vendorAction(vendor.id, "toggle_official")
                    .then(() => {
                      onUpdated?.();
                      onClose?.();
                    })
                }
                className="px-3 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-xl hover:bg-blue-700 transition"
              >
                {data.is_official ? "حذف نشان رسمی" : "اعطای نشان رسمی"}
              </button>
              <button
                onClick={() =>
                  adminApi
                    .vendorAction(vendor.id, "toggle_featured")
                    .then(() => {
                      onUpdated?.();
                      onClose?.();
                    })
                }
                className="px-3 py-2 bg-amber-500 text-white text-[11px] font-bold rounded-xl hover:bg-amber-600 transition"
              >
                {data.is_featured ? "حذف از منتخبین" : "افزودن به منتخبین"}
              </button>
              <button
                onClick={() =>
                  adminApi
                    .vendorAction(vendor.id, "toggle_active")
                    .then(() => {
                      onUpdated?.();
                      onClose?.();
                    })
                }
                className="px-3 py-2 bg-admin-text-muted text-admin-surface text-[11px] font-bold rounded-xl hover:opacity-90 transition"
              >
                {data.is_active ? "غیرفعال‌سازی" : "فعال‌سازی"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}