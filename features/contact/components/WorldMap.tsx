"use client";

import { createMap } from "svg-dotted-map";
import { motion } from "framer-motion";
import { useMemo } from "react";

const MAP_W = 440;
const MAP_H = 220;

/** Dotted world map with a tilted perspective and studio pin — Aceternity-style. */
export function WorldMap() {
  const { points, markers } = useMemo(() => {
    const { points, addMarkers } = createMap({
      width: MAP_W,
      height: MAP_H,
      mapSamples: 4200,
    });
    const markers = addMarkers([
      { lat: 36.7538, lng: 3.0588, size: 5 },
    ]);
    return { points, markers };
  }, []);

  const pin = markers[0];

  return (
    <div className="mt-10 w-full">
      <p className="text-dzignex-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
        We are here
      </p>
      <div
        className="relative w-full overflow-visible rounded-lg border border-dzignex-white/10 bg-gradient-to-b from-dzignex-blue/[0.08] to-transparent p-1"
        style={{ perspective: "900px" }}
      >
        <div
          className="relative mx-auto w-full overflow-hidden rounded-md"
          style={{
            transform: "rotateX(52deg) rotateY(-3deg)",
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="h-auto w-full text-dzignex-blue/35"
            role="img"
            aria-label="Dotted world map with studio location"
          >
            {points.map((point, i) => (
              <circle
                key={`${i}-${point.x}-${point.y}`}
                cx={point.x}
                cy={point.y}
                r={0.35}
                fill="currentColor"
              />
            ))}
            {pin && (
              <g className="text-dzignex-blue">
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={14}
                  fill="currentColor"
                  className="text-dzignex-blue/25"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.45 }}
                />
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={14}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                />
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={4}
                  className="text-dzignex-blue"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45, type: "spring", stiffness: 380, damping: 18 }}
                />
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r={10}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0] }}
                  transition={{ delay: 0.6, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
