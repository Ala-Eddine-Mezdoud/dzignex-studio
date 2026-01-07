import Header from "../../components/Header"

const Launch = () => {
  return (
    <div className='relative w-full max-w-7xl mx-auto  flex justify-center  overflow-hidden border-l border-r  border-grey px-5'>


      <div className="py-32">

        {/* Foreground content */}
        <div className="w-full text-white ">

          <Header
            microTitle="Launch your brand"
            title="Defining the Future of Your Brand Today"
            description="Unlock the full potential of your brand with tailored solutions and expert support."
          />

          <div className="flex justify-center">

            <button className="bg-[#0c3eff] px-6 py-2 sm:py-3 mt-5 sm:px-8 text-lg  text-[#f3f6ff] border-3 border-[#f3f6ff]/15 font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0632cd] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2 w-fit">
              Book Free Consultation
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Launch
