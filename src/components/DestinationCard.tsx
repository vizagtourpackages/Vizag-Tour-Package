import Link from "next/link";
import { MapPin, ArrowRight, Clock, IndianRupee } from "lucide-react";
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
            {destination.name}
          </span>
          {destination.price && (
            <span className="absolute top-4 right-4 badge bg-white/90 backdrop-blur-md text-charcoal font-bold border border-white/40 shadow-sm">
              {destination.price}
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
          <h3 className="font-heading text-lg sm:text-xl text-charcoal mb-2 group-hover:text-ocean transition-colors flex items-start justify-between gap-2 min-w-0">
            <span className="break-words min-w-0">{destination.name}</span>
            <ArrowRight size={18} className="text-ocean opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 mt-1" />
          </h3>
          <p className="text-sm text-charcoal-light/70 line-clamp-3 mb-4 flex-1 break-words">
            {destination.description}
          </p>
          <div className="flex items-center gap-3 text-xs font-medium text-teal mt-auto pt-4 border-t border-sand flex-wrap">
            {destination.distance ? (
              <>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="shrink-0" />
                  {destination.distance}
                </span>
                {destination.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="shrink-0" />
                    {destination.duration}
                  </span>
                )}
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate">Visakhapatnam District</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
