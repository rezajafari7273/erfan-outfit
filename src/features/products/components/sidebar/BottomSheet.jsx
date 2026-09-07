"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function BottomSheet({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          {/* پس‌زمینه تاریک */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
          />

          {/* محتوای کشویی از پایین */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative w-full max-h-[85vh] bg-white rounded-t-3xl p-5 shadow-2xl z-10 overflow-y-auto"
          >
            {/* دستگیره بالای کشو */}
            <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-4" />

            {/* هدر کشو */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-sm">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* بدنه کشو */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}