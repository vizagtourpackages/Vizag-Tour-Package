'use client'
import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowRight, Clock, Users } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Package } from "@/data/packages";
import { useBooking } from "./booking/BookingContext";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const { openBooking } = useBooking();

  const discountPercent = pkg.originalPrice && pkg.originalPrice > pkg.price
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white border border-charcoal/5 rounded-[32px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col overflow-hidden group h-full">
      {/* Image */}
      <div className="relative p-2">
        <Link href={`/packages/${pkg.slug || pkg.id}`} className="relative overflow-hidden rounded-[24px] block">
          {pkg.imageUrl ? (
            <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
              <Image fill 
                src={pkg.imageUrl} 
                alt={pkg.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : (
            <div style={{ aspectRatio: '3/2' }} className="w-full relative">
              <PlaceholderImage
                gradient={pkg.imageGradient}
                alt={pkg.title}
                className="w-full h-full transform transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                overlay
              />
            </div>
          )}
        </Link>
        {pkg.badge && !pkg.badge.match(/\d+\s*[DN]/i) && (
          <span className="absolute top-6 left-6 badge bg-coral text-white shadow-sm border border-coral/20 tracking-tight z-10">
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-sm border border-charcoal/5 z-10 flex flex-col items-end min-w-[100px]">
          {discountPercent > 0 && (
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] sm:text-xs text-charcoal/40 line-through font-bold">
                ₹{pkg.originalPrice?.toLocaleString('en-IN')}
              </span>
              <span className="bg-emerald-100 text-emerald-700 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                {discountPercent}% OFF
              </span>
            </div>
          )}
          <div className="flex items-baseline">
            <span className="text-sm sm:text-base font-black text-charcoal tracking-tight leading-none">₹{pkg.price.toLocaleString('en-IN')}</span>
            <span className="text-[8px] font-bold text-charcoal/60 uppercase tracking-wider ml-0.5">/{pkg.priceLabel || 'PER COUPLE'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-7 flex flex-col flex-1 min-w-0">
        <Link href={`/packages/${pkg.slug || pkg.id}`} className="group-hover:text-coral transition-colors">
          <h3 className="font-heading text-2xl font-bold text-charcoal mb-4 leading-tight break-words tracking-tight">
            {pkg.title}
          </h3>
        </Link>

        {/* Duration & People */}
        <div className="flex items-center gap-4 mb-5 text-sm text-charcoal/60 font-medium flex-wrap">
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-teal shrink-0" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={16} className="text-teal shrink-0" />
            {pkg.people}
          </span>
        </div>

        {/* Highlights - Marquee */}
        <div className="flex overflow-hidden relative w-full mb-6 pb-2 group/marquee">
          <div className="flex gap-2 animate-marquee group-hover/marquee:[animation-play-state:paused] whitespace-nowrap shrink-0">
            {pkg.highlights.map((h, i) => (
              <span
                key={`${h}-${i}`}
                className="text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-charcoal/70 inline-block"
              >
                {h}
              </span>
            ))}
            {/* Duplicate for seamless loop if there are only a few items, though usually there's enough. We'll duplicate them just in case. */}
            {pkg.highlights.map((h, i) => (
              <span
                key={`${h}-dup-${i}`}
                className="text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-charcoal/70 inline-block"
              >
                {h}
              </span>
            ))}
            {pkg.highlights.map((h, i) => (
              <span
                key={`${h}-dup2-${i}`}
                className="text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-charcoal/70 inline-block"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Includes / Excludes */}
        <div className="space-y-4 mb-8 flex-1 min-w-0 border-t border-charcoal/5 pt-5">
          <div>
            <span className="text-[10px] font-black text-teal uppercase tracking-widest block mb-2">
              Includes
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pkg.includes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-medium text-charcoal/70 break-words"
                >
                  <Check size={14} className="text-teal shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black text-coral uppercase tracking-widest block mb-2">
              Excludes
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pkg.excludes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-medium text-charcoal/50 break-words"
                >
                  <X size={14} className="text-coral/70 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-auto min-w-0">
          <Link
            href={`/packages/${pkg.slug || pkg.id}`}
            className="btn-whatsapp flex-1 !text-sm !py-3 !px-4 justify-center text-center whitespace-nowrap min-w-0 bg-teal hover:bg-teal-dark"
          >
            Book Now
          </Link>
          <Link
            href={`/packages/${pkg.slug || pkg.id}`}
            className="btn-secondary !py-3 !px-4 justify-center shrink-0 border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/5 text-charcoal"
            aria-label={`View itinerary for ${pkg.title}`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
