"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function AdminProfileMenu({ user, handleLogout, loading }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  // بستن منو با کلیک روی بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* دکمه پروفایل */}
      <button
        type="button"
        onClick={() => setShowProfileMenu((prev) => !prev)}
        className="flex items-center gap-2.5 text-right p-1 rounded-xl hover:bg-admin-background transition-colors cursor-pointer select-none"
      >
        {/* ۱. عکس پروفایل */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-admin-background border border-admin-border shrink-0">
          <Image
            src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"}
            alt={user?.name || "سلام، مدیر"}
            fill
            className="object-cover"
          />
        </div>

        {/* ۲. متن نام و ایمیل */}
        <div className="hidden sm:block">
          <p className="text-xs font-black text-admin-text leading-tight">
            {user?.name ? `سلام، ${user.name}` : "سلام، مدیر"}
          </p>
          <p className="text-[10px] font-bold text-admin-text-muted dir-ltr text-right mt-0.5">
            {user?.email || "admin@store.com"}
          </p>
        </div>

        {/* ۳. آیکون چورون */}
        <ChevronDownIcon
          className={`w-3 h-3 text-admin-text-muted stroke-[2.5] transition-transform duration-200 ${
            showProfileMenu ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* منوی بازشونده */}
      {showProfileMenu && (
        <div className="absolute left-0 sm:right-0 mt-2 w-48 bg-admin-surface border border-admin-border rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <Link
            href="/"
            target="_blank"
            onClick={() => setShowProfileMenu(false)}
            className="flex items-center justify-between px-4 py-2.5 text-xs font-bold text-admin-text hover:bg-admin-background transition-colors"
          >
            <span>مشاهده سایت</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-admin-primary" />
          </Link>

          <hr className="my-1 border-admin-border/50" />

          <button
            type="button"
            onClick={() => {
              setShowProfileMenu(false);
              handleLogout();
            }}
            disabled={loading}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-admin-danger hover:bg-admin-danger/10 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span>{loading ? "در حال خروج..." : "خروج از حساب"}</span>
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}