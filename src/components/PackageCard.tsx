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
    <div className="bg-white border border-charcoal/5 rounded-[32px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col overflow-hidden group">
      {/* Image */}
      <div className="relative p-2">
        <div className="relative overflow-hidden rounded-[24px]">
          {pkg.imageUrl ? (
            <div className="relative h-48 sm:h-56 w-full">
              <img 
                src={pkg.imageUrl} 
                alt={pkg.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : (
            <PlaceholderImage
              gradient={pkg.imageGradient}
              alt={pkg.title}
              className="h-48 sm:h-56 w-full transform transition-transform duration-700 group-hover:scale-105"
              overlay
            />
          )}
        </div>
        {pkg.badge && (
          <span className="absolute top-6 left-6 badge bg-coral text-white shadow-sm border border-coral/20 tracking-tight">
            {pkg.badge}
          </span>
        )}
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-sm border border-charcoal/5">
          <span className="text-xl font-black text-charcoal tracking-tight">{pkg.priceLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-7 flex flex-col flex-1 min-w-0">
        <h3 className="font-heading text-2xl font-bold text-charcoal mb-4 leading-tight break-words group-hover:text-coral transition-colors tracking-tight">
          {pkg.title}
        </h3>

        {/* Duration & People */}
        <div className="flex items-center gap-4 mb-5 text-sm text-charcoal/60 font-medium flex-wrap">
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-teal shrink-0" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={16} className="text-teal shrink-0" />
            {pkg.people}
          </span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.highlights.slice(0, 5).map((h) => (
            <span
              key={h}
              className="text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-charcoal/70 break-words"
            >
              {h}
            </span>
          ))}
          {pkg.highlights.length > 5 && (
            <span className="text-[11px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full bg-sand text-charcoal/50">
              +{pkg.highlights.length - 5} more
            </span>
          )}
        </div>

        {/* Includes / Excludes */}
        <div className="space-y-4 mb-8 flex-1 min-w-0 border-t border-charcoal/5 pt-5">
          <div>
            <span className="text-[10px] font-black text-teal uppercase tracking-widest block mb-2">
              Includes
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pkg.includes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-medium text-charcoal/70 break-words"
                >
                  <Check size={14} className="text-teal shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black text-coral uppercase tracking-widest block mb-2">
              Excludes
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pkg.excludes.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-xs font-medium text-charcoal/50 break-words"
                >
                  <X size={14} className="text-coral/70 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto min-w-0">
          <a
            href={`${siteInfo.whatsappLink}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 !text-sm !py-3 !px-4 justify-center text-center whitespace-nowrap min-w-0 bg-teal hover:bg-teal-dark"
          >
            Book Now
          </a>
          <Link
            href="/tour-packages"
            className="btn-secondary !py-3 !px-4 justify-center shrink-0 border-charcoal/10 hover:border-charcoal/20 hover:bg-charcoal/5 text-charcoal"
            aria-label={`View itinerary for ${pkg.title}`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
