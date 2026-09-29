"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ShoppingBagIcon,
  MapPinIcon,
  HeartIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export default function UserProfileNavigation({ activeTab, setActiveTab }) {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { id: "account", label: "اطلاعات حساب", icon: UserIcon },
    { id: "orders", label: "سفارش‌های من", icon: ShoppingBagIcon },
    { id: "addresses", label: "آدرس‌های ثبت‌شده", icon: MapPinIcon },
    { id: "favorites", label: "علاقه‌مندی‌ها", icon: HeartIcon },
  ];

const handleLogout = async () => {
  if (isLoggingOut) return;
  if (!confirm("آیا از خروج از حساب کاربری مطمئن هستید؟")) return;

  setIsLoggingOut(true);
  try {
    await logout();

    // ← این را اضافه کن:
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart:updated"));
    }

    router.push("/");
    router.refresh();
  } catch (err) {
    console.error("خطا در خروج:", err);
  } finally {
    setIsLoggingOut(false);
  }
};

  return (
    <div className="w-full">
      <div className="border border-secondary/15 rounded-3xl p-5 bg-surface/60 backdrop-blur-md shadow-xs select-none">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-secondary/10">
          <span className="font-bold text-sm text-gray-800">منوی کاربری</span>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
            حساب فعال
          </span>
        </div>

        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-colors duration-150 cursor-pointer outline-none select-none [-webkit-tap-highlight-color:transparent] border border-transparent ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-700 hover:bg-secondary/10 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 stroke-1.5 transition-colors ${
                      isActive ? "text-white" : "text-secondary"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <span
                  className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                    isActive ? "bg-white opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="pt-3 mt-3 border-t border-secondary/10">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50/60 transition-colors cursor-pointer outline-none select-none [-webkit-tap-highlight-color:transparent] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 stroke-1.5 shrink-0" />
            <span>{isLoggingOut ? "در حال خروج..." : "خروج از حساب کاربری"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}