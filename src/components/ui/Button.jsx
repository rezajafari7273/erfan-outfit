'use client';

import React from 'react';

const VARIANTS = {
  gradient:
    'bg-gradient-to-l from-primary to-rose-800 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:brightness-110',
  solid:
    'bg-primary text-white hover:bg-primary/90 shadow-sm',
  outline:
    'bg-transparent border border-primary/30 text-primary hover:bg-primary/5',
  ghost:
    'bg-transparent text-primary hover:bg-primary/5',
  soft:
    'bg-primary/10 text-primary hover:bg-primary/20',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
};

const SIZES = {
  xs: 'text-[10px] px-2 py-1 rounded-md gap-1',
  sm: 'text-[11px] px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-xs px-4 py-2 rounded-xl gap-2',
  lg: 'text-sm px-5 py-2.5 rounded-xl gap-2',
  xl: 'text-base px-6 py-3 rounded-2xl gap-2.5',
};

const ICON_SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-4.5 h-4.5',
  xl: 'w-5 h-5',
};

export default function Button({
  children,
  variant = 'solid',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  ...rest
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.solid;
  const sizeClass = SIZES[size] || SIZES.md;
  const iconClass = ICON_SIZES[size] || ICON_SIZES.md;

  const baseClass =
    'inline-flex items-center justify-center font-bold transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  const iconEl = Icon ? (
    <Icon className={`${iconClass} shrink-0 stroke-[2]`} aria-hidden="true" />
  ) : null;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {iconPosition === 'left' && iconEl}
          {children}
          {iconPosition === 'right' && iconEl}
        </>
      )}
    </button>
  );
}