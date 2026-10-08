// src/components/common/GlobalBreadcrumb.jsx
"use client";

import { usePathname } from "next/navigation";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import Breadcrumb from "./Breadcrumb";

// نقشه‌ای برای ترجمه Slugهای انگلیسی به عنوان‌های فارسی (اختیاری)
const routeMap = {
  products: "فروشگاه",
  blog: "وبلاگ",
  about: "درباره ما",
  contact: "تماس با ما",
  faq: "سوالات متداول",
  cart: "سبد خرید",
  careers: "فرصت های شغلی و همکاری",
  "privacy-policy":"حریم خصوصی و امنیت",
  terms:"شرایط و قوانین استفاده",
};

export default function GlobalBreadcrumb() {
  const { isCustomBreadcrumbRendered } = useBreadcrumb();
  const pathname = usePathname();

  // ۱. اگه صفحه بردکرامب سفارشی داشت یا در صفحه اصلی (خانه) بودیم، چیزی نشون نده
  if (isCustomBreadcrumbRendered || pathname === "/") return null;

  // ۲. تبدیل آدرس URL به آیتم‌های بردکرامب
  const segments = pathname.split("/").filter(Boolean);
  const items = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = routeMap[segment] || decodeURIComponent(segment); // اگر در routeMap نبود، خود کلمه رو می‌ذاره

    return { label, href };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
      <Breadcrumb items={items} />
    </div>
  );
}