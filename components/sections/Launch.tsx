import { DottedMap } from "../magicui/dotted-map";

const markers = [

  {
    lat: 35.8566,
    lng: 0,
    size: 0.3,
  }, // Paris


]

const Launch = () => {
  return (
    <div className='relative w-full max-w-7xl mx-auto  flex justify-center  overflow-hidden border-l border-r  border-grey px-5'>


      <div className="w-full flex justify-between relative  overflow-hidden py-32">

        {/* Foreground content */}
        <div className="w-full text-white flex-wrap gap-[40px] ">
          <div className="flex items-center flex-wrap gap-[40px] ">

            <div className='w-full flex flex-wrap'>
              <h1 className='text-md text-blue font-bold uppercase'>Launch your brand</h1>
            </div>

            <div className='w-full flex '>
              <h1 className="text-white text-[35px] sm:text-5xl tracking-[-3px] leading-[62px] font-medium ">
                Defining the Future of Your Brand Today
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-[18px] text-[#f3f6ff]/60 text-[15px] -mt-[22px]">
              Unlock the full potential of your brand with tailored solutions and expert support.
            </p>

          </div>

          <button className="bg-[#0c3eff] px-6 py-2 sm:py-3 mt-5 sm:px-8 text-lg  text-[#f3f6ff] border-3 border-[#f3f6ff]/15 font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0632cd] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
            Book Free Consultation
          </button>
        </div>

        <div className="absolute top-0 right-0 z-[-1] w-[70%] opacity-50">
          <DottedMap markers={markers} />
        </div>
      </div>

    </div>
  )
}

export default Launch
