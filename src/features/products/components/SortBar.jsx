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
      <div className="hidden lg:flex items-center gap-3 bg-white p-3 px-5 rounded-2xl border border-stone-200/80 shadow-sm text-xs font-medium text-stone-600 mb-6">
        <div className="flex items-center gap-1.5 text-stone-800 font-bold shrink-0 ml-2">
          <ArrowsUpDownIcon className="w-4 h-4 text-rose-500" />
          <span>مرتب‌سازی بر اساس:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {SORT_OPTIONS.map((option) => {
            const isActive = selectedSort === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-rose-50 text-rose-600 font-bold shadow-xs border border-rose-100"
                    : "hover:bg-stone-100 text-stone-500 hover:text-stone-800"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-full flex items-center justify-between bg-white p-3.5 px-4 rounded-2xl border border-stone-200/80 shadow-sm text-xs cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-2 text-stone-700">
            <ArrowsUpDownIcon className="w-4 h-4 text-rose-500" />
            <span className="font-bold">مرتب‌سازی:</span>
            <span className="text-stone-500 font-medium">
              {activeOption?.label}
            </span>
          </div>
          <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg">
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
                <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
                  <ArrowsUpDownIcon className="w-4 h-4 text-rose-500" />
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
                          ? "bg-rose-50 text-rose-600 font-bold"
                          : "text-stone-600 hover:bg-stone-50 active:bg-stone-100"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isActive && (
                        <CheckIcon className="w-4 h-4 text-rose-500" />
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