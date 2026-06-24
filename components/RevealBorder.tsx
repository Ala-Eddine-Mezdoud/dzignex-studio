"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

interface RevealBorderProps {
  children: React.ReactNode;
  /** Classes for the wrapper (bg, padding, layout). Positioning is added internally. */
  className?: string;
  /** Tailwind bg class for the stroke. */
  segmentClassName?: string;
  /** Stroke thickness in px. */
  thickness?: number;
  /** Re-run every time it enters view, or only once. */
  once?: boolean;
}

const EASE = [0.65, 0, 0.35, 1] as const;
const DUR = 0.45;

/**
 * Draws a rectangle's border as a single continuous pen stroke — top, then
 * right, bottom, left — when it scrolls into view. Replaces a static `border`
 * with four animated segments that settle into the same look. On-brand motion
 * for the studio's grid aesthetic.
 */
const RevealBorder = ({
  children,
  className,
  segmentClassName = "bg-dzignex-white/15",
  thickness = 1,
  once = true,
}: RevealBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const show = reduceMotion ? true : inView;

  // Each segment grows along its axis; origins chain so the stroke flows
  // clockwise around the box without a visible "jump" between sides.
  const segments = [
    { cls: "top-0 left-0 w-full origin-left", axis: "scaleX", size: { height: thickness }, delay: 0 },
    { cls: "top-0 right-0 h-full origin-top", axis: "scaleY", size: { width: thickness }, delay: 0.12 },
    { cls: "bottom-0 left-0 w-full origin-right", axis: "scaleX", size: { height: thickness }, delay: 0.24 },
    { cls: "bottom-0 left-0 h-full origin-bottom", axis: "scaleY", size: { width: thickness }, delay: 0.36 },
  ] as const;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={cn("pointer-events-none absolute", seg.cls, segmentClassName)}
          style={seg.size}
          initial={reduceMotion ? false : { transform: `${seg.axis}(0)` }}
          animate={{ transform: show ? `${seg.axis}(1)` : `${seg.axis}(0)` }}
          transition={reduceMotion ? { duration: 0 } : { duration: DUR, delay: seg.delay, ease: EASE }}
        />
      ))}
      {children}
    </div>
  );
};

export default RevealBorder;
