"use server"

import { createProject as dbCreateProject, type CreateProjectData } from "../../../../db-actions/projects"

export { type CreateProjectData }

export async function createProject(data: CreateProjectData) {
  return dbCreateProject(data)
}
