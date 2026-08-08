"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Map, Hotel, Car, ArrowRight } from "lucide-react";
import { siteInfo, heroCTAs } from "@/data/siteInfo";

const iconMap = {
  Map: Map,
  Hotel: Hotel,
  Car: Car,
};

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="-mt-[72px] pt-[12px] relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-ocean-dark to-teal" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-ocean-light/10 rounded-full blur-3xl" />

      {/* Decorative Waves */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="w-full h-24 sm:h-32 fill-warm-white"
        >
          <path d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,138.7C672,139,768,117,864,112C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z" />
        </svg>
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="badge bg-white/10 text-white/90 mb-6 backdrop-blur-sm">
              🌊 The City of Destiny
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading text-white leading-[1.1] mb-6"
          >
            {siteInfo.tagline.split("—")[0]}
            <span className="block text-coral-light">
              — {siteInfo.tagline.split("—")[1]?.trim()}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed"
          >
            {siteInfo.subtitle} — {siteInfo.intro.slice(0, 160)}
          </motion.p>
        </div>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
        >
          {heroCTAs.map((cta) => {
            const Icon = iconMap[cta.icon];
            return (
              <Link
                key={cta.title}
                href={cta.href}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-coral-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {cta.title}
                </h3>
                <p className="text-white/60 text-sm">{cta.description}</p>
                <ArrowRight
                  size={16}
                  className="absolute top-6 right-6 text-white/30 group-hover:text-coral transition-colors"
                />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
