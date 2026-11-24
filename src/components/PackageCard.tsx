'use client'
import Link from "next/link";
import { Clock, Users, Star } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Package } from "@/data/packages";
import { siteInfo } from "@/data/siteInfo";
import { Arrow } from "./Motion";

interface PackageCardProps {
  pkg: Package;
}

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
  </svg>
);

export default function PackageCard({ pkg }: PackageCardProps) {
  const href = `/packages/${pkg.slug || pkg.id}`;
  const discountPercent =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
      : 0;
  const route = (pkg.highlights || []).slice(0, 3);
  const showBadge = pkg.badge && !pkg.badge.match(/\d+\s*[DN]/i);
  const waText = encodeURIComponent(`Hi! I'm interested in the "${pkg.title}" package. Could you share details?`);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_2px_0_rgba(10,42,77,.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(10,42,77,.4)]">
      {/* Image */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-sand">
        {pkg.imageUrl ? (
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage gradient={pkg.imageGradient} alt={pkg.title} className="absolute inset-0 h-full w-full" overlay />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/65 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-sunset px-3.5 py-1.5 text-xs font-bold text-white shadow-glow">
          {pkg.duration}
        </span>
        {showBadge && (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">
            {pkg.badge}
          </span>
        )}
        <span className="absolute bottom-4 left-5 flex items-center gap-1.5 text-xs font-medium text-white/90">
          <Star size={13} className="fill-amber text-amber" />
          {pkg.rating || 4.5} <span className="text-white/60">({pkg.review_count || 120})</span>
        </span>
      </Link>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <Link href={href}>
          <h3 className="font-heading text-[1.45rem] leading-tight text-ocean transition-colors group-hover:text-coral">{pkg.title}</h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.82rem] font-medium text-charcoal/60">
          <span className="flex items-center gap-1.5"><Clock size={15} className="text-teal" />{pkg.duration}</span>
          <span className="flex items-center gap-1.5"><Users size={15} className="text-teal" />{pkg.people}</span>
        </div>

        {route.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[0.8rem] text-charcoal/70">
            {route.map((r, k) => (
              <span key={`${r}-${k}`} className="flex items-center gap-2">
                {k > 0 && <span className="h-px w-3 bg-coral/60" />}
                <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-coral" />{r}</span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
        <div className="flex items-end justify-between gap-3 border-t border-dashed border-ocean/15 pt-5">
          <div className="min-w-0">
            {discountPercent > 0 && (
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-charcoal/45">
                <span className="line-through">₹{pkg.originalPrice?.toLocaleString("en-IN")}</span>
                <span className="rounded bg-teal/10 px-1.5 py-0.5 text-teal">{discountPercent}% OFF</span>
              </p>
            )}
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-charcoal/45">{pkg.priceLabel || "Per couple"}</p>
            <p className="font-heading text-[1.7rem] leading-none text-ocean">
              <span className="text-base">₹</span>{pkg.price.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`${siteInfo.whatsappLink}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp enquiry"
              className="grid h-11 w-11 place-items-center rounded-full bg-[#25d366]/15 text-[#128c4a] transition-colors duration-200 hover:bg-[#25d366] hover:text-white"
            >
              <WaIcon />
            </a>
            <Link
              href={href}
              className="group/b inline-flex items-center gap-2 rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-coral active:scale-[0.97]"
            >
              Details <Arrow className="transition-transform group-hover/b:translate-x-1" />
            </Link>
          </div>
        </div>
        </div>
      </div>
    </article>
  );
}
