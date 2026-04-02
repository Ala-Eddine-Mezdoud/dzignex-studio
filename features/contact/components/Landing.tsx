const Landing = () => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 px-5 py-16 sm:px-8 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 text-center md:gap-8">
          <p className="text-dzignex-blue font-bold text-base md:text-xl tracking-tight uppercase">
            [Contact]
          </p>
          <h1 className="text-4xl font-medium tracking-tighter text-dzignex-white sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s build something
            <br className="hidden sm:block" />
            <span className="text-dzignex-blue"> [remarkable]</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-dzignex-white/80 md:text-lg">
            Share your vision, constraints, and timeline. We reply fast — usually
            within 24 hours — with next steps or a short call to align.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
