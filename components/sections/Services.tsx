import React from 'react'
import Image from 'next/image'
import DarkVeil from '../DarkVeil'
import { ShimmerButton } from '../magicui/shimmer-button'


const Services = () => {
  return (
    <div className='relative w-full flex justify-center  overflow-hidden   bg-black  backdrop-blur-2xl  border-t border-b border-white/40 pr-5 pl-5 '>

      <div className='mx-auto max-w-7xl border-l border-r border-white/40 py-32'>


        {/* Foreground content */}
        <div className="flex  justify-center sm:px-[32px] px-[5px] text-white flex-wrap gap-20">
          <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

            <div className='w-full flex flex-wrap justify-center '>

              <ShimmerButton className="shadow-2xl gap-2">
                <Image src="/servicesIcon.svg" alt="Icon" width={36} height={36} />
                <span className="whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg">
                  Services
                </span>
              </ShimmerButton>
            </div>

            <div className='w-full flex justify-center'>
              <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[40%]">
                Expertly Crafted Solutions for Ambitious Brands
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[40%] text-[15px] -mt-[20px]">
              Powerful visual storytelling crafted to overcome your challenges and accelerate your brand’s success.
            </p>

          </div>
          <div className="">

            {/* Project Cards Wrapper */}
            <div className="grid gap-[24px] lg:grid-cols-3 ">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className=" p-2 rounded-[20px] flex flex-col gap-5 bg-[#05071C] border border-[#f3f6ff]/10"
                >
                  {/* Info */}
                  <div className="relative  p-4 flex flex-col gap-5 justify-between items-start text-white rounded-lg">
                    <div className="flex flex-col gap-[28px] w-full">
                      <div className="flex flex-wrap gap-[40px]">
                        <div className='h-[52px] w-[52px] rounded-full bg-white'></div> {/* circle */}
                        <h1 className="text-[24px] font-medium leading-[24px] tracking-[-1px] w-full  border-b-1 pb-[24px] border-gray-700">Service Name</h1>
                        <p className="text-[16px] text-[#F3F6FF]/60 leading-[22px] tracking-[-1px] -mt-[20px]">
                          We build AI-driven websites that adapt to users and automation.
                        </p>
                      </div>

                      <div className="w-full h-48 flex flex-wrap gap-5 bg-blue-500 rounded-[12px] relative">

                      </div>
                    </div>


                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Services
