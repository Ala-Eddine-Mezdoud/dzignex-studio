import About from "@/components/sections/About";
import Landing from "@/components/sections/Landing";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faqs from "@/components/sections/Faqs";
import Launch from "@/components/sections/Launch";

export default function Home() {
  return (
<div className="relative min-h-screen overflow-hidden w-full max-w-7xl mx-auto px-4">
  {/* Background */}
  <div
    className="absolute inset-0 -z-10 h-screen w-full bg-red-500 bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/HeroBackgound.png')" }}
  >
    <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-black to-black/0" />
  </div>

  {/* Foreground */}
    <div className="h-screen">

    <Landing />
    </div>
    <About />
    <div className="h-[128px]"></div>
    <Projects />
    <div className="h-[128px]"></div>
    <Services />
    <div className="h-[128px]"></div>
    <Process />
    <div className="h-[128px]"></div>
    <Testimonials />
    <div className="h-[128px]"></div>
    <Faqs />
    <div className="h-[128px]"></div>
    <Launch />
    <div className="h-[128px]"></div>
</div>


  );
}
