import { TextReveal } from '@/components/magicui/text-reveal'
import AboutText from '@/components/sections/AboutText'
import Faqs from '@/components/sections/Faqs'
import LandingAbout from '@/components/sections/LandingAbout'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import ValueAbout from '@/components/sections/ValueAbout'
import React from 'react'

const page = () => {
  return (
    <div className='relative min-h-screen overflow-hidden w-full max-w-7xl mx-auto px-4'>

        <LandingAbout />
        <div className='h-[160px]'></div>
        <AboutText />
        <div className='h-[160px]'></div>
        <ValueAbout />
        <div className='h-[160px]'></div>
        <Services />
        <div className='h-[160px]'></div>
        <Process />
        <div className='h-[160px]'></div>
        <Testimonials />
        <div className='h-[160px]'></div>
        <Faqs />
        <div className='h-[160px]'></div>
    </div>
  )
}

export default page