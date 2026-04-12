"use server"

import { deleteProject as dbDeleteProject } from "../../../../db-actions/projects"

export async function deleteProject(id: string) {
  return dbDeleteProject(id)
}
