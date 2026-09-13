"use client";

import { useState, useRef, type ReactNode } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ScrollCarouselProps {
  children: ReactNode;
  gap?: string;
}

export default function ScrollCarousel({ children, gap = "gap-5" }: ScrollCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = direction === "right" ? 320 : -320;
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    setScrollPosition(containerRef.current.scrollLeft);
  };

  const canScrollLeft = scrollPosition > 10;
  const canScrollRight = containerRef.current
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth - 10
    : true;

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-charcoal" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-charcoal" />
        </button>
      )}

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`flex ${gap} overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 hide-scrollbar`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
}
