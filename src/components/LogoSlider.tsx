"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  "/Icon.png",
  "/Icon.png",
  "/Icon.png",
  "/Icon.png",
  "/Icon.png",
];

export default function LogoSlider() {
  return (
    <div className="relative w-full overflow-hidden  bg-transparent border-t border-white/20 p-4">
      {/* Logo track */}
      <motion.div
        className="flex gap-12 py-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <Image
            key={i}
            src={logo}
            alt={`Logo ${i}`}
            width={100}
            height={100}
            className="h-12 w-auto opacity-80 hover:opacity-100 transition"
          />
        ))}
      </motion.div>

      {/* Left blur overlay */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 backdrop-blur-xs"></div>

      {/* Right blur overlay */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 backdrop-blur-xs"></div>
    </div>
  );
}
