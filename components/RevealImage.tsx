"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

interface RevealImageProps {
  src: string;
  alt: string;
  /** Classes for the frame (aspect ratio, bg, etc.). */
  className?: string;
  /** Extra classes for the <img>. */
  imgClassName?: string;
  /** Vertical parallax travel in px (fixed-frame mode only). */
  parallax?: number;
  /**
   * Use for full-width, natural-height images (no fixed aspect frame). The
   * image keeps its intrinsic ratio in layout and is parallaxed via a scale +
   * percentage translate inside a clipped frame — so there's no layout shift
   * and no exposed edge.
   */
  fluid?: boolean;
}

/**
 * An image that drifts on a subtle scroll-linked parallax inside its frame.
 *
 * Default (fixed-frame) mode expects the frame to define the height (e.g.
 * `aspect-video`); the picture cover-fills an over-sized layer that drifts in
 * px. `fluid` mode is for natural-height images that set their own height.
 */
const RevealImage = ({
  src,
  alt,
  className,
  imgClassName,
  parallax = 36,
  fluid = false,
}: RevealImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Both transforms are declared unconditionally (hooks rule); each mode uses
  // the one it needs.
  const yPx = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const yPct = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  if (fluid) {
    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        {/* Scaled up so the ±6% drift never exposes an edge. Transform doesn't
            affect layout, so the frame still takes the image's natural height. */}
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-auto", imgClassName)}
          style={reduceMotion ? undefined : { y: yPct, scale: 1.16 }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Parallax layer — over-sized top & bottom so the drift never gaps. */}
      <motion.div
        className="absolute inset-x-0"
        style={
          reduceMotion
            ? { top: 0, bottom: 0 }
            : { top: -parallax, bottom: -parallax, y: yPx }
        }
      >
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
};

export default RevealImage;
