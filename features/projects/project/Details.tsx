'use client'
import { useState, useEffect, useRef } from "react";

interface ProjectDetail {
  id: string;
  label: string;
  description: string | null;
  images: {
    id: string;
    imageUrl: string;
    altText: string | null;
  }[];
}

interface DetailsProps {
  details: ProjectDetail[];
}

const Details = ({ details }: DetailsProps) => {
  const [activeProject, setActiveProject] = useState(details[0]?.id || "");
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
  }, [details]);

  if (!details || details.length === 0) return null;

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
              A deep dive into our process, from initial concepts to the final outcome.
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
          <div className="md:col-span-4 flex flex-col gap-12 md:gap-0">
            {details.map(({ id, label, description, images }) => (
              <div
                key={id}
                id={id}
                ref={(el) => { projectRefs.current[id] = el; }}
                className="w-full border border-dzignex-white/15"
              >
                {/* Card Info */}
                <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between gap-4 md:gap-16 bg-dzignex-white/[0.02]">
                  <p className="text-dzignex-white text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-tighter shrink-0 w-44 leading-tight">
                    {label}
                  </p>
                  <div className="flex flex-col justify-between gap-4">
                    <p className="text-sm md:text-base leading-relaxed text-dzignex-white/70 whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Card Images */}
                <div className="flex flex-col gap-4 p-4 md:p-6 border-t border-dzignex-white/15">
                  {images && images.length > 0 ? (
                    images.map((img) => (
                      <div key={img.id} className="w-full relative overflow-hidden bg-dzignex-blue/5 border border-dzignex-white/10">
                        <img 
                          src={img.imageUrl} 
                          alt={img.altText || label}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="bg-dzignex-blue/15 aspect-video w-full" />
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Details;