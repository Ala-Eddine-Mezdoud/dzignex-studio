"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Site-wide smooth scrolling (Lenis) — tuned *light*.
 *
 * The previous config used a 1.1s expo-out settle, which made every wheel
 * tick feel like it was gliding to a stop long after the user stopped
 * scrolling. This uses lerp mode instead: the viewport chases the target
 * with a per-frame interpolation, so it stays responsive (it lands in
 * ~120ms) while still sanding off the native step-scroll jitter.
 *
 * - RAF is driven by GSAP's ticker so Lenis and every ScrollTrigger-based
 *   animation share one synchronized frame loop (no double rAF, no drift).
 * - Lenis is fully bypassed when the user prefers reduced motion, and on
 *   touch devices — mobile momentum scrolling is already native and better.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);
  const [bypass, setBypass] = useState(false);

  // Watch the reduced-motion preference (and react to live changes).
  // Coarse pointers (phones/tablets) keep native scrolling.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setBypass(mq.matches || isTouch);
    const onChange = (e: MediaQueryListEvent) => setBypass(e.matches || isTouch);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Drive Lenis from the GSAP ticker and keep ScrollTrigger in sync.
  useEffect(() => {
    if (bypass) return;

    const update = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [bypass]);

  if (bypass) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        // autoRaf off — we pump the loop via the GSAP ticker above.
        autoRaf: false,
        // Lerp mode: a high factor means the gap to the target closes fast.
        // 0.14 ≈ a ~120ms settle, enough to smooth the steps without lag.
        lerp: 0.14,
        smoothWheel: true,
        // Slightly over 1 so a flick still covers ground quickly.
        wheelMultiplier: 1.1,
        // Native touch scrolling — Lenis never intercepts it.
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
