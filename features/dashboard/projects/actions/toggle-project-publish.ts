"use server"

import { toggleProjectPublish as dbToggleProjectPublish } from "../../../../db-actions/projects"

export async function toggleProjectPublish(id: string, isPublished: boolean) {
  return dbToggleProjectPublish(id, isPublished)
}
