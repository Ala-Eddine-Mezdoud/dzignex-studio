import Landing from "../../features/home/components/Landing"
import Logos from "../../features/home/components/Logos"
import About from "../../features/home/components/About"
import Stats from "../../features/home/components/Stats"
import Values from "../../features/home/components/Values"
import Projects from "../../features/home/components/Projects"
import Services from "../../features/home/components/Services"
import Faq from "../../features/home/components/Faq"
import Testimonials from "../../features/home/components/Testimonials"
import NextStep from "../../components/NextStep"

const page = () => {
  return (
    <div>
      <Landing />
      <Logos />
      <About />
      <Stats />
      <Values />
      <Projects />
      <Services />
      <Testimonials />
      <Faq />
    </div>
  )
}

export default page