"use client";

import { useState, useEffect } from "react";
import { adminApi } from "@/features/admin/api/adminApi";
import { XMarkIcon, MapPinIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { statusInfo } from "./OrderStatusSelect";

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
    if (!confirm("لغو این سفارش و بازگشت موجودی؟")) return;
    try {
      await adminApi.cancelOrder(order.id);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("خطا در لغو سفارش");
    }
  };

  const st = data ? statusInfo(data.status) : null;
  const addr = data?.address_snapshot || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 dir-rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative max-h-[92vh] flex flex-col border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
              سفارش {data?.order_number}
            </h2>
            {st && <span className={`text-[11px] px-2 py-1 rounded-lg font-bold ${st.color}`}>{st.label}</span>}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">در حال بارگذاری...</div>
        ) : data ? (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">مشتری</span>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{data.user_name || "—"}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                  <PhoneIcon className="w-3 h-3" />
                  {data.user_phone}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] font-bold text-slate-500 mb-1">روش پرداخت</div>
                <div className="font-bold text-slate-800 dark:text-slate-100">{data.payment_method_display}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {data.paid_at ? `پرداخت: ${new Date(data.paid_at).toLocaleDateString("fa-IR")}` : "پرداخت نشده"}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-[10px] font-bold text-slate-500 mb-1">تاریخ ثبت</div>
                <div className="font-bold text-slate-800 dark:text-slate-100">
                  {new Date(data.created_at).toLocaleDateString("fa-IR")}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {new Date(data.created_at).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            {/* Address */}
            {addr && Object.keys(addr).length > 0 && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">آدرس</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {[addr.province, addr.city, addr.address, addr.postal_code].filter(Boolean).join(" - ")}
                </div>
              </div>
            )}

            {/* Items */}
            <div>
              <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2 text-sm">اقلام سفارش</h3>
              <div className="space-y-2">
                {data.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 dark:text-slate-100 truncate">{item.product_title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {item.color_name && <span>{item.color_name}</span>}
                        {item.size_names && item.size_names.length > 0 && (
                          <span> · {item.size_names.join("، ")}</span>
                        )}
                        <span> · × {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {Number(item.final_price).toLocaleString("fa-IR")} ریال
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transactions */}
            {data.transactions && data.transactions.length > 0 && (
              <div>
                <h3 className="font-black text-slate-800 dark:text-slate-100 mb-2 text-sm">تراکنش‌ها</h3>
                <div className="space-y-1">
                  {data.transactions.map((t) => (
                    <div key={t.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-[10px] text-slate-600 dark:text-slate-300">
                        {t.order_id} · {t.gateway}
                      </div>
                      <div className="text-[11px] font-bold">{Number(t.amount).toLocaleString("fa-IR")} ریال</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">جمع اقلام:</span>
                <span className="font-bold">{Number(data.subtotal).toLocaleString("fa-IR")} ریال</span>
              </div>
              {data.discount_amount > 0 && (
                <div className="flex justify-between text-[11px] text-rose-600">
                  <span>تخفیف {data.coupon_code && `(${data.coupon_code})`}:</span>
                  <span className="font-bold">- {Number(data.discount_amount).toLocaleString("fa-IR")} ریال</span>
                </div>
              )}
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">هزینه ارسال:</span>
                <span className="font-bold">{Number(data.shipping_cost).toLocaleString("fa-IR")} ریال</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-800 dark:text-slate-100">مبلغ نهایی:</span>
                <span className="font-black text-rose-600">{Number(data.total_price).toLocaleString("fa-IR")} ریال</span>
              </div>
            </div>

            {/* Admin Note */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">یادداشت ادمین</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="2"
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                onClick={handleSaveNote}
                disabled={savingNote}
                className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {savingNote ? "..." : "ذخیره یادداشت"}
              </button>
            </div>

            {/* Actions */}
            {!["delivered", "cancelled", "refunded"].includes(data.status) && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700"
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