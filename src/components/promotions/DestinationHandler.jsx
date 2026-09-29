// components/promotion/DestinationHandler.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function DestinationHandler({ destination, children, className = "" }) {
  if (!destination || !destination.type) {
    return <div className={className}>{children}</div>;
  }

  const { type, value } = destination;

  // ۱. لینک خارجی
  if (type === "external") {
    const url = typeof value === "string" ? value : "#";
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block cursor-pointer ${className}`}
      >
        {children}
      </a>
    );
  }

  // ۲. صفحه جزئیات محصول (product_detail)
  if (type === "product_detail" || type === "product") {
    if (!value) return <div className={className}>{children}</div>;
    return (
      <Link href={`/products/${value}`} className={`block cursor-pointer ${className}`}>
        {children}
      </Link>
    );
  }

  // ۳. صفحه لندینگ
  if (type === "landing") {
    if (!value) return <div className={className}>{children}</div>;
    const href = typeof value === "string" && value.startsWith("/") ? value : `/landings/${value}`;
    return (
      <Link href={href} className={`block cursor-pointer ${className}`}>
        {children}
      </Link>
    );
  }

  // ۴. لیست محصولات همراه با فیلترها
  if (type === "products" || type === "category" || type === "brand") {
    let queryString = "";

    if (typeof value === "object" && value !== null) {
      const searchParams = new URLSearchParams();
      
      Object.entries(value).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          // آرایه‌ها را به صورت مقدار جدا شده با کاما متصل می‌کند (مثلاً colors=1,2,3)
          searchParams.append(key, val.join(","));
        } else if (val !== null && val !== undefined) {
          searchParams.append(key, val);
        }
      });

      queryString = searchParams.toString() ? `?${searchParams.toString()}` : "";
    } else if (typeof value === "string") {
      queryString = value.startsWith("?") ? value : `?${value}`;
    }

    return (
      <Link href={`/products${queryString}`} className={`block cursor-pointer ${className}`}>
        {children}
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
}