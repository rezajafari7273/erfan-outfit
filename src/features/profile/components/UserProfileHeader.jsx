"use client";

import {
  UserIcon,
  WalletIcon,
  SparklesIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

function resolveAvatar(url) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

export default function UserProfileHeader({ user, onEditClick }) {
  const fullName = user?.first_name
    ? `${user.first_name} ${user?.last_name || ""}`.trim()
    : "کاربر گرامی";

  const avatarUrl = resolveAvatar(user?.avatar);

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="w-7 h-7 text-rose-500" />
            )}
          </div>
          <div>
            <h2 className="font-rokh font-bold text-gray-900 text-base">
              {fullName}
            </h2>
            <p className="text-xs text-gray-400 font-medium dir-ltr text-right mt-0.5">
              {user?.phone || "—"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="p-2.5 rounded-xl border border-gray-200/80 text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all cursor-pointer outline-none select-none"
          title="ویرایش اطلاعات"
        >
          <PencilSquareIcon className="w-5 h-5 stroke-1.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-gradient-to-br from-rose-50/60 to-rose-100/30 border border-rose-100/80 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs text-rose-700 font-medium">
            <WalletIcon className="w-4 h-4 stroke-1.5" />
            <span>موجودی کیف پول</span>
          </div>
          <div className="mt-2 text-left dir-rtl">
            <span className="font-black text-gray-900 text-base">0</span>
            <span className="text-[10px] text-gray-500 font-bold mr-1">
              تومان
            </span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
            <SparklesIcon className="w-4 h-4 text-amber-500 stroke-1.5" />
            <span>باشگاه مشتریان</span>
          </div>
          <div className="mt-2 text-left dir-rtl">
            <span className="font-black text-gray-900 text-base">0</span>
            <span className="text-[10px] text-gray-500 font-bold mr-1">
              امتیاز
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}