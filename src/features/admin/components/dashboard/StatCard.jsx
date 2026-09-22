"use client";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "rose" }) {
  const colorMap = {
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  };

  const formatNumber = (v) => {
    if (v === null || v === undefined) return "—";
    if (typeof v === "number") return v.toLocaleString("fa-IR");
    return Number(v).toLocaleString("fa-IR");
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-2">
            {formatNumber(value)}
          </p>
          {subtitle && (
            <p className="text-[10px] text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colorMap[color] || colorMap.rose}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}