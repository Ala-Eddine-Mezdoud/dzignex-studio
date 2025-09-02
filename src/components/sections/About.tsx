import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'

const About = ()  => {
  return (
    <div className='text-white flex justify-center bg-yellow-500 flex-wrap'>

      <div className='w-full flex justify-center items-center  h-10'>
          <ShimmerButton className="shadow-2xl gap-2">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
            About Us
            </span>
          </ShimmerButton>
      </div>

      <div className="grid w-full h-full bg-gray-500 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-5">
        <div className="bg-sky-500 flex items-center justify-center">
          <h1>{"["}Dezignex Studio{"]"}</h1>
        </div>

        <div className="bg-violet-500 flex flex-col items-center justify-center lg:col-span-2 w-full h-full">
          <div className="grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-4 w-full h-full">
            <div className="bg-red-500 flex items-center justify-center aspect-square w-full h-full">Years</div>
            <div className="bg-yellow-500 flex items-center justify-center aspect-square w-full h-full">Projects</div>
            <div className="bg-blue-500 flex items-center justify-center aspect-square w-full h-full">Happy Clients</div>
            <div className="bg-green-500 flex items-center justify-center aspect-square w-full h-full">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About