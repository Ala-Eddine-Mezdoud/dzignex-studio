'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";


{/* the label is dynamic and it changes depending on the project */}
const details = [
  { id: "1", label: "design process" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "2", label: "Logo Proposals" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "3", label: "logo design" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "4", label: "Colors System" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "5", label: "Typography System" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "6", label: "Brand Guidelines" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "7", label: "brand applications" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "8", label: "brand website" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
  { id: "9", label: "social media design" , description:"We started by understanding the challenges entrepreneurs face in Algeria’s wellness market, then translated those insights into a clear visual identity. From research to sketches, refinements, and final applications."},
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState("project-01");
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    details.forEach(({ id }) => {
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
            [Project Details]
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
              {details.map(({ id, label }) => (
                <li
                  key={id}
                  className={`uppercase font-bold transition-all duration-300 ${
                    activeProject === id
                      ? "text-dzignex-blue text-lg lg:text-xl"
                      : "text-dzignex-white/70 text-lg lg:text-lg"
                  }`}
                >
                  /{label}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Cards */}
          <div className="md:col-span-4 flex flex-col gap-8 md:gap-0">
            {details.map(({ id, label, description }) => (
              <Link key={id} href={`/projects/${id}`} className="block w-full">
                <div
                  id={id}
                  ref={(el) => { projectRefs.current[id] = el; }}
                className="w-full border border-dzignex-white/15"
                >


                  {/* Card Info */}
                  <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between gap-4 md:gap-16">
                    <p className="text-dzignex-white text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-tighter shrink-0 w-44 leading-tight">
                      {label}
                    </p>
                    <div className="flex flex-col justify-between gap-4">
                      <p className="text-sm md:text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="bg-dzignex-blue/15 aspect-video w-full" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Projects;