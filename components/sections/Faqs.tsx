import React from 'react'
import Image from 'next/image'
import { FaqsDemo } from '../FaqsDemo'
import { ShimmerButton } from '../magicui/shimmer-button'

const Faqs = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden  pr-5 pl-5'>
      
    <div className='absolute inset-0 w-screen left-1/2 -translate-x-1/2 '>

    </div>
      {/* Foreground content */}
 <div className="flex  justify-center  text-white flex-wrap gap-20">
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

        <div className='w-full flex flex-wrap justify-center mt-[128px] '>

      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/faqsIcon.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          FAQs
        </span>
      </ShimmerButton>
        </div>

        <div className='w-full flex justify-center'>
        <h1 className="text-white text-[35px] whitespace-pre-line sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[33%]">
          {"Frequently \nAsked Questions"}
        </h1>
        </div>

       <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[33%] w-full text-[15px] -mt-[20px]">
          Got questions? Find quick answers to the most common inquiries right here in our FAQ.
      </p>

      </div>

    <div className=''>
    <div className='w-94 md:w-200 lg:w-256 bg-[#f3f6ff]/5 backdrop-blur-md p-[20px] rounded-[40px]'>
      <FaqsDemo />
    </div>
    </div>
  </div>

    </div>
  )
}

export default Faqs
