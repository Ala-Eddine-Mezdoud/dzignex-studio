import Landing from "../features/home/components/Landing"
import Logos from "../features/home/components/Logos"
import About from "../features/home/components/About"
import Stats from "../features/home/components/Stats"
import Values from "../features/home/components/Values"
import Projects from "../features/home/components/Projects"

const page = () => {
  return (
    <div>
      <Landing className="pb-24"/>
      <Logos />
      <About />
      <Stats />
      <Values />
      <Projects />
    </div>
  )
}

export default page