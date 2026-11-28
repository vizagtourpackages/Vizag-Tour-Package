"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling for mouse / trackpad users only. Touch devices keep native scrolling,
 * which is already smooth and has no script overhead. Overlays that scroll internally
 * (modals, sheets, drawers) carry `data-lenis-prevent`.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // lerp follows the wheel closely, so it feels smooth without trailing behind
    const lenis = new Lenis({ lerp: 0.14 });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
