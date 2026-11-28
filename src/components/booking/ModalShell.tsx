"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, X } from "lucide-react";

/**
 * Shared shell for booking popups: bottom sheet on phones, centered card on larger screens.
 * Sticky header: [back arrow] title … [close]. The back control is an icon only, left of the title.
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
  const dialog = useRef<HTMLDivElement>(null);

  // move focus into the dialog, keep Tab inside it, and give focus back on close
  useEffect(() => {
    const node = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    node?.focus({ preventScroll: true });
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !node) return;
      const items = Array.from(
        node.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.getClientRects().length > 0);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === node)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
    };
    node?.addEventListener("keydown", trap);
    return () => {
      node?.removeEventListener("keydown", trap);
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

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
        ref={dialog}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        data-lenis-prevent
        className="thin-scroll relative flex outline-none max-h-[94vh] w-full flex-col overflow-hidden rounded-t-[26px] bg-white shadow-2xl [max-height:94dvh] sm:max-h-[90vh] sm:max-w-xl sm:rounded-[26px]"
      >
        <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-ocean/15 sm:hidden" />

        <header className="flex shrink-0 items-center gap-3 border-b border-ocean/8 px-4 pb-3.5 pt-3 sm:px-6 sm:pt-5">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label={backLabel}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ocean/15 bg-white text-ocean shadow-[0_4px_14px_-6px_rgba(10,42,77,.3)] transition-[background-color,transform] duration-150 hover:bg-sand active:scale-90"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="font-heading text-[1.3rem] leading-tight text-ocean sm:text-[1.5rem]">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[0.84rem] leading-snug text-charcoal/60">{subtitle}</p>}
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
