"use server"

import { getProjectUploadPresignedUrl as dbGetProjectUploadPresignedUrl } from "../../../../db-actions/projects"

export async function getProjectUploadPresignedUrl(key: string, contentType: string) {
  return dbGetProjectUploadPresignedUrl(key, contentType)
}
