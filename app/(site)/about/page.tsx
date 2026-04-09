import Landing from "../../../features/about/components/Landing"
import Stats from "../../../features/home/components/Stats"
import Values from "../../../features/home/components/Values"
import Approach from "../../../features/about/components/Appraoch"
import Faq from "../../../features/home/components/Faq"

const page = () => {
  return (
    <div>
      <Landing />
      <Stats />
      <Values />
      <Approach />
      <Faq />
    </div>
  )
}

export default page