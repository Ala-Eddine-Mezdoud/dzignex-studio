"use client";

import { useEffect, useState } from "react";

/**
 * A full-viewport film-grain / texture layer that sits above the page content
 * but below every interactive chrome element (cursor, page-transition curtain).
 *
 * - The noise itself is an inline SVG `feTurbulence` data URI — no asset request.
 * - A CSS step-animation jitters it so it reads as living film grain rather than
 *   a static screen. The animation is dropped for `prefers-reduced-motion`
 *   (the grain stays, it just stops moving).
 * - `mix-blend-mode: overlay` lets the near-black background swallow most of it,
 *   leaving just enough tooth to kill the "flat CSS gradient" look.
 */
const NOISE_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix type='saturate' values='0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`
  );

const GrainOverlay = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="grain-overlay pointer-events-none fixed z-[9996] opacity-[0.055] mix-blend-overlay"
      style={{
        backgroundImage: `url("${NOISE_URI}")`,
        backgroundSize: "140px 140px",
      }}
    />
  );
};

export default GrainOverlay;
