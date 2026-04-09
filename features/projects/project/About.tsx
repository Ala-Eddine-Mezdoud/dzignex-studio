'use client'

import { useState } from "react"

const values = [
  { number: "01", title: "Specialized Expertise", description: "Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "02", title: "Clear Process", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "03", title: "Real Collaboration", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "04", title: "Built to Scale", description: "Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision. " },
  { number: "05", title: "Honest Work", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
]

const Values = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 md:px-10 lg:px-16 md:py-24 lg:py-32">

        <div className="flex flex-col md:grid md:grid-cols-6 gap-8">

          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase shrink-0">
            [About]
          </p>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col w-full border border-dzignex-white/15">
                <div className="aspect-video bg-dzignex-blue/10 w-full"></div>
                <div className="border-t border-dzignex-white/15 p-4 font-medium text-dzignex-white">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat facere neque eveniet at rerum rem nisi magnam, illo recusandae repudiandae. Cumque minus et ipsa temporibus corporis est ea qui. lor
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, expedita vitae. Quod rerum veritatis saepe, amet culpa repellat, corrupti necessitatibus blanditiis sapiente quo praesentium officia ipsam ratione quaerat doloremque velit?
                </div>
                <div className="px-4 ">
                    <div className="border-t border-dzignex-white/15 py-4">
                        <h1 className="uppercase font-bold text-xl">Sevices</h1>
                        <ul className="flex gap-4 font-medium mt-4">
                            <li className="border border-dzignex-white/15 p-2">Service 1</li>
                            <li className="border border-dzignex-white/15 p-2">Service 2</li>
                            <li className="border border-dzignex-white/15 p-2">Service 3</li>
                            <li className="border border-dzignex-white/15 p-2">Service 4</li>
                        </ul>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Values