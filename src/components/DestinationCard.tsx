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
      <div className="bg-white border border-charcoal/5 rounded-[24px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 h-full flex flex-col overflow-hidden">
        <div className="relative overflow-hidden p-2">
          <PlaceholderImage
            gradient={destination.imageGradient}
            alt={destination.name}
            className="h-48 w-full rounded-[16px] transform transition-transform duration-700 group-hover:scale-105"
            overlay
          />
          <span className="absolute top-6 left-6 badge bg-white/90 backdrop-blur-md text-charcoal font-bold tracking-tight shadow-sm border border-charcoal/5">
            {destination.name}
          </span>
          {destination.price && (
            <span className="absolute top-6 right-6 badge bg-coral text-white font-bold tracking-tight shadow-sm">
              {destination.price}
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-3 group-hover:text-coral transition-colors flex items-start justify-between gap-2 min-w-0 tracking-tight">
            <span className="break-words min-w-0 leading-tight">{destination.name}</span>
            <ArrowRight size={20} className="text-coral opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
          </h3>
          <p className="text-sm text-charcoal/60 line-clamp-3 mb-6 flex-1 break-words leading-relaxed font-medium">
            {destination.description}
          </p>
          <div className="flex items-center gap-3 text-xs font-bold text-teal mt-auto pt-5 border-t border-charcoal/5 flex-wrap tracking-wide uppercase">
            {destination.distance ? (
              <>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="shrink-0" />
                  {destination.distance}
                </span>
                {destination.duration && (
                  <span className="flex items-center gap-1.5">
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
