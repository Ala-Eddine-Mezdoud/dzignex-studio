import React from 'react'
import { ShimmerButtonLight } from '../magicui/shimmer-button-light'
import LightRays from '../LightGRays'
import Image from 'next/image'
import { MarqueeDemo } from '../MarqueeDemo'
import { MarqueeLogo } from '../MarqueeLogo'
import { ShimmerButton } from '../magicui/shimmer-button'

const Testimonials = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden border rounded-xl border-gray-700 pr-5 pl-5'>
      
      {/* Background LightRays */}
      <div className='absolute inset-0 -z-10'>
        <LightRays
          raysOrigin="top-center"
          raysColor="#110eff"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full"
          fadeDistance={2}
        />
      </div>

      {/* Foreground content */}
 <div className="flex  justify-center  text-white flex-wrap gap-20">
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

        <div className='w-full flex flex-wrap justify-center mt-[128px] '>

      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/projects.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Projects
        </span>
      </ShimmerButton>
        </div>

        <div className='w-full flex justify-center'>
        <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  w-[33%]">
          Voices That Drive Us Forward
        </h1>
        </div>

       <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[33%] w-[30%] text-[15px] -mt-[20px]">
          Real experiences. Bold results. See how we’ve transformed brands through true partnership.
      </p>

      </div>
<div className="w-full">

<MarqueeDemo />
<div className='h-12'></div>
<MarqueeLogo />

</div>
<div className='h-16'></div>

  </div>

    </div>
  )
}

export default Testimonials
