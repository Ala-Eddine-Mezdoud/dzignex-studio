const Stats = () => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-x-2 border-dzignex-white/15 py-12 px-4 sm:px-6 lg:py-16 lg:px-10">
        
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between w-full">
          
          {/* Item */}
          <div className="flex-1 py-8 sm:py-10 lg:py-0 lg:pr-10 border-b sm:border-b-0 lg:border-r border-dzignex-white/15">
            <p className="text-4xl sm:text-5xl lg:text-7xl tracking-tight">
              5<span className="text-dzignex-blue">+</span>
            </p>
            <p className="font-medium text-base sm:text-lg lg:text-xl mt-4 lg:mt-8 max-w-xs tracking-tighter">
              Years of experience in creative industry
            </p>
          </div>

          <div className="flex-1 py-8 sm:py-10 lg:py-0 lg:px-10 border-b sm:border-b-0 lg:border-r border-dzignex-white/15">
            <p className="text-4xl sm:text-5xl lg:text-7xl tracking-tight">
              100<span className="text-dzignex-blue">+</span>
            </p>
            <p className="font-medium text-base sm:text-lg lg:text-xl mt-4 lg:mt-8 max-w-xs tracking-tighter">
              Successful projects completed
            </p>
          </div>

          <div className="flex-1 py-8 sm:py-10 lg:py-0 lg:px-10 border-b sm:border-b-0 lg:border-r border-dzignex-white/15">
            <p className="text-4xl sm:text-5xl lg:text-7xl tracking-tight">
              50<span className="text-dzignex-blue">+</span>
            </p>
            <p className="font-medium text-base sm:text-lg lg:text-xl mt-4 lg:mt-8 max-w-xs tracking-tighter">
              Happy clients
            </p>
          </div>

          <div className="flex-1 py-8 sm:py-10 lg:py-0 lg:pl-10">
            <p className="text-4xl sm:text-5xl lg:text-7xl tracking-tight">
              97<span className="text-dzignex-blue">%</span>
            </p>
            <p className="font-medium text-base sm:text-lg lg:text-xl mt-4 lg:mt-8 tracking-tighter">
              Customer <br className="hidden sm:block" /> Satisfaction rate
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Stats;