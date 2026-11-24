import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";
import type { Guide } from "@/data/guides";
import { Arrow } from "./Motion";

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const href = guide.slug || guide.id ? `/travel-guides/${guide.slug || guide.id}` : "/travel-guides";
  return (
    <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_2px_0_rgba(10,42,77,.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(10,42,77,.4)]">
      <div className="relative aspect-[16/11] overflow-hidden bg-sand">
        {guide.imageUrl ? (
          <img
            src={guide.imageUrl}
            alt={guide.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
          />
        ) : (
          <PlaceholderImage gradient={guide.imageGradient} alt={guide.title} className="absolute inset-0 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a30]/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">
          {guide.category}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-6">
        <h3 className="font-heading text-[1.4rem] leading-tight text-ocean transition-colors group-hover:text-coral">{guide.title}</h3>
        <ul className="mt-4 mb-6 flex-1 space-y-2">
          {guide.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[0.86rem] leading-snug text-charcoal/65">
              <i className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ocean transition-colors group-hover:text-coral">
          Read guide <Arrow className="transition-transform group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
