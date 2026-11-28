'use client'

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Car, Plane, Mountain, MapPinned, Route, ShieldCheck, Headset, Wallet, BadgeCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal, Arrow, ease } from "@/components/Motion";
import { useBooking } from "@/components/booking/BookingContext";
import DynamicIcon from "@/components/admin/DynamicIcon";
import { waMessages } from "@/lib/whatsapp";
import type { Vehicle } from "@/data/vehicles";
import { useSite } from "@/components/SiteProvider";

const CAPACITY = [
  { label: "All vehicles", test: () => true },
  { label: "Up to 4 seats", test: (p: number) => p <= 4 },
  { label: "5–7 seats", test: (p: number) => p >= 5 && p <= 7 },
  { label: "8–17 seats", test: (p: number) => p >= 8 && p <= 17 },
  { label: "18+ seats", test: (p: number) => p >= 18 },
];

const TRIPS = [
  { icon: Plane, title: "Airport & railway transfers", text: "On-time pickup and drop at Vizag airport, railway station and bus stands.", ask: "an airport / railway transfer" },
  { icon: Mountain, title: "Araku Valley day trips", text: "Comfortable ghat-road driving to Araku, Borra Caves, Lambasingi and Vanjangi.", ask: "an Araku Valley trip" },
  { icon: MapPinned, title: "Local sightseeing", text: "Beaches, Kailasagiri, museums and temples — at your own pace, all day.", ask: "a Vizag local sightseeing day" },
  { icon: Route, title: "Outstation & pilgrimage", text: "Long routes to Srikurmam, Annavaram, Simhachalam and beyond with relief-ready drivers.", ask: "an outstation / pilgrimage trip" },
];

const FALLBACK_TRUST = [
  { icon: "ShieldCheck", label: "Sanitised AC vehicles" },
  { icon: "BadgeCheck", label: "Verified, experienced drivers" },
  { icon: "Wallet", label: "Fixed fares, no surge" },
  { icon: "Headset", label: "24/7 human support" },
];

