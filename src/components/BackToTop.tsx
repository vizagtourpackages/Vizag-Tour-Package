"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]"
    >
      Back to top
      <ArrowUp size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
