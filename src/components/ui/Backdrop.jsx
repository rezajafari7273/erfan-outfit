"use client";

import React, { useEffect } from "react";

export default function Backdrop({
  isOpen = false,
  onClose,
  className = "",
  zIndex = "z-[60]",
  children,
  ...props
}) {

  useEffect(() => {
    if (isOpen) {
      // محاسبه دقیق عرض نوار اسکرول مرورگر
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = "hidden";
      // اضافه کردن پدینگ جبرانی برای جلوگیری از پرش صفحه
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${zIndex} ${
        isOpen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      } ${className}`}
      onClick={onClose}
      {...props}
    >
      {children}
    </div>
  );
}