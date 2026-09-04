"use client";

import React, { useState, useEffect } from "react";

export default function Timer({
  targetDate,
  className = "",
  format = "persian", // 'persian' | 'latin'
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  labels = {
    days: "روز",
    hours: "ساعت",
    minutes: "دقیقه",
    seconds: "ثانیه",
  },
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => {
    const padded = String(num).padStart(2, "0");
    if (format === "persian") {
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      return padded.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
    }
    return padded;
  };

  const renderUnit = (value, label, showSeparator = true) => (
    <div className="flex items-center gap-1">
      <div className="flex flex-col items-center justify-center w-7 sm:w-8 text-center shrink-0">
        <span className="font-black text-sm sm:text-base md:text-lg text-primary tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)] tabular-nums block w-full text-center">
          {formatNumber(value)}
        </span>
        <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 mt-1 leading-none whitespace-nowrap">
          {label}
        </span>
      </div>

      {showSeparator && (
        <span className="text-primary/60 font-bold text-xs sm:text-sm -mt-2.5 animate-pulse select-none px-0.5">
          :
        </span>
      )}
    </div>
  );

  return (
    <div className={`inline-flex items-center justify-center dir-rtl select-none ${className}`}>
      {/* راست به چپ: ثانیه -> دقیقه -> ساعت -> روز (در نتیجه روز سمت چپ‌ترین خواهد بود) */}
      {showSeconds && renderUnit(timeLeft.seconds, labels.seconds, showMinutes || showHours || showDays)}
      {showMinutes && renderUnit(timeLeft.minutes, labels.minutes, showHours || showDays)}
      {showHours && renderUnit(timeLeft.hours, labels.hours, showDays)}
      {showDays && renderUnit(timeLeft.days, labels.days, false)}
    </div>
  );
}