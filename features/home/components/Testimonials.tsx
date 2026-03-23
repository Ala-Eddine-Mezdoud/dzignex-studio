

const Testimonials = () => {

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-32 px-16">
        <div className="grid grid-cols-6">
          {/* Section Title */}
          <p className="col-span-2 text-dzignex-blue font-bold text-2xl tracking-tight uppercase">
            [TESTIMONIALS]
          </p>

          {/* Content */}
          <div className="col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-4xl font-medium">
              Voices That Drive Us Forward
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-lg max-w-xl">Real experiences. Bold results. See how we’ve transformed brands through true partnership.</p>
          </div>
        </div>

        <div className="flex mt-32">
          <div className="w-full pr-8 py-4 border-r-1 border-dzignex-white/30 ">

            <div className="flex justify-between mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-12 h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-2xl font-medium tracking-tighter">Abdennour.A</h1>
                  <p className="text-dzignex-white/60">Founder, Avure Skincare</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-10 h-10"></div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-md">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
            </div>
          
          
          </div>
          <div className="w-full pl-8 py-4 ">

            <div className="flex justify-between mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-12 h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-2xl font-medium tracking-tighter">Abdennour.A</h1>
                  <p className="text-dzignex-white/60">Founder, Avure Skincare</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-10 h-10"></div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-md">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}

export default Testimonials;