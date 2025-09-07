import React from 'react'
import Image from 'next/image'
import DarkVeil from '../DarkVeil'
import { ShimmerButton } from '../magicui/shimmer-button'


const Services = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden border rounded-[40px] shadow-[0_5px_20px_0_#01011033] bg-black  backdrop-blur-2xl border border-white/10 pr-5 pl-5 '>
      
      {/* Background LightRays */}
      <div className='absolute inset-0 -z-10 h-160 '>
        <DarkVeil 
        speed={1.5}
        hueShift={10}
        />
      </div>

      {/* Foreground content */}
 <div className="flex  justify-center px-[32px] pb-[40px] text-white flex-wrap gap-20">
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">
        <div className='w-full flex justify-center mt-[128px]'>

      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/projects.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Projects
        </span>
      </ShimmerButton>
        </div>
        <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[50%]">
          Discover The Impact Behind Every Brand
        </h1>
      </div>
<div className="">

  {/* Project Cards Wrapper */}
  <div className="grid gap-[24px] lg:grid-cols-3 ">
    {[1, 2, 3,4,5,6].map((i) => (
      <div
        key={i}
        className=" p-2 rounded-[20px] flex flex-col gap-5 bg-[#05071C] border border-[#f3f6ff]/10"
      >
        {/* Info */}
        <div className="relative  p-4 flex flex-col gap-5 justify-between items-start text-white rounded-lg">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-wrap gap-3">
              <div className='h-12 w-12 rounded-full bg-white'></div>
              <h1 className="text-3xl w-full mt-3 border-b-1 pb-4 border-gray-700">Service Name</h1>
              <p className="text-lg">
               We build AI-driven websites that adapt to users and automation.
              </p>
            </div>

            <div className="w-full h-48 flex flex-wrap gap-5  relative">
                            <Image
                              src="/Rectangle 3.png"
                              fill
                              alt="project one alt"
                              className="object-cover rounded-lg"
                            />
            </div>
          </div>


        </div>
      </div>
    ))}
  </div>

</div>

  </div>

    </div>
  )
}

export default Services
