import { Metadata } from "next";
import Link from "next/link";
import { Award, CreditCard, Clock, MapPin, ShieldCheck, Star, Users, Car, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Reveal, Arrow } from "@/components/Motion";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";
import { siteInfo, stats } from "@/data/siteInfo";
import { waMessages, waUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About Us",
  description: "Vizag Tour Packages is run by Araku Eco Stays & Travels — a local team offering Vizag sightseeing, Araku Valley tours, hotels, cabs and custom holidays at fixed prices.",
};

const values = [
  { icon: MapPin, title: "Local expertise", text: "Years of dedicated service in Visakhapatnam, with deep knowledge of local routes, timings and hidden gems." },
  { icon: ShieldCheck, title: "Safety first", text: "Verified drivers with clean records and regularly maintained, sanitised vehicles for every journey." },
  { icon: CreditCard, title: "Transparent pricing", text: "Clear, upfront prices with no hidden charges and no surge. What you see is what you pay." },
  { icon: Clock, title: "Always available", text: "Round-the-clock support for your travel needs — we're a call or WhatsApp message away." },
];

const statIcons = [Award, MapPin, Car, Users];

export default async function AboutPage() {
  // Real package photos for the collage (falls back to the brand image)
  const supabase = await createClient();
  const { contact } = await getSiteSettings();
  const { data: pkgs } = await supabase
    .from("tour_packages")
    .select("title, cover_image_url, image_url")
    .eq("is_published", true)
    .limit(6);
  const imgs = (pkgs || []).map((p) => p.cover_image_url || p.image_url).filter(Boolean) as string[];
  const a = imgs[0] || "/hero-bg.png";
  const b = imgs[1] || "/hero-bg.png";
  const c = imgs[2] || "/hero-bg.png";

  return (
    <div className="bg-warm-white pb-24">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-28 -top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.45),rgba(255,106,61,.14)_55%,transparent_70%)]" />
          <div className="absolute -left-28 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(20,166,115,.15),transparent_65%)]" />
        </div>
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20 lg:pt-16">
          <div>
            <p className="kicker mb-5">About us</p>
            <h1 className="font-heading text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04] text-ocean">
              A local team that <span className="italic text-coral">loves</span> Vizag.
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
              We help travellers explore the City of Destiny and beyond — from beach days and temple trails to misty Araku mornings — with honest prices and people you can rely on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tour-packages" className="btn-coral group !px-8 !py-4">
                Explore packages <Arrow className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-secondary !px-8 !py-4">Contact us</Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="row-span-2 min-h-[300px] overflow-hidden rounded-[999px_999px_28px_28px] bg-sand shadow-[0_40px_80px_-30px_rgba(10,42,77,.5)]">
                <img src={a} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-[28px] bg-sand shadow-[0_30px_60px_-28px_rgba(10,42,77,.45)]">
                <img src={b} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-[28px] bg-sand shadow-[0_30px_60px_-28px_rgba(10,42,77,.45)]">
                <img src={c} alt="" className="h-full w-full object-cover object-right" />
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-ocean/10 bg-white px-4 py-3 shadow-[0_18px_36px_-18px_rgba(10,42,77,.45)]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-amber/25 text-ocean"><Star size={19} className="fill-amber text-amber" /></span>
              <span className="leading-tight">
                <span className="block font-heading text-lg text-ocean">{siteInfo.googleReviews.rating} on Google</span>
                <span className="block text-xs text-charcoal/55">{siteInfo.googleReviews.count} reviews</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className="container-max px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <p className="kicker mb-4">Our story</p>
            <h2 className="font-heading text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-ocean">
              Trips planned like we&apos;d plan <span className="italic text-coral">our own.</span>
            </h2>
            <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-charcoal/70">
              <p>
                Vizag Tour Packages is operated by <strong className="text-ocean">Araku Eco Stays &amp; Travels</strong>, a trusted travel agency offering memorable trips from Vizag city to the Araku Valley and beyond.
              </p>
              <p>
                Every traveller is different. Some want a quiet beach holiday, some an adventurous escape into nature, and some a journey through Vizag&apos;s temples and history — so we build tailor-made plans instead of one-size-fits-all tours.
              </p>
              <p>
                From local sightseeing and Araku Valley tours to devotional trips and fully customised holidays, our goal is simple: make your journey comfortable, affordable and unforgettable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[28px] border border-ocean/8 bg-white p-6 shadow-card sm:p-8">
              <h3 className="font-heading text-[1.35rem] text-ocean">At a glance</h3>
              <dl className="mt-5 space-y-4 text-[0.95rem]">
                {[
                  ["Operated by", "Araku Eco Stays & Travels"],
                  ["Based in", "Pendurthi, Visakhapatnam"],
                  ["We offer", "Tours · Hotels · Cabs · Custom trips"],
                  ["Support", "24/7 on call and WhatsApp"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 border-b border-dashed border-ocean/12 pb-3 last:border-0 last:pb-0">
                    <dt className="text-charcoal/55">{k}</dt>
                    <dd className="text-right font-semibold text-ocean">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="container-max px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = statIcons[i] || Award;
            return (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="rounded-[26px] border border-ocean/8 bg-white p-5 text-center shadow-card sm:p-6">
                  <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-sand text-coral"><Icon size={21} /></span>
                  <p className="font-heading text-[2.2rem] leading-none text-ocean">
                    <CountUp end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-wider text-charcoal/50">{s.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="container-max px-4 pt-24 sm:px-6 lg:px-8">
        <SectionHeading kicker="Why choose us" title="Built on four simple promises" subtitle="Reliability, safety and honest pricing — the things that make a trip feel easy." />
        <div className="grid gap-5 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.06}>
              <div className="group flex h-full items-start gap-4 rounded-[26px] border border-ocean/8 bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="grid h-13 w-13 min-h-[3.25rem] min-w-[3.25rem] place-items-center rounded-2xl bg-sunset text-white shadow-glow">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-heading text-[1.25rem] text-ocean">{title}</h3>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-charcoal/65">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="container-max px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grain relative overflow-hidden rounded-[32px] bg-ocean-gradient px-6 py-14 text-center text-white sm:px-12">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/30 blur-[80px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-teal/30 blur-[80px]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="kicker !text-amber mb-4 justify-center">Let&apos;s talk</p>
            <h2 className="font-heading text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.08]">
              Ready to experience <span className="italic text-sunset">the difference?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">Tell us about your trip and we&apos;ll plan it with you.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={waUrl(waMessages.general, contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-coral !px-8 !py-4">Chat on WhatsApp</a>
              <a href={`tel:${contact.phone}`} className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[0.95rem] font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]">
                <Phone size={17} /> Call {contact.phone.replace("+91", "+91 ")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
