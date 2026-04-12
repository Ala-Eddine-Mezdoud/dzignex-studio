import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Landing = () => {

    return (
      <div className="border-b-2 border-dzignex-white/15">
        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 md:py-32 md:px-16">
          <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
            {/* Content */}
            <div className="flex flex-col gap-6 md:gap-8 items-center">
              <p className="text-dzignex-white tracking-tighter text-4xl md:text-7xl font-medium leading-[1] max-w-3xl">
              Showcasing Bold Brands

              & Brilliant Solutions
              </p>
              <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base md:text-lg max-w-xl text-center">Discover the stories behind our work and the impact we’ve driven for ambitious brands.</p>
            </div>
  
          <Link href={"/contact"} >
            <button className="bg-dzignex-white text-dzignex-black px-6 py-3 md:px-4 md:py-2 text-lg md:text-xl font-semibold tracking-tight uppercase mt-6 md:mt-8 w-full md:w-auto flex gap-1 items-end">Start your project <ArrowUpRight size={30} /> </button>
          </Link>
          </div>
  
  
        </div>
      </div>
    )
  }
  
  export default Landing;