export default function TravelsClient({
  vehicles,
  trustPoints = [],
  notes = [],
}: {
  vehicles: Vehicle[];
  trustPoints?: any[];
  notes?: any[];
}) {
  const { openBooking } = useBooking();
  const { wa } = useSite();
  const searchParams = useSearchParams();
  const handledBookId = useRef<string | null>(null);
  const [cap, setCap] = useState(0);
  const [openNote, setOpenNote] = useState<string | null>(null);

  useEffect(() => {
    const bookId = searchParams.get("book");
    if (bookId && vehicles.length > 0 && handledBookId.current !== bookId) {
      handledBookId.current = bookId;
      const v = vehicles.find((x) => String(x.id) === String(bookId));
      if (v) {
        openBooking("cab", v);
        window.history.replaceState(null, "", "/travels");
      }
    }
  }, [searchParams, vehicles, openBooking]);

  const filtered = useMemo(() => vehicles.filter((v) => CAPACITY[cap].test(v.pax)), [vehicles, cap]);
  const trust = trustPoints.length > 0 ? trustPoints : FALLBACK_TRUST;
  const heroVehicles = vehicles.filter((v) => v.image).slice(0, 3);
  const lowest = vehicles.length ? vehicles.map((v) => parseInt(String(v.pricePerKm).replace(/\D/g, "")) || 0).filter(Boolean).sort((a, b) => a - b)[0] : 0;

  return (
    <div className="bg-warm-white pb-24">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.45),rgba(255,106,61,.14)_55%,transparent_70%)]" />
          <div className="absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(45,156,219,.16),transparent_65%)]" />
        </div>

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-16">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="kicker mb-5">
              Cabs &amp; travels
            </motion.p>
            <h1 className="font-heading text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04] text-ocean">
              Ride Vizag the <span className="italic text-coral">easy</span> way.
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
              From airport pickups to Araku day trips — clean AC vehicles, verified drivers and fares fixed upfront. Pick a vehicle, tell us your route, and we handle the rest.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => openBooking("cab", null)} className="btn-coral group !px-8 !py-4">
                <Car size={20} /> Book a cab <Arrow className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={wa(waMessages.travels)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-ocean/15 px-7 py-4 text-[0.95rem] font-semibold text-ocean transition-[background-color,border-color,transform] duration-200 hover:border-ocean/40 hover:bg-ocean/5 active:scale-[0.97]"
              >
                Get a quote on WhatsApp
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ocean/75">
              {[ShieldCheck, BadgeCheck, Wallet, Headset].map((Icon, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Icon size={18} className="text-teal" /> {["Sanitised vehicles", "Verified drivers", "Fixed fares", "24/7 support"][i]}
                </li>
              ))}
            </ul>
          </div>

          {/* vehicle collage */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="grid grid-cols-2 gap-4">
              {heroVehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease }}
                  className={`relative overflow-hidden rounded-[26px] bg-[radial-gradient(ellipse_at_50%_100%,#fde6d2,#fff7ef_65%)] shadow-[0_30px_60px_-28px_rgba(10,42,77,.45)] ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}
                >
                  <img src={v.image} alt={v.model} className={i === 0 ? "absolute inset-0 h-full w-full object-cover" : "absolute inset-0 h-full w-full object-contain p-3 mix-blend-multiply"} />
                </motion.div>
              ))}
            </div>
            {lowest > 0 && (
              <div className="absolute -bottom-4 right-3 rounded-2xl border border-ocean/10 bg-white px-4 py-3 shadow-[0_18px_36px_-18px_rgba(10,42,77,.45)]">
                <p className="text-[0.62rem] font-bold uppercase tracking-wider text-charcoal/45">Rates from</p>
                <p className="font-heading text-[1.5rem] leading-none text-ocean">₹{lowest}<span className="ml-1 font-sans text-xs font-medium text-charcoal/55">/ km</span></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Fleet ---------- */}
      <section className="container-max px-4 pt-6 sm:px-6 lg:px-8">
        <SectionHeading kicker="Our fleet" title="Pick the ride that fits your group" subtitle="Filter by the number of seats you need. Every vehicle comes with a professional driver." />

        <div role="tablist" aria-label="Filter by seats" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {CAPACITY.map((c, i) => (
            <button
              key={c.label}
              role="tab"
              aria-selected={cap === i}
              onClick={() => setCap(i)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] ${
                cap === i ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean/75 hover:border-ocean/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <Reveal key={v.id} delay={(i % 3) * 0.06}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-white py-16 text-center shadow-card">
            <p className="font-heading text-xl text-ocean">No vehicles in this range yet</p>
            <p className="mt-1 text-sm text-charcoal/55">Need something specific? Ask us — we arrange larger groups too.</p>
            <a href={wa(waMessages.travels)} target="_blank" rel="noopener noreferrer" className="btn-coral mt-6">Ask on WhatsApp</a>
          </div>
        )}
      </section>

      {/* ---------- Popular trips ---------- */}
      <section className="container-max px-4 pt-20 sm:px-6 lg:px-8">
        <SectionHeading kicker="Popular journeys" title="Where do you want to go?" subtitle="Tell us the route and get a fixed quote — no meters, no surge." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRIPS.map(({ icon: Icon, title, text, ask }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <a
                href={wa(`Hi! I need ${ask}. Could you share the available vehicles and a fixed quote?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[26px] border border-ocean/8 bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-sunset text-white shadow-glow">
                  <Icon size={22} />
                </span>
                <h3 className="font-heading text-[1.2rem] leading-tight text-ocean">{title}</h3>
                <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-charcoal/60">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral">
                  Get a quote <Arrow className="transition-transform group-hover:translate-x-1.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Why us ---------- */}
      <section className="container-max px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ocean-gradient px-6 py-12 text-white sm:px-12 sm:py-14">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blob text-coral/30" />
          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="kicker !text-amber mb-4">Why ride with us</p>
              <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">
                Travel that feels <span className="italic text-sunset">taken care of</span>.
              </h2>
              <p className="mt-4 max-w-md text-white/70">The little things — a clean car, a driver who knows the ghats, a price that never changes — are what make a trip feel easy.</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {trust.map((tp: any, i: number) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/8 px-4 py-3.5 backdrop-blur">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-amber">
                    <DynamicIcon name={tp.icon} size={18} />
                  </span>
                  <span className="text-[0.92rem] font-medium">{tp.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Good to know ---------- */}
      {notes.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-6">
          <SectionHeading kicker="Good to know" title="Before you book" />
          <ul className="divide-y divide-ocean/10 overflow-hidden rounded-[26px] border border-ocean/8 bg-white shadow-card">
            {notes.map((note) => {
              const open = openNote === note.id;
              return (
                <li key={note.id}>
                  <button
                    onClick={() => setOpenNote(open ? null : note.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="font-heading text-[1.1rem] text-ocean">{note.title || "Note"}</span>
                    <ChevronDown size={20} className={`shrink-0 text-ocean/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <p className="whitespace-pre-line px-5 pb-5 text-[0.95rem] leading-relaxed text-charcoal/65 sm:px-6">{note.description}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ---------- Closing CTA ---------- */}
      <section className="container-max px-4 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-sand px-6 py-12 text-center sm:px-12">
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-ocean">
            Not sure which vehicle? <span className="italic text-coral">We&apos;ll help.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-charcoal/65">Tell us your group size, dates and route — we&apos;ll suggest the right vehicle and a fixed fare.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={() => openBooking("cab", null)} className="btn-coral !px-8 !py-4">Book a cab</button>
            <Link href="/how-it-works" className="btn-secondary !px-8 !py-4">How booking works</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
