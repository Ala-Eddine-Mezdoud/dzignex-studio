import { MarqueeDemo } from '../MarqueeDemo'

const Testimonials = () => {
  return (
    <div className='relative w-full max-w-7xl mx-auto flex justify-center  overflow-hidden   pr-5 pl-5 border-l border-r border-grey '>



      {/* Foreground content */}
      <div className="flex  justify-center  text-white flex-wrap gap-20">
        <div className="flex justify-center items-center flex-wrap gap-[40px] text-center">

          <div className='w-full flex flex-wrap justify-center mt-16 '>
            <h1 className='text-sm text-blue font-bold uppercase'>Testimonials</h1>
          </div>

          <div className='w-full flex justify-center'>
            <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium sm:w-full w-[30%] ">
              Voices That Drive Us Forward
            </h1>
          </div>

          <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[33%] w-[30%] text-[15px] -mt-[20px]">
            Real experiences. Bold results. See how we've transformed brands through true partnership.
          </p>

        </div>

        <div className="w-full relative ">
          <MarqueeDemo />
        </div>


        {/* Left overlay - smooth fade */}
        <div className="absolute inset-y-0 left-0 w-48 
  bg-gradient-to-r from-black/80 via-black/10 to-transparent
  pointer-events-none" />
        {/* Right overlay - smooth fade */}
        <div className="absolute inset-y-0 right-0 w-48 
  bg-gradient-to-l from-black/80 via-black/10 to-transparent
  pointer-events-none" />

      </div>



    </div>
  )
}

export default Testimonials