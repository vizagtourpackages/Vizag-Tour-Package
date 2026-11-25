'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

/**
 * Hotel photo gallery: large main image + thumbnails, with a full-screen viewer.
 * Titles live in the page header so photos stay clean.
 */
export default function ResortGallery({ images, name }: { images: string[]; name: string }) {
  const list = images.filter(Boolean);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  const step = useCallback((d: number) => setI((p) => (p + d + list.length) % list.length), [list.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  if (list.length === 0) {
    return <div className="aspect-[16/9] w-full rounded-[28px] bg-sand sm:rounded-[36px]" />;
  }

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[1fr_120px]">
        {/* main image */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open photo viewer"
          className="group relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-sand sm:aspect-[16/9] sm:rounded-[36px] lg:max-h-[540px]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={list[i]}
              src={list[i]}
              alt={`${name} photo ${i + 1}`}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-ocean shadow backdrop-blur">
            <Expand size={14} /> {i + 1} / {list.length}
          </span>
        </button>

        {/* thumbnails: row on mobile, column on desktop */}
        {list.length > 1 && (
          <div className="no-scrollbar flex gap-2.5 overflow-x-auto lg:max-h-[540px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
            {list.map((src, k) => (
              <button
                key={src + k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Show photo ${k + 1}`}
                aria-current={k === i}
                className={`relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-2xl border-2 transition-[border-color,opacity,transform] duration-150 active:scale-95 lg:h-[84px] lg:w-full ${
                  k === i ? 'border-coral' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* full-screen viewer */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} photos`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[320] flex items-center justify-center bg-black/92 p-3 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              <X size={22} />
            </button>
            <img
              src={list[i]}
              alt={`${name} photo ${i + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] max-h-[86dvh] max-w-full rounded-2xl object-contain"
            />
            {list.length > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:left-6">
                  <ChevronLeft size={24} />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 sm:right-6">
                  <ChevronRight size={24} />
                </button>
                <span className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  {i + 1} / {list.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
