'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';


interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  category: string | null;
  thumbnailUrl: string | null;
}

interface ProjectsProps {
  initialProjects: Project[];
}

const Projects = ({ initialProjects }: ProjectsProps) => {
  const [activeProject, setActiveProject] = useState(initialProjects[0]?.id || "");
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    initialProjects.forEach(({ id }) => {
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
  }, [initialProjects]);

  if (initialProjects.length === 0) {
    return null;
  }

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 lg:py-24 lg:py-32 px-5 sm:px-8 lg:px-10 lg:px-16">

        {/* Section Header */}
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-6">
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-base lg:text-xl lg:text-2xl tracking-tight uppercase">
            [Our Projects]
          </p>
          <div className="lg:col-span-4">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium">
              Work we've built with real clients, real constraints, and real results.
            </p>
          </div>
        </div>

        <div className="mt-10 lg:mt-16 relative lg:grid lg:grid-cols-6">

          {/* Sticky Sidebar — lg and up only */}
          <div className="hidden lg:block lg:col-span-2 sticky top-10 self-start">
            <ul className="flex flex-col gap-2">
              {initialProjects.map((project, index) => (
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
          <div className=" lg:col-span-4 flex flex-col gap-8 lg:gap-0">
            {initialProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block w-full">
                <div
                  id={project.id}
                  ref={(el) => { projectRefs.current[project.id] = el; }}
                className="w-full border border-dzignex-white/15 group"
                >
                  {/* Card Image */}
                  <div className="w-full aspect-video relative overflow-hidden bg-dzignex-blue/5">
                    {project.thumbnailUrl ? (
                      <img 
                        src={project.thumbnailUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    ) : (
                      <div className="bg-dzignex-blue/15 w-full h-full" />
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="p-4 lg:p-5 grid grid-cols-3 justify-between gap-4 lg:gap-16">
                    <p className="text-dzignex-blue text-lg sm:text-xl lg:text-2xl uppercase font-bold tracking-tighter shrink-0 col-span-1">
                      {project.title}
                    </p>
                    <div className="flex flex-col justify-between gap-4 col-span-2">
                      <p className="text-dzignex-white/80 text-sm lg:text-base leading-relaxed">
                        {project.summary || "Case study detailing our process and visual identity solutions."}
                      </p>
                      <div className="border-t border-dzignex-white/70 pt-4 mt-1 flex justify-between items-end">
                      <div>
                        <p className="text-dzignex-white font-bold text-lg">Service:</p>
                        <p className="text-dzignex-white text-sm uppercase tracking-widest">{project.category || "Multidisciplinary Design"}</p>
                      </div>
                      <ArrowUpRight size={30}
      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                       />
                      </div>
                    </div>
                  </div>
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