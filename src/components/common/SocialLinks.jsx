"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Backdrop from "../ui/Backdrop";

const SOCIAL_NETWORKS = {
  primary: [
    {
      id: "instagram",
      name: "اینستاگرام",
      href: "https://instagram.com",
      bgColor: "bg-pink-50 border-pink-100 text-pink-600",
      hoverBg: "hover:bg-pink-100 hover:border-pink-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      name: "توییتر (X)",
      href: "https://twitter.com",
      bgColor: "bg-sky-50 border-sky-100 text-sky-500",
      hoverBg: "hover:bg-sky-100 hover:border-sky-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: "telegram",
      name: "تلگرام",
      href: "https://t.me",
      bgColor: "bg-blue-50 border-blue-100 text-blue-500",
      hoverBg: "hover:bg-blue-100 hover:border-blue-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 64 64">
          <path d="m62.8 10.8l-9.4 44c-.7 3.1-2.5 3.8-5.1 2.4L34.2 46.8l-6.9 6.6c-.7.7-1.4 1.4-3 1.4l1.1-14.5l26.3-23.9c1.1-1.1-.3-1.5-1.7-.6L17.3 36.4L3.2 32.1c-3.1-1-3.1-3.1.7-4.5L58.7 6.3c2.7-.8 5 .6 4.1 4.5" />
        </svg>
      ),
    },

  ],
  modalOnly: [
    {
      id: "eitaa",
      name: "ایتا",
      href: "https://eitaa.com",
      bgColor: "bg-orange-50 border-orange-100 text-orange-500",
      hoverBg: "hover:bg-orange-100 hover:border-orange-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      ),
    },
    {
      id: "rubika",
      name: "روبیکا",
      href: "https://rubika.ir",
      bgColor: "bg-purple-50 border-purple-100 text-purple-600",
      hoverBg: "hover:bg-purple-100 hover:border-purple-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19 8v8l-7 3.5L5 16V8l7-3.2z" />
        </svg>
      ),
    },
    {
      id: "bale",
      name: "بله",
      href: "https://bale.ai",
      bgColor: "bg-emerald-50 border-emerald-100 text-emerald-600",
      hoverBg: "hover:bg-emerald-100 hover:border-emerald-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      name: "واتساپ",
      href: "https://whatsapp.com",
      bgColor: "bg-green-50 border-green-100 text-green-600",
      hoverBg: "hover:bg-green-100 hover:border-green-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
      ),
    },
    {
      id: "youtube",
      name: "یوتیوب",
      href: "https://youtube.com",
      bgColor: "bg-red-50 border-red-100 text-red-600",
      hoverBg: "hover:bg-red-100 hover:border-red-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "لینکدین",
      href: "https://linkedin.com",
      bgColor: "bg-indigo-50 border-indigo-100 text-indigo-600",
      hoverBg: "hover:bg-indigo-100 hover:border-indigo-300",
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ],
};

const SIZE_MAP = {
  sm: { button: "w-8 h-8 rounded-xl", icon: "w-3.5 h-3.5", gap: "gap-2" },
  md: { button: "w-10 h-10 rounded-2xl", icon: "w-4 h-4", gap: "gap-3" },
  lg: { button: "w-12 h-12 rounded-2xl", icon: "w-5 h-5", gap: "gap-4" },
};

export default function SocialLinks({ size = "lg", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // جلوگیری از Hydration Error در Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentSize = SIZE_MAP[size] || SIZE_MAP.lg;
  const allNetworks = [...SOCIAL_NETWORKS.primary, ...SOCIAL_NETWORKS.modalOnly];

  // محتوای مودال
  const modalContent = (
    <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-full h-full flex items-center justify-center p-4" dir="rtl">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">
                  شبکه‌های اجتماعی
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {allNetworks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.hoverBg} border flex items-center justify-center transition-all group-hover:scale-105 shadow-sm`}
                    >
                      <div className="w-5 h-5">{item.icon}</div>
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors text-center">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Backdrop>
  );

  return (
    <>
      <div className={`flex items-center ${currentSize.gap} ${className}`} dir="rtl">
        {SOCIAL_NETWORKS.primary.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            className={`${currentSize.button} ${item.bgColor} ${item.hoverBg} border flex items-center justify-center transition-all duration-200 group shrink-0 shadow-sm`}
          >
            <div className={`${currentSize.icon} group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
          </a>
        ))}

        <button
          onClick={() => setIsOpen(true)}
          title="سایر شبکه‌های اجتماعی"
          className={`${currentSize.button} bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-200 group shrink-0 shadow-sm`}
        >
          <EllipsisHorizontalIcon className={`${currentSize.icon} group-hover:scale-110 transition-transform`} />
        </button>
      </div>

      {/* رندر کردن مودال خارج از DOM والد با Portal */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}