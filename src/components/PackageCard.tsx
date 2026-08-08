import Link from "next/link";
import { Check, X, ArrowRight, Clock, Users } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Package } from "@/data/packages";
import { siteInfo } from "@/data/siteInfo";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the "${pkg.title}" package (${pkg.priceLabel}). Could you share more details?`
  );

  return (
    <div className="card-base overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative">
        <PlaceholderImage
          gradient={pkg.imageGradient}
          alt={pkg.title}
          className="h-48 w-full"
          overlay
        />
        {pkg.badge && (
          <span className="absolute top-4 left-4 badge bg-coral text-white shadow-lg">
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
          <span className="text-xl font-bold text-charcoal">{pkg.priceLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-xl text-charcoal mb-3 leading-snug">
          {pkg.title}
        </h3>

        {/* Duration & People */}
        <div className="flex items-center gap-4 mb-4 text-sm text-charcoal-light/70">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-ocean" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-ocean" />
            {pkg.people}
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.highlights.slice(0, 5).map((h) => (
            <span
              key={h}
              className="text-xs px-2 py-1 rounded-md bg-sand text-charcoal-light"
            >
              {h}
            </span>
          ))}
          {pkg.highlights.length > 5 && (
            <span className="text-xs px-2 py-1 rounded-md bg-sand text-charcoal-light/60">
              +{pkg.highlights.length - 5} more
            </span>
          )}
        </div>

        {/* Includes / Excludes */}
        <div className="space-y-2 mb-6 flex-1">
          <div>
            <span className="text-xs font-semibold text-teal uppercase tracking-wide">
              Includes
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              {pkg.includes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 text-xs text-charcoal-light"
                >
                  <Check size={12} className="text-green-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">
              Excludes
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              {pkg.excludes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1 text-xs text-charcoal-light/60"
                >
                  <X size={12} className="text-rose-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <a
            href={`${siteInfo.whatsappLink}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 !text-sm !py-2.5"
          >
            Book Now
          </a>
          <Link
            href="/tour-packages"
            className="btn-secondary !text-sm !py-2.5 !px-4"
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
