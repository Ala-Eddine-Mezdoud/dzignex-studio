import Landing from "../../features/home/components/Landing"
import Logos from "../../features/home/components/Logos"
import About from "../../features/home/components/About"
import Stats from "../../features/home/components/Stats"
import Values from "../../features/home/components/Values"
import Projects from "../../features/home/components/Projects"
import Services from "../../features/home/components/Services"
import Faq from "../../features/home/components/Faq"
import Testimonials from "../../features/home/components/Testimonials"
import { getProjects } from "../../db-actions/projects"

export default async function HomePage() {
  const allProjects = await getProjects()
  
  // Show first 4 published projects on the home page
  const featuredProjects = allProjects
    .filter(p => p.isPublished)
    .slice(0, 4)

  return (
    <div>
      <Landing />
      <Logos />
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