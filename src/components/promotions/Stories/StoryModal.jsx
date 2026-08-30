// components/promotion/Stories/StoryModal.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import DestinationHandler from "../DestinationHandler";
import Backdrop from "@/components/ui/Backdrop";
import Button from "@/components/ui/Button"; // ایمپورت کامپوننت دکمه پایه
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function StoryModal({ stories = [], currentIndex = 0, onClose, onSelectIndex }) {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const currentStory = stories[currentIndex];

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handleNext();
      if (e.key === "ArrowRight") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, stories.length]);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <Backdrop isOpen={true} onClose={onClose} />

      {/* فریم اصلی مودال */}
      <div className="relative z-60 h-[85vh] max-h-[750px] aspect-[9/16] w-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* ۱. نوارهای پیشرفت */}
        <div className="absolute top-3 inset-x-0 z-30 px-3 flex gap-1.5">
          {stories.map((_, index) => {
            let barWidth = "0%";
            if (index < currentIndex) barWidth = "100%";
            else if (index === currentIndex) barWidth = `${progress}%`;

            return (
              <div
                key={index}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-xs"
              >
                <div
                  className="h-full bg-primary/80 transition-all duration-100 linear"
                  style={{ width: barWidth }}
                />
              </div>
            );
          })}
        </div>

        {/* ۲. هدر استوری */}
        <div className="flex items-center justify-between p-4 pt-7 bg-gradient-to-b from-black/80 via-black/40 to-transparent absolute top-0 inset-x-0 z-20">
          <div className="flex items-center gap-3">
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-9 h-9 rounded-full border border-amber-500 object-cover"
            />
            <span className="text-white text-sm font-bold drop-shadow">
              {currentStory.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ۳. پخش ویدیو و محتوا */}
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          {currentStory.video ? (
            <video
              ref={videoRef}
              src={currentStory.video}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleNext}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* دکمه سوئیچ قبلی */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          )}

          {/* دکمه سوئیچ بعدی */}
          <button
            onClick={handleNext}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-xs transition-all cursor-pointer"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* ۴. لینک مقصد با کامپوننت اختصاصی Button */}
          {currentStory.destination && (
            <div className="absolute bottom-6 inset-x-4 z-20">
              <DestinationHandler
                destination={currentStory.destination}
                className="flex justify-center items-center"
              >
                <Button
                  variant="secondary"
                  size="md"
                  className="bg-secondary/10 backdrop-blur-md rounded-full shadow-lg cursor-pointer"
                >
                  مشاهده 
                </Button>
              </DestinationHandler>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}