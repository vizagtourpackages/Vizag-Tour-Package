import { Calendar } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-sand">
      <div className="sm:w-48 shrink-0 overflow-hidden rounded-xl">
        <PlaceholderImage
          gradient={event.imageGradient}
          alt={event.title}
          className="h-40 sm:h-full w-full transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col flex-1 py-1 sm:py-2">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-xs font-semibold text-ocean bg-ocean/10 px-2.5 py-1 rounded-md">
            {event.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-charcoal-light/60 font-medium">
            <Calendar size={14} />
            {event.year}
          </div>
        </div>
        
        <h3 className="font-heading text-lg sm:text-xl text-charcoal mb-2 leading-tight group-hover:text-ocean transition-colors">
          {event.title}
        </h3>
        
        <p className="text-sm text-charcoal-light/70 line-clamp-2 sm:line-clamp-none">
          {event.description}
        </p>
      </div>
    </div>
  );
}
