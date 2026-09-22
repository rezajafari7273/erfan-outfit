"use client";

export default function TopProducts({ products = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">پرفروش‌ترین محصولات</h3>
      {products.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500">فروشی ثبت نشده</div>
      ) : (
        <div className="space-y-3">
          {products.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black">
                {i + 1}
              </div>
              {p.image ? (
                <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{p.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {Number(p.total_sold).toLocaleString("fa-IR")} فروش ·{" "}
                  {Number(p.total_revenue).toLocaleString("fa-IR")} ریال
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}