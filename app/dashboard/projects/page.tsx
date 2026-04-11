
import { DataTable } from "../../../features/dashboard/projects/components/data-table"
import data from "../../../features/dashboard/projects/components/data.json"
import { Project } from "../../../features/dashboard/projects/components/columns"

export default async function ProjectsPage() {
  const projects = data as Project[]

  return (
    <div className="container mx-auto py-10">
      <DataTable data={projects} />
    </div>
  )
}