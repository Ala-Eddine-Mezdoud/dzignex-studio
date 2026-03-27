
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesData = [
  {
    id: "01",
    title: "Brand identity & Visual Identity",
    tagline: "We don't just design your brand, we define its future.",
    details: [
      "Brand Positioning",
      "Audience & Persona Analysis",
      "Naming & Story Building",
      "Visual Identity Design",
      "Brand Guidelines",
      "Brand Strategy"
    ]
  },
  {
    id: "02",
    title: "Web Design & Development",
    tagline: "We build websites that are high-converting and user-centric.",
    details: [
      "UX/UI Research & Strategy",
      "Custom Website Design",
      "Next.js & React Development",
      "E-commerce Solutions",
      "Performance Optimization",
      "Mobile-First Design"
    ]
  },
  {
    id: "03",
    title: "Mobile App Development",
    tagline: "Innovative apps designed for seamless user experiences.",
    details: [
      "iOS & Android Development",
      "React Native & Flutter Apps",
      "App UI/UX Design",
      "Backend Integration",
      "Ongoing App Maintenance",
      "Store Deployment"
    ]
  },
  {
    id: "04",
    title: "Motion Design & Video",
    tagline: "Bring your brand to life with dynamic motion and storytelling.",
    details: [
      "2D/3D Motion Design",
      "Brand Storytelling Videos",
      "Product Demonstrations",
      "Social Media Content",
      "Post-production & Editing",
      "Logo Animation"
    ]
  },
  {
    id: "05",
    title: "Digital Growth & SEO",
    tagline: "Drive traffic and convert users with data-driven strategies.",
    details: [
      "SEO Audit & Strategy",
      "Content Marketing Plans",
      "Social Media Strategy",
      "Paid Advertising (PPC)",
      "Growth Hacking",
      "Analytics & Reporting"
    ]
  }
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 md:py-32 md:px-16">
        <div className="flex flex-col md:grid md:grid-cols-6 gap-8 md:gap-0">
          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-xl md:text-2xl tracking-tight uppercase">
            [Our Services]
          </p>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl md:text-4xl font-medium leading-tight">
              Creative Solutions for Brands That Want to Stand Out
            </p>
          </div>
        </div>


        <div className="mt-16 space-y-5">
          {servicesData.map((service, index) => (
            <div 
              key={service.id} 
              className={`bg-dzignex-white/3 border border-dzignex-white/15 transition-all duration-300 ${activeIndex === index ? 'bg-dzignex-white/7' : ''}`}
            >
              <div 
                className="flex flex-col md:grid md:grid-cols-6 p-6 md:p-8 cursor-pointer group gap-4 md:gap-0"
                onClick={() => toggleAccordion(index)}
              >
                <p className="md:col-span-2 text-2xl md:text-4xl uppercase font-bold text-dzignex-white">
                  {service.id} <span className="text-dzignex-blue">/</span>
                </p>
                <div className="md:col-span-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <p className="text-dzignex-white text-xl md:text-2xl uppercase font-bold group-hover:text-dzignex-blue transition-colors duration-300">
                    {service.title}
                  </p>
                  <button className={`${activeIndex === index ? 'text-dzignex-blue' : 'text-dzignex-white'} uppercase font-bold tracking-widest text-xs md:text-sm hover:underline transition-all`}>
                    {activeIndex === index ? 'Close details' : 'View details'}
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col md:grid md:grid-cols-6 px-6 md:px-8 pb-6 md:pb-8 gap-4 md:gap-0">
                      <div className="hidden md:block md:col-span-2"></div>
                      <div className="md:col-span-4 border-t-1 border-t-dzignex-white/15 pt-6 md:pt-8">
                        <p className="text-dzignex-white font-bold tracking-tighter text-base md:text-lg mb-4">
                          {service.tagline}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-2">
                          {service.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-dzignex-white/70 text-base md:text-lg flex items-center gap-2">
                              <span className="text-dzignex-blue font-bold text-[10px] md:text-xs">●</span> {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services;