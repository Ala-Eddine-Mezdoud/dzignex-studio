'use client'
import { useState, useEffect, useRef } from "react";

const projects = [
  { id: "01", number: "01", title: "Why we do this", description: "We spent years in traditional agencies watching the same problems repeat. Three-month projects that should take three weeks. Revision loops that never end. Invoices that surprise everyone. Talented designers spending more time in meetings than designing.  Meanwhile, businesses needed design more than ever but couldn't afford the agency circus or the hiring lottery." },
  { id: "02", number: "02", title: "How we do this", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
  { id: "03", number: "03", title: "What we do", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
  { id: "04", number: "04", title: "What we don't do", description: "We started Dzignex because we wanted to create a better way to do design. We wanted to create a design agency that was different from the rest. We wanted to create a design agency that was more than just a design agency. We wanted to create a design agency that was more than just a design agency." },
];

const Approach = () => {
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
            [Our Approach]
          </p>
          <div className="md:col-span-4">

          </div>
        </div>

        <div className="mt-10 md:mt-16 relative md:grid md:grid-cols-6">

          {/* Sticky Sidebar — md and up only */}
          <div className="hidden md:block md:col-span-2 sticky top-10 self-start mt-16">
            <ul className="flex flex-col gap-2">
              {projects.map(({ id, number }) => (
                <li
                  key={id}
                  className={`uppercase font-bold transition-all duration-300 ${
                    activeProject === id
                      ? "text-xl lg:text-5xl"
                      : "text-dzignex-white/70 text-lg lg:text-3xl"
                  }`}
                >
                  {number} <span className="text-dzignex-blue">/</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Cards */}
          <div className="md:col-span-4 flex flex-col gap-8 md:gap-0">
            {projects.map(({ id, title, description }) => (
              <div
                key={id}
                id={id}
                ref={(el) => { projectRefs.current[id] = el; }}
                className="w-full border-b pb-16 mt-16 border-dzignex-white/15"
              >
                {/* Card Image */}

                {/* Card Info */}
                <div className="">
                  <p className="text-dzignex-white text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-tighter shrink-0">
                    {title}
                  </p>
                  <div className="mt-4">
                    <p className="text-dzignex-white/80 text-sm md:text-base leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};
export default Approach;
