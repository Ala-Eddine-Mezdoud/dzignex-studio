import ContactForm from '@/components/ContactForm'
import Faqs from '@/components/sections/Faqs'
import LandingContact from '@/components/sections/LandingContact'
import Launch from '@/components/sections/Launch'
import React from 'react'

const page = () => {
  return (
    <div className='relative min-h-screen overflow-hidden w-full max-w-7xl mx-auto px-4 container'>
      
      <LandingContact />
      <div className='h-[160px]'></div>
      <ContactForm />
      <div className='h-[160px]'></div>
      <Faqs />
      <div className='h-[160px]'></div>
      <Launch />
      <div className='h-[160px]'></div>

    </div>
  )
}

export default page