"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/data/siteInfo";

interface CounterProps {
  value: number;
  suffix: string;
  duration?: number;
}

function Counter({ value, suffix, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-ocean text-white py-16">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center text-center px-4 ${
                idx % 2 === 0 ? "border-none sm:border-solid" : "border-none lg:border-solid"
              } ${idx === 0 ? "border-none" : ""}`}
            >
              <div className="text-4xl sm:text-5xl font-heading font-bold mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm sm:text-base font-medium text-white/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
