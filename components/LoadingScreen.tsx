"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, type Variants } from "framer-motion";
import { announceIntroReveal } from "./introGate";

/* PageTransition's exact vocabulary — same count, same stagger, same easing.
   The loader has to leave the way a route change arrives, or the intro reads
   as a different system bolted on the front. */
const EASE = [0.83, 0, 0.17, 1] as const;
const COLUMNS = 6;
const STAGGER = 0.04;
const COL_DURATION = 0.45;

// How long the wave takes end to end, plus slack — used only as a failsafe.
const WAVE_MS = (COL_DURATION + STAGGER * (COLUMNS - 1)) * 1000;

// The intro is choreography, not a spinner: the count walks 000 → 100 over a
// fixed window so it always reads as deliberate. A slow network can only hold
// it *back* (the count parks at 90 until the document is done), never rush it.
const INTRO_MS = 900;
const MAX_VISIBLE_MS = 4500; // never hold the visitor hostage to a stalled asset

const TAGS = ["BRANDING", "PACKAGING", "WEB", "MOTION"] as const;

const curtainContainer: Variants = {
  hidden: {},
  cover: { transition: { staggerChildren: STAGGER, staggerDirection: 1 } },
  reveal: { transition: { staggerChildren: STAGGER, staggerDirection: 1 } },
};

const curtainColumn: Variants = {
  // Parked below the fold, ready to sweep up.
  hidden: { y: "101%" },
  // 101% so neighbouring columns never leave a sub-pixel seam.
  cover: { y: "0%", transition: { duration: COL_DURATION, ease: EASE } },
  reveal: { y: "-101%", transition: { duration: COL_DURATION, ease: EASE } },
};

/**
 * First-load screen.
 *
 * Everything on it is drawn from the site's existing language: the square
 * bracket the studio punctuates with ([Your Sales], [Packaging Design], and
 * Dex himself), the near-black ground, and electric blue used for exactly one
 * thing — progress.
 *
 * It hands off with the site's own navigation move rather than an exit of its
 * own: the brand-blue columns sweep up to swallow the counter, then keep
 * rising off the top to reveal the page. One continuous upward wave, the same
 * one PageTransition plays between every route, so arriving on the site and
 * moving around it are visibly the same gesture.
 *
 * The count is paced by a fixed intro window rather than by whatever the
 * network happens to do, so it never flashes past in 200ms on a warm cache;
 * an unfinished document holds it at 90 until `load`, and a hard ceiling
 * releases it regardless. It plays once per tab.
 */
