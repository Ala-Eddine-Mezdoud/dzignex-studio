type LandingProps = {
  className?: string
}

const Landing = ({ className = "" }: LandingProps) => {
  return (
    <div>
      <div className={`container mx-auto border-l-2 border-r-2  border-dzignex-white/15 ${className}`}>
            <div className="text-center flex flex-col justify-center items-center">
              <h1 className="font-medium text-7xl tracking-tight whitespace-pre-line">{'We Don’t Just Design, We Build \nBrands That Scale Your Sales'}</h1>
              <p className="text-2xl text-dzignex-white/80 tracking-tighter mt-5">Design that speaks, packaging that sells, and brands people remember.</p>
              <div className="font-semibold text-dzignex-black bg-dzignex-white w-fit uppercase px-4 py-2 mt-13 text-xl tracking-tight">Book Free Consultation</div>
            </div>
      </div>
    </div>
  )
}

export default Landing