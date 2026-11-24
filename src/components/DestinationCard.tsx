import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Destination } from "@/data/destinations";
import { Arrow } from "./Motion";

interface DestinationCardProps {
  destination: Destination;
  basePath?: string;
}

export default function DestinationCard({ destination, basePath }: DestinationCardProps) {
  const slug = destination.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  // Check if this destination has a dedicated page
  const hasDedicatedPage = ["araku-valley", "lambasingi", "vanjangi"].includes(slug);

  // If basePath is provided, we assume it supports dynamic routes (like /devotional/[id])
  // Otherwise, default fallback is just "/route-map" (without ID)
  const fallbackHref = basePath ? `${basePath}/${destination.id}` : "/route-map";

  const href = destination.customLink || (hasDedicatedPage ? `/${slug}` : fallbackHref);

  return (
    <Link href={href} className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-sand">
        {destination.imageUrl ? (
          <img
            src={destination.imageUrl}
            alt={destination.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage gradient={destination.imageGradient} alt={destination.name} className="absolute inset-0 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/75 via-transparent to-transparent" />

        {destination.price && (
          <span className="absolute right-4 top-4 rounded-full bg-sunset px-3.5 py-1.5 text-xs font-bold text-white shadow-glow">
            {destination.price}
          </span>
        )}

        <div className="absolute inset-x-5 bottom-5 text-white">
          <h3 className="font-heading text-[1.55rem] leading-tight">{destination.name}</h3>
          <p className="mt-1 flex items-center gap-3 text-xs font-medium text-white/75">
            <span className="flex items-center gap-1.5"><MapPin size={13} />{destination.distance || "Visakhapatnam District"}</span>
            {destination.duration && <span className="flex items-center gap-1.5"><Clock size={13} />{destination.duration}</span>}
          </p>
          {/* description reveals on hover */}
          <p className="mt-0 line-clamp-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-[max-height,opacity,margin] duration-500 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100">
            {destination.description}
          </p>
        </div>
      </div>

      <span className="mt-4 inline-flex items-center gap-2 px-1 text-sm font-semibold text-ocean transition-colors group-hover:text-coral">
        {basePath === '/devotional' ? 'Read more' : 'Explore'} <Arrow className="transition-transform group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
