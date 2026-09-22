"use client";

import { useState } from "react";
import { useVendors } from "@/features/admin/hooks/useVendors";
import { adminApi } from "@/features/admin/api/adminApi";
import VendorModal from "@/features/admin/components/vendors/VendorModal";
import VendorDetailModal from "@/features/admin/components/vendors/VendorDetailModal";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

const KYC_FILTERS = [
  { value: "", label: "همه" },
  { value: "pending", label: "در انتظار" },
  { value: "approved", label: "تأیید شده" },
  { value: "rejected", label: "رد شده" },
  { value: "suspended", label: "معلق" },
];

const KYC_BADGE = {
  pending: { label: "در انتظار", cls: "bg-amber-100 text-amber-700" },
  approved: { label: "تأیید شده", cls: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "رد شده", cls: "bg-rose-100 text-rose-700" },
  suspended: { label: "معلق", cls: "bg-slate-200 text-slate-700" },
};

export default function AdminVendorsPage() {
  const { vendors, count, loading, params, updateParams, refetch } = useVendors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleOpenCreate = () => {
    setEditingVendor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVendor(v);
    setIsModalOpen(true);
  };

  const handleDelete = async (v) => {
    if (!confirm(`حذف فروشنده «${v.store_name}»؟`)) return;
    try {
      await adminApi.deleteVendor(v.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف فروشنده");
    }
  };

  return (
    <div className="p-6 space-y-6 dir-rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">مدیریت فروشندگان</h1>
          <p className="text-xs text-slate-500 mt-1">
            {count > 0 ? `${count} فروشنده ثبت شده` : "افزودن، ویرایش و مدیریت فروشندگان"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={refetch} className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button onClick={handleOpenCreate} className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-rose-600/20">
            <PlusIcon className="w-4 h-4" />
            <span>افزودن فروشنده</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در نام فروشگاه، موبایل یا ایمیل..."
            value={params.search}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {KYC_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => updateParams({ kyc_status: f.value })}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition ${
                params.kyc_status === f.value
                  ? "bg-rose-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : vendors.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">فروشنده‌ای یافت نشد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-4">لوگو</th>
                  <th className="p-4">نام فروشگاه</th>
                  <th className="p-4">کاربر</th>
                  <th className="p-4">محصولات</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4 text-center">نشان</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {vendors.map((v) => {
                  const kyc = KYC_BADGE[v.kyc_status] || { label: v.kyc_status, cls: "bg-slate-100" };
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-4">
                        {v.logo ? (
                          <img src={v.logo} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                            {(v.store_name || "?").charAt(0)}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-slate-800 dark:text-slate-100">{v.store_name}</td>
                      <td className="p-4">
                        <div className="text-slate-700 dark:text-slate-300">{v.user_name || "—"}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{v.user_phone}</div>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{v.products_count}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-1 rounded-lg font-bold ${kyc.cls}`}>
                          {kyc.label}
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-1 space-x-reverse">
                        {v.is_official && (
                          <CheckBadgeIcon className="w-4 h-4 text-blue-500 inline" title="رسمی" />
                        )}
                        {v.is_featured && (
                          <StarIcon className="w-4 h-4 text-amber-500 inline" title="منتخب" />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setSelectedVendor(v)} className="p-1.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg" title="جزئیات">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleOpenEdit(v)} className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg" title="ویرایش">
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(v)} className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg" title="حذف">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingVendor={editingVendor}
        onSuccess={refetch}
      />

      <VendorDetailModal
        isOpen={!!selectedVendor}
        onClose={() => setSelectedVendor(null)}
        vendor={selectedVendor}
        onUpdated={refetch}
      />
    </div>
  );
}