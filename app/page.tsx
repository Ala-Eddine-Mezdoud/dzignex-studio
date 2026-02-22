import Landing from "../features/home/components/Landing"
import Logos from "../features/home/components/Logos"
import About from "../features/home/components/About"
import Stats from "../features/home/components/Stats"
import Values from "../features/home/components/Values"

const page = () => {
  return (
    <div>
      <Landing className="pb-24 pt-60"/>
      <Logos />
      <About />
      <Stats />
      <Values />
    </div>
  )
}

export default page