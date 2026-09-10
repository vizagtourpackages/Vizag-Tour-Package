import Image from "next/image";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import type { Hotel } from "@/data/hotels";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white border border-charcoal/5 rounded-[24px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 h-full flex flex-col overflow-hidden group">
      <div className="w-full aspect-[4/3] relative p-2">
        <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-sand">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-charcoal shadow-sm border border-charcoal/5">
          {hotel.type}
        </div>
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading font-bold text-xl text-charcoal leading-tight pr-2 tracking-tight group-hover:text-coral transition-colors">{hotel.name}</h3>
          <div className="flex items-center gap-1.5 bg-sand-light border border-charcoal/5 px-2.5 py-1 rounded-full text-sm font-bold shrink-0">
            <Star size={14} className="text-coral fill-coral" />
            {hotel.rating}
          </div>
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
            <span className="text-xs text-charcoal/50 block font-bold uppercase tracking-wider mb-0.5">Starting from</span>
            <span className="text-2xl font-black text-charcoal tracking-tight">{hotel.price}</span>
            <span className="text-xs text-charcoal/50 font-medium"> / night</span>
          </div>
          <button className="btn-primary py-2.5 px-6 text-sm rounded-full bg-charcoal hover:bg-coral">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
