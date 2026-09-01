"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years of deep experience across diverse industries" },
  { value: 100, suffix: "+", label: "Projects across cosmetics, pharma, SaaS and event branding" },
  { value: 50, suffix: "+", label: "Partners who trust our work" },
  { value: 97, suffix: "%", label: "Delivering beyond expectations" },
];

// Expo-out: a fast launch into a long, dramatic deceleration.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const StatItem = ({
  stat,
  delay,
  start,
}: {
  stat: Stat;
  delay: number;
  start: boolean;
}) => {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (!start) return;

    if (reduceMotion) {
      count.set(stat.value);
      setLanded(true);
      return;
    }

    const controls = animate(count, stat.value, {
      duration: 1.9,
      delay,
      ease: EASE_OUT_EXPO,
      onComplete: () => setLanded(true),
    });

    return () => controls.stop();
  }, [start, reduceMotion, count, stat.value, delay]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={start ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
    >
      <p className="text-4xl sm:text-5xl lg:text-7xl tracking-tight tabular-nums flex items-baseline">
        <motion.span>{rounded}</motion.span>
        <motion.span
          className="text-dzignex-blue inline-block"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.3, y: 6 }}
          animate={landed ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {stat.suffix}
        </motion.span>
      </p>
      <motion.p
        className="font-medium text-base sm:text-lg lg:text-xl mt-4 lg:mt-8 max-w-xs tracking-tighter"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={start ? { opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: delay + 0.15, ease: "easeOut" }}
      >
        {stat.label}
      </motion.p>
    </motion.div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: "-15% 0px -15% 0px",
  });

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div
        ref={sectionRef}
        className="container mx-auto border-x-2 border-dzignex-white/15 py-12 px-4 sm:px-6 lg:py-16 lg:px-10"
      >
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between w-full">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex-1 py-8 sm:py-10 lg:py-0",
                i === 0 ? "lg:pr-10" : i === stats.length - 1 ? "lg:pl-10" : "lg:px-10",
                i < stats.length - 1
                  ? "border-b sm:border-b-0 lg:border-r border-dzignex-white/15"
                  : "",
              ].join(" ")}
            >
              <StatItem stat={stat} delay={i * 0.12} start={inView} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
