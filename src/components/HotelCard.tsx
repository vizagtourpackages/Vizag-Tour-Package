import Image from "next/image";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import type { Hotel } from "@/data/hotels";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden h-full">
      <div className="w-full aspect-[4/3] relative bg-gray-100">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-charcoal shadow-sm">
          {hotel.type}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-lg text-charcoal leading-tight pr-2">{hotel.name}</h3>
          <div className="flex items-center gap-1 bg-sand-light px-2 py-1 rounded text-sm font-semibold shrink-0">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            {hotel.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-charcoal/60 mb-4">
          <MapPin size={16} />
          {hotel.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {hotel.amenities.map((amenity, idx) => (
            <span key={idx} className="flex items-center gap-1 text-[11px] font-medium bg-ocean/5 text-ocean px-2.5 py-1 rounded-full">
              <CheckCircle2 size={12} />
              {amenity}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal/50 block">Starting from</span>
            <span className="text-xl font-extrabold text-charcoal">{hotel.price}</span>
            <span className="text-xs text-charcoal/60"> / night</span>
          </div>
          <button className="btn-primary py-2 px-4 text-sm">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
