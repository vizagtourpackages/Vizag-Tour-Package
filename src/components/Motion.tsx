"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Strong ease-out used across the site. */
export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Words slide up out of a mask. Words listed in `accent` render in italic sunset. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  accent = [] as string[],
  light = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  accent?: string[];
  light?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]" aria-hidden>
          <motion.span
            className={`inline-block ${accent.includes(w) ? (light ? "italic text-amber" : "italic text-coral") : ""}`}
            initial={{ y: "110%", rotate: 3 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
