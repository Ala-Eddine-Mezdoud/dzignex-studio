"use client";

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NextStep = () => {
  const pathname = usePathname();

  if (pathname === '/contact') return null;

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 md:py-32 md:px-16">
        <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
          {/* Section Title */}
          <p className="text-dzignex-blue font-bold text-xl md:text-2xl tracking-tight uppercase">
            [NEXT STEP]
          </p>

          {/* Content */}
          <div className="flex flex-col gap-6 md:gap-8 items-center">
            <p className="text-dzignex-white max-w-3xl tracking-tighter text-3xl md:text-4xl font-medium leading-tight">
              Now you know how and what we do Imagine what we can build together
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base md:text-lg max-w-xl">Your brand deserves more than just a logo, it needs a story, a look, and a strategy. We’ll guide you every step of the way.</p>
          </div>

          <Link href={"/contact"} >
          <button className="bg-dzignex-white text-dzignex-black px-6 py-3 md:px-4 md:py-2 text-lg md:text-xl font-semibold tracking-tight uppercase mt-6 md:mt-8 w-full md:w-auto flex gap-1 items-end group">Book Free Consultation <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]" size={30} /> </button>
          </Link>
        </div>


      </div>
    </div>
  )
}

export default NextStep;