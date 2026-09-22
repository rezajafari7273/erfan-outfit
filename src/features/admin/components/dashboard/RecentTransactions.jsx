"use client";

const STATUS_MAP = {
  pending: { label: "در انتظار", cls: "bg-amber-100 text-amber-700" },
  success: { label: "موفق", cls: "bg-emerald-100 text-emerald-700" },
  failed: { label: "ناموفق", cls: "bg-rose-100 text-rose-700" },
  refunded: { label: "مسترد", cls: "bg-slate-100 text-slate-700" },
};

export default function RecentTransactions({ transactions = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">
        تراکنش‌های اخیر
      </h3>
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500">تراکنشی ثبت نشده</div>
      ) : (
        <div className="space-y-2">
          {transactions.map((t) => {
            const st = STATUS_MAP[t.status] || { label: t.status, cls: "bg-slate-100 text-slate-700" };
            return (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                      {t.order_id}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {t.user_phone} · {t.gateway_display}
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {Number(t.amount).toLocaleString("fa-IR")} ریال
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}