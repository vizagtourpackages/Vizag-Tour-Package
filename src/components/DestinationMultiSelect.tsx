"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";

/** "Where to?" — pick one or more destinations with checkboxes. Looks like the other planner tiles. */
export default function DestinationMultiSelect({
  options,
  value,
  onChange,
  label = "Where to?",
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (o: string) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
  const summary = value.length === 0 ? "Choose places" : value.length <= 2 ? value.join(", ") : `${value[0]} +${value.length - 1} more`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-2xl bg-sand/60 px-4 py-3 text-left transition-colors hover:bg-sand focus-visible:bg-sand"
      >
        <MapPin size={18} className="shrink-0 text-coral" />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.64rem] font-bold uppercase tracking-wider text-charcoal/45">{label}</span>
          <span className="block truncate text-base font-semibold text-ocean">{summary}</span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-ocean/45 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-ocean/10 bg-white p-1.5 shadow-[0_24px_50px_-18px_rgba(10,42,77,.45)]"
        >
          {options.map((o) => {
            const on = value.includes(o);
            return (
              <button
                key={o}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => toggle(o)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-sand/70"
              >
                <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${on ? "border-coral bg-coral text-white" : "border-ocean/25 bg-white"}`}>
                  {on && <Check size={13} strokeWidth={3.5} />}
                </span>
                <span className="text-[0.95rem] font-medium text-ocean">{o}</span>
              </button>
            );
          })}
          <div className="mt-1 flex items-center justify-between border-t border-ocean/8 px-3 pb-1.5 pt-2.5">
            <button type="button" onClick={() => onChange([])} className="text-sm font-medium text-ocean/55 hover:text-ocean">Clear</button>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-ocean px-4 py-1.5 text-sm font-semibold text-white">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
