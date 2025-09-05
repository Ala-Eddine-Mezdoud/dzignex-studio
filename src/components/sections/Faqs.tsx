import React from 'react'
import { ShimmerButtonLight } from '../magicui/shimmer-button-light'
import Image from 'next/image'
import { FaqsDemo } from '../FaqsDemo'

const Faqs = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden  pr-5 pl-5'>
      


      {/* Foreground content */}
 <div className="flex  justify-center  text-white flex-wrap gap-20">
    <div className="flex flex-col items-center lg:gap-5 gap-15 text-center relative mt-20 w-full">
      
      {/* Shimmer Button */}
      <ShimmerButtonLight className="shadow-2xl gap-2">
        <Image src="/Icon.png" alt="Icon" width={35} height={35} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          FAQ's
        </span>
      </ShimmerButtonLight>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-6 max-w-5xl px-4 items-center ">
        <h1 className="text-2xl sm:text-4xl lg:text-4xl font-medium lg:w-[55%]">Frequently Asked Questions </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
          Got questions? Find quick answers to the most common inquiries right here in our FAQ.
        </p>
      </div>
    </div>

    <div className='bg-black'>
    <div className='w-94 md:w-200 lg:w-256 bg-white/10 p-4 rounded-lg'>
      <FaqsDemo />
    </div>
    </div>
  </div>

    </div>
  )
}

export default Faqs
