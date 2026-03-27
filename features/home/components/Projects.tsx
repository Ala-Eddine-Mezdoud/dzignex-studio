'use client'
import { useState, useEffect, useRef } from "react";

const projects = [
  { id: "project-01", label: "/Project 01", title: "/Project01" },
  { id: "project-02", label: "/Project 02", title: "/Project02" },
  { id: "project-03", label: "/Project 03", title: "/Project03" },
  { id: "project-04", label: "/Project 04", title: "/Project04" },
];

const Values = () => {
  const [activeProject, setActiveProject] = useState("project-01");
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    projects.forEach(({ id }) => {
      const el = projectRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveProject(id);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-6">
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase">
            [Our Projects]
          </p>
          <div className="md:col-span-4">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium">
              Work we've built with real clients, real constraints, and real results.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-16 relative md:grid md:grid-cols-6">

          {/* Sticky Sidebar — md and up only */}
          <div className="hidden md:block md:col-span-2 sticky top-10 self-start">
            <ul className="flex flex-col gap-2">
              {projects.map(({ id, label }) => (
                <li
                  key={id}
                  className={`uppercase font-bold transition-all duration-300 ${
                    activeProject === id
                      ? "text-dzignex-blue text-xl lg:text-2xl"
                      : "text-dzignex-white/70 text-lg lg:text-xl"
                  }`}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Cards */}
          <div className="md:col-span-4 flex flex-col gap-8 md:gap-0">
            {projects.map(({ id, title }) => (
              <div
                key={id}
                id={id}
                ref={(el) => { projectRefs.current[id] = el; }}
                className="w-full"
              >
                {/* Card Image */}
                <div className="bg-dzignex-blue/15 h-52 sm:h-72 md:h-80 lg:h-96 w-full" />

                {/* Card Info */}
                <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between gap-4 md:gap-16">
                  <p className="text-dzignex-blue text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-tighter shrink-0">
                    {title}
                  </p>
                  <div className="flex flex-col justify-between gap-4">
                    <p className="text-dzignex-white/80 text-sm md:text-base leading-relaxed">
                      A complete brand identity designed for a product-focused lab, built to
                      communicate clarity, credibility, and consistency across digital and
                      physical touchpoints.
                    </p>
                    <div className="border-t border-dzignex-white/70 pt-4 mt-1">
                      <p className="text-dzignex-white/50 text-sm">Service:</p>
                      <p className="text-dzignex-white text-sm">Project Category</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-4 md:mt-8">
              <button className="bg-dzignex-white text-dzignex-black px-4 py-2 text-sm md:text-base lg:text-xl font-semibold tracking-tight uppercase w-full md:w-fit">
                View All Projects
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Values;