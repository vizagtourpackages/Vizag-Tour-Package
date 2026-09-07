"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scrollability
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      // Also check on resize
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = clientWidth > 768 ? clientWidth / 2 : clientWidth * 0.8;
      const target =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      
      containerRef.current.scrollTo({
        left: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Controls (Desktop) */}
      <div className="hidden lg:flex justify-end gap-3 mb-6 pr-4">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full flex items-center justify-center border border-sand transition-all ${
            canScrollLeft
              ? "bg-white text-charcoal hover:bg-ocean hover:text-white hover:border-ocean"
              : "bg-white/50 text-charcoal/30 cursor-not-allowed"
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full flex items-center justify-center border border-sand transition-all ${
            canScrollRight
              ? "bg-white text-charcoal hover:bg-ocean hover:text-white hover:border-ocean"
              : "bg-white/50 text-charcoal/30 cursor-not-allowed"
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPadding: "0 1rem" }}
      >
        <div className="flex gap-4 sm:gap-6 w-max">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-[350px] sm:max-w-none lg:w-[400px] snap-start shrink-0"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
