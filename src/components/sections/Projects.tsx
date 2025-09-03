import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'
import Image from 'next/image'

const Projects = () => {
  return (
    <div className="text-white flex justify-center flex-wrap gap-10 ">
      {/* Header */}
      <div className="flex justify-center items-center flex-wrap gap-10 text-center">
        <ShimmerButton className="shadow-2xl gap-2">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
            Projects
          </span>
        </ShimmerButton>
        <h1 className="text-white text-4xl font-bold w-full">
          Discover The Impact Behind Every Brand
        </h1>
      </div>

      {/* Project Card */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="grid lg:grid-cols-3 items-stretch p-2 gap-5 rounded-lg bg-white/10 w-full  "
        >
          {/* Image */}
          <div className="relative w-full h-64 sm:h-80 lg:h-auto lg:col-span-2 lg:order-2">
            <Image
              src="/Rectangle 3.png"
              fill
              alt="project one alt"
              className="object-cover rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="relative bg-white p-4 flex flex-col gap-32 justify-between items-start text-black rounded-lg lg:order-1">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-wrap gap-3">
                <Image
                  src="/claude.svg"
                  width={64}
                  height={64}
                  alt="project one alt"
                />
                <h1 className="text-3xl w-full mt-3">Project Name</h1>
                <p className="text-lg">
                  A cozy digital home for a neighborhood café, featuring seasonal
                  menus, event updates, and warm visual storytelling
                </p>
              </div>

              <div className="w-full flex flex-wrap gap-5">
                <div className="w-full flex justify-between text-lg pb-4 border-b border-gray-200">
                  <p>Client:</p>
                  <p>Client Name</p>
                </div>
                <div className="w-full flex justify-between text-lg">
                  <p>Service:</p>
                  <p>Service Name</p>
                </div>
              </div>
            </div>

            <button className="bg-black text-white px-6 py-3 rounded-md text-xl sm:text-lg w-full">
              View Details
            </button>
          </div>
        </div>
      ))}

      <button className='bg-white text-black p-2 pr-4 pl-4 rounded-lg font-medium mt-20'>
        All Projects
      </button>
    </div>
  )
}

export default Projects
