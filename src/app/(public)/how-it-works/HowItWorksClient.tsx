"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, BedDouble, Car, CheckCircle2, Headset, MessageCircle, Package, Search, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Arrow, Reveal, ease } from "@/components/Motion";
import { useBooking } from "@/components/booking/BookingContext";
import { waMessages, waUrl } from "@/lib/whatsapp";

type Step = { icon: any; title: string; text: string; tip?: string };
type Path = { id: string; label: string; icon: any; intro: string; steps: Step[]; cta: { label: string; href?: string; action?: "cab" | "custom" } };

const PATHS: Path[] = [
  {
    id: "package",
    label: "Tour package",
    icon: Package,
    intro: "From a first idea to a fully planned trip — usually within a few hours.",
    steps: [
      { icon: Search, title: "Pick a package or describe your trip", text: "Browse our itineraries for Vizag, Araku, Lambasingi and more — or tell us what you have in mind and we'll build it.", tip: "Not sure? Use Plan my trip on the home page." },
      { icon: BedDouble, title: "Choose your stay", text: "Select a room type — Non AC, Deluxe AC or Premium AC — then the hotel you like, with prices and photos side by side.", tip: "Prices are per night." },
      { icon: MessageCircle, title: "Send your request", text: "Fill in a short form. We save your request securely and open WhatsApp with all your details pre-filled — just press send.", tip: "Takes under two minutes." },
      { icon: BadgeCheck, title: "We confirm everything", text: "Our team confirms dates, vehicle, stay and the final fixed price. No surge, no hidden extras.", tip: "A real person replies." },
      { icon: Sparkles, title: "Travel, then tell us how it went", text: "Your verified driver meets you on time, support is a call away, and your feedback helps us get better every trip." },
    ],
    cta: { label: "Explore packages", href: "/tour-packages" },
  },
  {
    id: "cab",
    label: "Cab & travels",
    icon: Car,
    intro: "A clean car, a driver who knows the roads, and a fare that's fixed before you ride.",
    steps: [
      { icon: Car, title: "Choose a vehicle by seats", text: "Sedans, SUVs, tempo travellers and buses — filter by the number of seats you need.", tip: "Rates are shown per km." },
      { icon: Search, title: "Share your route and dates", text: "Pickup, drop, places to visit and how many travellers. That's all we need.", tip: "Airport and railway transfers included." },
      { icon: MessageCircle, title: "Get a fixed quote on WhatsApp", text: "Your request is saved and WhatsApp opens with the details ready. We reply with availability and a fixed fare.", tip: "No meters, no surge." },
      { icon: ShieldCheck, title: "Ride with a verified driver", text: "On-time pickup, a sanitised AC vehicle and a driver experienced with ghat roads." },
      { icon: Sparkles, title: "Share your feedback", text: "Tell us how the ride went — it helps us keep the standard high." },
    ],
    cta: { label: "Book a cab", action: "cab" },
  },
  {
    id: "stay",
    label: "Hotel stay",
    icon: BedDouble,
    intro: "Find the right room in Vizag, Araku or Lambasingi without the back-and-forth.",
    steps: [
      { icon: Search, title: "Browse stays", text: "Filter hotels, homestays and resorts by category, rating and price.", tip: "Full-screen filters on mobile." },
      { icon: BedDouble, title: "Pick a room type", text: "Compare the available rooms with photos and per-night prices.", tip: "Tap View images to see the rooms." },
      { icon: MessageCircle, title: "Send check-in and check-out", text: "Share your dates and guests. We save the request and open WhatsApp with everything filled in." },
      { icon: BadgeCheck, title: "We confirm availability", text: "We check the property, confirm the room and the final price, and send you the details." },
      { icon: Sparkles, title: "Check in and relax", text: "Arrive, settle in, and call us any time if you need anything during your stay." },
    ],
    cta: { label: "Browse stays", href: "/hotels-and-resorts" },
  },
];

const PROMISES = [
  { icon: Wallet, title: "Fixed prices", text: "What we quote is what you pay — no surge, no surprises." },
  { icon: BadgeCheck, title: "Verified people", text: "Experienced drivers and carefully chosen stays." },
  { icon: Headset, title: "A real human", text: "24/7 support on call and WhatsApp." },
  { icon: ShieldCheck, title: "Your data, safe", text: "Details are saved securely and used only for your trip." },
];

