"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PromoBannerProps {
  banner: {
    id: string;
    badge_text: string;
    headline: string;
    description: string | null;
    offer_end_datetime: string | null;
    cta_text: string;
    cta_link: string;
  };
  images: {
    image_url: string;
  }[];
}

export default function PromoBanner({ banner, images }: PromoBannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  // Auto-rotate images
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  // Countdown timer
  useEffect(() => {
    if (!banner.offer_end_datetime) return;
    
    const calculateTimeLeft = () => {
      const difference = new Date(banner.offer_end_datetime!).getTime() - new Date().getTime();
      if (difference <= 0) return null;
      
      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [banner.offer_end_datetime]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-4 md:py-8 bg-warm-white relative overflow-hidden">
      <div className="container-max px-4 md:px-6">
        <div className="relative w-full rounded-[20px] sm:rounded-[32px] overflow-hidden shadow-xl min-h-[180px] md:min-h-[240px] flex items-center bg-charcoal">
          
          {/* Rotating Background Images */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex].image_url}
                alt="Promo Banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          </div>

          {/* Content */}
          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full flex flex-col justify-between h-full">
            <div className="max-w-xl">
              <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-2 shadow-sm">
                {banner.badge_text}
              </span>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight mb-1.5 tracking-tight drop-shadow-md">
                {banner.headline}
              </h2>
              
              {banner.description && (
                <p className="text-white/90 text-xs sm:text-sm mb-3 leading-relaxed drop-shadow line-clamp-2">
                  {banner.description}
                </p>
              )}
            </div>

            <div className="flex flex-row items-center justify-between w-full mt-auto pt-2 gap-2">
              {timeLeft ? (
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  <span className="text-white/80 text-[8px] sm:text-[10px] font-medium uppercase tracking-wider">Offer ends:</span>
                  <div className="flex gap-1 text-white font-bold bg-black/40 backdrop-blur-md px-1.5 py-1 sm:px-2 sm:py-1 rounded-md border border-white/10">
                    <span className="flex flex-col items-center"><span className="text-xs sm:text-sm leading-none">{timeLeft.d}</span><span className="text-[7px] sm:text-[8px] text-white/50">D</span></span>
                    <span className="opacity-50 text-xs sm:text-sm">:</span>
                    <span className="flex flex-col items-center"><span className="text-xs sm:text-sm leading-none">{timeLeft.h}</span><span className="text-[7px] sm:text-[8px] text-white/50">H</span></span>
                    <span className="opacity-50 text-xs sm:text-sm">:</span>
                    <span className="flex flex-col items-center"><span className="text-xs sm:text-sm leading-none">{timeLeft.m}</span><span className="text-[7px] sm:text-[8px] text-white/50">M</span></span>
                    <span className="opacity-50 text-xs sm:text-sm">:</span>
                    <span className="flex flex-col items-center"><span className="text-xs sm:text-sm leading-none">{timeLeft.s}</span><span className="text-[7px] sm:text-[8px] text-white/50">S</span></span>
                  </div>
                </div>
              ) : (
                <div />
              )}

              <Link 
                href={banner.cta_link}
                className="bg-teal hover:bg-teal-dark text-white font-bold py-1.5 px-4 sm:py-2 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap text-[10px] sm:text-xs"
              >
                {banner.cta_text}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
