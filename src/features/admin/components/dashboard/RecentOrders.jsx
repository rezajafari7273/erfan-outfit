"use client";

const STATUS_MAP = {
  pending: { label: "در انتظار پرداخت", cls: "bg-amber-100 text-amber-700" },
  paid: { label: "پرداخت شده", cls: "bg-emerald-100 text-emerald-700" },
  processing: { label: "در حال آماده‌سازی", cls: "bg-blue-100 text-blue-700" },
  shipped: { label: "ارسال شده", cls: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "تحویل شده", cls: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "لغو شده", cls: "bg-rose-100 text-rose-700" },
  refunded: { label: "مسترد شده", cls: "bg-slate-100 text-slate-700" },
};

export default function RecentOrders({ orders = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">سفارشات اخیر</h3>
      {orders.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500">سفارشی ثبت نشده</div>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => {
            const st = STATUS_MAP[o.status] || { label: o.status, cls: "bg-slate-100 text-slate-700" };
            return (
              <div
                key={o.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                      {o.order_number}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {o.user_name || o.user_phone} · {o.items_count} قلم
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {Number(o.total_price).toLocaleString("fa-IR")} ریال
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}