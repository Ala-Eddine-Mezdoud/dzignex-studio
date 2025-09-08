import React from 'react'
import Image from 'next/image'
import { ShimmerButton } from '../magicui/shimmer-button'

const Process = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden  rounded-xl  pr-5 pl-5'>
      

      {/* Foreground content */}
 <div className="flex  justify-center  text-white flex-wrap gap-20">
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

        <div className='w-full flex flex-wrap justify-center mt-[128px]'>

      <ShimmerButton className="shadow-2xl gap-2">
        <Image src="/processIcon.svg" alt="Icon" width={36} height={36} />
        <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
          Process
        </span>
      </ShimmerButton>
        </div>

        <div className='w-full flex justify-center'>
        <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[35%]">
          We Drive the Process, You Focus On Business
        </h1>
        </div>

       <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[40%] text-[15px] -mt-[20px]">
          Every project follows a proven path from discovery to delivery ensuring your vision becomes an unforgettable reality.
      </p>

      </div>
<div className="w-full">

  {/* Project Cards Wrapper */}
  <div className="grid gap-5 lg:grid-cols-4 shadow-[0_5px_20px_0_#01011033] bg-black  backdrop-blur-2xl border border-[#f3f6ff]/15   p-[20px] rounded-[40px]">
    {[
      {
        title: "Book a Call",
        description: "Initiate a transformative strategic consultation to align on your brand goals and project scope.",
        img:'/bookacallIcon.svg'
      },
      {
        title: "Research & Discovery",
        description: "Conduct comprehensive market and audience analysis to inform a targeted design strategy.",
        img:'/searchIcon.svg'
      },
      {
        title: "Design & Build",
        description: "Develop refined, tailored design solutions that effectively communicate your brand’s value.",
        img:'/designIcon.svg'
      },
      {
        title: "Launch & Deliver",
        description: "Execute a seamless launch, delivering all assets with ongoing support to ensure sustained success.",
        img:'/launchServiceIcon.svg'
      },
    ].map((step, i) => (
      <div
        key={i}
        className="bg-black border border-[#f3f6ff]/15 p-2 rounded-[20px] flex flex-wrap justify-center gap-5 p-4 "
      >
        <div className='w-full flex justify-center'>
        <div className='h-[64px] w-[64px] bg-white rounded-full flex justify-center items-center'>
          <Image
              src={step.img}
              height={32}
              width={32} alt={''}          />
        </div>
        </div>
        <h1 className='font-medium text-[23px] tracking-[-1x]'>{step.title}</h1>
        <p className='text-[#f3f6ff]/60 text-center text-[15px] tracking-[-1px]'>{step.description}</p>
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
