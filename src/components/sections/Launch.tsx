import React from 'react'
import LightRays from '../LightGRays'
import Image from 'next/image'
import { ShimmerButton } from '../magicui/shimmer-button'

const Launch = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden border rounded-[40px] border-gray-700 pr-5 pl-5'>
      
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
 <div className="flex  justify-center  text-white flex-wrap gap-[40px]">
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

        <div className='w-full flex flex-wrap justify-center mt-[80px] '>

      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/launchIcon.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Launch you brand
        </span>
      </ShimmerButton>
        </div>

        <div className='w-full flex justify-center'>
        <h1 className="text-white text-[35px] sm:text-[60px] tracking-[-3px] leading-[62px] font-medium  sm:w-[50%]">
          Defining the Future of Your Brand Today
        </h1>
        </div>

       <p className="text-base sm:text-lg lg:text-[18px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[33%]  text-[15px] -mt-[22px]">
          Unlock the full potential of your brand with tailored solutions and expert support.
      </p>

      </div>

    <button className="bg-[#0c3eff] px-6 py-2 sm:py-3 mt-[12px] mb-[80px] sm:px-8 text-lg rounded-lg text-[#f3f6ff] border-3 border-[#f3f6ff]/15 font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0632cd] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
        Book Free Consultation
      </button>
  </div>

    </div>
  )
}

export default Launch
