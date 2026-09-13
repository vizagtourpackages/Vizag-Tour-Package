"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Map, Hotel, Car, ArrowRight } from "lucide-react";
import { siteInfo, heroCTAs } from "@/data/siteInfo";
import ScrollReveal from "./ScrollReveal";

const iconMap = {
  Map: Map,
  Hotel: Hotel,
  Car: Car,
};

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="-lg:mt-[100px] pt-[2px] relative min-h-[600px] flex items-center overflow-hidden bg-warm-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sand rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-coral/5 rounded-full blur-[80px]" />

      {/* Decorative Waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-32 fill-sand-light"
        >
          <path d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,138.7C672,139,768,117,864,112C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" />
        </svg>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-32 pb-8 sm:pb-40">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          <ScrollReveal delay={0}>
            <span className="inline-block badge border border-charcoal/10 text-charcoal/70 bg-white mb-8 tracking-widest px-4 py-1.5 shadow-sm">
              🌊 THE CITY OF DESTINY
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-heading font-bold text-charcoal leading-[1.1] sm:leading-[1] mb-6 tracking-tight">
              {siteInfo.tagline.split("—")[0]}
              <span className="block text-coral mt-2">
                — {siteInfo.tagline.split("—")[1]?.trim()}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-sm sm:text text-charcoal/60 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {siteInfo.subtitle} — {siteInfo.intro.slice(0, 260)}
            </p>
          </ScrollReveal>
        </div>

        {/* CTA Cards */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto lg:mx-0 mt-8">
            {heroCTAs.map((cta) => {
              const Icon = iconMap[cta.icon];
              return (
                <Link
                  key={cta.title}
                  href={cta.href}
                  className="group relative bg-white border border-charcoal/5 rounded-[16px] sm:rounded-[32px] p-3 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-sand flex items-center justify-center mb-2 sm:mb-6 group-hover:scale-110 group-hover:bg-coral/10 transition-transform duration-500">
                    <Icon size={24} className="text-charcoal group-hover:text-coral transition-colors w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]" />
                  </div>
                  <h3 className="text-charcoal font-bold text-[11px] sm:text-xl mb-0 sm:mb-2 tracking-tight leading-tight">
                    {cta.title}
                  </h3>
                  <p className="hidden sm:block text-charcoal/50 text-sm leading-relaxed">{cta.description}</p>
                  <ArrowRight
                    size={20}
                    className="hidden sm:block absolute top-8 right-8 text-charcoal/20 group-hover:text-coral group-hover:translate-x-1 transition-all"
                  />
                </Link>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
