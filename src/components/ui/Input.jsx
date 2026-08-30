'use client';

import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      startIcon: StartIcon,
      endIcon: EndIcon,
      className = '',
      containerClassName = '',
      disabled = false,
      type = 'text',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`w-full space-y-1.5 ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative flex items-center w-full">
          {/* Start Icon (آیکون سمت راست در RTL) */}
          {StartIcon && (
            <div className="absolute right-4 pointer-events-none text-gray-400">
              <StartIcon className="w-5 h-5 stroke-[2]" />
            </div>
          )}

          {/* Core HTML Input */}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={`
              w-full bg-gray-100/80 focus:bg-white border text-sm font-medium text-gray-800 
              rounded-2xl outline-none transition-all duration-200 placeholder:text-gray-400
              ${StartIcon ? 'pr-12' : 'pr-4'}
              ${EndIcon ? 'pl-12' : 'pl-4'}
              ${
                error
                  ? 'border-red-500 focus:ring-4 ring-red-500/20'
                  : 'border-gray-200 focus:border-transparent focus:ring-4 ring-[var(--color-primary-500)]/30'
              }
              ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-200' : ''}
              ${className}
            `}
            {...props}
          />

          {/* End Icon or Custom Action (آیکون سمت چپ در RTL) */}
          {EndIcon && (
            <div className="absolute left-3 flex items-center">
              {typeof EndIcon === 'function' ? (
                <EndIcon className="w-5 h-5 text-gray-400 stroke-[2]" />
              ) : (
                EndIcon
              )}
            </div>
          )}
        </div>

        {/* Error or Helper Message */}
        {error ? (
          <p className="text-[11px] font-bold text-red-500 mr-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] font-medium text-gray-400 mr-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;