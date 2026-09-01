// components/common/Timer.jsx
"use client";

import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function Timer({ 
  targetDate,
  className = "",
  showIcon = true,
  iconClassName = "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary shrink-0",
  containerClassName = "bg-primary/5 border border-primary/20 px-1.5 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 rounded-lg sm:rounded-2xl shrink-0 min-w-[70px] sm:min-w-[90px] md:min-w-[105px] lg:min-w-[120px]",
  textClassName = "text-[10px] xs:text-xs sm:text-sm md:text-base font-black text-primary tabular-nums dir-ltr tracking-wider text-center",
  format = "persian",
}) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => {
    if (format === 'persian') {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      return String(num).padStart(2, '0').replace(/\d/g, (d) => persianDigits[parseInt(d)]);
    }
    return String(num).padStart(2, '0');
  };

  const timeString = `${formatNumber(timeLeft.hours)}:${formatNumber(timeLeft.minutes)}:${formatNumber(timeLeft.seconds)}`;

  return (
    <div className={`flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 ${containerClassName} ${className}`}>
      {showIcon && <ClockIcon className={iconClassName} />}
      <span className={textClassName}>
        {timeString}
      </span>
    </div>
  );
}