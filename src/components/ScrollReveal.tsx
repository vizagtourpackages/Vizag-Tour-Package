"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 40,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  
  let initialX = 0;
  let initialY = 0;

  if (direction === "up") initialY = yOffset;
  if (direction === "down") initialY = -yOffset;
  if (direction === "left") initialX = xOffset;
  if (direction === "right") initialX = -xOffset;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-10%" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easing similar to nomu.store's springy/smooth feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
