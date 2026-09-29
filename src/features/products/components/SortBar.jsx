"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowsUpDownIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Backdrop from "@/components/ui/Backdrop";

const SORT_OPTIONS = [
  { id: "newest", label: "جدیدترین", ordering: "-created_at" },
  { id: "popular", label: "محبوب‌ترین", ordering: "-rating" },
  { id: "bestselling", label: "پرفروش‌ترین", ordering: "-sales_count" },
  { id: "cheapest", label: "ارزان‌ترین", ordering: "base_price" },
  { id: "expensive", label: "گران‌ترین", ordering: "-base_price" },
];

export default function SortBar({ currentSort, onSortChange }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(
    currentSort || SORT_OPTIONS[0].id
  );

  const handleSelect = (sortId) => {
    setSelectedSort(sortId);
    const option = SORT_OPTIONS.find((o) => o.id === sortId);
    if (onSortChange) onSortChange(option?.ordering || "-created_at");
    setIsMobileMenuOpen(false);
  };

  const activeOption = SORT_OPTIONS.find((opt) => opt.id === selectedSort);

  return (
    <>
      {/* نسخه دسکتاپ - مدرن و مینیمال با رنگ primary */}
      <div className="hidden lg:flex items-center gap-6 pt-2 px-1 border-b border-stone-200/60 mb-6 text-xs text-stone-500 font-medium">
        <div className="flex items-center gap-2 text-primary text-sm font-bold font-rokh shrink-0">
          <ArrowsUpDownIcon className="w-4 h-4 text-secondary" />
          <span className="pt-1">مرتب‌سازی:</span>
        </div>
        <div className="flex items-center gap-1 relative">
          {SORT_OPTIONS.map((option) => {
            const isActive = selectedSort === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`relative px-3 py-2 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-stone-900 font-bold"
                    : "hover:text-stone-800 text-stone-500"
                }`}
              >
                {option.label}
                {/* خط متحرک زیر تب فعال با رنگ primary */}
                {isActive && (
                  <motion.div
                    layoutId="activeSortIndicator"
                    className="absolute bottom-0 inset-x-2 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* نسخه موبایل - همگام با استایل دسکتاپ */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-full flex items-center justify-between bg-white p-3.5 px-4 rounded-2xl border border-stone-200/80 shadow-xs text-xs cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-2 text-primary font-bold font-rokh">
            <ArrowsUpDownIcon className="w-4 h-4 text-secondary" />
            <span>مرتب‌سازی:</span>
            <span className="text-stone-500 font-medium">
              {activeOption?.label}
            </span>
          </div>
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
            تغییر
          </span>
        </button>

        <Backdrop
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          zIndex="z-50"
        />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl p-5 z-50 shadow-2xl border-t border-stone-100 text-right"
            >
              <div className="w-12 h-1 bg-stone-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100">
                <div className="flex items-center gap-2 font-bold font-rokh text-primary text-sm">
                  <ArrowsUpDownIcon className="w-4 h-4 text-secondary" />
                  <span>مرتب‌سازی محصولات</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1 my-2">
                {SORT_OPTIONS.map((option) => {
                  const isActive = selectedSort === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-bold"
                          : "text-stone-600 hover:bg-stone-50 active:bg-stone-100"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive && (
                        <CheckIcon className="w-4 h-4 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}