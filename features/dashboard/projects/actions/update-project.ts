"use server"

import { updateProject as dbUpdateProject, type UpdateProjectData } from "../../../../db-actions/projects"

export { type UpdateProjectData }

export async function updateProject(slug: string, data: UpdateProjectData) {
  return dbUpdateProject(slug, data)
}
