import { DataTable } from "../../../features/dashboard/projects/components/data-table"
import { Project } from "../../../features/dashboard/projects/components/columns"
import { getProjects } from "../../../db-actions/projects"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tighter">Projects</h1>
          <p className="text-muted-foreground">Manage your studio portfolio and case studies.</p>
        </div>
      </div>
      <DataTable data={projects as Project[]} />
    </div>
  )
}