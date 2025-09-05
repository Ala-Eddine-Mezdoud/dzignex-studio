import React from 'react'
import { ShimmerButtonLight } from '../magicui/shimmer-button-light'
import Image from 'next/image'

const Process = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden  rounded-xl  pr-5 pl-5'>
      

      {/* Foreground content */}
 <div className="flex  justify-center  text-white flex-wrap gap-20">
    <div className="flex flex-col items-center lg:gap-5 gap-15 text-center relative mt-20 w-full">
      
      {/* Shimmer Button */}
      <ShimmerButtonLight className="shadow-2xl gap-2">
        <Image src="/Icon.png" alt="Icon" width={35} height={35} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Process
        </span>
      </ShimmerButtonLight>

      {/* Heading + Paragraph */}
      <div className="flex flex-col gap-6 max-w-5xl px-4 items-center ">
        <h1 className="text-2xl sm:text-4xl lg:text-4xl font-medium lg:w-[55%]">We Drive the Process, You Focus On Business</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
          Every project follows a proven path from discovery to delivery ensuring your vision becomes an unforgettable reality.
        </p>
      </div>

    </div>
<div className="w-full">

  {/* Project Cards Wrapper */}
  <div className="grid gap-5 lg:grid-cols-4 bg-white/10 rounded-lg p-2">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-white/10 p-2 rounded-xl flex flex-wrap justify-center gap-5 p-4 "
      >
        <div className='h-12 w-12 bg-white rounded-full'></div>
        <h1 className='font-medium text-xl'>Research & Discovery</h1>
        <p className='text-gray-500 text-center'>Conduct comprehensive market and audience analysis to inform a targeted design strategy.</p>
      </div>
    ))}
  </div>

</div>
<div className='h-16'></div>

  </div>

    </div>
  )
}

export default Process
