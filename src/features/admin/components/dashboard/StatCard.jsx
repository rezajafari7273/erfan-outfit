"use client";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "rose" }) {
  // مپینگ رنگ آیکون‌ها هماهنگ با تم پنل مدیریت
  const colorMap = {
    rose: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    violet: "bg-violet-500/10 text-violet-500 border border-violet-500/20",
    slate: "bg-admin-background text-admin-text-muted border border-admin-border/60",
  };

  // فرمت‌دهی اعداد به فارسی
  const formatNumber = (v) => {
    if (v === null || v === undefined) return "—";
    const num = Number(v);
    if (isNaN(num)) return v;
    return num.toLocaleString("fa-IR");
  };

  return (
    <div className="bg-admin-surface p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-admin-border/70 shadow-sm hover:shadow-md hover:border-admin-primary/40 transition-all duration-200 dir-rtl select-none">
      <div className="flex items-start justify-between gap-3">
        {/* بخش متن‌ها و مقادیر */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-admin-text-muted tracking-wide truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-black text-admin-text mt-1.5 leading-none">
            {formatNumber(value)}
          </p>
          {subtitle && (
            <p className="text-[10px] font-bold text-admin-text-muted/80 mt-2 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* بخش آیکون */}
        {Icon && (
          <div className={`p-2.5 sm:p-3 rounded-2xl shrink-0 transition-transform ${colorMap[color] || colorMap.rose}`}>
            <Icon className="w-5 h-5 stroke-[2]" />
          </div>
        )}
      </div>
    </div>
  );
}