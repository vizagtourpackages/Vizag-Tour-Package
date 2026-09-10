import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 h-full flex flex-col border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 min-w-0">
      <div className="flex gap-1.5 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < testimonial.rating
                ? "fill-coral text-coral"
                : "fill-charcoal/5 text-charcoal/5"
            }
          />
        ))}
      </div>
      <p className="text-charcoal/70 font-medium italic mb-8 flex-1 text-base leading-relaxed break-words">
        &quot;{testimonial.snippet}&quot;
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center text-charcoal font-bold text-base shrink-0 shadow-sm border border-charcoal/5">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-charcoal text-base tracking-tight">{testimonial.name}</h4>
          <span className="text-xs font-bold text-teal tracking-wide uppercase">Google Review</span>
        </div>
      </div>
    </div>
  );
}
