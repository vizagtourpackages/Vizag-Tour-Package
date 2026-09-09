"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft, User } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Model name pill */}
      <div className="p-5 pb-0">
        <span className="inline-block text-xs font-bold text-ocean bg-ocean/10 px-3 py-1.5 rounded-full uppercase tracking-wide">
          {vehicle.model}
        </span>
      </div>

      {/* Price + Pax row */}
      <div className="px-5 pt-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold text-charcoal">
          {vehicle.pricePerKm} <span className="text-sm font-medium text-charcoal/60">per km</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/70 bg-gray-100 px-3 py-1.5 rounded-full">
          <User size={14} />
          {vehicle.pax} Pax
        </span>
      </div>

      {/* Min km note */}
      <div className="px-5 pt-2">
        <p className="text-[11px] text-charcoal/40 leading-snug">{vehicle.minKmNote}</p>
      </div>

      {/* Car image */}
      <div className="px-4 py-3">
        <div className="w-full aspect-[5/3] relative bg-gray-50 rounded-xl overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.model}
            fill
            sizes="(max-width: 768px) 90vw, 25vw"
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              if (target.parentElement) {
                target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">${vehicle.model}</div>`;
              }
            }}
          />
        </div>
      </div>

      {/* Amenity tags */}
      <div className="px-5 pb-5 flex gap-2 flex-wrap">
        {vehicle.amenities.map((amenity, idx) => (
          <span
            key={idx}
            className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full"
          >
            {amenity}
          </span>
        ))}
      </div>
    </div>
  );
}

interface FleetSectionProps {
  vehicles: Vehicle[];
}

export default function FleetSection({ vehicles }: FleetSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const cardWidth = containerRef.current.scrollWidth / vehicles.length;
    const scrollAmount = direction === "right" ? cardWidth : -cardWidth;
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
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-charcoal" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-charcoal" />
        </button>
      )}

      {/* Cards container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="min-w-[260px] w-[calc(25%-15px)] flex-shrink-0 snap-start"
          >
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </div>

      {/* Safety Guaranteed Banner */}
      <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-emerald-900 text-base">Safety Guaranteed</h4>
          <p className="text-emerald-700/80 text-sm mt-0.5">
            All vehicles are regularly sanitized and maintained for your safety and comfort.
          </p>
        </div>
      </div>
    </div>
  );
}
