import React from 'react'
import Image from 'next/image'
import { ShimmerButton } from '../magicui/shimmer-button'

const About = ()  => {
  return (
<div className="text-[#F3F6FF] flex flex-col gap-[64px]">
  {/* About Button */}
  <div className="w-full flex justify-center">
      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/about.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          About Us
        </span>
      </ShimmerButton>
  </div>

  {/* Main Grid */}
  <div className="grid w-full lg:grid-cols-3 gap-6">
    {/* Left Column */}
    <div className="bg-[#0C3EFF]/10 flex flex-col gap-40 py-6 px-6  rounded-xl border-1 border-[#F3F6FF]/10">

    <div className='flex flex-wrap gap-5 tracking-[-1px] '>

      <h1 className="text-[24px] font-bold ">{"["}DEZIGNEX STUDIO{"]"}</h1>
      <p className='text-[18px] text-justify'>
        At Dzignex, every project starts with a question “How can we make this unforgettable?” From branding that tells your story, to packaging that makes people stop, look, and buy we don’t just make things pretty. We make them work.
      </p>
    </div>
    
      <button className="bg-[#F3F6FF] px-6 py-2 sm:py-3 mt-[40px] tracking-[-1px] sm:px-4 text-lg rounded-lg text-black font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
        Explore More
      </button>
    </div>

    {/* Right Column */}
    <div className="lg:col-span-2 grid lg:grid-cols-2 gap-4">
      {[
        { value: "5+", label: "Years", desc: "Expertise and experience across diverse industries. Designs made to get noticed." },
        { value: "100+", label: "Projects", desc: "From cosmetics, pharma to SaaS, B2B, and event branding Fresh ideas real business impact." },
        { value: "40+", label: "Happy Clients", desc: "Partners who trust our work. Results they keep coming back for." },
        { value: "95%", label: "Satisfaction", desc: "Delivering beyond expectations. Clients remember, brands grow." },
      ].map((item, idx) => (
        <div key={idx} className="bg-[#0C3EFF]/10 flex flex-col gap-2 py-4 px-6 rounded-lg border-1 border-[#F3F6FF]/10">
          <div className="flex justify-between relative">
            <h1 className="text-[60px] font-medium tracking-[-2.4px] text-[#0c3eff]">{item.value}</h1>
            <p className="absolute bottom-0 right-0 text-[18px] pb-2">{item.label}</p>
          </div>
          <p className="border-t border-white pt-7 text-[16px] text-[#F3F6FF]/60">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default About