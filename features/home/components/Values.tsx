'use client'

import { useState } from "react"

const Values = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-32 px-16">
        <div className="flex justify-between gap-8">
          {/* Section Title */}
          <p className="text-dzignex-blue font-bold text-2xl tracking-tight uppercase">
            [Our Values]
          </p>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-4xl font-medium">
              A proven process that delivers results, not surprises.
            </p>

            {/* Cards */}
            <div className="flex gap-2 mt-16">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
                    h-96 text-5xl flex 
                    transition-all duration-500 ease-in-out
                    bg-dzignex-blue/15
                    ${
                      hovered === null
                        ? i === 0
                          ? "w-94" // first card wide by default
                          : "w-24"
                        : hovered === i
                          ? "w-94" // hovered card expands
                          : "w-24" // others shrink
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