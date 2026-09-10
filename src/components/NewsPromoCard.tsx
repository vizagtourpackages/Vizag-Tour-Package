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
    <div className="bg-white rounded-[32px] p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-stretch border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-2">
      {/* Image container */}
      <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto rounded-[24px] overflow-hidden relative shrink-0 bg-sand">
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
            className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              isPromo
                ? "bg-coral/10 text-coral border border-coral/20"
                : "bg-teal/10 text-teal border border-teal/20"
            }`}
          >
            {item.type}
          </span>
          <span className="text-charcoal/40 text-xs font-bold tracking-wide">{item.date}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-charcoal mb-4 font-heading leading-tight group-hover:text-coral transition-colors tracking-tight">
          {item.title}
        </h3>
        <p className="text-charcoal/60 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-medium">
          {item.description}
        </p>

        <div className="mt-auto pt-2">
          <Link
            href={item.href}
            className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
              isPromo ? "text-coral hover:text-coral-light" : "text-teal hover:text-teal-dark"
            }`}
          >
            {item.linkText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
