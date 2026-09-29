"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import AuthModal from "@/features/auth/components/AuthModal";
import {
  UserIcon,
  ChevronDownIcon,
  RectangleGroupIcon,
  MapIcon,
  ShoppingBagIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function UserAuthButton({ onOpenAuthModal }) {
  const { user, isAuthenticated, logout } = useAuthContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // بستن دراپ‌داون با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenAuthModal = () => {
    if (onOpenAuthModal) {
      onOpenAuthModal();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        /* منوی پروفایل کاربر لاگین شده */
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-full border border-secondary/10 bg-gray-100/80 hover:bg-gray-200/80 transition-all duration-300 shadow-sm cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full text-secondary flex items-center justify-center text-xs font-bold shrink-0">
              <UserIcon className="w-4 h-4 text-secondary stroke-[2]" />
            </div>
            <span className="text-xs font-bold text-primary hidden lg:block max-w-[100px] truncate">
              {user?.first_name ? `${user.first_name} ${user?.last_name || ""}` : user?.phone_number || "حساب کاربری"}
            </span>
            <ChevronDownIcon
              className={`w-3.5 h-3.5 text-secondary transition-transform duration-200 ${
                isUserMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* دراپ‌داون حساب کاربری */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E0DCD3] pb-2 z-50 overflow-hidden"
              >
                {/* هدر دراپ‌داون شامل آیکون و اطلاعات کاربر */}
                <div className="px-4 py-2 border-b border-[#E0DCD3]/70 bg-[#F8F6F0] flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
                    <UserIcon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold font-rokh pt-1 text-primary truncate">
                      {user?.first_name ? `${user.first_name} ${user?.last_name || ""}` : "کاربر گرامی"}
                    </p>
                    <p className="text-[11px] text-amber-900 font-fanum mt-0.5 dir-ltr text-right truncate">
                      {user?.phone || user?.phone || ""}
                    </p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile?tab=account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50/60 hover:text-amber-700 transition-colors"
                  >
                    <RectangleGroupIcon className="w-4 h-4 text-secondary" />
                    داشبورد حساب کاربری
                  </Link>

                  <Link
                    href="/profile?tab=orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50/60 hover:text-amber-700 transition-colors"
                  >
                    <ShoppingBagIcon className="w-4 h-4 text-secondary" />
                    سفارش‌ها
                  </Link>
                  
                  <Link
                    href="/profile?tab=addresses"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50/60 hover:text-amber-700 transition-colors"
                  >
                    <MapIcon className="w-4 h-4 text-secondary" />
                    آدرس‌های من
                  </Link>

                  <Link
                    href="/profile?tab=favorites"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50/60 hover:text-amber-700 transition-colors"
                  >
                    <BookmarkIcon className="w-4 h-4 text-secondary" />
                    لیست علاقه مندی ها
                  </Link>

                  <Link
                    href="/profile/comments"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-amber-50/60 hover:text-amber-700 transition-colors"
                  >
                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-secondary" />
                    دیدگاه‌ها و پرسش‌ها
                  </Link>
                </div>

                <div className="border-t border-[#E0DCD3]/70 pt-1 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-900 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    خروج از حساب
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* دکمه باز کردن مودال ورود / ثبت‌نام */
        <button
          type="button"
          id="login-btn"
          onClick={handleOpenAuthModal}
          className="flex items-center gap-2 px-4 py-3 rounded-full border border-secondary/10 bg-gray-200/60 backdrop-blur-md hover:border-secondary/20 hover:bg-gray-200 transition-all duration-300 group shadow-md cursor-pointer"
        >
          <UserIcon className="w-5 h-5 text-secondary group-hover:text-primary-600 transition-colors stroke-[1.8]" />
          <span className="text-xs font-black text-primary hidden lg:block uppercase tracking-tighter">
            ورود یا ثبت‌نام
          </span>
        </button>
      )}

      {/* کامپوننت مودال ثبت‌نام/ورود */}
      {!onOpenAuthModal && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}
    </>
  );
}