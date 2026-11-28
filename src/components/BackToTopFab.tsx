"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { ease } from "./Motion";

/** Floating left-hand "back to top" that only appears when the reader reaches the end of the page. */
export default function BackToTopFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // watching the footer costs nothing while scrolling (no scroll listener, no layout reads)
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting && window.scrollY > window.innerHeight * 0.5),
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-4 z-[140] grid h-12 w-12 place-items-center rounded-full bg-ocean text-white shadow-[0_12px_28px_-8px_rgba(10,42,77,.6)] transition-colors duration-200 hover:bg-coral active:scale-95 xl:bottom-6 xl:left-6"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
