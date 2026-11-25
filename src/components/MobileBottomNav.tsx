"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  BookOpen,
  CarFront,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  LayoutList,
  ListChecks,
  MapPin,
  Mail,
  Newspaper,
  Package,
  Phone,
  Route,
  Search,
  X,
} from "lucide-react";
import { navLinks, siteInfo } from "@/data/siteInfo";
import { waMessages } from "@/lib/whatsapp";
import { allPackages } from "@/data/packages";
import { topPlaces, vizagPlaces } from "@/data/destinations";
import { ease } from "./Motion";
import { useSite } from "@/components/SiteProvider";

const WaIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

// The five always-visible tabs (all plain, equal weight).
const tabs = [
  { label: "Home", href: "/", icon: Home, match: (p: string) => p === "/" },
  { label: "Packages", href: "/tour-packages", icon: Package, match: (p: string) => p.startsWith("/tour-packages") || p.startsWith("/packages") },
  { label: "Stays", href: "/hotels-and-resorts", icon: BedDouble, match: (p: string) => p.startsWith("/hotels-and-resorts") || p.startsWith("/resorts") },
  { label: "Travels", href: "/travels", icon: CarFront, match: (p: string) => p.startsWith("/travels") },
];
const tabHrefs = new Set(tabs.map((t) => t.href));

const iconFor: Record<string, any> = {
  Destination: MapPin,
  Itineraries: ListChecks,
  Blog: Newspaper,
  "Travel Guides": BookOpen,
  "How It Works": Route,
  "About Us": Info,
  "Contact Us": Mail,
};

// "More" mirrors the site menu: everything not already in the tab bar, keeping sub-menus.
const moreItems = navLinks.filter((l) => (l.subLinks ? true : !!l.href && !tabHrefs.has(l.href) && l.href !== "/"));

export default function MobileBottomNav() {
  const { wa, contact } = useSite();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const pages = navLinks.flatMap((l) => (l.subLinks ? l.subLinks : [{ label: l.label, href: l.href! }]));
    return [
      ...allPackages.filter((p) => p.title.toLowerCase().includes(q)).map((p) => ({ type: "Package", title: p.title, link: "/tour-packages" })),
      ...[...topPlaces, ...vizagPlaces].filter((d) => d.name.toLowerCase().includes(q)).map((d) => ({ type: "Place", title: d.name, link: "/top-tourist-places" })),
      ...pages.filter((l) => l.label.toLowerCase().includes(q)).map((l) => ({ type: "Page", title: l.label, link: l.href })),
    ].slice(0, 8);
  }, [query]);

  const close = () => {
    setMoreOpen(false);
    setQuery("");
    setExpanded(null);
  };

  return (
    <>
      {/* "More" sheet: a list that mirrors the site menu, with sub-menus */}
      <AnimatePresence>
        {moreOpen && (
          <div className="fixed inset-0 z-[200] xl:hidden">
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
              className="absolute inset-x-0 bottom-0 max-h-[88vh] [max-height:88dvh] overflow-y-auto rounded-t-[28px] bg-warm-white p-5 pb-28"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ocean/15" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-[1.4rem] text-ocean">Menu</h3>
                <button onClick={close} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full bg-ocean/5 text-ocean">
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
                  className="w-full rounded-2xl border border-ocean/10 bg-white py-3.5 pl-11 pr-4 text-base text-ocean outline-none placeholder:text-ocean/35 focus:border-coral focus:ring-4 focus:ring-coral/15"
                />
              </div>

              {query.trim() ? (
                <ul className="mt-4 divide-y divide-ocean/10 overflow-hidden rounded-2xl bg-white shadow-sm">
                  {results.length === 0 && <li className="py-6 text-center text-sm text-charcoal/50">No results for “{query}”</li>}
                  {results.map((r, i) => (
                    <li key={i}>
                      <Link href={r.link} onClick={close} className="flex items-center justify-between px-4 py-3.5">
                        <span>
                          <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-coral">{r.type}</span>
                          <span className="text-[0.95rem] font-medium text-ocean">{r.title}</span>
                        </span>
                        <ChevronRight size={16} className="text-ocean/30" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {/* menu list */}
                  <ul className="mt-5 divide-y divide-ocean/10 overflow-hidden rounded-2xl bg-white shadow-sm">
                    {moreItems.map((item) => {
                      const Icon = iconFor[item.label] || LayoutList;
                      if (item.subLinks) {
                        const open = expanded === item.label;
                        return (
                          <li key={item.label}>
                            <button
                              onClick={() => setExpanded(open ? null : item.label)}
                              aria-expanded={open}
                              className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left"
                            >
                              <Icon size={19} className="shrink-0 text-coral" />
                              <span className="flex-1 text-[0.98rem] font-medium text-ocean">{item.label}</span>
                              <ChevronDown size={18} className={`text-ocean/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {open && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease }}
                                  className="overflow-hidden bg-sand/50"
                                >
                                  {item.subLinks.map((s) => (
                                    <li key={s.href}>
                                      <Link href={s.href} onClick={close} className="flex items-center justify-between py-3 pl-[3.35rem] pr-4 text-[0.92rem] text-ocean/85 active:bg-sand">
                                        {s.label}
                                        <ChevronRight size={15} className="text-ocean/30" />
                                      </Link>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </li>
                        );
                      }
                      const active = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link href={item.href!} onClick={close} className="flex items-center gap-3.5 px-4 py-3.5 active:bg-sand">
                            <Icon size={19} className="shrink-0 text-coral" />
                            <span className={`flex-1 text-[0.98rem] ${active ? "font-semibold text-coral" : "font-medium text-ocean"}`}>{item.label}</span>
                            <ChevronRight size={18} className="text-ocean/30" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* contact */}
                  <div className="mt-5 rounded-2xl bg-ocean p-4 text-white">
                    <p className="flex items-start gap-2 text-[0.82rem] text-white/75">
                      <MapPin size={15} className="mt-0.5 shrink-0" /> {contact.address}
                    </p>
                    <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                      <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-ocean active:scale-[0.97]">
                        <Phone size={16} /> Call now
                      </a>
                      <a href={wa(waMessages.general)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 text-sm font-semibold text-white active:scale-[0.97]">
                        <WaIcon /> WhatsApp
                      </a>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Docked bar: five equal tabs */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-[150] border-t border-ocean/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-14px_rgba(10,42,77,.3)] xl:hidden"
      >
        <div className="mx-auto grid h-[62px] max-w-xl grid-cols-5 px-1">
          {tabs.map((t) => {
            const active = t.match(pathname);
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 transition-[color,transform] duration-150 active:scale-95 ${active ? "text-coral" : "text-ocean/55"}`}
              >
                <Icon size={22} strokeWidth={active ? 2.3 : 2} />
                <span className={`text-[0.64rem] ${active ? "font-bold" : "font-semibold"}`}>{t.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(true)}
            aria-haspopup="dialog"
            className="flex flex-col items-center justify-center gap-1 text-ocean/55 transition-transform duration-150 active:scale-95"
          >
            <LayoutList size={22} strokeWidth={2} />
            <span className="text-[0.64rem] font-semibold">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
