import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'

const Services = () => {
  return (
    <div className=' bg-white h-screen flex justify-center'>

              <div>
                      <ShimmerButton className="shadow-2xl gap-2">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                          Services
                        </span>
                      </ShimmerButton>
              </div>
    </div>
  )
}

export default Services