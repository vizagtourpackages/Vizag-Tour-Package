"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { navLinks, siteInfo } from "@/data/siteInfo";
import { waMessages } from "@/lib/whatsapp";
import { useSite } from "@/components/SiteProvider";

const WaIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

// Desktop shows the essentials; the rest live under "More" so the bar never overflows.
const primaryLinks = navLinks.slice(0, 5);
const moreLinks = navLinks.slice(5).filter((l) => l.href) as { label: string; href: string }[];
const desktopLinks = [...primaryLinks, { label: "More", subLinks: moreLinks }];

export default function Navbar() {
  const { wa, contact } = useSite();
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 12);
  });

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[120] h-[3px] w-full origin-left bg-sunset"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={`safe-top fixed inset-x-0 top-0 z-[100] border-b bg-white transition-[box-shadow,border-color] duration-300 ${
          solid ? "border-ocean/10 shadow-[0_8px_24px_-16px_rgba(10,42,77,.4)]" : "border-ocean/5"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between gap-6 px-5 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center" aria-label={siteInfo.name}>
            <img src="/logo.png" alt={siteInfo.name} width={560} height={299} className="h-[60px] w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            {desktopLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="group relative">
                  <button className="flex items-center gap-1 px-3.5 py-2 text-[0.88rem] font-semibold text-ocean/75 transition-colors hover:text-ocean">
                    {link.label}
                    <ChevronDown size={14} className="opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[230px] overflow-hidden rounded-3xl border border-ocean/10 bg-white p-2 shadow-[0_30px_60px_-20px_rgba(10,42,77,.35)]">
                      {link.subLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-ocean transition-colors hover:bg-sand hover:text-coral"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`group relative px-3.5 py-2 text-[0.88rem] font-semibold transition-colors hover:text-ocean ${
                    pathname === link.href ? "text-ocean" : "text-ocean/75"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 bottom-1 h-[2px] origin-left rounded-full bg-sunset transition-transform duration-500 ${
                      pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <a href={`tel:${contact.phone}`} className="hidden items-center gap-2 text-[0.86rem] font-semibold text-ocean/80 hover:text-coral 2xl:flex">
              <Phone size={16} /> {contact.phone.replace("+91", "+91 ")}
            </a>
            <a
              href={wa(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book on WhatsApp"
              className="group relative inline-flex h-10 w-10 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#25d366] text-white sm:h-auto sm:w-auto sm:bg-ocean sm:px-5 sm:py-2.5 sm:text-[0.84rem] sm:font-semibold"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
              <WaIcon className="relative h-[22px] w-[22px] sm:h-[17px] sm:w-[17px] sm:text-[#25d366]" />
              <span className="relative hidden sm:inline">Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

    </>
  );
}
