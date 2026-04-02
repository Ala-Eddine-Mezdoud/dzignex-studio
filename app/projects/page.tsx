import Landing from "../../features/projects/components/Landing"
import Projects from "../../features/projects/components/Projects"
import NextStep from "../../features/home/components/NextStep"
import Footer from "../../components/Footer"

const page = () => {
  return (
    <div>
      <Landing />
      <Projects />
      <NextStep />
      <Footer />
    </div>
  )
}

export default page