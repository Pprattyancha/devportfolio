"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Popup({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: PopupProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      {/* Popup */}
      <div
        className="flex h-[85vh] w-[90vw] max-w-4xl flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between bg-black px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="text-sm text-gray-400">
                {subtitle}
              </p>
            )}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-2xl text-white transition hover:bg-white/10"
            aria-label="Close popup"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 bg-gray-100">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex shrink-0 justify-end gap-3 border-t bg-black p-4 py-8">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}