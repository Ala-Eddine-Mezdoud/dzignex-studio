
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';


const servicesData = [
  {
    id: "01",
    title: "Brand Strategy & Visual Identity",
    tagline: "We don't just design your brand, we define its future.",
    details: [
      "Brand Positioning",
      "Audience & Persona Analysis",
      "Naming & Story Building",
      "Brand Voice & Messaging",
      "Competitor Analysis & Differentiation Strategy",
      "Logo & Identity Design",
      "Color, Typography, Grid Systems",
      "Brand Guidelines",
      "Brand Assets (business cards, templates, packaging, etc.)"
    ]
  },
  {
    id: "02",
    title: "Packaging & Product Design",
    tagline: "Your product shouldn’t just sit on a shelf. It should live in memory.",
    details: [
      "Packaging Design",
      "Customized Dielines & Product Design",
      "Label & Box Design",
      "Product Mockups & Renderings",
      "Focused on FMCG, Cosmetics & Supplements",
      "3D Product Modeling (with or without label UVs)",
      "Realistic 3D Scene Composition",
      "Art Direction for Product Shoots (Digital or Hybrid)",
      "AI-enhanced renders & stylized mockups",
      "High-impact visuals for digital shelves and campaigns"
    ]
  },
  {
    id: "03",
    title: "Motion & Animation",
    tagline: "Not just moving parts, but stories that demand attention.",
    details: [
      "UI/UX Interaction Animation",
      "Explainer & Product Demo Videos",
      "2D & 3D Motion Design",
      "Video Editing & Post-Production",
      "Talking Head Videos [ Long & Short form ]",
      "App Walkthroughs & Onboarding Guided Tours",
      "High-Conversion SaaS Explainer Animations"
    ]
  },
  {
    id: "04",
    title: "Websites & Landing Pages",
    tagline: "High-performance digital destinations engineered to convert traffic into revenue.",
    details: [
      "Website UI/UX Design",
      "Landing Page Design",
      "E-commerce Interfaces",
      "No-code or Custom Delivery",
      "Performance-Driven Structures",
      "Front End & Back End Development"
    ]
  },
  {
    id: "05",
    title: "Performance & Social",
    tagline: "Scroll-stopping social content and ad assets engineered for engagement and ROI.",
    details: [
      "High-Conversion Paid Ad Creative (Meta, TikTok, LinkedIn)",
      "Strategic Social Media Visual Language",
      "Campaign Branding & Event Promotion Assets",
      "Performance-Driven Carousel & Story Design",
      "Platform-Specific Content Optimization",
      "Influencer Collaboration Design Kits",
      "Static & Animated Social Content Systems"
    ]
  },
  {
    id: "06",
    title: "Ongoing Design Partnership",
    tagline: "Not a one-time job. A creative arm for your brand.",
    details: [
      "Monthly Retainers",
      "Dedicated Creative Support",
      "Brand Consistency Over Time",
      "Priority Access to the Team",
      "Strategic Network Access"
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
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 lg:py-32 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-6 gap-8 lg:gap-0">
          {/* Section Title */}
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-xl lg:text-2xl tracking-tight uppercase">
            [Our Services]
          </p>

          {/* Content */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl lg:text-4xl font-medium leading-tight">
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
                className="flex flex-col lg:grid lg:grid-cols-6 p-6 lg:p-8 cursor-pointer group gap-4 lg:gap-0"
                onClick={() => toggleAccordion(index)}
              >
                <p className="lg:col-span-2 text-2xl lg:text-4xl uppercase font-bold text-dzignex-white">
                  {service.id} <span className="text-dzignex-blue">/</span>
                </p>
                <div className="lg:col-span-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <p className="text-dzignex-white text-xl lg:text-2xl uppercase font-bold group-hover:text-dzignex-blue transition-colors duration-300">
                    {service.title}
                  </p>
                  <button className={`${activeIndex === index ? 'text-dzignex-blue' : 'text-dzignex-white'} flex items-end gap-1 uppercase font-bold tracking-widest text-xs lg:text-sm hover:underline transition-all`}>
                     {activeIndex === index ? <ArrowUpRight className="transition-transform duration-300 rotate-90 group-hover:translate-x-1 group-hover:-translate-y-[2px]" size={30}/> : <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]" size={30} />} 
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
                    <div className="flex flex-col lg:grid lg:grid-cols-6 px-6 lg:px-8 pb-6 lg:pb-8 gap-4 lg:gap-0">
                      <div className="hidden lg:block lg:col-span-2"></div>
                      <div className="lg:col-span-4 border-t-1 border-t-dzignex-white/15 pt-6 lg:pt-8">
                        <p className="text-dzignex-white font-bold tracking-tighter text-base lg:text-lg mb-4">
                          {service.tagline}
                        </p>
                        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-2">
                          {service.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-dzignex-white/70 text-base lg:text-lg flex items-center gap-2">
                              <span className="text-dzignex-blue font-bold text-[10px] lg:text-xs">●</span> {detail}
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