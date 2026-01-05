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
    <div className="relative overflow-hidden w-full  mx-auto ">
      <Landing />
      <About />
      <Projects />
      <Process />
      <Testimonials />
      <Faqs />
      <Launch />
    </div>


  );
}
