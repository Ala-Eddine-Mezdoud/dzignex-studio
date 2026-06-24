'use client'
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const items = [
  { id: "01", number: "01", title: "Why we do this", description: "We spent years in traditional agencies watching the same problems repeat. Three-month projects that should take three weeks. Revision loops that never end. Invoices that surprise everyone. Talented designers spending more time in meetings than designing.  Meanwhile, businesses needed design more than ever but couldn't afford the agency circus or the hiring lottery." },
  { id: "02", number: "02", title: "How we do this", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
  { id: "03", number: "03", title: "What we do", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
  { id: "04", number: "04", title: "What we don't do", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
];

const ApproachPanel = ({
  item,
  total,
}: {
  item: (typeof items)[number];
  total: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Progress as the panel rises from the bottom of the viewport up to the top
  // (where it sticks) — used to reveal the content in sync with the slide.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const y = useTransform(scrollYProgress, [0.15, 0.9], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);

  return (
    <div ref={ref} className="sticky top-0 h-screen">
      <div className="relative h-full overflow-hidden bg-dzignex-black border-t-2 border-dzignex-white/15 flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Oversized ghost number filling the panel */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 sm:-right-6 lg:right-4 bottom-0 lg:-bottom-8 text-dzignex-white/[0.05] font-bold leading-none tracking-tighter text-[42vw] lg:text-[26vw]"
        >
          {item.number}
        </span>

        <motion.div
          style={reduceMotion ? undefined : { y, opacity }}
          className="relative max-w-4xl"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-dzignex-blue font-bold text-base lg:text-xl tracking-tight uppercase">
              [Our Approach]
            </span>
            <span className="text-dzignex-white/30 font-bold tabular-nums tracking-widest">
              {item.number} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-8 lg:mt-14 text-dzignex-white uppercase font-bold tracking-tighter text-4xl sm:text-5xl lg:text-7xl leading-[0.95]">
            {item.title}
          </h3>

          <p className="mt-6 lg:mt-10 max-w-3xl text-dzignex-white/70 text-base sm:text-lg lg:text-xl leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const Approach = () => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 relative">
        {items.map((item) => (
          <ApproachPanel key={item.id} item={item} total={items.length} />
        ))}
      </div>
    </div>
  );
};

export default Approach;
