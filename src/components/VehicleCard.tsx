"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";
import { useBooking } from "./booking/BookingContext";
import ScrollCarousel from "./ScrollCarousel";
import { Arrow } from "./Motion";
import { waMessages, waUrl } from "@/lib/whatsapp";

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

interface VehicleCardProps {
  vehicle: Vehicle;
  isHomepage?: boolean;
}

export function VehicleCard({ vehicle, isHomepage }: VehicleCardProps) {
  const { openBooking } = useBooking();
  const router = useRouter();

  const book = () => {
    if (isHomepage) router.push(`/travels?book=${vehicle.id}`);
    else openBooking("cab", vehicle);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_2px_0_rgba(10,42,77,.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(10,42,77,.4)]">
      {/* vehicle on a soft sunset backdrop */}
      <div className="relative aspect-[5/3] overflow-hidden bg-[radial-gradient(ellipse_at_50%_100%,#fde6d2,#fff7ef_65%)]">
        <img
          src={vehicle.image}
          alt={vehicle.model}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
          className="absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean shadow-sm backdrop-blur">
          <User size={13} className="text-coral" /> {vehicle.pax} seats
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="font-heading text-[1.35rem] leading-tight text-ocean">{vehicle.model}</h3>

        <p className="mt-2 font-heading text-[1.9rem] leading-none text-ocean">
          {vehicle.pricePerKm}
          <span className="ml-1.5 font-sans text-sm font-medium text-charcoal/55">per km</span>
        </p>
        {vehicle.minKmNote && <p className="mt-1.5 text-[0.74rem] leading-snug text-charcoal/50">{vehicle.minKmNote}</p>}

        {vehicle.amenities?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {vehicle.amenities.map((a, i) => (
              <li key={i} className="rounded-full bg-teal/10 px-3 py-1 text-[0.72rem] font-semibold text-teal">{a}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-2 pt-5">
          <button
            type="button"
            onClick={book}
            className="group/b inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ocean px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-coral active:scale-[0.97]"
          >
            Book this vehicle <Arrow className="transition-transform group-hover/b:translate-x-1" />
          </button>
          <a
            href={waUrl(waMessages.vehicle(vehicle.model))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${vehicle.model} on WhatsApp`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25d366]/15 text-[#128c4a] transition-colors duration-200 hover:bg-[#25d366] hover:text-white"
          >
            <WaIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

interface FleetSectionProps {
  vehicles: Vehicle[];
  isHomepage?: boolean;
}

/** Home page fleet carousel. (The Travels page has its own filterable grid.) */
export default function FleetSection({ vehicles, isHomepage }: FleetSectionProps) {
  return (
    <div>
      <ScrollCarousel gap="gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="w-[290px] flex-shrink-0 snap-start sm:w-[300px] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
            <VehicleCard vehicle={vehicle} isHomepage={isHomepage} />
          </div>
        ))}
      </ScrollCarousel>

      {isHomepage && (
        <div className="mt-10 flex justify-center">
          <Link href="/travels" className="btn-secondary">
            View all travels <Arrow />
          </Link>
        </div>
      )}
    </div>
  );
}
