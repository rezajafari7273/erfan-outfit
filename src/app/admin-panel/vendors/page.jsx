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
  pending: {
    label: "در انتظار",
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
    cls: "bg-admin-border/50 text-admin-text-muted border-admin-border/70",
  },
};

function VendorsTableSkeleton() {
  return (
    <div className="p-4 space-y-3 animate-pulse select-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 border-b border-admin-border/40"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-admin-border/50 shrink-0" />
            <div className="space-y-2 flex-1 max-w-xs">
              <div className="h-4 w-3/4 bg-admin-border/60 rounded-md" />
              <div className="h-3 w-1/2 bg-admin-border/40 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-4 w-12 bg-admin-border/50 rounded-md hidden md:block" />
            <div className="h-6 w-20 bg-admin-border/50 rounded-lg" />
            <div className="flex gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
              <div className="w-8 h-8 rounded-xl bg-admin-border/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminVendorsPage() {
  const { vendors, count, loading, params, updateParams, refetch } = useVendors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");

  const handleOpenCreate = () => {
    setEditingVendor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVendor(v);
    setIsModalOpen(true);
  };

  const handleDelete = async (v) => {
    if (!confirm(`آیا از حذف فروشنده «${v.store_name}» اطمینان دارید؟`)) return;
    try {
      await adminApi.deleteVendor(v.id);
      refetch();
    } catch (err) {
      console.error(err);
      alert("خطا در حذف فروشنده");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 dir-rtl select-none">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-admin-surface p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm">
        <div>
          <h1 className="text-lg sm:text-xl font-black text-admin-text tracking-tight">
            مدیریت فروشندگان
          </h1>
          <p className="text-xs font-bold text-admin-text-muted mt-1">
            {count > 0
              ? `${formatNum(count)} فروشنده ثبت شده`
              : "افزودن، ویرایش و مدیریت فروشندگان پلتفرم"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="p-2.5 border border-admin-border/70 bg-admin-surface rounded-xl hover:bg-admin-background text-admin-text-muted hover:text-admin-text transition"
            title="بروزرسانی"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-admin-primary hover:opacity-90 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-admin-primary/20"
          >
            <PlusIcon className="w-4 h-4" />
            <span>افزودن فروشنده</span>
          </button>
        </div>
      </div>

      {/* جستجو و فیلترها */}
      <div className="space-y-3 bg-admin-surface p-4 rounded-2xl border border-admin-border/70 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute right-3.5 top-3 w-4 h-4 text-admin-text-muted" />
          <input
            type="text"
            placeholder="جستجو در نام فروشگاه، موبایل یا ایمیل..."
            value={params.search || ""}
            onChange={(e) => updateParams({ search: e.target.value })}
            className="w-full pr-10 pl-4 py-2.5 bg-admin-background border border-admin-border/70 rounded-xl text-xs text-admin-text focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/60"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {KYC_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => updateParams({ kyc_status: f.value })}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition ${
                params.kyc_status === f.value
                  ? "bg-admin-primary text-white shadow-sm shadow-admin-primary/20"
                  : "bg-admin-background text-admin-text-muted hover:text-admin-text border border-admin-border/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* جدول فروشندگان */}
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm overflow-hidden">
        {loading ? (
          <VendorsTableSkeleton />
        ) : vendors.length === 0 ? (
          <div className="p-12 text-center text-xs font-bold text-admin-text-muted">
            فروشنده‌ای یافت نشد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-admin-background/60 text-admin-text-muted font-bold border-b border-admin-border/70">
                <tr>
                  <th className="p-4">لوگو</th>
                  <th className="p-4">نام فروشگاه</th>
                  <th className="p-4">کاربر</th>
                  <th className="p-4">محصولات</th>
                  <th className="p-4">وضعیت احراز</th>
                  <th className="p-4 text-center">نشان‌ها</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border/40">
                {vendors.map((v) => {
                  const kyc = KYC_BADGE[v.kyc_status] || {
                    label: v.kyc_status,
                    cls: "bg-admin-border/40 text-admin-text-muted",
                  };
                  return (
                    <tr
                      key={v.id}
                      className="hover:bg-admin-background/50 transition"
                    >
                      <td className="p-4">
                        {v.logo ? (
                          <img
                            src={v.logo}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover border border-admin-border/60"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-admin-background border border-admin-border/60 flex items-center justify-center text-admin-text font-black">
                            {(v.store_name || "?").charAt(0)}
                          </div>
                        )}
                      </td>
                      <td className="p-4 font-bold text-admin-text">
                        {v.store_name}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-admin-text">
                          {v.user_name || "—"}
                        </div>
                        <div className="text-[10px] text-admin-text-muted mt-0.5 dir-ltr text-right font-mono">
                          {v.user_phone}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-admin-text-muted">
                        {formatNum(v.products_count)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-xl font-bold border ${kyc.cls}`}
                        >
                          {kyc.label}
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-1 space-x-reverse">
                        {v.is_official && (
                          <CheckBadgeIcon
                            className="w-4 h-4 text-blue-500 inline"
                            title="رسمی"
                          />
                        )}
                        {v.is_featured && (
                          <StarIcon
                            className="w-4 h-4 text-amber-500 inline"
                            title="منتخب"
                          />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedVendor(v)}
                            className="p-1.5 bg-admin-background text-admin-text-muted hover:text-admin-text rounded-xl transition"
                            title="جزئیات"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(v)}
                            className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl transition"
                            title="ویرایش"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(v)}
                            className="p-1.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-xl transition"
                            title="حذف"
                          >
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