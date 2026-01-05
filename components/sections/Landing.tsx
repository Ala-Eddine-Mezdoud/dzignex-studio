import Orb from "../Orb";

const Landing = () => {
  return (
    <div className="flex items-center justify-center  text-white max-w-7xl mx-auto border-l border-r border-grey pt-[92px]">


      <div className="absolute inset-0">
        <div style={{ width: '100%', height: '600px', position: 'relative', marginTop: '50px', scale: 1.2 }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:gap-[48px] gap-[40px] text-center relative   w-full py-32">



        {/* Heading + Paragraph */}
        <div className="flex flex-col gap-[24px] max-w-7xl px-4  items-center">
          <h1
            className="text-4xl scale-100  sm:scale-100 sm:text-5xl lg:text-7xl font-medium sm:w-[90%] lg:w-full sm:leading-[80px] sm:tracking-[-4px] tracking-[-1.5px] "
          >
            We Don’t Just Design, We Build Brands That Scale Your Sales.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-grey-secondary max-w-2xl mx-auto sm:w-[40%] text-[15px]">
            Design that speaks, packaging that sells, and brands people remember.
          </p>
        </div>

        {/* CTA Button */}
        <button className="bg-[#f3f6ff] px-6 py-2 sm:py-3 mt-[12px] sm:px-4 text-lg   text-black font-semibold transition-colors duration-300 ease-in-out hover:bg-[#0c3eff] hover:text-[#F3F6FF] focus:outline-none focus:ring-2 focus:ring-[#0c3eff] focus:ring-offset-2">
          Book Free Consultation
        </button>
      </div>
    </div>
  )
}

export default Landing