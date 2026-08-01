"use client";

import { motion } from "framer-motion";

// Expo-out: the house easing — fast launch into a long, dramatic deceleration.
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const teamMembers = [
  {
    id: "akram",
    name: "Akram Wanisse MARREF",
    role: "Art Director",
    // No portrait shot yet — falls back to the placeholder frame.
    imageSrc: "/avatars/chaib.jpg"
  },
  {
    id: "amine",
    name: "Mohamed EL Amine CHAIB",
    role: "Project Manager",
    imageSrc: "/avatars/chaib.jpg"
  },
  {
    id: "saadeddine",
    name: "Saadeddine MOSTEFA",
    role: "Project Manager",
    imageSrc: "/avatars/saad.jpg"
  }
];

const Team = () => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 lg:py-32 lg:px-16">

        {/* Header Row */}
        <div className="flex flex-col lg:grid lg:grid-cols-6 gap-8 lg:gap-0">
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-xl lg:text-2xl tracking-tight uppercase">
            [Visual Thinkers]
          </p>
          <p className="lg:col-span-4 text-dzignex-white tracking-tighter text-3xl lg:text-4xl font-medium leading-tight">
            A collective of artists, strategists, and storytellers united by a vision to create striking meaningful work.
          </p>
        </div>

        {/* Roster */}
        <div className="mt-12 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: EASE_OUT_EXPO,
                delay: index * 0.08,
              }}
              className="group"
            >
              {/* `isolate` keeps the multiply blend below scoped to this frame
                  instead of reaching the page background. */}
              <div className="relative isolate aspect-square overflow-hidden bg-dzignex-white/80">
                {member.imageSrc && (
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                )}

                {/* Brand duotone at rest — blue multiplies into the portrait so
                    the white blows out and the blacks hold. Hover retracts the
                    curtain downward to reveal the photograph itself. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-dzignex-blue mix-blend-multiply origin-bottom scale-y-100 group-hover:scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:group-hover:scale-y-100"
                />
              </div>

              <h3 className="text-dzignex-white text-base lg:text-lg font-semibold tracking-[-0.015em] mt-5">
                {member.name}
              </h3>
              <p className="text-dzignex-blue text-xs lg:text-sm font-medium tracking-[0.02em] mt-1.5">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Team;
