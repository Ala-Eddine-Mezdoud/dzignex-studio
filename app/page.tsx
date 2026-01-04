import About from "../components/sections/About";
import Landing from "../components/sections/Landing";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import Testimonials from "../components/sections/Testimonials";
import Faqs from "../components/sections/Faqs";
import Launch from "../components/sections/Launch";
import Orb from "../components/Orb";

export default function Home() {
  return (
    <div className="relative overflow-hidden w-full max-w-7xl mx-auto px-4 ">
      {/* Background */}
      <div className="absolute inset-0 ">
        <div style={{ width: '100%', height: '600px', position: 'relative', marginTop: '50px', scale: 1.2}}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>
      </div>

      {/* Foreground */}
      <div className="h-screen">
        <Landing />
      </div>
      <About />
      <div className="h-[160px]"></div>
      <Projects />
      <div className="h-[160px]"></div>
      <Services />
      <div className="h-[160px]"></div>
      <Process />
      <div className="h-[160px]"></div>
      <Testimonials />
      <div className="h-[160px]"></div>
      <Faqs />
      <div className="h-[160px]"></div>
      <Launch />
      <div className="h-[160px]"></div>
    </div>


  );
}
