"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds for one loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  speed = 25,
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div className="relative flex overflow-hidden group py-4 w-full bg-sand-light border-y border-charcoal/5">
      <div
        className={`flex whitespace-nowrap animate-marquee items-center ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        } ${direction === "right" ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Original */}
        <div className="flex shrink-0 items-center gap-16 px-8">
          {children}
        </div>
        {/* Clone 1 */}
        <div className="flex shrink-0 items-center gap-16 px-8">
          {children}
        </div>
        {/* Clone 2 for wide screens */}
        <div className="flex shrink-0 items-center gap-16 px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
