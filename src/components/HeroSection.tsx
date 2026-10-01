"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Map, Hotel, CarFront, ArrowRight } from "lucide-react";
import { siteInfo, heroCTAs } from "@/data/siteInfo";
import ScrollReveal from "./ScrollReveal";
import MobileTrustBanner from "./MobileTrustBanner";

const iconMap = {
  Map: Map,
  Hotel: Hotel,
  CarFront: CarFront,
};

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      className="relative w-full min-h-[85dvh] md:min-h-0 md:h-[calc(115dvh-75px)] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/hero-bg.png')",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />
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
      <div ref={ref} className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-6 sm:pt-16 pb-32 sm:pb-24 w-full h-full flex flex-col">
        {/* Main Content centered in available space */}
        <div className="flex flex-col justify-start md:justify-center flex-1 mt-4 md:mt-0">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <ScrollReveal delay={0}>
              <span className="inline-block badge border border-white/20 text-white bg-black/20 backdrop-blur-sm mb-3 sm:mb-8 tracking-widest px-4 py-1.5 shadow-sm text-[10px] sm:text-xs">
                🌊 THE CITY OF DESTINY
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-6xl lg:text-[80px] font-heading font-bold text-white leading-[1.1] sm:leading-[1] mb-2 sm:mb-6 tracking-tight drop-shadow-lg">
                {siteInfo.tagline.split("—")[0]}
                <span className="block text-coral-light text-coral mt-1 sm:mt-2 text-[26px] sm:text-4xl lg:text-6xl drop-shadow-md">
                  — {siteInfo.tagline.split("—")[1]?.trim()}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[13px] sm:text-base text-white/90 mb-4 sm:mb-12 max-w-2xl mx-auto lg:mx-0 leading-snug sm:leading-relaxed font-medium drop-shadow-md">
                {siteInfo.subtitle} — {siteInfo.intro.slice(0, 260)}
              </p>
            </ScrollReveal>
          </div>

          {/* CTA Cards */}
          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-3xl lg:max-w-2xl mx-auto lg:mx-0 mt-2 sm:mt-8 ">
              {heroCTAs.map((cta) => {
                const Icon = iconMap[cta.icon];
                return (
                  <Link
                    key={cta.title}
                    href={cta.href}
                    className="group relative bg-white border border-charcoal/5 rounded-[16px] md:rounded-[20px] p-2.5 md:p-5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col items-center lg:items-start text-center lg:text-left"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-sand flex items-center justify-center mb-1.5 md:mb-3 group-hover:scale-110 group-hover:bg-coral/10 transition-transform duration-500">
                      {'imageUrl' in cta ? (
                        <img src={cta.imageUrl} alt={cta.title} className="w-[14px] h-[14px] md:w-[22px] md:h-[22px] object-contain group-hover:scale-110 transition-transform" />
                      ) : (
                        <Icon size={24} className="text-charcoal group-hover:text-coral transition-colors w-[16px] h-[16px] md:w-[18px] md:h-[18px]" />
                      )}
                    </div>
                    <h3 className="text-charcoal font-bold text-[10px] md:text-[15px] mb-0 md:mb-1 tracking-tight leading-tight">
                      {cta.title}
                    </h3>
                    <p className="hidden sm:block text-charcoal/50 text-xs md:text-[13px] leading-relaxed line-clamp-2">{cta.description}</p>
                    <ArrowRight
                      size={20}
                      className="hidden sm:block absolute top-4 right-4 md:top-5 md:right-5 text-charcoal/20 group-hover:text-coral group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                );
              })}
            </div>
          </ScrollReveal>
        </div> {/* Close flex-1 wrapper */}

        {/* Bottom Banner */}
        <ScrollReveal delay={0.4} className="absolute bottom-0 left-0 right-0 w-full md:hidden z-20 flex justify-center pb-2">
          <div className="w-full">
            <MobileTrustBanner />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
