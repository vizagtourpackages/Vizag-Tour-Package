import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="card-base p-5 sm:p-6 h-full flex flex-col bg-white min-w-0">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <p className="text-charcoal-light italic mb-6 flex-1 text-sm leading-relaxed break-words">
        &quot;{testimonial.snippet}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-charcoal text-sm">{testimonial.name}</h4>
          <span className="text-xs text-charcoal-light/60">Google Review</span>
        </div>
      </div>
    </div>
  );
}
