import { Calendar } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card-base group flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 sm:p-5 border border-sand min-w-0">
      <div className="sm:w-48 shrink-0 overflow-hidden rounded-xl">
        <PlaceholderImage
          gradient={event.imageGradient}
          alt={event.title}
          className="h-40 sm:h-full w-full transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col flex-1 py-1 sm:py-2 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-ocean bg-ocean/10 px-2.5 py-1 rounded-md shrink-0 whitespace-nowrap [writing-mode:horizontal-tb]">
            {event.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-light/60 font-medium shrink-0">
            <Calendar size={14} />
            {event.year}
          </div>
        </div>
        
        <h3 className="font-heading text-lg sm:text-xl text-charcoal mb-2 leading-tight group-hover:text-ocean transition-colors break-words">
          {event.title}
        </h3>
        
        <p className="text-sm text-charcoal-light/70 line-clamp-2 sm:line-clamp-none break-words">
          {event.description}
        </p>
      </div>
    </div>
  );
}
