"use client";

export default function RecentUsers({ users = [] }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 mb-4">کاربران اخیر</h3>
      {users.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500">کاربری ثبت نشده</div>
      ) : (
        <div className="space-y-2">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div className="w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-[11px] font-bold text-slate-600 dark:text-slate-300">
                {(u.full_name || u.phone || "?").charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {u.full_name || "—"}
                </div>
                <div className="text-[10px] text-slate-500">{u.phone}</div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                  u.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                {u.is_active ? "فعال" : "غیرفعال"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}