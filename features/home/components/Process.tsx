"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    id: "01",
    title: "Briefing & Onboarding",
    description: "We start by listening to your story, understanding your goals, and setting clear expectations. This step ensures we're fully aligned so you feel confident and supported from the very beginning."
  },
  {
    id: "02",
    title: "Research & Discovery",
    description: "Here, we dive into your market, audience, and competitors. The goal is to uncover insights that guide smarter decisions, reduce risks, and give your project the strongest possible foundation."
  },
  {
    id: "03",
    title: "Design & Direction",
    description: "This is where strategy turns visual. We shape the identity, layouts, and details that carry your brand — refining every iteration with you until the direction feels unmistakably yours."
  },
  {
    id: "04",
    title: "Delivery & Launch",
    description: "We hand over production-ready files, guidelines, and the support to use them well. Your brand ships polished, consistent, and ready to scale long after the project closes."
  }
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only: below md the four steps stack and scroll vertically like
    // any other section. Reduced-motion visitors keep native scrolling too.
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;

        // Distance the track must travel to bring the last pair into frame.
        // Read at refresh time so resizes recompute it instead of baking in
        // whatever the width happened to be on mount.
        const getDistance = () => track.scrollWidth - viewport.clientWidth;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            // 1:1 — a pixel of vertical scroll moves the track a pixel, so the
            // pin never outstays the animation.
            end: () => `+=${getDistance()}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: "x" });
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="border-b-2 border-dzignex-white/15 md:h-screen"
    >
      <div className="container mx-auto h-full border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 md:py-0 lg:px-16 flex items-center">
        <div className="w-full flex flex-col lg:grid lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Left Column: Title Section */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <p className="text-dzignex-blue font-bold text-xl lg:text-2xl tracking-tight uppercase">
              [Our Process]
            </p>
            <h2 className="text-dzignex-white tracking-tight text-lg lg:text-3xl font-bold leading-tight mt-6 lg:mt-8">
              We Drive the Process,<br className="hidden lg:block"/>You Focus On Business
            </h2>
            <p className="text-dzignex-white/70 font-medium text-sm lg:text-base mt-4 lg:mt-6 leading-relaxed max-w-md">
              Every project follows a proven path from discovery to delivery ensuring your vision becomes an unforgettable reality.
            </p>
          </div>

          {/* Right Column: two steps in frame, the other two a scroll away. */}
          <div
            ref={viewportRef}
            className="lg:col-span-4 border border-dzignex-white/15 bg-dzignex-white/[0.01] overflow-hidden md:h-[clamp(340px,52vh,460px)]"
          >
            <div
              ref={trackRef}
              className="flex flex-col md:flex-row md:w-[200%] h-full will-change-transform"
            >
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-full md:w-1/4 shrink-0 h-full p-8 lg:p-10 flex flex-col justify-between group transition-colors duration-300 hover:bg-dzignex-white/[0.02] ${
                    index < processSteps.length - 1
                      ? "border-b md:border-b-0 md:border-r border-dzignex-white/15"
                      : ""
                  }`}
                >
                  <p className="text-3xl lg:text-4xl font-bold text-dzignex-white tabular-nums">
                    {step.id}<span className="text-dzignex-blue">/</span>
                  </p>

                  <div className="mt-12 md:mt-0">
                    <h3 className="text-dzignex-white text-lg lg:text-xl font-bold tracking-tight uppercase group-hover:text-dzignex-blue transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-dzignex-white/70 text-sm lg:text-base leading-relaxed mt-3 lg:mt-4">
                      {step.description}
                    </p>
                    <div className="w-full h-[1px] bg-dzignex-white/15 mt-6 lg:mt-8"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
