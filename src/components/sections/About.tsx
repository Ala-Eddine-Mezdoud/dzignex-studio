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

<div className="grid w-full bg-gray-500 grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 gap-2">
  <div className="bg-sky-500 flex items-center justify-center lg:h-auto">
    <h1>{"["}Dezignex Studio{"]"}</h1>
  </div>

  <div className="bg-violet-500 flex flex-col items-center justify-center lg:col-span-2">
    <div className="grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 gap-1 w-full h-full gap-2">
      <div className="bg-red-500 flex items-center justify-center ">Years</div>
      <div className="bg-yellow-500 flex items-center justify-center ">Projects</div>
      <div className="bg-blue-500 flex items-center justify-center ">Happy Clients</div>
      <div className="bg-green-500 flex items-center justify-center ">Satisfaction</div>
    </div>
  </div>
</div>

    </div>
  )
}

export default About