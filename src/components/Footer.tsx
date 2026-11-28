import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, Star } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";
import { waMessages, waUrl } from "@/lib/whatsapp";
import TermsButton from "@/components/TermsButton";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import { getSiteSettings } from "@/lib/settings";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const explore = [
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Hotels & Resorts", href: "/hotels-and-resorts" },
  { label: "Cabs & Travels", href: "/travels" },
  { label: "Blog", href: "/blog" },
  { label: "Travel Guides", href: "/travel-guides" },
  { label: "Itineraries", href: "/itinerary" },
  { label: "How It Works", href: "/how-it-works" },
];

const destinations = [
  { label: "Araku Valley", href: "/araku-valley" },
  { label: "Lambasingi Hills", href: "/lambasingi" },
  { label: "Vanjangi Hills", href: "/vanjangi" },
  { label: "Maredumilli", href: "/maredumilli" },
  { label: "Top Tourist Places", href: "/top-tourist-places" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const linkClass =
  "text-[0.92rem] text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline underline-offset-4";

function LinkGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="mb-5 font-[family-name:var(--font-body)] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-amber">{title}</h3>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  const { contact, socials } = await getSiteSettings();

  // Popular packages (falls back to static links if none are tagged "popular")
  const supabase = await createClient();
  const { data: popular } = await supabase
    .from("tour_packages")
    .select("title, slug")
    .eq("is_published", true)
    .ilike("badge", "%popular%")
    .limit(5);

  const popularLinks =
    popular && popular.length > 0
      ? popular.map((p) => ({ label: p.title, href: `/packages/${p.slug}` }))
      : [
          { label: "Vizag One Day Tour", href: "/tour-packages" },
          { label: "Vizag Local Sightseeing", href: "/tour-packages" },
          { label: "Vizag – Araku Package", href: "/tour-packages" },
          { label: "Lambasingi Getaway", href: "/lambasingi" },
        ];

  const socialList = [
    { label: "Facebook", href: socials.facebook, Icon: FaFacebookF },
    { label: "Instagram", href: socials.instagram, Icon: FaInstagram },
    { label: "YouTube", href: socials.youtube, Icon: FaYoutube },
    { label: "X (Twitter)", href: socials.x, Icon: FaXTwitter },
    { label: "LinkedIn", href: socials.linkedin, Icon: FaLinkedinIn },
  ].filter((x) => x.href);

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <footer className="grain relative overflow-hidden bg-ocean-gradient text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Vizag Tour Packages footer
      </h2>
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-sunset" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full blob text-coral/20" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full blob text-teal/20" />

      {/* Closing call to action */}
      <div className="container-max relative z-10 px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="kicker mb-4 !text-amber">Ready when you are</p>
            <p className="font-heading text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-white">
              Let&apos;s plan your next <span className="italic text-sunset">Vizag</span> escape.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={waUrl(waMessages.general, contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-coral !px-8 !py-4">
              Chat on WhatsApp
            </a>
            <Link
              href="/tour-packages"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-[0.95rem] font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]"
            >
              Browse packages
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-max relative z-10 px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr_1.3fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block rounded-2xl bg-white p-2 shadow-lg" aria-label={`${siteInfo.name} home`}>
              <img src="/logo-card.jpg" alt={siteInfo.name} width={640} height={360} className="h-[76px] w-auto rounded-xl" loading="lazy" />
            </Link>
            <p className="mt-5 max-w-sm text-[0.92rem] leading-relaxed text-white/70">
              A trusted local travel company in Visakhapatnam — sightseeing, devotional and hill-station tours, hotels, cabs and custom holidays at fixed, honest prices.
            </p>
            {socialList.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Follow us">
                {socialList.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/85 transition-[background-color,color,transform,border-color] duration-200 hover:border-transparent hover:bg-sunset hover:text-white active:scale-95"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-6 flex flex-wrap gap-2.5 text-xs font-semibold">
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-white/85">
                <Star size={13} className="fill-amber text-amber" /> {siteInfo.googleReviews.rating} · {siteInfo.googleReviews.count} Google reviews
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-white/85">
                <ShieldCheck size={13} className="text-teal" /> GST registered
              </li>
            </ul>
          </div>

          <LinkGroup title="Explore" links={explore} />
          <LinkGroup title="Destinations" links={destinations} />

          <div>
            <LinkGroup title="Popular packages" links={popularLinks} />
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-5 font-[family-name:var(--font-body)] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-amber">Contact</h3>
            <address className="space-y-4 not-italic">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-[0.92rem] leading-relaxed text-white/70 transition-colors hover:text-white">
                <MapPin size={17} className="mt-0.5 shrink-0 text-amber" aria-hidden />
                <span>{contact.address}</span>
              </a>
              <a href={`tel:${contact.phone}`} className="group flex items-center gap-3 text-[0.92rem] text-white/70 transition-colors hover:text-white">
                <Phone size={17} className="shrink-0 text-amber" aria-hidden />
                <span>{contact.phone.replace("+91", "+91 ")}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="group flex items-center gap-3 break-all text-[0.92rem] text-white/70 transition-colors hover:text-white">
                <Mail size={17} className="shrink-0 text-amber" aria-hidden />
                <span>{contact.email}</span>
              </a>
            </address>
            <div className="mt-6">
              <LinkGroup title="Company" links={company} />
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative z-10 border-t border-white/15">
        <div className="container-max flex flex-col items-center justify-between gap-4 px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-6 text-center sm:px-6 md:flex-row xl:pb-6 md:text-left lg:px-8">
          <div className="flex flex-col items-center gap-2 text-[0.8rem] text-white/60 sm:flex-row sm:gap-5">
            <span>© {currentYear} Vizag Tour Packages. All rights reserved.</span>
            <TermsButton category="footer" label="Terms & Conditions" className="cursor-pointer transition-colors hover:text-white" />
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <p className="text-[0.82rem] text-white/60">
              Made with <span aria-label="love" className="text-coral">♥</span> by{" "}
              <a
                href="https://innovalley.in"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-link font-semibold"
              >
                Innovalley
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
