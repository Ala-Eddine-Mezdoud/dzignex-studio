"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/**
 * "Dex" — the face behind the support chat.
 *
 * Not a mascot bolted on from outside: Dex is the studio's own punctuation.
 * The whole site speaks in square brackets — [Your Sales], [Our Projects],
 * [Packaging Design] — so Dex is that bracket with a pulse: two electric-blue
 * jaws framing a pair of eyes, `[ •• ]`. Pure SVG, no asset, no dependency
 * beyond the motion library already in use.
 *
 * States:
 *   idle       – brackets breathe, eyes drift + blink
 *   listening  – brackets lean in, eyes lock onto and follow the cursor
 *   thinking   – brackets clamp inward, eyes become a cycling `•••` ellipsis
 *   happy      – brackets fling apart, eyes arc into a smile, a red spark
 *   greeting   – brackets throw open like arms (used for the first-visit peek)
 *
 * Every animation here is skipped for `prefers-reduced-motion`: Dex just holds
 * a calm resting pose.
 */
export type DexState = "idle" | "greeting" | "listening" | "thinking" | "happy";

interface DexProps {
  state?: DexState;
  /** Eyes follow the real pointer. */
  track?: boolean;
  className?: string;
}

// Outer bob — the whole mark floats a little when at rest.
const bob: Variants = {
  idle: {
    y: [0, -2.4, 0],
    transition: { y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" } },
  },
  listening: {
    y: [0, -1.4, 0],
    transition: { y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } },
  },
  greeting: { y: 0 },
  thinking: { y: 0 },
  happy: { y: [0, -6, 0], transition: { duration: 0.55, ease: "easeOut" } },
};

// Left bracket. `x` opens (−) / clamps (+); the right bracket mirrors it.
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const leftBracket: Variants = {
  idle: { x: 0, rotate: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  listening: { x: 3, rotate: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  thinking: {
    x: 6.5,
    rotate: [0, -3, 0],
    transition: {
      x: { duration: 0.4, ease: EASE_OUT },
      rotate: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
    },
  },
  greeting: {
    x: [-3, -12, -5, 0],
    rotate: [0, -10, -3, 0],
    transition: { duration: 0.95, ease: EASE_OUT },
  },
  happy: {
    x: [0, -10, -2, 0],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
// Right bracket — the mirror of the left (every x / rotate negated).
const rightBracket: Variants = {
  idle: { x: 0, rotate: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  listening: { x: -3, rotate: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  thinking: {
    x: -6.5,
    rotate: [0, 3, 0],
    transition: {
      x: { duration: 0.4, ease: EASE_OUT },
      rotate: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
    },
  },
  greeting: {
    x: [3, 12, 5, 0],
    rotate: [0, 10, 3, 0],
    transition: { duration: 0.95, ease: EASE_OUT },
  },
  happy: {
    x: [0, 10, 2, 0],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Dex = ({ state = "idle", track = false, className }: DexProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [blink, setBlink] = useState(false);

  // Eye + pupil offset, in viewBox units (viewBox is 0 0 100 100).
  const ex = useMotionValue(0);
  const ey = useMotionValue(0);
  const sex = useSpring(ex, { stiffness: 200, damping: 18, mass: 0.5 });
  const sey = useSpring(ey, { stiffness: 200, damping: 18, mass: 0.5 });

  const thinking = state === "thinking";
  const smiling = state === "happy" || state === "greeting";

  // Cursor tracking.
  useEffect(() => {
    if (reduce || !track || thinking) {
      ex.set(0);
      ey.set(0);
      return;
    }
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      ex.set(Math.max(-3, Math.min(3, dx * 40)));
      ey.set(Math.max(-2.4, Math.min(2.8, dy * 40)));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, track, thinking, ex, ey]);

  // Idle blinking.
  useEffect(() => {
    if (reduce || thinking) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 105);
        loop();
      }, 2400 + Math.random() * 3800);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce, thinking]);

  const animate = reduce ? undefined : state;
  const stroke = "#0C3EFF";

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 100 100"
      className={className}
      variants={reduce ? undefined : bob}
      animate={animate}
      style={{ overflow: "visible" }}
    >
      {/* Brackets */}
      <motion.path
        d="M42 20 H22 V80 H42"
        fill="none"
        stroke={stroke}
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={reduce ? undefined : leftBracket}
        animate={animate}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <motion.path
        d="M58 20 H78 V80 H58"
        fill="none"
        stroke={stroke}
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={reduce ? undefined : rightBracket}
        animate={animate}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />

      {/* Eyes */}
      <motion.g style={reduce ? undefined : { x: sex, y: sey }}>
        {thinking ? (
          // Eyes collapse into a thinking ellipsis.
          [39, 50, 61].map((cx, i) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={50}
              r={3.8}
              fill="#F3F6FF"
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -1.6, 0] }}
              transition={{
                duration: 0.95,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.16,
              }}
            />
          ))
        ) : smiling ? (
          // Happy eyes — two upward arcs.
          <>
            <path d="M35 53 Q42 44 49 53" fill="none" stroke="#F3F6FF" strokeWidth={4.8} strokeLinecap="round" />
            <path d="M51 53 Q58 44 65 53" fill="none" stroke="#F3F6FF" strokeWidth={4.8} strokeLinecap="round" />
          </>
        ) : (
          <motion.g
            animate={{ scaleY: blink ? 0.12 : 1 }}
            transition={{ duration: 0.09, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={41} cy={50} r={6} fill="#F3F6FF" />
            <circle cx={59} cy={50} r={6} fill="#F3F6FF" />
            {!blink && (
              <>
                <motion.circle cx={41} cy={50} r={3} fill="#010110" style={reduce ? undefined : { x: sex, y: sey }} />
                <motion.circle cx={59} cy={50} r={3} fill="#010110" style={reduce ? undefined : { x: sex, y: sey }} />
              </>
            )}
          </motion.g>
        )}
      </motion.g>

      {/* Red spark on a happy beat — the one hit of the brand's accent red. */}
      {!reduce && state === "happy" && (
        <>
          {[
            { x: 26, y: 24 },
            { x: 74, y: 24 },
          ].map((p, i) => (
            <motion.path
              key={i}
              d={`M${p.x} ${p.y - 5} L${p.x + 1.6} ${p.y - 1.6} L${p.x + 5} ${p.y} L${p.x + 1.6} ${p.y + 1.6} L${p.x} ${p.y + 5} L${p.x - 1.6} ${p.y + 1.6} L${p.x - 5} ${p.y} L${p.x - 1.6} ${p.y - 1.6} Z`}
              fill="#FF1649"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ scale: [0, 1.1, 0], rotate: 80, opacity: [0, 1, 0] }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.08 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </>
      )}
    </motion.svg>
  );
};

export default Dex;
