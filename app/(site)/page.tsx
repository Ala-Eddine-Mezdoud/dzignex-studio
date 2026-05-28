import Landing from "../../features/home/components/Landing"


import About from "../../features/home/components/About"
import Stats from "../../features/home/components/Stats"
import Values from "../../features/home/components/Values"
import Projects from "../../features/home/components/Projects"
import Services from "../../features/home/components/Services"
import Faq from "../../features/home/components/Faq"
import Testimonials from "../../features/home/components/Testimonials"
import { getFeaturedProjects } from "../../db-actions/projects"





export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects()
  

  return (
    <div>
      <Landing />
      <About />
      <Stats />
      <Values />
      <Projects initialProjects={featuredProjects} />
      <Services />
      <Testimonials />
      <Faq />
    </div>
  )
}