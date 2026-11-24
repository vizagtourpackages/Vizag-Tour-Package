"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BedDouble,
  CarFront,
  Home,
  Info,
  LayoutGrid,
  ListChecks,
  Map as MapIcon,
  MapPin,
  Mountain,
  Package,
  Phone,
  Route,
  Search,
  X,
} from "lucide-react";
import { siteInfo } from "@/data/siteInfo";
import { allPackages } from "@/data/packages";
import { topPlaces, vizagPlaces } from "@/data/destinations";
import { ease } from "./Motion";

const WaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

const tabs = [
  { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
  { label: "Packages", href: "/tour-packages", icon: Package, match: (p: string) => p.startsWith("/tour-packages") || p.startsWith("/packages") },
  // center action rendered separately
  { label: "Stays", href: "/hotels-and-resorts", icon: BedDouble, match: (p: string) => p.startsWith("/hotels-and-resorts") || p.startsWith("/resorts") },
];

const moreLinks = [
  { label: "Cabs & Travels", href: "/travels", icon: CarFront },
  { label: "Araku Valley", href: "/araku-valley", icon: Mountain },
  { label: "Lambasingi", href: "/lambasingi", icon: Mountain },
  { label: "Vanjangi", href: "/vanjangi", icon: Mountain },
  { label: "Travel Guides", href: "/travel-guides", icon: BookOpen },
  { label: "Route Map", href: "/route-map", icon: MapIcon },
  { label: "Itineraries", href: "/itinerary", icon: ListChecks },
  { label: "How It Works", href: "/how-it-works", icon: Route },
  { label: "About Us", href: "/about", icon: Info },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return [
      ...allPackages.filter((p) => p.title.toLowerCase().includes(q)).map((p) => ({ type: "Package", title: p.title, link: "/tour-packages" })),
      ...[...topPlaces, ...vizagPlaces].filter((d) => d.name.toLowerCase().includes(q)).map((d) => ({ type: "Place", title: d.name, link: "/top-tourist-places" })),
      ...moreLinks.filter((l) => l.label.toLowerCase().includes(q)).map((l) => ({ type: "Page", title: l.label, link: l.href })),
    ].slice(0, 8);
  }, [query]);

  const close = () => {
    setMoreOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* "More" sheet */}
      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="absolute inset-0 bg-ocean/50 backdrop-blur-sm"
            />
            <motion.div
              data-lenis-prevent
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-warm-white p-5 pb-28"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ocean/15" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-[1.4rem] text-ocean">Explore more</h3>
                <button onClick={close} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-ocean/5 text-ocean">
                  <X size={18} />
                </button>
              </div>

              {/* search */}
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search packages, places, pages…"
                  className="w-full rounded-2xl border border-ocean/10 bg-white py-3.5 pl-11 pr-4 text-[0.95rem] text-ocean outline-none placeholder:text-ocean/35 focus:border-coral focus:ring-4 focus:ring-coral/15"
                />
              </div>

              {query.trim() ? (
                <ul className="mt-4 space-y-2">
                  {results.length === 0 && <li className="py-6 text-center text-sm text-charcoal/50">No results for “{query}”</li>}
                  {results.map((r, i) => (
                    <li key={i}>
                      <Link href={r.link} onClick={close} className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
                        <span>
                          <span className="block text-[0.65rem] font-bold uppercase tracking-wider text-coral">{r.type}</span>
                          <span className="font-semibold text-ocean">{r.title}</span>
                        </span>
                        <ArrowRight size={16} className="text-ocean/30" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {moreLinks.map((l) => {
                      const Icon = l.icon;
                      return (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={close}
                          className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-sm transition-transform duration-150 active:scale-[0.96]"
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-coral">
                            <Icon size={19} />
                          </span>
                          <span className="text-[0.72rem] font-semibold leading-tight text-ocean">{l.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* contact */}
                  <div className="mt-5 rounded-3xl bg-ocean p-5 text-white">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber">24/7 travel support</p>
                    <p className="mt-1 flex items-start gap-2 text-sm text-white/75">
                      <MapPin size={15} className="mt-0.5 shrink-0" /> {siteInfo.address}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <a href={`tel:${siteInfo.whatsapp}`} className="flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-ocean active:scale-[0.97]">
                        <Phone size={16} /> Call now
                      </a>
                      <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 text-sm font-bold text-white active:scale-[0.97]">
                        <WaIcon size={16} /> WhatsApp
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Docked bar */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-[150] border-t border-ocean/10 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-12px_rgba(10,42,77,.2)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid h-[64px] max-w-md grid-cols-5 items-end px-2">
          {tabs.slice(0, 2).map((t) => (
            <Tab key={t.href} {...t} active={t.match(pathname)} />
          ))}

          {/* raised centre action */}
          <a
            href={siteInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book on WhatsApp"
            className="relative -mt-7 flex flex-col items-center justify-end gap-1 pb-1.5"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_24px_-8px_rgba(37,211,102,.7)] ring-4 ring-white transition-transform duration-150 active:scale-95">
              <WaIcon size={26} />
            </span>
            <span className="text-[0.62rem] font-bold text-ocean">Book</span>
          </a>

          {tabs.slice(2).map((t) => (
            <Tab key={t.href} {...t} active={t.match(pathname)} />
          ))}

          <button onClick={() => setMoreOpen(true)} className="relative flex h-full flex-col items-center justify-center gap-1 text-ocean/55 active:scale-95 transition-transform duration-150">
            <LayoutGrid size={22} strokeWidth={2} />
            <span className="text-[0.62rem] font-semibold">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}

function Tab({ label, href, icon: Icon, active }: { label: string; href: string; icon: any; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative flex h-full flex-col items-center justify-center gap-1 transition-[color,transform] duration-150 active:scale-95 ${
        active ? "text-coral" : "text-ocean/55"
      }`}
    >
      {active && <span aria-hidden className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-sunset" />}
      <Icon size={22} strokeWidth={active ? 2.4 : 2} />
      <span className={`text-[0.62rem] ${active ? "font-bold" : "font-semibold"}`}>{label}</span>
    </Link>
  );
}
