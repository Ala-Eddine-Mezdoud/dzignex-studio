import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'
import Image from 'next/image'

const Projects = () => {
  return (
    <div className="text-white flex justify-center flex-wrap gap-[80px] ">
      {/* Header */}
      <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">
        <div className='w-full flex justify-center'>

          <ShimmerButton className="shadow-2xl gap-2">
            <Image src="/projects.svg" alt="Icon" width={36} height={36} />
            <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
              Projects
            </span>
          </ShimmerButton>
        </div>
        <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[50%]">
          Discover The Impact Behind Every Brand
        </h1>
      </div>

      <div className='flex flex-wrap gap-[32px]'>
        {/* Project Card */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="grid lg:grid-cols-3 items-stretch p-[20px] gap-[20px] rounded-[40px]  shadow-[0_5px_20px_0_#01011033] bg-[#0C3EFF]/10  backdrop-blur-2xl border border-white/10 w-full">
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-auto bg-blue-500 rounded-[20px] lg:col-span-2 lg:order-2">
            </div>

            {/* Info */}
            <div className="relative bg-white p-[20px] flex flex-col gap-32 justify-between items-start text-black rounded-[20px] lg:order-1">
              <div className="flex flex-col gap-[32px] w-full">
                <div className="flex flex-wrap gap-[24px]">
                  <Image
                    src="/claude.svg"
                    width={64}
                    height={64}
                    alt="project one alt"
                  />
                  <h1 className="text-[24px] tracking-[-1px] font-medium w-full ">Project Name</h1>
                  <p className="text-[18px] tracking-[-1px] leading-[24px] text-[#61616A] -mt-[16px]">
                    A cozy digital home for a neighborhood café, featuring seasonal
                    menus, event updates, and warm visual storytelling
                  </p>
                </div>

                <div className="w-full flex flex-wrap gap-5 text-[16px] tracking-[-1px] leading-[20px] text-[#61616A]">
                  <div className="w-full flex justify-between ">
                    <p>Service:</p>
                    <p className='text-[#010110]'>Service Name</p>
                  </div>
                </div>
              </div>

              <button className="bg-[#010110] px-6 py-2 sm:py-3 mt-[12px] sm:px-4 text-lg rounded-lg text-[#f3f6ff] font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2 w-full">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="bg-[#f3f6ff] px-6 py-2 sm:py-3  sm:px-4 text-lg rounded-lg text-[#010110] font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">

        View All Projects
      </button>
    </div>
  )
}

export default Projects
