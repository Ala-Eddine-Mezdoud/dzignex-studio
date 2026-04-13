'use client'

import { useState } from "react"

const values = [
  { number: "01", title: "Specialized Expertise", description: "Senior-level skills across Branding, Packaging, Motion, and UI/UX. Different backgrounds, one unified creative vision." },
  { number: "02", title: "Free Consultation", description: "Before anything starts — no cost, no commitment. We align on goals, scope, and expectations so there are zero surprises." },
  { number: "03", title: "Strategic Thinking", description: "We don't jump straight into design. We start with analysis. Understanding your business objective is how we build solutions that actually support real outcomes." },
  { number: "04", title: "Scalable Systems", description: "We build design systems that stay consistent and adapt as you grow — across platforms, products, and whatever comes next." },
  { number: "05", title: "Integrated Ecosystem Design", description: "Design, content, and digital experience built as one connected system — not isolated deliverables. Everything points toward your business objectives." },
]

const Values = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 lg:px-10 lg:px-16 lg:py-24 lg:py-32">

        <div className="flex flex-col lg:grid lg:grid-cols-6 gap-8">

          {/* Section Title */}
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-base lg:text-xl tracking-tight uppercase shrink-0">
            [Our Values]
          </p>

          {/* Content */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8 w-full">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
              At Dzignex, every project starts with a question: “How can we make this unforgettable?”.
            </p>

            {/* Mobile & Tablet: vertical stacked cards */}
            <div className="flex flex-col gap-3 mt-6 lg:hidden">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="border-2 border-dzignex-white/15 px-5 py-5 flex flex-col gap-3 bg-dzignex-blue/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-bold text-dzignex-white/30">
                      {value.number}
                    </span>
                    <span className="text-dzignex-blue font-bold text-xl">/</span>
                    <span className="text-dzignex-white font-bold text-base sm:text-lg uppercase tracking-tight">
                      {value.title}
                    </span>
                  </div>
                  <p className="text-dzignex-white/60 text-sm sm:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal accordion cards */}
            <div className="hidden lg:flex gap-2 mt-16 items-stretch">
              {[0, 1, 2, 3, 4].map((i) => {
                const isOpen = hovered === i || (hovered === null && i === 0);
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`
                      relative overflow-hidden h-96 flex flex-col justify-between  
                      transition-all duration-500 ease-in-out border-2 border-dzignex-white/15 px-2 py-4
                      hover:bg-dzignex-blue/10 
                      ${isOpen ? "w-40 lg:w-56 lg:w-64 bg-dzignex-blue/10" : "w-20 lg:w-24 lg:w-28"}
                    `}
                  >
                    <div className="text-5xl shrink-0">
                      {`0${i + 1}`}<span className="text-dzignex-blue">/</span>
                    </div>
                    
                    <div className={`flex flex-col gap-2 transition-opacity duration-500 ease-in-out ${isOpen ? "opacity-100 delay-100" : "opacity-0"}`}>
                      <div className="w-36 lg:w-52 lg:w-60">
                        <p className="text-dzignex-white font-bold text-base sm:text-2xl uppercase tracking-tight">{values[i].title}</p>
                        <p className="text-dzignex-white/90 text-sm sm:text-xs leading-tight">{values[i].description}</p>
                        <div className="w-full h-[2px] bg-dzignex-white/35 mt-4"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Values