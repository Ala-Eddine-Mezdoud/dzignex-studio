"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

// Expo-out: the house easing — fast launch into a long, dramatic deceleration.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Time each testimonial holds before the deck advances.
const AUTOPLAY_MS = 7000;

const testimonialsData = [
  {
    id: "avure",
    brandName: "Avure",
    logoSrc: "/testimonials/avure-logo.svg",
    authorName: "Abdennour. A",
    authorRole: "Founder, Avure Skincare",
    feedback: "We've been working with Dzignex Studio and are truly impressed by their professionalism, responsiveness, and eye for modern, minimalist design. They perfectly captured our brand vision at Avure and translated it into a strong identity we're proud of.",
    statValue: "+24",
    statLabel: "Months Partnership",
    imageSrc: "/testimonials/avure.webp"
  },
  {
    id: "formura",
    brandName: "Formura Labs",
    logoSrc: "/testimonials/formura-logo.svg",
    authorName: "Samira Belounnas",
    authorRole: "Founder, Formura Labs",
    feedback: "Dzignex delivered a clean, professional, and visually appealing design for Formura Labs. We're very happy with the overall result and how it elevated every sub-brand under our umbrella.",
    statValue: "+5",
    statLabel: "Sub-brands Launched",
    imageSrc: "/testimonials/formura.webp"
  },
  {
    id: "opsfirst",
    brandName: "Ops First",
    logoSrc: "/testimonials/opsfirst-logo.svg",
    authorName: "Anis Hacini",
    authorRole: "CEO & Founder, Ops First",
    feedback: "Onboarding with Dzignex was smooth from day one. They took the time to truly understand our brand, did their due diligence, and delivered far beyond visual assets — they built us a complete identity.",
    statValue: "+28%",
    statLabel: "Service Improvement",
    imageSrc: "/testimonials/opsfirst.webp"
  },
  {
    id: "chayame",
    brandName: "CHAYAME",
    logoSrc: "/testimonials/chayame-logo.svg",
    authorName: "Achraf. D",
    authorRole: "Marketing Manager, Chayame",
    feedback: "Dzignex offered strong customer service throughout a smooth process. They understood our brand quickly and executed with real precision, exactly what Chayame needed.",
    statValue: "+35%",
    statLabel: "Brand Appeal",
    imageSrc: "/testimonials/chayame.webp"
  },
  {
    id: "onaira",
    brandName: "Onaira",
    logoSrc: "/testimonials/onaira-logo.svg",
    authorName: "Chouaa. B",
    authorRole: "Founder, Onaira",
    feedback: "The whole process with Dzignex was smooth, communication was easy, and the final result exceeded our expectations. We'd happily recommend Dzignex for future projects.",
    statValue: "+10",
    statLabel: "Product Designs",
    imageSrc: "/testimonials/onaira.webp"
  },
  {
    id: "dermology",
    brandName: "Dermology",
    logoSrc: "/testimonials/dermology-logo.svg",
    authorName: "Islem Benbrahim",
    authorRole: "Founder, Dermology Skincare",
    feedback: "Our experience with Dzignex has been overwhelmingly positive. We're looking forward to building a long-term partnership with the team.",
    statValue: "+12",
    statLabel: "Months Partnership",
    imageSrc: "/testimonials/dermology.webp"
  },
  {
    id: "menotopia",
    brandName: "Menotopia",
    logoSrc: "/testimonials/menotopia-logo.svg",
    authorName: "Mohamed Ghazali",
    authorRole: "Founder, Menotopia",
    feedback: "Collaborating with Dzignex was smooth and reactive. They understood our feedback quickly, brought real creativity to the table, and combined professionalism with a genuine human touch.",
    statValue: "+5",
    statLabel: "Brands Launched",
    imageSrc: "/testimonials/menotopia.webp"
  },
  {
    id: "timeplus",
    brandName: "TimePlus",
    logoSrc: "/testimonials/timeplus-logo.svg",
    authorName: "Omar Bekelli",
    authorRole: "Founder, Timeplus",
    feedback: "Very satisfied with the experience with Dzignex Studio! Thank you for the prompt service, attentive communication, and professional quality of execution. Excellent value that exceeded our expectations.",
    statValue: "+50",
    statLabel: "Assets Delivered",
    imageSrc: "/testimonials/timeplus.webp"
  }
];

