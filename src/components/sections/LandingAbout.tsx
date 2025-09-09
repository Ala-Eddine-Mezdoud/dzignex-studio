import React from 'react'
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from 'next/image';
import LightRays from '../LightGRays';

const LandingAbout = () => {
  return (
  <div className="flex items-center justify-center  text-white">

<div className="fixed mt-[88px] inset-0 -z-10 w-screen h-screen ">
    <LightRays
        raysOrigin="top-center"
        raysColor="#0c3eff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
         />
  </div>
    <div className="flex flex-col items-center lg:gap-[48px] gap-[40px] text-center relative  mt-[92px] w-full">
      
      {/* Shimmer Button */}
      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/about.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Discover Our Story
        </span>
      </ShimmerButton>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-[24px] max-w-6xl px-4  items-center">
        <h1
          className="text-4xl scale-100 whitespace-pre-line sm:scale-100 sm:text-5xl lg:text-7xl font-medium sm:w-[90%] lg:w-full sm:leading-[80px] sm:tracking-[-4px] tracking-[-1.5px] "
        >
          {"Meet the Minds Behind the Magic"}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto whitespace-pre-line text-[15px]">
          {"Committed to excellence, innovation, and growth for every \nbrand we serve."}
        </p>
      </div>

      {/* CTA Button */}
      <button className="bg-[#F3F6FF] px-6 py-2 sm:py-3 mt-[12px] sm:px-4 text-lg rounded-lg text-black font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
        Book Free Consultation
      </button>
    </div>
  </div>
  )
}

export default LandingAbout