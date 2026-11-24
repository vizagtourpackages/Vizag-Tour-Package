import Link from "next/link";
import { Calendar } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Event } from "@/data/events";
import { Arrow } from "./Motion";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.slug || event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_2px_0_rgba(10,42,77,.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(10,42,77,.4)]"
    >
      {/* edge-to-edge image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-sand">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage gradient={event.imageGradient} alt={event.title} className="absolute inset-0 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">
          {event.category}
        </span>
        <span className="absolute bottom-3.5 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <Calendar size={13} /> {event.year}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-6">
        <h3 className="font-heading text-[1.4rem] leading-tight text-ocean transition-colors group-hover:text-coral">{event.title}</h3>
        <p className="mt-3 flex-1 line-clamp-3 text-[0.9rem] leading-relaxed text-charcoal/65">{event.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ocean transition-colors group-hover:text-coral">
          Read more <Arrow className="transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
