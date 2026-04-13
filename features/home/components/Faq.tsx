
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';


const faqData = [
  {
    id: "01",
    question: "How many revision rounds do I get?",
    answer: "Between 1 to 3 revisions, depending on the project. Additional revisions can be added at an agreed extra cost."
  },
  {
    id: "02",
    question: "How does the payment work?",
    answer: "Payments are made in two parts: 50% upfront and 50% upon project completion."
  },
  {
    id: "03",
    question: "Which file formats will I receive with my logo?",
    answer: "You will receive your logo in PNG, JPEG, and PDF formats. Other formats (AI, PSD, or Figma) can be provided upon request. [Source files will be billed separately.]"
  },
  {
    id: "04",
    question: "How long does a project usually take?",
    answer: "Timelines depend on the project type, but most branding and design projects take 2–6 weeks. Larger projects like full websites may take longer."
  },
  {
    id: "05",
    question: "Do you offer support after the project is finished?",
    answer: "YES ! We are always here to help with anything you need after delivery."
  },
  {
    id: "06",
    question: "Can you help me with naming or brand strategy?",
    answer: "Yes, we can assist with naming, positioning, and strategy to build a strong foundation for your brand."
  }
];

const Faq = () => {
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
            [FAQ]
          </p>

          {/* Content */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl lg:text-4xl font-medium leading-tight">
              Frequently Asked Questions
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base lg:text-lg max-w-xl">Here are the most common questions we receive, you’ll likely find the answers you’re looking for below.</p>
          </div>
        </div>


        <div className="mt-16 space-y-5">
          {faqData.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-dzignex-white/3 border border-dzignex-white/15 transition-all duration-300 ${activeIndex === index ? 'bg-dzignex-white/7' : ''}`}
            >
              <div 
                className="flex flex-col lg:grid lg:grid-cols-6 p-6 lg:p-8 cursor-pointer group gap-4 lg:gap-0"
                onClick={() => toggleAccordion(index)}
              >
                <p className="lg:col-span-2 text-xl lg:text-2xl uppercase font-bold text-dzignex-white">
                  {item.id} <span className="text-dzignex-blue">/</span>
                </p>
                <div className="lg:col-span-4 flex justify-between items-center gap-4">
                  <p className="text-dzignex-white text-lg lg:text-2xl uppercase font-bold group-hover:text-dzignex-blue transition-colors duration-300 leading-tight">
                    {item.question}
                  </p>
                  <motion.button 
                    className="text-dzignex-white uppercase text-2xl lg:text-4xl flex items-center justify-center pointer-events-none shrink-0"
                    animate={{ rotate: activeIndex === index ? 90 : 0, color: activeIndex === index ? "var(--dzignex-blue)" : "rgba(255, 255, 255, 1)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]" size={30} />
                  </motion.button>
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
                    <div className="flex flex-col lg:grid lg:grid-cols-6 px-6 lg:px-8 pb-6 lg:pb-8">
                      <div className="hidden lg:block lg:col-span-2"></div>
                      <div className="lg:col-span-4">
                        <p className="text-dzignex-white/70 tracking-[0.005em] font-medium text-base lg:text-lg max-w-xl leading-relaxed">
                          {item.answer}
                        </p>
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

export default Faq;