const Testimonials = () => {
  const [selectedBrandId, setSelectedBrandId] = useState("avure");
  const [isInteracting, setIsInteracting] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const deckRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(deckRef, { amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();

  const activeIndex = Math.max(
    0,
    testimonialsData.findIndex((t) => t.id === selectedBrandId)
  );
  const currentTestimonial = testimonialsData[activeIndex];

  // Autoplay only while the deck is on screen and nobody is interacting with it.
  // Reduced-motion users get a static deck they drive themselves.
  const isPlaying =
    isInView && !isInteracting && !isTabHidden && !prefersReducedMotion;

  // Progress drives the active tile's fill bar. Kept as a motion value so the
  // per-frame updates never re-render the section.
  const progress = useMotionValue(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  useAnimationFrame((_, delta) => {
    if (!isPlaying) return;

    const next = progress.get() + delta / AUTOPLAY_MS;
    if (next >= 1) {
      progress.set(0);
      const nextIndex = (activeIndexRef.current + 1) % testimonialsData.length;
      setSelectedBrandId(testimonialsData[nextIndex].id);
    } else {
      progress.set(next);
    }
  });

  // Any manual pick restarts the cycle from zero rather than inheriting
  // whatever was left of the previous one.
  const selectBrand = useCallback(
    (id: string) => {
      progress.set(0);
      setSelectedBrandId(id);
    },
    [progress]
  );

  // A tab-away shouldn't burn through the deck in the background.
  useEffect(() => {
    const onVisibilityChange = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const getBorderClass = (index: number) => {
    let classes = "border-dzignex-white/15 ";

    // Horizontal borders
    classes += index < 4 ? "border-b " : "md:border-b-0 ";
    classes += index < 6 ? "max-md:border-b " : "max-md:border-b-0 ";

    // Vertical borders
    classes += (index % 4 !== 3) ? "md:border-r " : "md:border-r-0 ";
    classes += (index % 2 === 0) ? "max-md:border-r " : "max-md:border-r-0 ";

    return classes;
  };

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 lg:py-32">
        
        {/* Header Row */}
        <div className="px-6 lg:px-16 flex flex-col lg:grid lg:grid-cols-6 gap-8 lg:gap-0">
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-xl lg:text-2xl tracking-tight uppercase">
            [TESTIMONIALS]
          </p>
          <div className="lg:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl lg:text-4xl font-medium leading-tight">
              Voices That Drive Us Forward
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base lg:text-lg max-w-xl">
              Real experiences. Bold results. See how we’ve transformed brands through true partnership.
            </p>
          </div>
        </div>

        {/* Deck: panel + brand selector share one hover/focus zone so the
            autoplay clock stops the moment a visitor engages with either. */}
        <div
          ref={deckRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={() => setIsInteracting(false)}
        >

        {/* Testimonial Display Area */}
        <div className="mx-6 lg:mx-16 mt-12 lg:mt-24 border border-dzignex-white/15 bg-dzignex-white/[0.01]">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[580px]">

            {/* Image Column — crossfades (no `mode="wait"`, so frames overlap
                instead of flashing empty) under a slow drift tied to the dwell. */}
            <div className="lg:col-span-4 relative w-full aspect-[4/3] lg:aspect-auto lg:h-full border-b lg:border-b-0 lg:border-r border-dzignex-white/15 overflow-hidden">
              <AnimatePresence>
                <motion.img
                  key={currentTestimonial.id}
                  src={currentTestimonial.imageSrc}
                  alt={currentTestimonial.brandName}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.7, ease: EASE_OUT_EXPO },
                    scale: {
                      duration: AUTOPLAY_MS / 1000,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Quote Column */}
            <div className="lg:col-span-5 h-full min-w-0 p-8 lg:p-10 xl:p-12 flex flex-col border-b lg:border-b-0 lg:border-r border-dzignex-white/15">
              {/* Quote Icon */}
              <svg className="w-8 h-8 shrink-0 text-white fill-current opacity-80" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="flex-1 min-h-[140px] flex items-center overflow-hidden py-6 lg:py-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                    className="text-dzignex-white/90 text-[15px] lg:text-base xl:text-[19px] font-normal tracking-[-0.011em] leading-[1.7] text-pretty"
                  >
                    {currentTestimonial.feedback}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Author Profile — trails the quote by a beat so the block
                  resolves top-down rather than all at once. */}
              <div className="shrink-0 pt-6 border-t border-dzignex-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="rounded-full border border-dzignex-white/20 w-12 h-12 flex items-center justify-center bg-dzignex-white/5 text-[10px] uppercase font-bold tracking-[0.08em] text-dzignex-white/80 shrink-0">
                      {currentTestimonial.brandName.substring(0, 3)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-dzignex-white text-base lg:text-lg font-semibold tracking-[-0.015em] leading-tight truncate">
                        {currentTestimonial.authorName}
                      </h4>
                      <p className="text-dzignex-white/50 text-[11px] lg:text-xs font-medium uppercase tracking-[0.14em] mt-1.5 truncate">
                        {currentTestimonial.authorRole}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Stat Column */}
            <div className="lg:col-span-3 h-full min-w-0 p-8 lg:p-10 xl:p-12 flex flex-col items-end justify-end bg-dzignex-white/[0.005]">

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.12 }}
                  className="shrink-0 w-full text-right"
                >
                  <p className="text-5xl xl:text-6xl font-bold tracking-[-0.04em] text-dzignex-white tabular-nums whitespace-nowrap leading-[0.9]">
                    {currentTestimonial.statValue.startsWith("+") || currentTestimonial.statValue.startsWith("$") ? (
                      <>
                        <span className="text-dzignex-blue font-bold">
                          {currentTestimonial.statValue.substring(0, 1)}
                        </span>
                        {currentTestimonial.statValue.substring(1)}
                      </>
                    ) : (
                      currentTestimonial.statValue
                    )}
                  </p>
                  <p className="text-dzignex-white/50 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.16em] leading-snug mt-4 min-h-[2.5em]">
                    {currentTestimonial.statLabel}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Interactive Brand Grid */}
        <div className="mx-6 lg:mx-16 grid grid-cols-2 md:grid-cols-4 border border-t-0 border-dzignex-white/15">
          {testimonialsData.map((brand, index) => {
            const isSelected = selectedBrandId === brand.id;

            return (
              <button
                key={brand.id}
                onClick={() => selectBrand(brand.id)}
                aria-current={isSelected}
                aria-label={`Show the ${brand.brandName} testimonial`}
                className={`group relative flex h-24 lg:h-28 items-center justify-center px-6 transition-all duration-300 ${getBorderClass(index)} ${
                  isSelected ? "bg-dzignex-white/[0.04]" : "hover:bg-dzignex-white/[0.02]"
                }`}
              >
                {/* Autoplay clock — the active tile fills left to right over the
                    dwell, so the rotation is legible before it happens. */}
                {isSelected && (
                  <motion.span
                    aria-hidden
                    style={{ scaleX: progress }}
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-dzignex-blue"
                  />
                )}

                {/* Brand Render */}
                <div className={`transition-opacity duration-300 ${isSelected ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}>
                  <img
                    src={brand.logoSrc}
                    alt={brand.brandName}
                    className="h-7 lg:h-8 w-auto max-w-[140px] object-contain brightness-0 invert"
                  />
                </div>
              </button>
            );
          })}
        </div>

        </div>

      </div>
    </div>
  );
};

export default Testimonials;