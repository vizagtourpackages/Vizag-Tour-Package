"use client";

import { motion } from "framer-motion";

/** Re-mounts on every navigation. Kept short (seen constantly): opacity + 6px rise, strong ease-out. */
export default function PublicTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
