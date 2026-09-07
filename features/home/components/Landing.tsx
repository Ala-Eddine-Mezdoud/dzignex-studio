'use client'
import {ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "../../../components/Magnetic";

// The headline is split into deliberate display lines so each one can be
// revealed independently behind its own clipping mask.
const HEADLINE_LINES = [
  { text: "We Don’t Just Design,", className: "" },
  { text: "We Build Brands That Scale", className: "" },
  { text: "[Your Sales]", className: "text-dzignex-blue" },
] as const;

const DEMO_IMAGES = [
  "/hero/hero-1.webp",
  "/hero/hero-2.webp",
  "/hero/hero-3.webp",
  "/hero/hero-4.webp",
  "/hero/hero-5.webp",
  "/hero/hero-6.webp",
  "/hero/hero-7.webp",
  "/hero/hero-8.webp",
  "/hero/hero-9.webp",
  "/hero/hero-1.webp",
  "/hero/hero-2.webp",
  "/hero/hero-3.webp",
  "/hero/hero-4.webp",
  "/hero/hero-5.webp",
  "/hero/hero-6.webp",
  "/hero/hero-7.webp",
];




const Landing = () => {
  const reduceMotion = useReducedMotion();

  return (

    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16 relative overflow-hidden">

        {/* Service Tags */}
        <div className="justify-center max-w-5xl mx-auto hidden md:flex">
          <ul className="flex flex-wrap justify-center md:justify-between w-full uppercase font-semibold gap-2 md:gap-0 text-xs sm:text-sm lg:text-base">
            <li>[Branding & Visual Identity]</li>
            <li>[Packaging Design]</li>
            <li>[Websites & Apps]</li>
            <li>[Motion Design]</li>
          </ul>
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center mt-6 md:mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold tracking-tighter leading-[1.05]">
            {HEADLINE_LINES.map((line, i) => (
              // Mask: clips the line; the inner span starts fully below it.
              // The small pb/-mb pair gives glyphs breathing room without
              // shifting layout, so nothing is clipped at rest.
              <span
                key={line.text}
                className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
              >
                <motion.span
                  className={`block ${line.className}`}
                  initial={reduceMotion ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl text-base sm:text-lg lg:text-xl font-medium text-dzignex-white/80 mx-auto mt-6 md:mt-8"
          >
            Design that speaks, packaging that sells, and brands people remember.
          </motion.p>

          <Link href={"/contact"}>
            <div className="flex gap-1 justify-center">
              <Magnetic className="inline-block mt-8 md:mt-12">
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-dzignex-white text-dzignex-black flex gap-1 items-end px-4 py-2 text-base lg:text-xl font-semibold tracking-tight uppercase relative"
              >
                Book Free Consultation
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpRight
                    size={30}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                  />
                </motion.span>
              </motion.button>
              </Magnetic>
            </div>
          </Link>
        </div>


        {/* Animated Image Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-12 md:mt-16 relative"
        >
          <div className="w-full h-48 md:h-64 lg:h-96 pt-8  [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] z-1">
            {/* center this without using flex bcz it breaks the animation  */}
            <motion.div
              className="flex gap-4"
              animate={{
                x: ["-100%", "0%"],
                transition: {
                  ease: "linear",
                  duration: 40,
                  repeat: Infinity,
                },
              }}
            >
              {DEMO_IMAGES.map((src, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-[3/4] h-40 sm:h-48 md:h-64 lg:h-80 flex-shrink-0"
                  style={{
                    rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    zIndex: 10,
                    transition: { duration: 0.3 },
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.9 + index * 0.035,
                      duration: 0.45,
                      ease: "backOut",
                    },
                  }}
                >
                  <img
                    src={src}
                    alt={`Showcase image ${index + 1}`}
                    width={720}
                    height={960}
                    // The row slides from x:-100% to 0, so the tail of the
                    // list is what crosses the viewport first — fetch those
                    // up front and let the rest stream in lazily.
                    loading={index >= DEMO_IMAGES.length - 5 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-dzignex-blue/20"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
      </div>

    </div>
  )


};

export default Landing;