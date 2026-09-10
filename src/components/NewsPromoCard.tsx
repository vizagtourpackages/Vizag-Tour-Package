import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface NewsPromoData {
  id: string;
  type: "News" | "Promotion";
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  linkText: string;
  href: string;
}

export default function NewsPromoCard({ item }: { item: NewsPromoData }) {
  const isPromo = item.type === "Promotion";

  return (
    <div className="bg-[#1a1f2e] rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch border border-white/10 hover:border-white/20 transition-all duration-300 group">
      {/* Image container */}
      <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto rounded-2xl overflow-hidden relative shrink-0 bg-charcoal">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="w-full sm:w-3/5 flex flex-col justify-center py-2">
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isPromo
                ? "bg-coral/20 text-coral border border-coral/30"
                : "bg-ocean/20 text-[#38bdf8] border border-[#38bdf8]/30"
            }`}
          >
            {item.type}
          </span>
          <span className="text-white/40 text-xs font-medium">{item.date}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-heading leading-tight group-hover:text-ocean-light transition-colors">
          {item.title}
        </h3>
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto pt-2">
          <Link
            href={item.href}
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
              isPromo ? "text-coral hover:text-coral-light" : "text-[#38bdf8] hover:text-[#7dd3fc]"
            }`}
          >
            {item.linkText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
