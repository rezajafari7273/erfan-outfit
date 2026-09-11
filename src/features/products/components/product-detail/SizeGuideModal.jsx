"use client";

import { useState } from "react";
import { XMarkIcon, QueueListIcon } from "@heroicons/react/24/outline";
import SizeGuide from "../size-guide/SizeGuide";
import Backdrop from "@/components/ui/Backdrop";

export default function SizeGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* دکمه باز کردن مودال */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:underline cursor-pointer font-rokh"
      >
        <QueueListIcon className="w-4 h-4" />
        راهنمای سایز
      </button>

      {/* کامپوننت بک‌دراپ همراه با محتوای مودال */}
      <Backdrop isOpen={isOpen} onClose={() => setIsOpen(false)} zIndex="z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 relative shadow-2xl transition-all duration-300"
          >
            {/* دکمه بستن */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 left-4 z-10 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* کامپوننت اصلی راهنمای سایز */}
            <SizeGuide />
          </div>
        </div>
      </Backdrop>
    </>
  );
}