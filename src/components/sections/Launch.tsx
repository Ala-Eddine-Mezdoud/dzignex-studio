import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'

const Launch = () => {
  return (
    <div className='text-white h-screen bg-red-500 flex justify-center'>


              <div>
                      <ShimmerButton className="shadow-2xl gap-2">
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                          Launch Your Brand
                        </span>
                      </ShimmerButton>
              </div>
    </div>
  )
}

export default Launch