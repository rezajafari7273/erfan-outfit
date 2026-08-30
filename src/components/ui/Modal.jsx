"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="بستن"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div
        className={`
          relative
          z-10
          w-full
          ${sizes[size]}
          overflow-hidden
          rounded-2xl
          border
          border-border
          bg-surface
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
      >
        {/* Header */}
        {(title || description) && (
          <div className="border-b border-border px-6 py-5">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-bold text-text-primary"
              >
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-border bg-surface-secondary px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}