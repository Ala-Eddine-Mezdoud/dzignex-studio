"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "../lib/utils";

interface RevealTextProps {
  text: string;
  /** Classes for the word (font size, weight, tracking). */
  className?: string;
  /** Horizontal scroll-parallax travel in px (negative drifts left). */
  drift?: number;
}

/**
 * Splits a word into per-letter masks that rise into place when scrolled into
 * view, and drifts the whole word horizontally on scroll for a parallax split.
 * Built for the oversized DZIGNEX / STUDIO footer lockup.
 */
const RevealText = ({ text, className, drift = 0 }: RevealTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  const letters = text.split("");

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex leading-[0.85]", className)}
      style={reduceMotion ? undefined : { x }}
      aria-label={text}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          aria-hidden
          // Clip box is padded on every side and the padding is cancelled with
          // a matching negative margin: masks the vertical rise without the
          // tight (negative) letter-spacing shaving glyph sides. Net layout is
          // unchanged.
          className="inline-block overflow-hidden p-[0.12em] -m-[0.12em]"
        >
          <motion.span
            className="inline-block"
            initial={reduceMotion ? false : { y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{
              duration: 0.85,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default RevealText;
