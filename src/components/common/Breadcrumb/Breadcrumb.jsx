// src/components/common/Breadcrumb.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function Breadcrumb({ items = [], isCustomPosition = false }) {
  const { setIsCustomBreadcrumbRendered } = useBreadcrumb();

  // اگر صفحه اعلام کرد که مکان سفارشی دارد، استیت عمومی را تغییر می‌دهیم
  useEffect(() => {
    if (isCustomPosition) {
      setIsCustomBreadcrumbRendered(true);
      return () => setIsCustomBreadcrumbRendered(false);
    }
  }, [isCustomPosition, setIsCustomBreadcrumbRendered]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-slate-200/80 text-xs text-slate-500 shadow-sm backdrop-blur-md select-none"
    >
      {/* لینک خانه به همراه آیکون */}
      <div className="flex items-center gap-1">
        <HomeIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/" className="hover:text-primary transition-colors">
          خانه
        </Link>
      </div>

      {/* پیمایش روی آیتم‌های داینامیک */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            {/* جداکننده اسلش */}
            <span className="text-slate-300 select-none">/</span>

            {isLast || !item.href ? (
              <span className="text-primary font-medium line-clamp-1">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors line-clamp-1"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}