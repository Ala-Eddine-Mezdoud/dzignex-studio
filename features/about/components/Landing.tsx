'use client'
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

const STATEMENT =
  "Dzignex Studio is framed not just as a business but a dynamic story of friendship, courage, and creativity, inviting clients to be part of the next chapter.";

const HIGHLIGHTS = new Set(["friendship", "courage", "creativity", "story"]);

const words = STATEMENT.split(" ").map((word) => ({
  word,
  highlight: HIGHLIGHTS.has(word.replace(/[.,]/g, "").toLowerCase()),
}));

const Word = ({
  children,
  highlight,
  progress,
  range,
  active,
}: {
  children: string;
  highlight: boolean;
  progress: MotionValue<number>;
  range: [number, number];
  active: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span
        style={active ? { opacity } : undefined}
        className={highlight ? "text-dzignex-blue" : "text-dzignex-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Landing = () => {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal is scrubbed across the section's extra height while the text is
  // pinned in the centre of the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const active = !reduceMotion;
  const total = words.length;
  // Reveal completes a little before the end so the last word doesn't require
  // scrolling fully past the section.
  const span = 0.9;

  const content = (
    <div className="w-full max-w-5xl">
      <p className="text-dzignex-blue font-bold text-base md:text-xl tracking-tight uppercase mb-8 md:mb-12">
        [ Who We Are ]
      </p>

      <p className="flex flex-wrap font-semibold tracking-tighter leading-[1.15] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        {words.map(({ word, highlight }, i) => {
          const start = (i / total) * span;
          const end = ((i + 1) / total) * span;
          return (
            <Word
              key={i}
              highlight={highlight}
              progress={scrollYProgress}
              range={[start, end]}
              active={active}
            >
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );

  if (reduceMotion) {
    return (
      <div className="border-b-2 border-dzignex-white/15">
        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div
        ref={containerRef}
        className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 relative h-[200vh]"
      >
        <div className="sticky top-0 h-screen flex items-center px-5 sm:px-8 md:px-10 lg:px-16">
          {content}

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-5 sm:left-8 md:left-10 lg:left-16 flex items-center gap-3 text-dzignex-white/40 uppercase text-xs tracking-widest">
            <span>Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
