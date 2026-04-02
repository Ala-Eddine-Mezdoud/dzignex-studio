import Landing from "../../features/about/components/Landing"
import Stats from "../../features/home/components/Stats"
import Values from "../../features/home/components/Values"
import Approach from "../../features/about/components/Appraoch"
import Faq from "../../features/home/components/Faq"
import NextStep from "../../features/home/components/NextStep"
import Footer from "../../components/Footer"

const page = () => {
  return (
    <div>
      <Landing />
      <Stats />
      <Values />
      <Approach />
      <Faq />
      <NextStep />
      <Footer />
    </div>
  )
}

export default page