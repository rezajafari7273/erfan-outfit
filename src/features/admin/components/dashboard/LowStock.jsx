"use client";

export default function LowStock({ products = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">
        محصولات کم‌موجود
      </h3>
      {products.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500">همه محصولات موجودی کافی دارند</div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-3 rounded-xl border border-rose-100 dark:border-rose-900/30 bg-rose-50/40 dark:bg-rose-900/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {p.title}
                </span>
                <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-lg">
                  {p.total_stock} عدد
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.variants.map((v) => (
                  <span
                    key={v.variant_id}
                    className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md text-slate-600 dark:text-slate-300"
                  >
                    {v.color_name || "—"} · {v.stock_quantity}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}