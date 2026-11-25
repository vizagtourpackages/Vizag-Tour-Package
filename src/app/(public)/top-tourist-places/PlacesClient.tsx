"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import DestinationCard from "@/components/DestinationCard";
import { Reveal, Arrow } from "@/components/Motion";
import { waMessages, waUrl } from "@/lib/whatsapp";
import { useBooking } from "@/components/booking/BookingContext";

export default function PlacesClient({ places, firstId }: { places: any[]; firstId?: string }) {
  const { openBooking } = useBooking();
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const categories = useMemo(() => ["All", ...Array.from(new Set(places.map((p) => p.category).filter(Boolean)))], [places]);

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return places.filter((p) => (cat === "All" || p.category === cat) && (!s || (p.name + " " + (p.description || "")).toLowerCase().includes(s)));
  }, [places, cat, q]);

  // jump to the place we arrived for (?first=id)
  useEffect(() => {
    if (!firstId) return;
    const el = document.getElementById(firstId);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
  }, [firstId]);

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8">
      {/* search + category filter */}
      <div className="mb-8 space-y-4">
        <div className="relative mx-auto max-w-xl">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ocean/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search beaches, temples, viewpoints…"
            aria-label="Search places"
            className="w-full rounded-full border border-ocean/12 bg-white py-3.5 pl-12 pr-12 text-base font-medium text-ocean outline-none placeholder:font-normal placeholder:text-ocean/35 focus:border-coral focus:ring-4 focus:ring-coral/15"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-ocean/5 text-ocean">
              <X size={15} />
            </button>
          )}
        </div>

        {categories.length > 2 && (
          <div role="tablist" aria-label="Filter by category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] ${
                  cat === c ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean/75 hover:border-ocean/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <p className="text-center text-sm font-medium text-charcoal/50" aria-live="polite">
          {shown.length} {shown.length === 1 ? "place" : "places"}
        </p>
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((place, i) => (
            <Reveal key={place.id} delay={(i % 4) * 0.05}>
              <div id={place.id} className={`h-full scroll-mt-28 rounded-[26px] transition-shadow duration-500 ${firstId === place.id ? "ring-4 ring-coral/40 ring-offset-4 ring-offset-warm-white" : ""}`}>
                <DestinationCard destination={place} />
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] bg-white py-16 text-center shadow-card">
          <p className="font-heading text-xl text-ocean">No places match your search</p>
          <button onClick={() => { setQ(""); setCat("All"); }} className="btn-secondary mt-5">Clear filters</button>
        </div>
      )}

      {/* closing CTA */}
      <div className="mt-20 rounded-[32px] bg-sand px-6 py-12 text-center sm:px-12">
        <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-ocean">
          See them all <span className="italic text-coral">in a day.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-charcoal/65">Book a local sightseeing package or a private cab and cover your favourite spots at your own pace.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/tour-packages" className="btn-coral !px-8 !py-4">View packages <Arrow /></Link>
          <button onClick={() => openBooking("cab", null)} className="btn-secondary !px-8 !py-4">Book a cab</button>
          <a href={waUrl(waMessages.packages)} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-8 !py-4">Ask on WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
