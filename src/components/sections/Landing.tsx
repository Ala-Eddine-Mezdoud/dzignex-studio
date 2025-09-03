import React from 'react'
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import Image from 'next/image';

const Landing = () => {
  return (
  <div className="flex items-center justify-center  text-white">
    <div className="flex flex-col items-center lg:gap-25 gap-15 text-center relative  mt-30 w-full">
      
      {/* Shimmer Button */}
      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/Icon.png" alt="Icon" width={35} height={35} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Proudly Serving 40+ Clients
        </span>
      </ShimmerButton>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-6 max-w-5xl px-4">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium">
          Simplifying brands and driving Success through strategic design
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
          We craft bold identities and digital experiences for brands ready to make their mark.
        </p>
      </div>

      {/* CTA Button */}
      <button className="bg-gray-100 text-black px-6 py-3 rounded-md text-base sm:text-lg font-semibold">
        Book Free Consultation
      </button>
    </div>
  </div>
  )
}

export default Landing