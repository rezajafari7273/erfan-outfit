"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayIcon,
  XMarkIcon,
  VideoCameraIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export default function VideoPlayerWidget({ activeVideo, onCloseVideo }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (activeVideo) {
      setIsOpen(true);
    }
  }, [activeVideo]);

  // اصلاح آدرس ویدیو برای اطمینان از وجود دامین کامل
  const getVideoUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `http://localhost:8000${url}`;
  };

  const renderPlayerContent = () => (
    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-stone-200/80 shadow-inner">
      {activeVideo && activeVideo.videoUrl ? (
        <video
          key={activeVideo.id || activeVideo.videoUrl}
          src={getVideoUrl(activeVideo.videoUrl)}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-white mb-3 shadow-md">
            <PlayIcon className="w-6 h-6 translate-x-0.5" />
          </div>
          <p className="text-xs font-medium text-stone-300 leading-relaxed px-2">
            برای مشاهده ویدیوی استوری هر محصول، روی دکمه ویدیو کلیک کنید.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ------------------ ۱. ویجت دسکتاپ ------------------ */}
      <div className="hidden lg:block bg-white text-stone-800 p-4 rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden relative">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 flex-1 text-right focus:outline-none group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
              <VideoCameraIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-stone-700">
              ویدیوی معرفی محصول
            </span>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mr-auto"
            >
              <ChevronDownIcon className="w-4 h-4 text-stone-400" />
            </motion.div>
          </button>

          {activeVideo && isOpen && (
            <button
              type="button"
              onClick={onCloseVideo}
              className="text-stone-400 hover:text-stone-700 transition-colors p-1 rounded-lg hover:bg-stone-100 mr-2 cursor-pointer"
              title="بستن ویدیو"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="video-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3">
                {renderPlayerContent()}

                {activeVideo && (
                  <p className="text-xs font-bold text-stone-700 mt-2.5 truncate">
                    {activeVideo.title}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------ ۲. مودال موبایل ------------------ */}
      <AnimatePresence>
        {activeVideo && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseVideo}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xs bg-stone-900 rounded-3xl p-4 shadow-2xl z-10 border border-stone-800 text-right overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <VideoCameraIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-stone-200 truncate max-w-[180px]">
                    {activeVideo.title || "ویدیوی معرفی محصول"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onCloseVideo}
                  className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {renderPlayerContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}