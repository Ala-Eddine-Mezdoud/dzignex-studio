'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  category: string | null;
  thumbnailUrl: string | null;
}

interface LatestProps {
  projects: Project[];
}

const Latest = ({ projects }: LatestProps) => {
  const [activeProject, setActiveProject] = useState(projects[0]?.id || "");
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
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-6">
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase">
            [More Projects]
          </p>
          <div className="md:col-span-4">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium">
              Discover our latest work and see how we help brands stand out.
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-16 relative md:grid md:grid-cols-6">

          {/* Sticky Sidebar — md and up only */}
          <div className="hidden md:block md:col-span-2 sticky top-10 self-start">
            <ul className="flex flex-col gap-2">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={`uppercase font-bold transition-all duration-300 ${
                    activeProject === project.id
                      ? "text-dzignex-blue text-xl lg:text-2xl"
                      : "text-dzignex-white/70 text-lg lg:text-xl"
                  }`}
                >
                  /{project.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Cards */}
          <div className="md:col-span-4 flex flex-col gap-8 md:gap-0">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block w-full">
                <div
                  id={project.id}
                  ref={(el) => { projectRefs.current[project.id] = el; }}
                className="w-full border border-dzignex-white/15"
                >
                  {/* Card Image */}
                  <div className="w-full aspect-video relative overflow-hidden bg-dzignex-blue/5">
                    {project.thumbnailUrl ? (
                      <img 
                        src={project.thumbnailUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="bg-dzignex-blue/15 w-full h-full" />
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-4 md:p-5 flex flex-col sm:flex-row justify-between gap-4 md:gap-16">
                    <p className="text-dzignex-blue text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-tighter shrink-0">
                      {project.title}
                    </p>
                    <div className="flex flex-col justify-between gap-4">
                      <p className="text-dzignex-white/80 text-sm md:text-base leading-relaxed">
                        {project.summary || "Case study detailing our process and visual identity solutions."}
                      </p>
                      <div className="border-t border-dzignex-white/70 pt-4 mt-1">
                        <p className="text-dzignex-white font-bold text-lg">Service:</p>
                        <p className="text-dzignex-white text-sm uppercase tracking-widest">{project.category || "Multidisciplinary Design"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            <div className="flex justify-end mt-4 md:mt-8">
              <Link href="/projects" className="bg-dzignex-white text-dzignex-black px-6 py-3 text-sm md:text-base lg:text-lg font-bold tracking-tight uppercase w-full md:w-fit text-center hover:bg-dzignex-blue hover:text-white transition-all">
                View All Projects
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Latest;