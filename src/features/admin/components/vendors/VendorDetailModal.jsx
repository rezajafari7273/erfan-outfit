"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon, CheckCircleIcon, XCircleIcon, PauseCircleIcon } from "@heroicons/react/24/outline";

const KYC_MAP = {
  pending: { label: "در انتظار بررسی", cls: "bg-amber-100 text-amber-700" },
  approved: { label: "تأیید شده", cls: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "رد شده", cls: "bg-rose-100 text-rose-700" },
  suspended: { label: "معلق", cls: "bg-slate-200 text-slate-700" },
};

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
      alert("خطا در عملیات");
    }
  };

  const st = data ? KYC_MAP[data.kyc_status] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">{data?.store_name || "..."}</h2>
            {st && <span className={`text-[11px] px-2 py-1 rounded-lg font-bold ${st.cls}`}>{st.label}</span>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* Logo & Info */}
            <div className="flex items-start gap-4">
              {data.logo ? (
                <img src={data.logo} alt="" className="w-20 h-20 rounded-xl object-cover border" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800" />
              )}
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">تلفن فروشگاه</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.store_phone || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">تلفن کاربر</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.user_phone || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">کد ملی</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.national_id || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">تعداد محصولات</div>
                  <div className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{data.products_count || 0}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold">درصد رضایت</div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">{data.satisfaction_rate}%</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold">عملکرد</div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">{data.performance_display}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold">کمیسیون</div>
                <div className="font-black text-slate-800 dark:text-slate-100 mt-1">{data.commission_rate}%</div>
              </div>
            </div>

            {data.description && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold mb-1">توضیحات</div>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">{data.description}</div>
              </div>
            )}

            {data.store_address && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] text-slate-500 font-bold mb-1">آدرس</div>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">{data.store_address}</div>
              </div>
            )}

            {data.business_license && (
              <div>
                <div className="text-[10px] text-slate-500 font-bold mb-2">جواز کسب</div>
                <img src={data.business_license} alt="" className="max-h-48 rounded-xl border" />
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              {data.kyc_status !== "approved" && (
                <button onClick={() => handleAction("approve")} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white text-[11px] font-bold rounded-lg hover:bg-emerald-700">
                  <CheckCircleIcon className="w-4 h-4" /> تأیید
                </button>
              )}
              {data.kyc_status !== "rejected" && (
                <button onClick={() => handleAction("reject")} className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 text-white text-[11px] font-bold rounded-lg hover:bg-rose-700">
                  <XCircleIcon className="w-4 h-4" /> رد
                </button>
              )}
              {data.kyc_status !== "suspended" && (
                <button onClick={() => handleAction("suspend")} className="flex items-center gap-1.5 px-3 py-2 bg-slate-600 text-white text-[11px] font-bold rounded-lg hover:bg-slate-700">
                  <PauseCircleIcon className="w-4 h-4" /> تعلیق
                </button>
              )}
              <button onClick={() => adminApi.vendorAction(vendor.id, "toggle_official").then(() => { onUpdated?.(); onClose?.(); })} className="px-3 py-2 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700">
                {data.is_official ? "حذف رسمی" : "رسمی کردن"}
              </button>
              <button onClick={() => adminApi.vendorAction(vendor.id, "toggle_featured").then(() => { onUpdated?.(); onClose?.(); })} className="px-3 py-2 bg-amber-500 text-white text-[11px] font-bold rounded-lg hover:bg-amber-600">
                {data.is_featured ? "حذف منتخب" : "منتخب کردن"}
              </button>
              <button onClick={() => adminApi.vendorAction(vendor.id, "toggle_active").then(() => { onUpdated?.(); onClose?.(); })} className="px-3 py-2 bg-slate-700 text-white text-[11px] font-bold rounded-lg hover:bg-slate-800">
                {data.is_active ? "غیرفعال" : "فعال"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}