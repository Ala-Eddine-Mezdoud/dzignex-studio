import Image from "next/image";

const Testimonials = () => {

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 md:py-32 md:px-16">
        <div className="flex flex-col md:grid md:grid-cols-6 gap-8 md:gap-0">
          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-xl md:text-2xl tracking-tight uppercase">
            [TESTIMONIALS]
          </p>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl md:text-4xl font-medium leading-tight">
              Voices That Drive Us Forward
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base md:text-lg max-w-xl">Real experiences. Bold results. See how we’ve transformed brands through true partnership.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-12 md:mt-32">
          <div className="w-full md:pr-8 py-8 md:py-4 border-b-1 md:border-b-0 md:border-r-1 border-dzignex-white/30 ">

            <div className="flex justify-between mb-8 md:mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-10 h-10 md:w-12 md:h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-xl md:text-2xl font-medium tracking-tighter">Abdennour.A</h1>
                  <p className="text-dzignex-white/60 text-sm md:text-base">Founder, Avure Skincare</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-8 h-8 md:w-10 md:h-10 relative"> 
                  <Image src={'/comment.svg'} fill alt="comment" />
                </div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-sm md:text-md">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
            </div>
          
          
          </div>
          <div className="w-full md:pl-8 py-8 md:py-4 ">

            <div className="flex justify-between mb-8 md:mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-10 h-10 md:w-12 md:h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-xl md:text-2xl font-medium tracking-tighter">Omar.B</h1>
                  <p className="text-dzignex-white/60 text-sm md:text-base">Founder, TimePlus</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-8 h-8 md:w-10 md:h-10 relative"> 
                  <Image src={'/comment.svg'} fill alt="comment" />
                </div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-sm md:text-md">Very satisfied with the experience with Dzignex Studio! Thank you for the fast service, attentive listening to our needs, and the professional quality of communication and execution. Excellent value for money that exceeded our expectations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials;