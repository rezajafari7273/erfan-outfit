"use client";

import { 
  ShoppingBagIcon, 
  MapPinIcon, 
  HeartIcon, 
  UserIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function UserProfileNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "orders", label: "سفارش‌های من", icon: ShoppingBagIcon },
    { id: "addresses", label: "آدرس‌های ثبت‌شده", icon: MapPinIcon },
    { id: "favorites", label: "علاقه‌مندی‌ها", icon: HeartIcon },
    { id: "account", label: "اطلاعات حساب", icon: UserIcon },
  ];

  return (
    <div className="w-full">
      {/* باکس اصلی با استایل شیشه‌ای (Glassmorphic) و بردر الگوی BuyBox */}
      <div className="border border-secondary/15 rounded-3xl p-5 bg-surface/60 backdrop-blur-md shadow-xs">
        
        {/* هدر باکس */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-secondary/10">
          <span className="font-bold text-sm text-gray-800">منوی کاربری</span>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
            حساب فعال
          </span>
        </div>

        {/* آیتم‌های ناوبری */}
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer outline-none focus:outline-none select-none [-webkit-tap-highlight-color:transparent] ${
                  isActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-transparent text-gray-700 hover:bg-secondary/10 hover:text-gray-900 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 stroke-1.5 ${isActive ? "text-white" : "text-primary"}`} />
                  <span>{item.label}</span>
                </div>
                
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-transparent"}`} />
              </button>
            );
          })}
        </div>

        {/* دکمه خروج */}
        <div className="pt-3 mt-3 border-t border-secondary/10">
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50/60 transition-all cursor-pointer outline-none select-none [-webkit-tap-highlight-color:transparent]"
          >
            <ArrowLeftStartOnRectangleIcon className="w-5 h-5 stroke-1.5 shrink-0" />
            <span>خروج از حساب کاربری</span>
          </button>
        </div>

      </div>
    </div>
  );
}