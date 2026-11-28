"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ScrollCarouselProps {
  children: ReactNode;
  gap?: string;
  /** Phones: one near full-width card with just the edge of the next one showing. */
  wide?: boolean;
}

/**
 * Horizontal carousel. Desktop: arrow buttons. Mobile: edge fade + a "Swipe" hint with a
 * progress bar so people know there is more to the side.
 */
export default function ScrollCarousel({ children, gap = "gap-5", wide = false }: ScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [scrollable, setScrollable] = useState(false);
  const [touched, setTouched] = useState(false);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 12);
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
    if (el.scrollLeft > 24) setTouched(true);
  }, []);

  useEffect(() => {
    measure();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const scroll = (direction: "left" | "right") => {
    containerRef.current?.scrollBy({ left: direction === "right" ? 320 : -320, behavior: "smooth" });
  };

  const canLeft = progress > 0.02;
  const canRight = scrollable && progress < 0.98;

  return (
    <div className="relative">
      {canLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ocean/10 bg-white shadow-lg transition-[background-color,transform] duration-200 hover:bg-sand active:scale-95 md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-ocean" />
        </button>
      )}
      {canRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-ocean/10 bg-white shadow-lg transition-[background-color,transform] duration-200 hover:bg-sand active:scale-95 md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-ocean" />
        </button>
      )}

      {/* soft edge fade on mobile: signals "more this way" */}
      {canRight && !wide && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-warm-white/90 to-transparent md:hidden" />
      )}

      <div
        ref={containerRef}
        onScroll={measure}
        className={`flex ${gap} overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar ${
          wide ? "max-md:-mr-4 max-md:pr-4 max-md:[&>*]:!w-[calc(100%-0.75rem)]" : "pr-6 md:pr-0 [&>*]:max-w-[84%] md:[&>*]:max-w-none"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* mobile hint + progress */}
      {scrollable && (
        <div className="mt-4 flex items-center gap-3 md:hidden" aria-hidden>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ocean/10">
            <div
              className="h-full origin-left rounded-full bg-sunset transition-transform duration-150"
              style={{ transform: `scaleX(${Math.max(0.12, progress)})`, width: "100%" }}
            />
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-wider text-ocean/55 transition-opacity duration-500 ${
              touched ? "opacity-0" : "opacity-100"
            }`}
          >
            Swipe <ChevronRight size={14} className="animate-[nudge_1.4s_ease-in-out_infinite]" />
          </span>
        </div>
      )}
    </div>
  );
}
