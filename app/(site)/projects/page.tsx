import Landing from "../../../features/projects/components/Landing"
import Projects from "../../../features/projects/components/Projects"
import { getProjects } from "../../../db-actions/projects"

export default async function ProjectsPage() {
  const allProjects = await getProjects()
  
  // Only show published projects on the public site
  const publishedProjects = allProjects.filter(p => p.isPublished)

  return (
    <div>
      <Landing />
      <Projects initialProjects={publishedProjects} />
    </div>
  )
}