

const NextStep = () => {

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-32 px-16">
        <div className="flex flex-col gap-8 items-center text-center">
          {/* Section Title */}
          <p className="text-dzignex-blue font-bold text-2xl tracking-tight uppercase">
            [NEXT STEP]
          </p>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <p className="text-dzignex-white tracking-tighter text-4xl font-medium">
              Let’s Build the Brand You Imagine
            </p>
            <p className="text-dzignex-white/80 tracking-[0.005em] font-medium text-lg max-w-xl">Your brand deserves more than just a logo, it needs a story, a look, and a strategy. We’ll guide you every step of the way.</p>
          </div>

          <button className="bg-dzignex-white text-dzignex-black px-4 py-2 text-xl font-semibold tracking-tight uppercase mt-8">Book Free Consultation</button>
        </div>


      </div>
    </div>
  )
}

export default NextStep;