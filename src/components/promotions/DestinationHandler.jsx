"use client";

import React from "react";
import Link from "next/link";

export default function DestinationHandler({ destination, children, className = "" }) {
  if (!destination || !destination.type) {
    return <div className={className}>{children}</div>;
  }

  const { type, value } = destination;

  // 1. مقصد: لینک خارجی
  if (type === "external") {
    return (
      <a
        href={typeof value === "string" ? value : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`block cursor-pointer ${className}`}
      >
        {children}
      </a>
    );
  }

  // 2. مقصد: صفحه لندینگ
  if (type === "landing") {
    const href = typeof value === "string" ? value : "#";
    return (
      <Link href={href} className={`block cursor-pointer ${className}`}>
        {children}
      </Link>
    );
  }

  // 3. مقصد: محصولات با فیلترها
  if (type === "products") {
    let queryString = "";
    if (typeof value === "object" && value !== null) {
      queryString = "?" + new URLSearchParams(value).toString();
    } else if (typeof value === "string") {
      queryString = value.startsWith("?") ? value : `?${value}`;
    }

    return (
      <Link href={`/products${queryString}`} className={`block cursor-pointer ${className}`}>
        {children}
      </Link>
    );
  }

  /* 
    توسعه‌های آینده (قابل اضافه شدن بدون تغییر UI):
    if (type === "brand") { ... }
    if (type === "category") { ... }
  */

  return <div className={className}>{children}</div>;
}