import React from 'react'
import Image from 'next/image';
import LandingProjects from '../../components/sections/LandingProjects';
import Faqs from '../../components/sections/Faqs';
import Launch from '../../components/sections/Launch';
const page = () => {
  return (
    <div className='relative min-h-screen overflow-hidden w-full max-w-7xl mx-auto px-4'>


      <LandingProjects />
      <div className='h-[128px]'></div>
      <div className='flex flex-wrap gap-[32px]'>
        {/* Project Card */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
                  <div className="w-full flex justify-between  pb-4 border-b border-gray-200">
                    <p>Client:</p>
                    <p className='text-[#010110]'>Client Name</p>
                  </div>
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
      <div className='w-full flex justify-center mt-[80px]'>

        <button className="bg-[#f3f6ff] px-6 py-2 sm:py-3  sm:px-4 text-lg rounded-lg text-[#010110] font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
          View All Projects
        </button>
      </div>
      <div className="h-[160px]"></div>
      <Faqs />
      <div className="h-[160px]"></div>
      <Launch />
      <div className="h-[160px]"></div>
    </div>
  )
}

export default page