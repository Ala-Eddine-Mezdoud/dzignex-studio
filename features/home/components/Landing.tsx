const Landing = () => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">

        {/* Service Tags */}
        <div className="flex justify-center max-w-5xl mx-auto">
          <ul className="flex flex-wrap justify-center md:justify-between w-full uppercase font-semibold gap-2 md:gap-0 text-xs sm:text-sm lg:text-base">
            <li>[Branding & Visual Identity]</li>
            <li>[Packaging Design]</li>
            <li>[Websites & Apps]</li>
            <li>[Motion Design]</li>
          </ul>
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto text-center mt-6 md:mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-bold tracking-tighter">
            Building memorable brands
            & digital experiences that
            <br className="hidden sm:block" />
            <span className="text-dzignex-blue"> [grow businesses]</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg lg:text-xl font-medium text-dzignex-white/80 mx-auto mt-6 md:mt-8">
            A strategic studio crafting brand systems and digital design that elevate perception and support long-term growth.
          </p>

          <button className="bg-dzignex-white text-dzignex-black px-4 py-2 text-base lg:text-xl font-semibold tracking-tight uppercase mt-8 md:mt-12">
            Book Free Consultation
          </button>
        </div>

      </div>
    </div>
  );
};

export default Landing;