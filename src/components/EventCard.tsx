import { Calendar } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card-base h-full flex flex-col overflow-hidden group border border-sand">
      <div className="relative overflow-hidden">
        <PlaceholderImage
          gradient={event.imageGradient}
          alt={event.title}
          className="h-48 w-full transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-3">
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
        
        <p className="text-sm text-charcoal-light/70 flex-1 break-words line-clamp-3">
          {event.description}
        </p>
      </div>
    </div>
  );
}
