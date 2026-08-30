'use client';

import React from 'react';

const VARIANTS = {
  primary:
    'bg-primary/80 text-white hover:bg-primary shadow-md shadow-primary/20',
  secondary:
    'bg-secondary/80 text-white hover:bg-secondary shadow-md shadow-secondary/20',
  outline:
    'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-300/50',
  ghost:
    'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 focus:ring-gray-200',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30 shadow-md shadow-red-600/20',
  gradient:
    'group relative bg-gradient-to-l from-primary to-rose-800 text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.02] whitespace-nowrap',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-xs font-bold rounded-xl gap-2',
  lg: 'px-5 py-3 text-sm font-medium rounded-2xl gap-2',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon = null,
  iconPosition = 'right',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 select-none';

  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  const isGradient = variant === 'gradient';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {/* Spinner حالت loading */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* آیکون سمت راست (پیش‌فرض) */}
      {!loading && Icon && iconPosition === 'right' && (
        isGradient ? (
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        ) : (
          <Icon className="w-4 h-4 shrink-0 stroke-[2]" />
        )
      )}

      {/* متن دکمه */}
      {children && <span>{children}</span>}

      {/* آیکون سمت چپ */}
      {!loading && Icon && iconPosition === 'left' && (
        isGradient ? (
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        ) : (
          <Icon className="w-4 h-4 shrink-0 stroke-[2]" />
        )
      )}
    </button>
  );
}