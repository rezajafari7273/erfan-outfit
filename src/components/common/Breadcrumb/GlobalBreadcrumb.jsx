// src/components/common/GlobalBreadcrumb.jsx
"use client";

import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function GlobalBreadcrumb({ defaultItems = [] }) {
  const { isCustomBreadcrumbRendered } = useBreadcrumb();

 
  if (isCustomBreadcrumbRendered) return null;

  return (
    <div className="max-w-7xl mx-auto px-4">
     
    </div>
  );
}