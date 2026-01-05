import Image from 'next/image'

const Projects = () => {
  return (
    <div className="text-white flex justify-center flex-wrap gap-[80px] ">

      <div className='mx-auto max-w-7xl border-l border-r border-grey pt-16'>

        {/* Header */}
        <div className="flex justify-center items-center flex-wrap gap-[40px] text-center mb-16">
          <div className='w-full flex flex-wrap justify-center'>
            <h1 className='text-sm text-blue font-bold uppercase'>Projects</h1>
          </div>
          <h1 className="text-white text-[35px] sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[50%]">
            Discover The Impact Behind Every Brand
          </h1>
        </div>

        <div className='flex flex-wrap gap-8'>
          {/* Project Card */}
          <div
            className="grid lg:grid-cols-3 items-stretch  w-full gap-5">
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-auto bg-white/40  lg:col-span-2 lg:order-2">
              <Image
                src="/projects/formura.webp"
                alt="project one alt"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="relative bg-slate-950 p-[20px] flex flex-col gap-32 justify-between items-start text-white  lg:order-1">
              <div className="flex flex-col gap-[32px] w-full">
                <div className="flex flex-wrap gap-[24px]">
                  <Image
                    src="/claude.svg"
                    width={64}
                    height={64}
                    alt="project one alt"
                  />
                  <h1 className="text-[24px] tracking-[-1px] font-medium w-full ">Project Name</h1>
                  <p className="text-[18px] tracking-[-1px] leading-[24px]  -mt-[16px]">
                    A cozy digital home for a neighborhood café, featuring seasonal
                    menus, event updates, and warm visual storytelling
                  </p>
                </div>

                <div className="w-full flex flex-wrap gap-5 text-[16px] tracking-[-1px] leading-[20px] ">
                  <div className="w-full flex justify-between ">
                    <p>Service:</p>
                    <p className=''>Service Name</p>
                  </div>
                </div>
              </div>

              <button className="bg-white px-6 py-2 sm:py-3 mt-[12px] sm:px-4 text-lg  text-[#010110] font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2 w-full">
                View Details
              </button>
            </div>
          </div>


          <div
            className="grid lg:grid-cols-3 items-stretch  w-full gap-5">
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 lg:h-auto bg-white/40  lg:col-span-2 lg:order-2">
              <Image
                src="/projects/chayame.webp"
                alt="project one alt"
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="relative bg-slate-950 p-[20px] flex flex-col gap-32 justify-between items-start text-white  lg:order-1">
              <div className="flex flex-col gap-[32px] w-full">
                <div className="flex flex-wrap gap-[24px]">
                  <Image
                    src="/claude.svg"
                    width={64}
                    height={64}
                    alt="project one alt"
                  />
                  <h1 className="text-[24px] tracking-[-1px] font-medium w-full ">Project Name</h1>
                  <p className="text-[18px] tracking-[-1px] leading-[24px]  -mt-[16px]">
                    A cozy digital home for a neighborhood café, featuring seasonal
                    menus, event updates, and warm visual storytelling
                  </p>
                </div>

                <div className="w-full flex flex-wrap gap-5 text-[16px] tracking-[-1px] leading-[20px] ">
                  <div className="w-full flex justify-between ">
                    <p>Service:</p>
                    <p className=''>Service Name</p>
                  </div>
                </div>
              </div>

              <button className="bg-white px-6 py-2 sm:py-3 mt-[12px] sm:px-4 text-lg  text-[#010110] font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2 w-full">
                View Details
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Projects
