"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CloudSun, Clock, Moon, Navigation, Sun, Sunrise, Sunset } from "lucide-react";
import { Arrow, Reveal, ease } from "@/components/Motion";
import { useBooking } from "@/components/booking/BookingContext";
import { useSite } from "@/components/SiteProvider";

type Stop = { time: string; name: string; type: string; icon: any; desc: string };
type Day = { day: string; short: string; theme: string; description: string; stops: Stop[] };

const DAYS: Day[] = [
  {
    day: "Day 1",
    short: "City & beaches",
    theme: "City of Destiny — beaches & culture",
    description: "Explore the coastal beauty and rich heritage of Visakhapatnam.",
    stops: [
      { time: "09:00 AM", name: "Simhachalam Temple", type: "Pilgrimage", icon: Sun, desc: "Start with blessings at this ancient 11th-century hill shrine." },
      { time: "12:00 PM", name: "Kailasagiri Hill Park", type: "Viewpoint", icon: CloudSun, desc: "Take the ropeway up for panoramic views of the city and the Bay of Bengal." },
      { time: "03:30 PM", name: "Rushikonda Beach", type: "Beach", icon: Sun, desc: "Enjoy water sports or relax on the golden sands of Vizag's cleanest beach." },
      { time: "06:00 PM", name: "RK Beach & Submarine Museum", type: "Heritage", icon: Sunset, desc: "Stroll the lively beach road and explore the INS Kursura submarine." },
    ],
  },
  {
    day: "Day 2",
    short: "Araku Valley",
    theme: "Journey to the Eastern Ghats",
    description: "A scenic drive into the mountains — caves, coffee plantations and waterfalls.",
    stops: [
      { time: "07:00 AM", name: "Depart for Araku", type: "Drive", icon: Navigation, desc: "A misty ghat-road drive of about 115 km through dense forests." },
      { time: "10:30 AM", name: "Borra Caves", type: "Adventure", icon: Sun, desc: "Explore million-year-old limestone stalactite and stalagmite formations." },
      { time: "01:00 PM", name: "Araku Valley", type: "Nature", icon: Sun, desc: "Visit the Tribal Museum, Padmapuram Gardens and vast coffee plantations." },
      { time: "04:30 PM", name: "Chaparai Water Cascades", type: "Nature", icon: Sunset, desc: "Relax by the scenic cascades surrounded by lush greenery." },
    ],
  },
  {
    day: "Day 3",
    short: "Cloud paradise",
    theme: "The cloud paradise",
    description: "An early-morning adventure to above-the-clouds views and cool hill air.",
    stops: [
      { time: "04:00 AM", name: "Vanjangi sunrise trek", type: "Adventure", icon: Sunrise, desc: "A moderate trek to witness the sea of clouds at sunrise." },
      { time: "11:00 AM", name: "Lambasingi", type: "Hill station", icon: CloudSun, desc: "Visit the 'Kashmir of Andhra' and its apple and strawberry farms." },
      { time: "02:00 PM", name: "Kothapalli Waterfalls", type: "Nature", icon: Sun, desc: "A hidden-gem waterfall deep within the Chintapalli forests." },
      { time: "06:00 PM", name: "Return to Vizag", type: "Drive", icon: Moon, desc: "A safe journey back to the city with sunset highway views." },
    ],
  },
];

