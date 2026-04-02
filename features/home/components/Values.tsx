'use client'

import { useState } from "react"

const values = [
  { number: "01", title: "Strategy First", description: "We start with research and brand positioning before touching design tools." },
  { number: "02", title: "Clear Process", description: "Defined stages, deliverables, and timelines so you always know what comes next." },
  { number: "03", title: "Real Collaboration", description: "You're involved at every key decision point — no black-box design." },
  { number: "04", title: "Built to Scale", description: "Every system we create is designed to grow with your business." },
  { number: "05", title: "Honest Work", description: "We tell you what will work and what won't — no fluff, no filler." },
]

const Values = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 md:px-10 lg:px-16 md:py-24 lg:py-32">

        <div className="flex flex-col md:grid md:grid-cols-6 gap-8">

          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase shrink-0">
            [Our Values]
          </p>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 w-full">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
              A proven process that delivers results, not surprises.
            </p>

            {/* Mobile & Tablet: vertical stacked cards */}
            <div className="flex flex-col gap-3 mt-6 md:hidden">
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
          <div className="hidden md:flex gap-2 mt-16 items-stretch">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
                    h-96 text-5xl flex 
                    transition-all duration-500 ease-in-out border-2 border-dzignex-white/15 px-2 py-4
                    hover:bg-dzignex-blue/10 
                    ${
                      hovered === null
                      ? i === 0
                          ? "w-40 md:w-56 lg:w-64" // first card wide by default
                          : "w-20 md:w-24 lg:w-28"
                        : hovered === i
                          ? "w-40 md:w-56 lg:w-64" // hovered card expands
                          : "w-20 md:w-24 lg:w-28" // others shrink
                    }
                  `}
                >
                  {`0${i + 1}`}<span className="text-dzignex-blue">/</span>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Values