export default function HowItWorksClient() {
  const [active, setActive] = useState(0);
  const path = PATHS[active];
  const { openBooking } = useBooking();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-warm-white pb-24">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-28 -top-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.45),rgba(255,106,61,.14)_55%,transparent_70%)]" />
          <div className="absolute -left-28 bottom-0 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(20,166,115,.16),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-12 text-center sm:px-8 lg:pt-16">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="kicker mb-5">
            How it works
          </motion.p>
          <h1 className="font-heading text-[clamp(2.3rem,6vw,4.3rem)] leading-[1.05] text-ocean">
            From first message to a <span className="italic text-coral">smooth trip</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
            Booking shouldn&apos;t feel like work. Choose how you&apos;d like to travel and see exactly what happens at every step.
          </p>

          {/* path switcher */}
          <div role="tablist" aria-label="Choose what you want to book" className="mx-auto mt-9 inline-grid w-full max-w-md grid-cols-3 gap-1 rounded-full border border-ocean/10 bg-white p-1.5 shadow-card">
            {PATHS.map((p, i) => {
              const Icon = p.icon;
              const on = i === active;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center justify-center gap-1.5 rounded-full px-2 py-3 text-[0.8rem] font-semibold transition-[color,background-color,transform] duration-200 active:scale-[0.97] sm:text-sm ${
                    on ? "bg-sunset text-white shadow-glow" : "text-ocean/65 hover:text-ocean"
                  }`}
                >
                  <Icon size={16} className="hidden sm:block" /> {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
          >
            <p className="mx-auto mb-10 max-w-xl text-center font-heading text-[1.25rem] leading-snug text-ocean/80">{path.intro}</p>

            <ol ref={listRef} className="relative space-y-5 pl-[3.4rem] sm:space-y-6 sm:pl-0">
              {/* rail */}
              <span aria-hidden className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 rounded-full bg-ocean/10 sm:left-1/2 sm:-translate-x-1/2" />
              <motion.span
                aria-hidden
                style={{ scaleY: lineScale, transformOrigin: "top" }}
                className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 rounded-full bg-sunset sm:left-1/2 sm:-translate-x-1/2"
              />

              {path.steps.map((s, i) => {
                const Icon = s.icon;
                const right = i % 2 === 1;
                return (
                  <li key={s.title} className="relative sm:grid sm:grid-cols-2 sm:gap-14">
                    {/* node */}
                    <span className="absolute -left-[3.4rem] top-3 grid h-11 w-11 place-items-center rounded-full border-4 border-warm-white bg-sunset font-heading text-lg text-white shadow-glow sm:left-1/2 sm:-ml-[1.375rem] sm:-translate-x-0">
                      {i + 1}
                    </span>
                    <Reveal className={`min-w-0 ${right ? "sm:col-start-2" : "sm:col-start-1"}`} y={22}>
                      <div className="rounded-[26px] border border-ocean/8 bg-white p-5 shadow-card sm:p-6">
                        <span className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-sand text-coral">
                          <Icon size={21} />
                        </span>
                        <h3 className="font-heading text-[1.3rem] leading-tight text-ocean">{s.title}</h3>
                        <p className="mt-2 text-[0.94rem] leading-relaxed text-charcoal/65">{s.text}</p>
                        {s.tip && (
                          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal">
                            <CheckCircle2 size={13} /> {s.tip}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <div className="mt-12 text-center">
              {path.cta.href ? (
                <Link href={path.cta.href} className="btn-coral !px-9 !py-4">
                  {path.cta.label} <Arrow />
                </Link>
              ) : (
                <button onClick={() => openBooking("cab", null)} className="btn-coral !px-9 !py-4">
                  {path.cta.label} <Arrow />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ---------- Promises ---------- */}
      <section className="container-max px-4 pt-24 sm:px-6 lg:px-8">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ocean-gradient px-6 py-12 text-white sm:px-12">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-coral/30 blur-[70px]" />
          <div className="relative">
            <p className="kicker !text-amber mb-3">What you can count on</p>
            <h2 className="max-w-lg font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1]">Simple promises, kept on every trip.</h2>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROMISES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur">
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-amber">
                    <Icon size={19} />
                  </span>
                  <h3 className="font-heading text-lg">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="container-max px-4 pt-16 text-center sm:px-6">
        <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-ocean">
          Ready to start? <span className="italic text-coral">Say hello.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-charcoal/65">Message us on WhatsApp and we&apos;ll take it from there.</p>
        <a href={waUrl(waMessages.general)} target="_blank" rel="noopener noreferrer" className="btn-coral mt-7 !px-9 !py-4">
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}
