
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "01",
    question: "How many revision rounds do I get?",
    answer: "You have between 1 to 3 revisions, depending on the project. Additional revisions can be added at an agreed extra cost."
  },
  {
    id: "02",
    question: "What is your typical turnaround time?",
    answer: "Most projects take between 2 to 6 weeks, depending on the complexity and scope. Large scale applications may take longer."
  },
  {
    id: "03",
    question: "How do we handle intellectual property?",
    answer: "Full ownership of the final design and code is transferred to you upon final payment, ensuring you have total control."
  },
  {
    id: "04",
    question: "Do you offer maintenance after launch?",
    answer: "Yes, we provide monthly maintenance packages to ensure your application remains secure, up-to-date, and performant."
  },
  {
    id: "05",
    question: "Can you work with my existing branding?",
    answer: "Absolutely! We can seamlessly integrate your current brand identity or help you evolve it into something refreshed and modern."
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-32 px-16">
        <div className="grid grid-cols-6">
          {/* Section Title */}
          <p className="col-span-2 text-dzignex-blue font-bold text-2xl tracking-tight uppercase">
            [FAQ]
          </p>

          {/* Content */}
          <div className="col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-4xl font-medium">
              Frequently Asked Questions
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-lg max-w-xl">Here are the most common questions we receive, you’ll likely find the answers you’re looking for below.</p>
          </div>
        </div>


        <div className="mt-16 space-y-5">
          {faqData.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-dzignex-white/3 border border-dzignex-white/15 transition-all duration-300 ${activeIndex === index ? 'bg-dzignex-white/7' : ''}`}
            >
              <div 
                className="grid grid-cols-6 p-8 cursor-pointer group"
                onClick={() => toggleAccordion(index)}
              >
                <p className="col-span-2 text-2xl uppercase font-bold text-dzignex-white">
                  {item.id} <span className="text-dzignex-blue">/</span>
                </p>
                <div className="col-span-4 flex justify-between items-center gap-4">
                  <p className="text-dzignex-white text-2xl uppercase font-bold group-hover:text-dzignex-blue transition-colors duration-300">
                    {item.question}
                  </p>
                  <motion.button 
                    className="text-dzignex-white uppercase text-4xl flex items-center justify-center pointer-events-none"
                    animate={{ rotate: activeIndex === index ? 45 : 0, color: activeIndex === index ? "var(--dzignex-blue)" : "rgba(255, 255, 255, 1)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    +
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
                    <div className="grid grid-cols-6 px-8 pb-8">
                      <div className="col-span-2"></div>
                      <div className="col-span-4">
                        <p className="text-dzignex-white/70 tracking-[0.005em] font-medium text-lg max-w-xl leading-relaxed">
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