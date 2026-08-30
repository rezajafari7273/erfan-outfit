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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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