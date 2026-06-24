"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

interface ScrollSpyRailProps {
  /** The id of the currently active item (must match a child's `data-spy-id`). */
  activeId: string;
  /** Classes applied to the underlying <ul>. */
  ulClassName?: string;
  /** The <li> items — each must carry a `data-spy-id` attribute. */
  children: React.ReactNode;
}

/**
 * A vertical scroll-spy list with a blue indicator bar that springs to the
 * active item and resizes to match its height. Drop-in wrapper around the
 * existing sidebar <ul>s — items just need a `data-spy-id`.
 */
const ScrollSpyRail = ({ activeId, ulClassName, children }: ScrollSpyRailProps) => {
  const reduceMotion = useReducedMotion();
  const ulRef = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState<{ top: number; height: number } | null>(null);

  const measure = useCallback(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const el = ul.querySelector<HTMLElement>(`[data-spy-id="${CSS.escape(activeId)}"]`);
    if (!el) return;
    setMarker({ top: el.offsetTop, height: el.offsetHeight });
  }, [activeId]);

  useEffect(() => {
    measure();

    const ul = ulRef.current;
    if (!ul) return;

    // Active items grow/shrink with a CSS transition; observing the list keeps
    // the bar locked to the right height as that settles, and covers breakpoint
    // font-size changes too.
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <ul ref={ulRef} className={cn("relative", ulClassName)}>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 w-[3px] rounded-full bg-dzignex-blue"
        initial={{ opacity: 0, height: 0 }}
        animate={
          marker
            ? { y: marker.top, height: marker.height, opacity: 1 }
            : { opacity: 0 }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 420, damping: 42, mass: 0.6 }
        }
      />
      {children}
    </ul>
  );
};

export default ScrollSpyRail;
