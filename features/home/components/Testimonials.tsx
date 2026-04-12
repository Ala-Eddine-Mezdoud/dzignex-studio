import Image from "next/image";

const Testimonials = () => {

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-6 lg:py-32 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-6 gap-8 lg:gap-0">
          {/* Section Title */}
          <p className="lg:col-span-2 text-dzignex-blue font-bold text-xl lg:text-2xl tracking-tight uppercase">
            [TESTIMONIALS]
          </p>

          {/* Content */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-3xl lg:text-4xl font-medium leading-tight">
              Voices That Drive Us Forward
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-base lg:text-lg max-w-xl">Real experiences. Bold results. See how we’ve transformed brands through true partnership.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row mt-12 lg:mt-32">
          <div className="w-full lg:pr-8 py-8 lg:py-4 border-b-1 lg:border-b-0 lg:border-r-1 border-dzignex-white/30 ">

            <div className="flex justify-between mb-8 lg:mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-10 h-10 lg:w-12 lg:h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-xl lg:text-2xl font-medium tracking-tighter">Abdennour.A</h1>
                  <p className="text-dzignex-white/60 text-sm lg:text-base">Founder, Avure Skincare</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-8 h-8 lg:w-10 lg:h-10 relative"> 
                  <Image src={'/comment.svg'} fill alt="comment" />
                </div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-sm lg:text-lg">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
            </div>
          
          
          </div>
          <div className="w-full lg:pl-8 py-8 lg:py-4 ">

            <div className="flex justify-between mb-8 lg:mb-12">
              <div className="flex gap-4">
                <div className="rounded-full bg-dzignex-blue w-10 h-10 lg:w-12 lg:h-12"></div>
                <div>
                  <h1 className="text-dzignex-white text-xl lg:text-2xl font-medium tracking-tighter">Omar.B</h1>
                  <p className="text-dzignex-white/60 text-sm lg:text-base">Founder, TimePlus</p>
                </div>
              </div>
              <div>
                <div className="rounded-full bg-transparent w-8 h-8 lg:w-10 lg:h-10 relative"> 
                  <Image src={'/comment.svg'} fill alt="comment" />
                </div>
              </div>
            </div>
            
            
            <div>
                <p className="text-dzignex-white/90 tracking-[0.005em] font-medium text-sm lg:text-lg">Very satisfied with the experience with Dzignex Studio! Thank you for the fast service, attentive listening to our needs, and the professional quality of communication and execution. Excellent value for money that exceeded our expectations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials;