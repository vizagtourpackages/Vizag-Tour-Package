"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Star, Users } from "lucide-react";
import { siteInfo, stats } from "@/data/siteInfo";
import CountUp from "./CountUp";
import MobileTrustBanner from "./MobileTrustBanner";
import { useBooking } from "./booking/BookingContext";
import { Arrow, ease } from "./Motion";

export interface HeroTile {
  title: string;
  image: string;
  href: string;
  price?: number;
  duration?: string;
  badge?: string;
  description?: string;
}

const destinations = ["Vizag city sightseeing", "Araku Valley", "Lambasingi", "Vanjangi", "Devotional tour", "Not sure yet"];

export default function HeroSection({ tiles = [] }: { tiles?: HeroTile[] }) {
  const { openBooking } = useBooking();

  const [dest, setDest] = useState(destinations[0]);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const today = new Date().toISOString().split("T")[0];

  const [lead, tail] = siteInfo.tagline.split("—").map((t) => t.trim());
  const leadWords = lead.split(" ");

  // Image collage: real packages first, brand hero as the safe fallback.
  const main = tiles[0]?.image || "/hero-bg.png";
  const second = tiles[1]?.image || "/hero-bg.png";
  const third = tiles[2]?.image || "/hero-bg.png";

  const plan = (e: React.FormEvent) => {
    e.preventDefault();
    openBooking("package", {
      title: `Custom trip: ${dest}`,
      isCustomEnquiry: true,
      prefill: { date, guests },
    });
  };

  return (
    <section className="relative isolate overflow-hidden bg-warm-white">
      {/* warm sunset wash + sun disc (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-8 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.55),rgba(255,106,61,.18)_55%,transparent_70%)]" />
        <div className="absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(20,166,115,.16),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sand to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-24 lg:pt-14">
        {/* ---------- Copy + planner ---------- */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-ocean/10 bg-white px-4 py-2 shadow-sm"
          >
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} className="fill-amber text-amber" />
              ))}
            </span>
            <span className="text-[0.78rem] font-semibold text-ocean">
              {siteInfo.googleReviews.rating}.0 on Google
              <span className="font-medium text-charcoal/50"> · {siteInfo.googleReviews.count} reviews</span>
            </span>
          </motion.div>

          <h1 className="mt-6 font-heading text-[clamp(2.6rem,6.4vw,5.4rem)] leading-[1.02] text-ocean">
            {leadWords.map((w, k) => (
              <span key={k} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + k * 0.1, ease }}
                  className={`inline-block pr-[0.22em] ${k === leadWords.length - 1 ? "italic text-coral" : ""}`}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease }}
                className="inline-block text-[0.55em] font-light text-ocean/70"
              >
                {tail}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease }}
            className="mt-6 max-w-xl text-[1.04rem] leading-relaxed text-charcoal/70"
          >
            Beach sightseeing, Araku Valley hill tours, hotels, airport transfers and custom holidays —
            planned by a local team, with fixed prices and drivers you can trust.
          </motion.p>

          {/* trip planner */}
          <motion.form
            onSubmit={plan}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-8 rounded-[28px] border border-ocean/10 bg-white p-3 shadow-[0_30px_70px_-30px_rgba(10,42,77,.35)]"
            aria-label="Plan your trip"
          >
            <div className="grid gap-2 sm:grid-cols-[1.35fr_1fr_0.7fr]">
              <label className="group flex items-center gap-3 rounded-2xl bg-sand/60 px-4 py-3 transition-colors focus-within:bg-sand">
                <MapPin size={18} className="shrink-0 text-coral" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.64rem] font-bold uppercase tracking-wider text-charcoal/45">Where to?</span>
                  <select
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-[0.95rem] font-semibold text-ocean outline-none"
                  >
                    {destinations.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-sand/60 px-4 py-3 transition-colors focus-within:bg-sand">
                <CalendarDays size={18} className="shrink-0 text-coral" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.64rem] font-bold uppercase tracking-wider text-charcoal/45">When?</span>
                  <input
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-[0.95rem] font-semibold text-ocean outline-none"
                  />
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-sand/60 px-4 py-3 transition-colors focus-within:bg-sand">
                <Users size={18} className="shrink-0 text-coral" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.64rem] font-bold uppercase tracking-wider text-charcoal/45">Guests</span>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-transparent text-[0.95rem] font-semibold text-ocean outline-none"
                  />
                </span>
              </label>
            </div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <button type="submit" className="btn-coral group flex-1 !py-4">
                Plan my trip <Arrow className="transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/tour-packages"
                className="inline-flex items-center justify-center rounded-full border border-ocean/15 px-7 py-4 text-[0.92rem] font-semibold text-ocean transition-[background-color,border-color,transform] duration-200 hover:border-ocean/40 hover:bg-ocean/5 active:scale-[0.97]"
              >
                Browse packages
              </Link>
            </div>
          </motion.form>

          {/* proof */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8 hidden grid-cols-4 gap-4 sm:grid"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-[1.75rem] leading-none text-ocean">
                  <CountUp end={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-[0.7rem] font-semibold uppercase tracking-wide text-charcoal/50">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------- Image collage (clean images, no overlays) ---------- */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 sm:gap-5">
            {/* tall arch fills the full height of the two stacked tiles */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1, ease }}
              className="group relative row-span-2 min-h-[320px] overflow-hidden rounded-[50%_50%_28px_28px_/_26%_26%_28px_28px] bg-sand shadow-[0_40px_80px_-30px_rgba(10,42,77,.5)]"
            >
              <Link href={tiles[0]?.href || "/tour-packages"} aria-label={tiles[0]?.title || "Tour packages"} className="absolute inset-0">
                <img
                  src={main}
                  alt={tiles[0]?.title || "Visakhapatnam coastline"}
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-105"
                />
                {tiles[0] && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/35 to-transparent" />
                    <div className="absolute inset-x-5 bottom-6 text-white sm:inset-x-8 sm:bottom-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-sunset px-3 py-1 text-[0.64rem] font-bold uppercase tracking-wider">
                          {tiles[0].badge || "Most popular"}
                        </span>
                        {tiles[0].duration && (
                          <span className="rounded-full bg-white/15 px-3 py-1 text-[0.64rem] font-semibold backdrop-blur">{tiles[0].duration}</span>
                        )}
                      </div>
                      <h3 className="mt-3 font-heading text-[1.25rem] leading-tight sm:text-[1.55rem]">{tiles[0].title}</h3>
                      {tiles[0].description && (
                        <p className="mt-2 line-clamp-2 text-[0.82rem] leading-relaxed text-white/80 sm:line-clamp-3 sm:text-[0.9rem]">
                          {tiles[0].description}
                        </p>
                      )}
                      <div className="mt-3.5 flex items-center justify-between gap-3">
                        {tiles[0].price ? (
                          <span className="text-[0.8rem] text-white/75">
                            from <span className="font-heading text-[1.3rem] text-white">₹{tiles[0].price.toLocaleString("en-IN")}</span>
                          </span>
                        ) : <span />}
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.8rem] font-semibold text-ocean transition-colors group-hover:bg-amber">
                          View package <Arrow className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease }}
              className="group relative aspect-square overflow-hidden rounded-[28px] bg-sand shadow-[0_30px_60px_-28px_rgba(10,42,77,.45)]"
            >
              <Link href={tiles[1]?.href || "/tour-packages"} aria-label={tiles[1]?.title || "Tour packages"} className="absolute inset-0">
                <img src={second} alt={tiles[1]?.title || ""} className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand shadow-[0_30px_60px_-28px_rgba(10,42,77,.45)]"
            >
              <Link href={tiles[2]?.href || "/tour-packages"} aria-label={tiles[2]?.title || "Tour packages"} className="absolute inset-0">
                <img src={third} alt={tiles[2]?.title || ""} className="h-full w-full object-cover object-right transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pb-6 md:hidden">
        <MobileTrustBanner />
      </div>
    </section>
  );
}
