"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const loadingPhrases = [
  "Firing up the engines...",
  "Waking up the drivers...",
  "Sanitizing the fleet...",
  "Mapping the ghat roads...",
  "Brewing Araku coffee...",
  "Checking tire pressure...",
  "Polishing the windshields...",
  "Getting things ready...",
];

export default function PlayfulLoader() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2500); // Change phrase every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="mb-6 text-coral"
      >
        <Loader2 size={48} strokeWidth={2} />
      </motion.div>
      
      <div className="h-8 relative w-full max-w-[300px] overflow-hidden text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-charcoal/60 font-medium absolute inset-0 flex items-center justify-center"
          >
            {loadingPhrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