export default function ItineraryClient() {
  const { wa } = useSite();
  const [active, setActive] = useState(0);
  const day = DAYS[active];
  const { openBooking } = useBooking();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 65%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const go = (i: number) => {
    setActive(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-warm-white pb-24">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-28 -top-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.45),rgba(255,106,61,.14)_55%,transparent_70%)]" />
          <div className="absolute -left-28 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(20,166,115,.15),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pb-8 pt-12 text-center sm:px-8 lg:pt-16">
          <p className="kicker mb-5">Sample itinerary</p>
          <h1 className="font-heading text-[clamp(2.3rem,6vw,4.3rem)] leading-[1.05] text-ocean">
            The ultimate <span className="italic text-coral">3-day</span> Vizag itinerary
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
            Beaches and temples, a misty drive to Araku, and a sunrise above the clouds. Follow it as it is, or let us bend it around your dates.
          </p>

          {/* day switcher */}
          <div role="tablist" aria-label="Choose a day" className="mx-auto mt-9 grid w-full max-w-lg grid-cols-3 gap-1 rounded-[26px] border border-ocean/10 bg-white p-1.5 shadow-card">
            {DAYS.map((d, i) => (
              <button
                key={d.day}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-[20px] px-2 py-3 text-center transition-[background-color,color,transform] duration-200 active:scale-[0.97] ${
                  i === active ? "bg-sunset text-white shadow-glow" : "text-ocean/70 hover:text-ocean"
                }`}
              >
                <span className="block text-sm font-bold">{d.day}</span>
                <span className={`block text-[0.68rem] font-medium ${i === active ? "text-white/85" : "text-ocean/45"}`}>{d.short}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Timeline ---------- */}
      <section className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease }}
          >
            <header className="mb-8 text-center">
              <h2 className="font-heading text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.12] text-ocean">{day.theme}</h2>
              <p className="mx-auto mt-2 max-w-md text-charcoal/65">{day.description}</p>
            </header>

            <ol ref={listRef} className="relative space-y-4 pl-[3.4rem]">
              <span aria-hidden className="absolute bottom-4 left-[1.35rem] top-4 w-0.5 rounded-full bg-ocean/10" />
              <motion.span aria-hidden style={{ scaleY: line, transformOrigin: "top" }} className="absolute bottom-4 left-[1.35rem] top-4 w-0.5 rounded-full bg-sunset" />

              {day.stops.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.name} className="relative">
                    <span className="absolute -left-[3.4rem] top-4 grid h-11 w-11 place-items-center rounded-full border-4 border-warm-white bg-white text-coral shadow-[0_6px_16px_-6px_rgba(10,42,77,.35)]">
                      <Icon size={18} />
                    </span>
                    <Reveal y={18} delay={i * 0.03}>
                      <div className="rounded-[24px] border border-ocean/8 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                        <div className="mb-2.5 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
                            <Clock size={12} /> {s.time}
                          </span>
                          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-charcoal/40">{s.type}</span>
                        </div>
                        <h3 className="font-heading text-[1.25rem] leading-tight text-ocean">{s.name}</h3>
                        <p className="mt-1.5 text-[0.93rem] leading-relaxed text-charcoal/65">{s.desc}</p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            {/* next / previous */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <button
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="btn-secondary disabled:pointer-events-none disabled:opacity-30"
              >
                Previous day
              </button>
              <button onClick={() => go(active + 1)} disabled={active === DAYS.length - 1} className="btn-coral disabled:pointer-events-none disabled:opacity-30">
                Next day <Arrow />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-max px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ocean-gradient px-6 py-14 text-center text-white sm:px-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/30 blur-[80px]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="kicker !text-amber mb-4 justify-center">Make it yours</p>
            <h2 className="font-heading text-[clamp(1.9rem,4.5vw,3.1rem)] leading-[1.08]">
              Want this plan, <span className="italic text-sunset">your way?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">Change the days, add a beach morning, pick a stay — we&apos;ll arrange the vehicle, hotels and driver.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button onClick={() => openBooking("package", { title: "3-Day Vizag Itinerary", isCustomEnquiry: true })} className="btn-coral !px-8 !py-4">
                Customise this trip
              </button>
              <Link href="/tour-packages" className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[0.95rem] font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]">
                See ready-made packages
              </Link>
              <a
                href={wa("Hi! I'd like to customise your 3-day Vizag itinerary (Vizag city, Araku Valley, Vanjangi/Lambasingi). Could you help me plan it?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/30 px-8 py-4 text-[0.95rem] font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
