'use client'
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import type { Hotel } from "@/data/hotels";
import { useBooking } from "./booking/BookingContext";

export default function HotelCard({ hotel, compact = false }: { hotel: Hotel, compact?: boolean }) {
  const { openBooking } = useBooking();
  return (
    <div className="bg-white border border-charcoal/5 rounded-[24px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 h-full flex flex-col overflow-hidden group">
      <Link href={`/resorts/${hotel.slug || hotel.id}`} className="w-full relative p-2 block group-hover:scale-[1.01] transition-transform">
        <div className="relative w-full rounded-[16px] overflow-hidden bg-sand" style={{ aspectRatio: '3/2' }}>
          <Image
            src={hotel.image || '/placeholder.jpg'}
            alt={hotel.name || 'Resort'}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg z-20">
            <div className="flex items-center gap-1 font-bold text-sm text-charcoal">
              <Star size={14} className="text-coral fill-coral" />
              {hotel.rating}
            </div>
            <span className="text-[10px] font-bold text-charcoal/60 uppercase tracking-wide">({hotel.reviews || 0})</span>
          </div>
        </div>
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-charcoal shadow-sm border border-charcoal/5 z-20">
          {hotel.type}
        </div>
      </Link>

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <Link href={`/resorts/${hotel.slug || hotel.id}`} className="group-hover:text-coral transition-colors block mb-1">
            <h3 className="font-heading font-bold text-xl text-charcoal leading-tight tracking-tight line-clamp-2" title={hotel.name}>{hotel.name}</h3>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-charcoal/60 mb-5 font-medium">
          <MapPin size={16} className="text-teal" />
          {hotel.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {hotel.amenities.map((amenity, idx) => (
            <span key={idx} className="flex items-center gap-1 text-[11px] font-bold bg-charcoal/5 text-charcoal/70 px-3 py-1.5 rounded-full tracking-wide uppercase">
              <CheckCircle2 size={12} className="text-teal" />
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5 border-t border-charcoal/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-xs text-charcoal/50 block font-bold uppercase tracking-wider mb-0.5">Starting from</span>
            <span className={`font-black text-charcoal tracking-tight ${compact ? 'text-xl' : 'text-2xl'}`}>{hotel.price}</span>
            <span className="text-[10px] sm:text-xs text-charcoal/50 font-medium"> {hotel.price_label ? hotel.price_label : '/ night'}</span>
          </div>
          <Link href={`/resorts/${hotel.slug || hotel.id}`} className={`btn-primary rounded-full bg-charcoal hover:bg-coral inline-block text-center ${compact ? 'py-1.5 px-4 text-xs' : 'py-2.5 px-6 text-sm'}`}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
