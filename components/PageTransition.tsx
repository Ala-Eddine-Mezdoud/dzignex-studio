"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.83, 0, 0.17, 1] as const;
const COLUMNS = 6;
const STAGGER = 0.04;
const COL_DURATION = 0.45;

// The curtain is a row of columns that sweep up in a left→right wave, so the
// grid structure reads in the motion itself rather than a flat panel.
const containerVariants: Variants = {
  hidden: {},
  cover: { transition: { staggerChildren: STAGGER, staggerDirection: 1 } },
  reveal: { transition: { staggerChildren: STAGGER, staggerDirection: 1 } },
};

const columnVariants: Variants = {
  // 101% so neighbouring columns never leave a sub-pixel seam.
  hidden: { y: "101%" },
  cover: { y: "0%", transition: { duration: COL_DURATION, ease: EASE } },
  reveal: { y: "-101%", transition: { duration: COL_DURATION, ease: EASE } },
};

/**
 * Page-transition curtain: a brand-blue column "wave" that covers the viewport,
 * then lifts to reveal the new page.
 *
 * The motion is split across the navigation so content is never shown half
 * transitioned:
 *   1. A link click is intercepted; columns sweep up to fully cover.
 *   2. Only once covered does the route change — hidden behind the curtain.
 *   3. Columns lift off the top to reveal the new page.
 *
 * First load plays the reveal half only, as an intro. Disabled for reduced
 * motion (navigations fall back to instant client routing).
 */
const PageTransition = () => {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const columns = useAnimationControls();
  const isTransitioning = useRef(false);

  // Reveal half — runs when the route settles (and once on first load).
  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;

    (async () => {
      columns.set("cover"); // guarantee fully covered before revealing
      await columns.start("reveal");
      if (cancelled) return;
      columns.set("hidden"); // park below for the next cover
      isTransitioning.current = false;
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, reduceMotion, columns]);

  // Cover half — sweep up to cover, then push the route.
  const transitionTo = useCallback(
    async (href: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      await columns.start("cover");
      router.push(href);
    },
    [columns, router]
  );

  // Intercept same-origin anchor navigations (capture phase, so we win the race
  // against Next's <Link> handler and can preventDefault before it routes).
  useEffect(() => {
    if (reduceMotion) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / in-page hash

      e.preventDefault();
      transitionTo(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [transitionTo, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden flex"
      variants={containerVariants}
      initial="cover"
      animate={columns}
    >
      {Array.from({ length: COLUMNS }).map((_, i) => (
        <motion.div
          key={i}
          variants={columnVariants}
          className="h-full flex-1 bg-dzignex-blue border-r border-dzignex-white/[0.06] last:border-r-0"
        />
      ))}
    </motion.div>
  );
};

export default PageTransition;
