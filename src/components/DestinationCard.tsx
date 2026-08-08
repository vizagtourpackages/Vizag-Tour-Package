import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  // Check if this destination has a dedicated page
  const hasDedicatedPage = ["araku-valley", "lambasingi", "vanjangi"].includes(
    destination.id
  );
  
  const href = hasDedicatedPage ? `/${destination.id}` : "/route-map";

  return (
    <Link href={href} className="group block h-full">
      <div className="card-base h-full flex flex-col overflow-hidden">
        <div className="relative overflow-hidden">
          <PlaceholderImage
            gradient={destination.imageGradient}
            alt={destination.name}
            className="h-48 w-full transform transition-transform duration-500 group-hover:scale-110"
            overlay
          />
          <span className="absolute top-4 left-4 badge bg-black/40 backdrop-blur-md text-white border border-white/20">
            {destination.category}
          </span>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading text-xl text-charcoal mb-2 group-hover:text-ocean transition-colors flex items-start justify-between gap-2">
            <span>{destination.name}</span>
            <ArrowRight size={18} className="text-ocean opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 mt-1" />
          </h3>
          <p className="text-sm text-charcoal-light/70 line-clamp-3 mb-4 flex-1">
            {destination.description}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium text-teal mt-auto pt-4 border-t border-sand">
            <MapPin size={14} />
            <span>Visakhapatnam District</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
