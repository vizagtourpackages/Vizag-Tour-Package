"use client";

import ReactCountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  start = 0,
  duration = 2.5,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={className}>
      {isInView ? (
        <ReactCountUp
          start={start}
          end={end}
          duration={duration}
          separator=","
          prefix={prefix}
          suffix={suffix}
          useEasing={true}
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}
