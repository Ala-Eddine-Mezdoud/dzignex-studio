import React from 'react'
import { ShimmerButtonLight } from '../magicui/shimmer-button-light'
import LightRays from '../LightGRays'
import Image from 'next/image'

const Services = () => {
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
          Services
        </span>
      </ShimmerButtonLight>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-6 max-w-5xl px-4 items-center ">
        <h1 className="text-2xl sm:text-4xl lg:text-4xl font-medium lg:w-[60%]">Expertly Crafted Solutions for Ambitious Brands</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
          Powerful visual storytelling crafted to overcome your challenges and accelerate your brand’s success.
        </p>
      </div>

    </div>
<div className="w-full">

  {/* Project Cards Wrapper */}
  <div className="grid gap-5 lg:grid-cols-3 ">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white/10 p-2 rounded-xl flex flex-col gap-5"
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
<div className='h-16'></div>

  </div>

    </div>
  )
}

export default Services
