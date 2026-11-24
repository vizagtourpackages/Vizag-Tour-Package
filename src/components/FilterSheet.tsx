"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ease } from "./Motion";

/**
 * Full-screen filter view for mobile (same pattern as the search overlay):
 * header with close, scrollable options, sticky footer with Clear + "Show N results".
 */
export default function FilterSheet({
  open,
  onClose,
  onClear,
  title = "Filters",
  resultCount,
  resultLabel = "results",
  children,
}: {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  title?: string;
  resultCount: number;
  resultLabel?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          data-lenis-prevent
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease }}
          className="fixed inset-0 z-[260] flex flex-col bg-warm-white"
        >
          <div className="flex items-center justify-between border-b border-ocean/10 bg-white px-4 py-3.5">
            <h2 className="font-heading text-[1.35rem] text-ocean">{title}</h2>
            <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-ocean/5 text-ocean">
              <X size={20} />
            </button>
          </div>

          <div className="thin-scroll flex-1 overflow-y-auto px-4 py-5">{children}</div>

          <div className="flex items-center gap-3 border-t border-ocean/10 bg-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <button
              onClick={onClear}
              className="rounded-full px-5 py-3.5 text-sm font-semibold text-ocean underline-offset-4 hover:underline"
            >
              Clear all
            </button>
            <button onClick={onClose} className="btn-coral flex-1 !py-3.5 text-sm">
              Show {resultCount} {resultLabel}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Pill-style single-select option used inside FilterSheet. */
export function OptionPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] ${
        active ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean/80"
      }`}
    >
      {children}
    </button>
  );
}

export function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h3 className="mb-3 font-[family-name:var(--font-body)] text-[0.72rem] font-bold uppercase tracking-[0.18em] text-charcoal/50">{title}</h3>
      {children}
    </section>
  );
}
