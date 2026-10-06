"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import {
  XMarkIcon,
  MapPinIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { statusInfo } from "./OrderStatusSelect";

function OrderDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse select-none">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="h-20 bg-admin-border/40 rounded-2xl" />
        <div className="h-20 bg-admin-border/40 rounded-2xl" />
        <div className="h-20 bg-admin-border/40 rounded-2xl" />
      </div>
      <div className="h-16 bg-admin-border/40 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-14 bg-admin-border/40 rounded-2xl" />
        <div className="h-14 bg-admin-border/40 rounded-2xl" />
      </div>
      <div className="h-28 bg-admin-border/40 rounded-2xl" />
    </div>
  );
}

export default function OrderDetailModal({ isOpen, onClose, order, onUpdated }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    if (!isOpen || !order) return;
    setLoading(true);
    adminApi
      .getOrderById(order.id)
      .then((res) => {
        const d = res?.data !== undefined ? res.data : res;
        setData(d);
        setNote(d?.admin_note || "");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, order]);

  if (!isOpen) return null;

  const handleSaveNote = async () => {
    setSavingNote(true);
    try {
      await adminApi.setOrderNote(order.id, { admin_note: note });
      onUpdated?.();
    } catch (err) {
      console.error(err);
      alert("خطا در ذخیره یادداشت");
    } finally {
      setSavingNote(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("آیا از لغو این سفارش و بازگشت موجودی به انبار اطمینان دارید؟"))
      return;
    try {
      await adminApi.cancelOrder(order.id);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("خطا در لغو سفارش");
    }
  };

  const formatNum = (v) => Number(v || 0).toLocaleString("fa-IR");
  const st = data ? statusInfo(data.status) : null;
  const addr = data?.address_snapshot || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl animate-fadeIn select-none">
      <div className="bg-admin-surface rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl p-6 relative border border-admin-border/70 max-h-[92vh] flex flex-col">
        {/* هدر مدال */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-admin-border/70">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-black text-admin-text tracking-tight">
              سفارش <span className="font-mono">{data?.order_number || order.order_number}</span>
            </h2>
            {st && (
              <span
                className={`text-[11px] px-2.5 py-1 rounded-xl font-bold border ${st.color}`}
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
          <OrderDetailSkeleton />
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* کارت‌های اطلاعات کلیدی */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="flex items-center gap-2 text-admin-text-muted mb-1">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">مشتری</span>
                </div>
                <div className="font-bold text-admin-text">
                  {data.user_name || "—"}
                </div>
                <div className="text-[10px] text-admin-text-muted mt-1 flex items-center gap-1 dir-ltr justify-end font-mono">
                  <span>{data.user_phone}</span>
                  <PhoneIcon className="w-3 h-3" />
                </div>
              </div>

              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] font-bold text-admin-text-muted mb-1">
                  روش پرداخت
                </div>
                <div className="font-bold text-admin-text">
                  {data.payment_method_display}
                </div>
                <div className="text-[10px] text-admin-text-muted mt-1">
                  {data.paid_at
                    ? `پرداخت: ${new Date(data.paid_at).toLocaleDateString("fa-IR")}`
                    : "پرداخت نشده"}
                </div>
              </div>

              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="text-[10px] font-bold text-admin-text-muted mb-1">
                  تاریخ ثبت
                </div>
                <div className="font-bold text-admin-text">
                  {new Date(data.created_at).toLocaleDateString("fa-IR")}
                </div>
                <div className="text-[10px] text-admin-text-muted mt-1">
                  ساعت:{" "}
                  {new Date(data.created_at).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {/* آدرس تحویل */}
            {addr && Object.keys(addr).length > 0 && (
              <div className="p-3.5 bg-admin-background/60 rounded-2xl border border-admin-border/60">
                <div className="flex items-center gap-2 text-admin-text-muted mb-1.5">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">آدرس تحویل گیرنده</span>
                </div>
                <div className="text-admin-text leading-relaxed font-bold">
                  {[addr.province, addr.city, addr.address, addr.postal_code]
                    .filter(Boolean)
                    .join(" - ")}
                </div>
              </div>
            )}

            {/* لیست اقلام */}
            <div>
              <h3 className="font-black text-admin-text mb-2 text-xs">
                اقلام سفارش ({formatNum(data.items?.length)} مورد)
              </h3>
              <div className="space-y-2">
                {data.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 border border-admin-border/60 rounded-2xl bg-admin-background/30"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-admin-border/60 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-admin-background border border-admin-border/50 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-admin-text truncate">
                        {item.product_title}
                      </div>
                      <div className="text-[10px] text-admin-text-muted mt-1">
                        {item.color_name && <span>رنگ: {item.color_name}</span>}
                        {item.size_names && item.size_names.length > 0 && (
                          <span> · سایز: {item.size_names.join("، ")}</span>
                        )}
                        <span className="font-bold text-admin-text">
                          {" "}
                          · {formatNum(item.quantity)} عدد
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-black text-admin-text whitespace-nowrap">
                      {formatNum(item.final_price)}{" "}
                      <span className="text-[10px] font-normal text-admin-text-muted">
                        تومان
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* تراکنش‌های مالی */}
            {data.transactions && data.transactions.length > 0 && (
              <div>
                <h3 className="font-black text-admin-text mb-2 text-xs">
                  تراکنش‌ها
                </h3>
                <div className="space-y-1.5">
                  {data.transactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-2.5 bg-admin-background/50 rounded-xl border border-admin-border/50"
                    >
                      <div className="text-[10px] font-bold text-admin-text-muted">
                        درگاه {t.gateway} · کد پیگیری: {t.order_id || "—"}
                      </div>
                      <div className="text-xs font-black text-admin-text">
                        {formatNum(t.amount)} تومان
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* خلاصه صورت‌حساب */}
            <div className="p-4 bg-admin-background/80 rounded-2xl border border-admin-border/70 space-y-2">
              <div className="flex justify-between text-xs font-bold text-admin-text-muted">
                <span>جمع اقلام:</span>
                <span className="text-admin-text">{formatNum(data.subtotal)} تومان</span>
              </div>
              {data.discount_amount > 0 && (
                <div className="flex justify-between text-xs font-bold text-rose-500">
                  <span>
                    تخفیف {data.coupon_code && `(${data.coupon_code})`}:
                  </span>
                  <span>- {formatNum(data.discount_amount)} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold text-admin-text-muted">
                <span>هزینه ارسال:</span>
                <span className="text-admin-text">
                  {formatNum(data.shipping_cost)} تومان
                </span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-admin-border/70 text-xs">
                <span className="font-black text-admin-text">مبلغ نهایی:</span>
                <span className="font-black text-admin-primary text-sm">
                  {formatNum(data.total_price)} تومان
                </span>
              </div>
            </div>

            {/* یادداشت ادمین */}
            <div className="pt-2">
              <label className="block font-bold text-admin-text mb-1.5 text-xs">
                یادداشت اختصاصی ادمین
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="2"
                placeholder="توضیحات مربوط به پیگیری یا ارسال سفارش..."
                className="w-full p-3 border border-admin-border/70 rounded-xl bg-admin-background text-admin-text text-xs focus:outline-none focus:ring-2 focus:ring-admin-primary/50 transition-all placeholder:text-admin-text-muted/50"
              />
              <button
                onClick={handleSaveNote}
                disabled={savingNote}
                className="mt-2 px-4 py-2 bg-admin-primary text-white text-xs font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition shadow-md shadow-admin-primary/20"
              >
                {savingNote ? "در حال ذخیره..." : "ذخیره یادداشت"}
              </button>
            </div>

            {/* دکمه لغو */}
            {!["delivered", "cancelled", "refunded"].includes(data.status) && (
              <div className="pt-3 border-t border-admin-border/70">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-bold rounded-xl hover:bg-rose-500/20 transition"
                >
                  لغو سفارش
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}