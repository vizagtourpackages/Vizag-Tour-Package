import { Calendar } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white border border-charcoal/5 rounded-[24px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col overflow-hidden h-full group">
      <div className="relative overflow-hidden p-2">
        <div className="relative overflow-hidden rounded-[16px] bg-sand">
          {event.imageUrl ? (
            <div className="relative h-48 w-full">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : (
            <PlaceholderImage
              gradient={event.imageGradient}
              alt={event.title}
              className="h-48 w-full transform transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal bg-teal/10 px-3 py-1.5 rounded-full shrink-0 whitespace-nowrap">
            {event.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-charcoal/40 font-bold shrink-0 tracking-wide">
            <Calendar size={14} className="text-charcoal/30" />
            {event.year}
          </div>
        </div>
        
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-3 leading-tight group-hover:text-coral transition-colors break-words tracking-tight">
          {event.title}
        </h3>
        
        <p className="text-sm text-charcoal/60 flex-1 break-words line-clamp-3 font-medium leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
