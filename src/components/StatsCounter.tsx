"use client";

import { useEffect, useState, useRef } from "react";
import { Award, MapPin, Compass, Users } from "lucide-react";
import { stats } from "@/data/siteInfo";

const statIcons = [Award, MapPin, Compass, Users];

export default function StatsCounter() {
  const [counts, setCounts] = useState(() => stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setCounts(stats.map((s) => s.value));
      return;
    }

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          const duration = 1800;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth exponential easeOut curve
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCounts(stats.map((stat) => Math.round(stat.value * ease)));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCounts(stats.map((stat) => stat.value));
            }
          };

          animationFrameId = requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-16 md:py-20 bg-gradient-to-br from-[#063a45] via-[#0b5c6d] to-[#084855] text-white shadow-inner"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-ocean-light/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle modern dot pattern texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Edge highlight lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            const mobileBorders = [
              idx % 2 === 0 ? "border-r" : "",
              idx < 2 ? "border-b" : "",
            ]
              .filter(Boolean)
              .join(" ");

            const desktopBorders =
              idx < 3 ? "md:border-r md:border-b-0" : "md:border-r-0 md:border-b-0";

            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 lg:p-10 border-white/15 ${mobileBorders} ${desktopBorders}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-teal-200 mb-3 sm:mb-4 shadow-sm">
                  <Icon size={22} strokeWidth={2} />
                </div>

                {/* Number with animated count */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-1 sm:mb-2 text-white tracking-tight tabular-nums">
                  {counts[idx]}
                  <span className="text-teal-200 font-light ml-0.5">{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

