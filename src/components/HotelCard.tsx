'use client'
import Link from "next/link";
import { Star, MapPin, Users } from "lucide-react";
import type { Hotel } from "@/data/hotels";
import { Arrow } from "./Motion";

export default function HotelCard({ hotel, compact = false }: { hotel: Hotel, compact?: boolean }) {
  const getFormattedPriceLabel = (label?: string) => {
    const base = "per night";
    if (!label) return base;
    const cleanLabel = label.replace(/^\/?\s*/, '').toLowerCase().trim();
    if (cleanLabel === "per night" || cleanLabel === "night" || cleanLabel === "") return base;
    return `${base} / ${label.replace(/^\/?\s*/, '')}`;
  };

  const href = `/resorts/${hotel.slug || hotel.id}`;
  const amenities = (hotel.amenities || []).slice(0, 3);

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-[26px] bg-sand">
        <img
          src={hotel.image || '/placeholder.jpg'}
          alt={hotel.name || 'Resort'}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/70 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">
          {hotel.type}
        </span>
        {hotel.no_of_persons && (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">
            <Users size={13} className="text-teal" /> {hotel.no_of_persons}
          </span>
        )}

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <Star size={15} className="fill-amber text-amber" /> {hotel.rating}
            <span className="text-xs font-normal text-white/65">({hotel.reviews || 0})</span>
          </span>
          {/* amenities slide up on hover */}
          {amenities.length > 0 && !compact && (
            <span className="max-w-[60%] translate-y-3 truncate rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-semibold text-ocean opacity-0 backdrop-blur transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {amenities.join(" · ")}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <Link href={href}>
          <h3 className="line-clamp-2 font-heading text-[1.5rem] leading-tight text-ocean transition-colors group-hover:text-coral" title={hotel.name}>
            {hotel.name}
          </h3>
        </Link>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-charcoal/60">
          <MapPin size={15} className="text-teal" /> {hotel.location}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-ocean/15 pt-4 mt-4">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-charcoal/45">Starting from</p>
            <p className="font-heading text-[1.6rem] leading-none text-ocean">
              {hotel.price}
              <span className="ml-1 text-[0.7rem] font-sans font-medium text-charcoal/50">/ {getFormattedPriceLabel(hotel.price_label)}</span>
            </p>
          </div>
          <Link
            href={href}
            className="group/b inline-flex shrink-0 items-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-coral active:scale-[0.97]"
          >
            Book <Arrow className="transition-transform group-hover/b:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
