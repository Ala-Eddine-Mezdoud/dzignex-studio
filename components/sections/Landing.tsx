import React from 'react'
import { ShimmerButton } from "../magicui/shimmer-button";
import Image from 'next/image';

const Landing = () => {
  return (
    <div className="flex items-center justify-center  text-white">
      <div className="flex flex-col items-center lg:gap-[48px] gap-[40px] text-center relative  mt-[92px] w-full">

        {/* Shimmer Button */}
        <ShimmerButton className="shadow-2xl gap-2">
          <Image src="/Icon.svg" alt="Icon" width={36} height={36} />
          <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
            Proudly Serving 40+ Clients
          </span>
        </ShimmerButton>

        {/* Heading + Paragraph */}
        <div className="flex flex-col gap-[24px] max-w-6xl px-4  items-center">
          <h1
            className="text-4xl scale-100  sm:scale-100 sm:text-5xl lg:text-7xl font-medium sm:w-[90%] lg:w-full sm:leading-[80px] sm:tracking-[-4px] tracking-[-1.5px] "
          >
            We Don’t Just Design, We Build Brands That Scale Your Sales.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto sm:w-[45%] text-[15px]">
            Design that speaks, packaging that sells, and brands people remember.
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

export default Landing