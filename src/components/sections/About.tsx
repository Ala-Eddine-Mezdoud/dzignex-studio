import React from 'react'
import { ShimmerButton } from '../magicui/shimmer-button'

const About = ()  => {
  return (
<div className="text-white flex flex-col gap-6">
  {/* About Button */}
  <div className="w-full flex justify-center">
    <ShimmerButton className="shadow-2xl gap-2">
      <span className="text-sm font-medium lg:text-lg text-white text-center">
        About Us
      </span>
    </ShimmerButton>
  </div>

  {/* Main Grid */}
  <div className="grid w-full lg:grid-cols-3 gap-6">
    {/* Left Column */}
    <div className="bg-[#F3F6FF]/10 flex flex-col gap-40 p-6 rounded-xl">
    <div className='flex flex-wrap gap-5'>

      <h1 className="text-2xl font-bold">{"["}DEZIGNEX STUDIO{"]"}</h1>
      <p>
        We are a strategic creative agency that turns bold visions into landmark brands. 
        We build identities and experiences that don’t just follow trends, they set them. 
        Because good enough isn’t in our vocabulary.
      </p>
    </div>
      <button className="bg-gray-100 text-black px-6 py-3 rounded-md text-base sm:text-lg w-full">
        Book Free Consultation
      </button>
    </div>

    {/* Right Column */}
    <div className="lg:col-span-2 grid lg:grid-cols-2 gap-4">
      {[
        { value: "5+", label: "Years", desc: "Crafting bold brand identities and digital experiences that deliver real impact across diverse industries." },
        { value: "100+", label: "Projects", desc: "From startups to established leaders, we’ve brought visionary ideas to life through strategic creativity." },
        { value: "40+", label: "Happy Clients", desc: "Trusted partners who value our commitment to pushing boundaries and achieving extraordinary results." },
        { value: "95%", label: "Satisfaction", desc: "Delivering work that not only meets but exceeds expectations making every brand unforgettable." },
      ].map((item, idx) => (
        <div key={idx} className="bg-[#F3F6FF]/10 flex flex-col gap-2 p-4 rounded-lg">
          <div className="flex justify-between relative">
            <h1 className="text-7xl text-blue-500">{item.value}</h1>
            <p className="absolute bottom-0 right-0 text-xl">{item.label}</p>
          </div>
          <p className="border-t border-white pt-3 text-lg">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default About