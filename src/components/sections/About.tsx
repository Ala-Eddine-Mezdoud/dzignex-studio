import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'

const About = ()  => {
  return (
    <div className='text-white flex justify-center h-screen bg-yellow-500'>

        <div>
                <ShimmerButton className="shadow-2xl gap-2">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                    About Us
                  </span>
                </ShimmerButton>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default About