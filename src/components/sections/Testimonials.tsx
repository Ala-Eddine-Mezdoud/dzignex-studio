import React from 'react'
import { ShimmerButtonLight } from '../magicui/shimmer-button-light'
import LightRays from '../LightGRays'
import Image from 'next/image'
import { MarqueeDemo } from '../MarqueeDemo'

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
    <div className="flex flex-col items-center lg:gap-5 gap-15 text-center relative mt-20 w-full">
      
      {/* Shimmer Button */}
      <ShimmerButtonLight className="shadow-2xl gap-2">
        <Image src="/Icon.png" alt="Icon" width={35} height={35} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Testimonials
        </span>
      </ShimmerButtonLight>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-6 max-w-5xl px-4 items-center ">
        <h1 className="text-2xl sm:text-4xl lg:text-4xl font-medium ">Voices That Drive Us Forward</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
          Real experiences. Bold results. See how we’ve transformed brands through true partnership.
        </p>
      </div>

    </div>
<div className="w-full">

<MarqueeDemo />

</div>
<div className='h-16'></div>

  </div>

    </div>
  )
}

export default Testimonials