const LoadingScreen = () => {
  // Rendered on the server too, so it covers the very first paint.
  const [gone, setGone] = useState(false);
  // `skipped` unmounts outright, with no wave — a returning visitor must never
  // see a curtain lift off a screen they didn't watch fill.
  const [skipped, setSkipped] = useState(false);
  // Once blue fully covers, the black ground behind it is dead weight: drop it
  // so the reveal uncovers the actual page, not another layer of loader.
  const [covered, setCovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const curtain = useAnimationControls();
  const startedAt = useRef(Date.now());

  // The handoff: cover with blue, shed the loader, then lift off the top.
  const handoff = useCallback(
    async (reduced: boolean) => {
      sessionStorage.setItem("dzx-intro", "1");

      if (reduced) {
        announceIntroReveal();
        setGone(true);
        return;
      }

      await curtain.start("cover");
      setCovered(true);
      // Fire as the lift begins, not after: the page should be mid-entrance
      // by the time the columns clear it, never sitting there pre-settled.
      announceIntroReveal();
      await curtain.start("reveal");
      setGone(true);
    },
    [curtain]
  );

  useEffect(() => {
    // Already seen this tab (a hard refresh resets it, a route change doesn't).
    if (sessionStorage.getItem("dzx-intro") === "1") {
      setSkipped(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let finished = false;
    let loaded = document.readyState === "complete";
    const timers: number[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      handoff(reduced);
      // The wave itself runs on animation frames, which a backgrounded tab
      // pauses — guarantee the loader is gone either way.
      timers.push(
        window.setTimeout(() => {
          announceIntroReveal();
          setGone(true);
        }, WAVE_MS * 2 + 400)
      );
    };

    const tick = () => {
      const t = Math.min(1, (Date.now() - startedAt.current) / INTRO_MS);
      // easeOutCubic: quick off the mark, settles into the last few percent.
      const eased = 1 - Math.pow(1 - t, 3);
      // Park at 90 while the document is still working.
      setProgress(loaded ? eased * 100 : Math.min(90, eased * 100));

      if (t >= 1 && loaded) {
        // Let 100% actually land on screen before the wave takes it.
        timers.push(window.setTimeout(finish, reduced ? 0 : 150));
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onLoad = () => {
      loaded = true;
    };
    if (!loaded) window.addEventListener("load", onLoad);
    raf = requestAnimationFrame(tick);

    // Failsafe on a real timer, not rAF: a tab opened in the background has
    // its animation frames paused, which would otherwise strand the loader.
    timers.push(window.setTimeout(finish, MAX_VISIBLE_MS));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, [handoff]);

  // Hold the scroll position at the top while the loader owns the viewport.
  useEffect(() => {
    if (gone || skipped) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone, skipped]);

  const shown = Math.round(progress);

  if (skipped || gone) return null;

  return (
    <div
      aria-hidden
      data-dzx-loader
      // pointer-events-none: nothing here is interactive, and it means a
      // stalled wave (a tab backgrounded mid-animation) can never end up
      // swallowing clicks on the page underneath.
      className="fixed inset-0 z-[10002] overflow-hidden pointer-events-none"
    >
      {/* The loader itself. Removed the instant blue has it fully covered. */}
      {!covered && (
        <>
          {/* Near-black ground, carrying the same column seams as the wave so
              the grid is already present before it starts moving. */}
          <div className="absolute inset-0 flex">
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <div
                key={i}
                className="h-full flex-1 bg-dzignex-black border-r border-dzignex-white/[0.06] last:border-r-0"
              />
            ))}
          </div>

          <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
            {/* The studio's bracket, holding the count — [ 000 ] → [ 100 ] */}
            <div className="flex items-center gap-3 sm:gap-5 text-dzignex-white">
              <Bracket side="left" />

              <span className="tabular-nums font-bold uppercase tracking-tighter leading-none text-6xl sm:text-7xl lg:text-8xl">
                {String(shown).padStart(3, "0")}
              </span>

              <Bracket side="right" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 uppercase font-semibold tracking-[0.3em] text-[10px] sm:text-xs text-dzignex-white/45"
            >
              Dzignex&nbsp;Studio
            </motion.p>

            {/* The rule — the one place blue appears, and it's the progress. */}
            <div className="mt-10 w-full max-w-md sm:max-w-lg">
              <div className="h-px w-full bg-dzignex-white/15 overflow-hidden">
                <div
                  className="h-full bg-dzignex-blue origin-left"
                  // Width is recomputed every frame, so no CSS transition —
                  // one would only make the fill lag the count beside it.
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Service tags, echoing the hero's row above the headline. */}
              <ul className="mt-4 flex justify-between w-full uppercase font-semibold text-[9px] sm:text-[11px] tracking-tight">
                {TAGS.map((tag, i) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: shown > (i + 1) * 22 ? 1 : 0.25 }}
                    transition={{ duration: 0.4 }}
                    className={
                      shown > (i + 1) * 22
                        ? "text-dzignex-white/70"
                        : "text-dzignex-white/25"
                    }
                  >
                    [{tag}]
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* The site's curtain, verbatim: rises to cover, then rises off the top.
          Sits last in the DOM so it paints over the loader content. */}
      <motion.div
        className="absolute inset-0 flex"
        variants={curtainContainer}
        initial="hidden"
        animate={curtain}
      >
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <motion.div
            key={i}
            variants={curtainColumn}
            className="h-full flex-1 bg-dzignex-blue border-r border-dzignex-white/[0.06] last:border-r-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Half of the studio bracket, drawn rather than typed so its weight matches
 * the display type at any size and so each jaw can enter from its own side.
 */
const Bracket = ({ side }: { side: "left" | "right" }) => (
  <motion.svg
    width="28"
    height="86"
    viewBox="0 0 28 86"
    fill="none"
    className="h-14 sm:h-16 lg:h-20 w-auto text-dzignex-blue"
    initial={{ opacity: 0, x: side === "left" ? 18 : -18 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    <path
      d={side === "left" ? "M26 3H3V83H26" : "M2 3H25V83H2"}
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="square"
    />
  </motion.svg>
);

export default LoadingScreen;
