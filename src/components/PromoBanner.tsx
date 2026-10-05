"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface BannerData {
  id: string;
  badge_text: string;
  headline: string;
  description: string | null;
  offer_end_datetime: string | null;
  cta_text: string;
  cta_link: string;
  images: string[];
}

interface PromoBannerProps {
  banners: BannerData[];
}

export default function PromoBanner({ banners }: PromoBannerProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 50;

  const onSwipeStart = (clientX: number) => {
    setTouchEnd(null);
    setTouchStart(clientX);
    setIsDragging(true);
  };

  const onSwipeMove = (clientX: number) => {
    if (!isDragging) return;
    setTouchEnd(clientX);
  };

  const onSwipeEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && banners.length > 1) {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      setCurrentImageIndex(0);
    } else if (isRightSwipe && banners.length > 1) {
      setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
      setCurrentImageIndex(0);
    }
  };

  const banner = banners[currentBannerIndex];

  // Auto-rotate banners every 2 seconds if there is more than 1
  useEffect(() => {
    if (!banners || banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
      setCurrentImageIndex(0); // Reset image index when banner changes
    }, 10000);
    return () => clearInterval(interval);
  }, [banners]);

  // Auto-rotate images within a banner every 2 seconds (if multiple images)
  // But wait, if we are rotating banners every 2 seconds, image rotation within the same 2 seconds won't be seen.
  // We'll leave it at 3 seconds, so if there's only 1 banner but multiple images, they still rotate.
  useEffect(() => {
    if (!banner || !banner.images || banner.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % banner.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banner]);

  // Countdown timer
  useEffect(() => {
    if (!banner || !banner.offer_end_datetime) {
      setTimeLeft(null);
      return;
    }
    
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
  }, [banner]);

  if (!banners || banners.length === 0 || !banner) return null;

  return (
    <section className="py-4 md:py-8 bg-warm-white relative overflow-hidden">
      <div className="container-max px-4 md:px-6">
        <div 
          className="relative w-full rounded-[20px] sm:rounded-[32px] overflow-hidden shadow-xl min-h-[180px] md:min-h-[240px] flex items-center bg-charcoal cursor-grab active:cursor-grabbing select-none"
          onTouchStart={(e) => onSwipeStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => onSwipeMove(e.targetTouches[0].clientX)}
          onTouchEnd={onSwipeEnd}
          onMouseDown={(e) => onSwipeStart(e.clientX)}
          onMouseMove={(e) => onSwipeMove(e.clientX)}
          onMouseUp={onSwipeEnd}
          onMouseLeave={onSwipeEnd}
          onDragStart={(e) => e.preventDefault()}
        >
          
          {/* Rotating Background Images */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={`${banner.id}-${currentImageIndex}`}
                src={banner.images && banner.images.length > 0 ? banner.images[currentImageIndex] : ''}
                alt="Promo Banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full flex flex-col justify-between h-full">
            
            {/* Last Minute Deal Badge (Top Right) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
              <span className="inline-block bg-red-600 text-white border border-red-500 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-red-500/30">
                🔥 LAST MIN DEAL
              </span>
            </div>

            <div className="max-w-xl md:max-w-[85%] lg:max-w-[90%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${banner.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-2 shadow-sm">
                    {banner.badge_text}
                  </span>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white leading-tight mb-1.5 tracking-tight drop-shadow-md md:whitespace-nowrap">
                    {banner.headline}
                  </h2>
                  
                  {banner.description && (
                    <p className="text-white/90 text-xs sm:text-sm mb-3 leading-relaxed drop-shadow line-clamp-2">
                      {banner.description}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
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

              <AnimatePresence mode="wait">
                <motion.div
                  key={`cta-${banner.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link 
                    href={banner.cta_link}
                    className="bg-teal hover:bg-teal-dark text-white font-bold py-1.5 px-4 sm:py-2 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 whitespace-nowrap text-[10px] sm:text-xs inline-block"
                  >
                    {banner.cta_text}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Banner Indicators (Dots) */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentBannerIndex(idx);
                    setCurrentImageIndex(0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentBannerIndex === idx 
                      ? 'bg-white w-4' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
