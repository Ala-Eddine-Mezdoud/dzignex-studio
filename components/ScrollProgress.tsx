"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A thin brand-blue bar pinned to the very top of the viewport that fills
 * left→right as the page scrolls. Spring-smoothed so it glides with the
 * inertial (Lenis) scroll rather than snapping.
 */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998] bg-dzignex-blue origin-left"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
};

export default ScrollProgress;
