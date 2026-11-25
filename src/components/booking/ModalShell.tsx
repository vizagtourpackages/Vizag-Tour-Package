"use client";

import { useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";

/**
 * Shared shell for booking popups: bottom sheet on phones, centered card on larger screens.
 * Sticky header (title + close) so the close button never scrolls away.
 */
export default function ModalShell({
  title,
  subtitle,
  onClose,
  onBack,
  backLabel = "Back",
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  onBack?: () => void;
  backLabel?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end justify-center bg-ocean/55 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-lenis-prevent
        className="thin-scroll relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-[26px] bg-white shadow-2xl [max-height:94dvh] sm:max-h-[90vh] sm:max-w-xl sm:rounded-[26px]"
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-ocean/15 sm:hidden" />

        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-ocean/8 px-5 pb-3.5 pt-3 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-ocean/12 bg-white px-3.5 py-2 text-sm font-semibold text-ocean shadow-sm transition-[background-color,transform] duration-150 hover:bg-sand active:scale-95"
              >
                <ArrowLeft size={16} /> {backLabel}
              </button>
            )}
            <h2 className="font-heading text-[1.4rem] leading-tight text-ocean sm:text-[1.6rem]">{title}</h2>
            {subtitle && <p className="mt-1 text-[0.86rem] text-charcoal/60">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ocean/6 text-ocean transition-[background-color,transform] duration-150 hover:bg-ocean/10 active:scale-90"
          >
            <X size={19} />
          </button>
        </header>

        <div data-lenis-prevent className="thin-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
