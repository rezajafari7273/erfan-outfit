// src/components/common/Breadcrumb.jsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
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
    <nav aria-label="Breadcrumb" className="py-3 px-1">
      <ol className="flex items-center gap-1.5 flex-wrap text-xs text-gray-500">
        <li>
          <Link href="/" className="hover:text-gray-900 transition-colors">
            خانه
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronLeftIcon className="w-3 h-3 text-gray-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-gray-800 line-clamp-1">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-gray-900 transition-colors line-clamp-1"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}