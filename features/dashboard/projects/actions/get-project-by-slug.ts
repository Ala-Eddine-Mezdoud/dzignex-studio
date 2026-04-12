"use server"

import { getProjectBySlug as dbGetProjectBySlug } from "../../../../db-actions/projects"

export async function getProjectBySlug(slug: string) {
  return dbGetProjectBySlug(slug)
}
