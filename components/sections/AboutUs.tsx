import React from 'react'
import Image from 'next/image'
import { ShimmerButtonAbout } from '../magicui/shimmer-button-about'

const AboutUs = () => {
  const stats = [
    { value: '5+', label: "Years of Experience" },
    { value: '100+', label: 'Completed Projects' },
    { value: '40+', label: 'Happy Customers' },
    { value: '95%', label: "Client's Satisfaction" },
  ]

  return (
    <div className='text-[#F3F6FF] w-full'>
      <div className='w-full flex justify-center sm:justify-start mb-[40px]'>
        <ShimmerButtonAbout className='shadow-2xl gap-2 rounded-sm h-[42px]' borderRadius = "10px">
        <span className='h-2 w-2 rounded-full bg-white'></span>
          <span className='whitespace-pre-wrap text-sm font-medium tracking-tight text-white sm:text-base lg:text-lg'>
            About Us
          </span>
        </ShimmerButtonAbout>
      </div>

      <div className='grid w-full lg:grid-cols-2 gap-8 items-start'>
        {/* Left: Heading + Stats */}
        <div className='flex flex-col gap-[64px]'>
          <div>
            <h2 className='sm:whitespace-pre-line text-[40px] sm:text-[40px] lg:text-[40px] tracking-[-2px] leading-[42px] text-[#f3f6ff]/90 font-medium'>
              {"Explore Who We Are and \nHow We Make a Difference"}
            </h2>
            <p className='mt-[24px] text-[14px] sm:text-[18px]  tracking-[-1px] leading-[22px] text-[#f3f6ff]/60 max-w-xl whitespace-pre-line'>
              {"Our agency stands for quality, trust, and lasting impact \ndelivering results that empower brands to grow and succeed."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-0 gap-y-10 sm:gap-y-8">
            {stats.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[44px] sm:text-[50px] font-semibold tracking-[-1px] text-[#0C3EFF]">
                  {item.value}
                </span>
                <span className="text-[12px] sm:text-[18px] tracking-[-1px] leading-[22px] text-[#f3f6ff]/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Story/Mission/Vision Cards */}
        <div className='flex flex-col gap-[24px]'>
          {[
            {
              title: 'Our Story',
              text:
                'Born from the friendship of three engineers who saw design as a way to blend logic and creativity, Dzignex Studio is a story of courage, collaboration, and transformation. From sketches and late–night debates to leading brands with impact, we shape every project with passion and purpose.',
            },
            {
              title: 'Our Mission',
              text:
                'To deliver strategic, innovative design solutions that empower brands to connect deeply, grow sustainably, and stand confidently in an evolving market.',
            },
            {
              title: 'Our Vision',
              text:
                'To be recognized globally as a creative agency that redefines branding through thoughtful design, meaningful partnerships, and unwavering commitment to excellence.',
            },
          ].map((card, idx) => (
            <div key={idx} className='p-[20px] rounded-[40px] border border-[#f3f6ff]/10 '              
             style={{
                background: 'linear-gradient(135deg,rgba(12, 61, 255, 0.05) 0%,rgba(12, 61, 255, 0.1) 100%)',
              }}>
            <div
              
              className='relative rounded-[20px] bg-[#0F0912] border border-white/10 p-6 sm:p-7 before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-6 before:rounded-t-[20px] before:pointer-events-none before:z-10 before:bg-gradient-to-b before:from-[#0C3EFF]/15 before:to-transparent'

            >
              <div className='flex items-start justify-between gap-4'>
                  <Image src='/Icon.svg' alt='icon' width={48} height={48} />
                <span className='px-3 py-1 h-[40px] w-[128px] flex justify-center items-center rounded-full border border-white/10 bg-white/5 text-[16px] font-medium text-white/80'>
                  {card.title}
                </span>
              </div>
              <p className='mt-5 text-[14px] sm:text-[18px] leading-[26px] tracking-[-1px] text-[#f3f6ff]/80'>
                {card.text}
              </p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs