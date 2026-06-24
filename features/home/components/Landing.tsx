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
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/33ef9e7b-8ca6-4758-9a19-5c4b4024ea64-f46ed080-327d-4a29-9781-5c1a244434f4.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/6e71fd23-d0d8-4188-80c5-a7edb7795470-27ca1135-1774-417b-aea9-e76d7cc6942d.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/b3a735cf-fdb0-4f28-b482-7bbbb5b9b64a-bf056ce7-c864-4ebb-bec6-f1999d3c92a2.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/2853ac4b-01ea-4946-b82f-bab45620f40b-OPS Presentation Cover.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/aeada02a-1b83-4bc9-88c1-e22d32dc996c-ARC - Presentation Cover.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/a100133d-94b3-4413-8910-8c0a227ec460-Formura Presentation Cover.png",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/bc304a5a-66cc-422f-b4bf-635667becf75-2876f8e0-a67e-4573-a45e-6e3e264c1eab.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/a4947593-08d7-42b1-8aea-e1b1dd6cd68a-a8dd04fe-08cf-4ffb-8610-641926359a4d.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/636210e3-b3af-43ef-a9cf-dd528fcec50f-e83fe148-7dbf-48d2-967b-33ba19d8ae41.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/3894e74a-e2aa-4a3a-a202-df82d325ba4a-55f83111-75de-46ae-acba-32606ba23803.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/e4fa9617-312f-4a48-8296-8903d5b1fca6-d5575c70-2335-48cc-ac27-c065a2e023f7.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/b09e9cd3-be7b-4789-a125-60cd0d4f6e19-menotopia-02.png",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/2853ac4b-01ea-4946-b82f-bab45620f40b-OPS Presentation Cover.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/aeada02a-1b83-4bc9-88c1-e22d32dc996c-ARC - Presentation Cover.jpg",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/thumbnails/a100133d-94b3-4413-8910-8c0a227ec460-Formura Presentation Cover.png",
  "https://pub-eb9df4e4e43449d7812ea91fc1940651.r2.dev/projects/details/e4fa9617-312f-4a48-8296-8903d5b1fca6-d5575c70-2335-48cc-ac27-c065a2e023f7.jpg",

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
                    duration: 1,
                    delay: 0.15 + i * 0.12,
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
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
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
                transition={{ delay: 1.1, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
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
          transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
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
                      delay: 1.6 + index * 0.05,
                      duration: 0.5,
                      ease: "backOut",
                    },
                  }}
                >
                  <img
                    src={src}
                    alt={`Showcase image ${index + 1}`}
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