import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Guide } from "@/data/guides";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-white border border-charcoal/5 rounded-[24px] shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 flex flex-col overflow-hidden h-full group">
      <div className="relative p-2">
        <div className="relative overflow-hidden rounded-[16px]">
          <PlaceholderImage
            gradient={guide.imageGradient}
            alt={guide.title}
            className="h-40 w-full transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-5 left-5">
          <span className="badge bg-white/90 text-charcoal shadow-sm border border-charcoal/5 font-bold tracking-tight">
            {guide.category}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-charcoal mb-4 leading-tight group-hover:text-coral transition-colors break-words tracking-tight">
          {guide.title}
        </h3>

        <ul className="space-y-3 mb-8 flex-1 min-w-0">
          {guide.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-charcoal/60 font-medium min-w-0">
              <CheckCircle2 size={18} className="text-teal shrink-0 mt-0.5" />
              <span className="leading-relaxed break-words min-w-0">{highlight}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-sm font-bold text-teal group-hover:text-teal-dark transition-colors mt-auto"
        >
          Plan Your Trip <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform shrink-0" />
        </Link>
      </div>
    </div>
  );
}
