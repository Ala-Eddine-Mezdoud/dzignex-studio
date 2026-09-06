"use client";

import { useEffect, useState } from "react";

/**
 * The intro gate.
 *
 * Entrance animations fire on mount, which on a first load means they play
 * behind the loading screen and are finished — unseen — by the time the
 * curtain lifts. The gate holds them at their initial state until the reveal
 * actually starts, so the page animates *into view* instead of arriving
 * already settled.
 *
 * Anything that isn't gated (a repeat visit this tab, reduced motion, or a
 * loader that bailed out) resolves immediately, so a consumer never risks
 * being stuck hidden.
 */
export const INTRO_REVEAL_EVENT = "dzx:intro-reveal";

/** Called by LoadingScreen the moment the curtain begins lifting. */
export const announceIntroReveal = () => {
  window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
};

// Belt and braces: if the event never arrives, release the page anyway rather
// than leave a hero invisible forever.
const GATE_CEILING_MS = 6000;

/** `true` once entrance animations are allowed to run. */
export const useIntroGate = (): boolean => {
  // Starts false so the server render and first client render agree.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("dzx-intro") === "1";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No curtain is coming — animate straight away.
    if (seen || reduced) {
      setReady(true);
      return;
    }

    const open = () => setReady(true);
    window.addEventListener(INTRO_REVEAL_EVENT, open);
    const ceiling = window.setTimeout(open, GATE_CEILING_MS);

    return () => {
      window.removeEventListener(INTRO_REVEAL_EVENT, open);
      window.clearTimeout(ceiling);
    };
  }, []);

  return ready;
};
