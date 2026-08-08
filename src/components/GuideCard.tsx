import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Guide } from "@/data/guides";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="card-base group h-full flex flex-col bg-white overflow-hidden">
      <div className="relative overflow-hidden">
        <PlaceholderImage
          gradient={guide.imageGradient}
          alt={guide.title}
          className="h-40 w-full transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/90 text-charcoal shadow-sm backdrop-blur-sm">
            {guide.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg text-charcoal mb-4 leading-snug group-hover:text-ocean transition-colors">
          {guide.title}
        </h3>

        <ul className="space-y-2 mb-6 flex-1">
          {guide.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-charcoal-light/80">
              <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
              <span className="leading-tight">{highlight}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean group-hover:text-ocean-dark transition-colors mt-auto"
        >
          Plan Your Trip <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
