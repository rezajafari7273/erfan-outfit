'use client';

import React from 'react';

export default function Skeleton({
  variant = 'rounded', // 'text' | 'circular' | 'rectangular' | 'rounded' | 'button'
  width,
  height,
  className = '',
  animation = 'shimmer', // 'shimmer' | 'pulse' | 'none'
  style = {},
  ...props
}) {
  // پایه استایل مدرن بدون وابستگی به بلر یا شیشه
  const baseClasses = 'relative overflow-hidden bg-slate-200/80 dark:bg-slate-700/50 select-none pointer-events-none';

  // شکل‌های مدرن کامپوننت
  const variantClasses = {
    text: 'h-3.5 w-full rounded-md my-1.5',
    circular: 'rounded-full flex-shrink-0',
    rectangular: 'rounded-none w-full h-full',
    rounded: 'rounded-xl w-full h-full',
    button: 'h-10 w-full rounded-lg',
  };

  // افکت انیمیشن موجی مدرن (Shimmer Wave)
  const animationClasses = {
    pulse: 'animate-pulse',
    shimmer:
      'after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite_linear] after:bg-gradient-to-r after:from-transparent after:via-white/60 dark:after:via-white/10 after:to-transparent',
    none: '',
  };

  const combinedClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.rounded,
    animationClasses[animation] || animationClasses.shimmer,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const customStyles = {
    ...(width && { width }),
    ...(height && { height }),
    ...style,
  };

  return (
    <>
      <div className={combinedClasses} style={customStyles} {...props} />
      
      {/* تزریق انیمیشن Shimmer به صورت Inline برای اجرا در تمام پروژه بدون نیاز به تغییر tailwind.config */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
}