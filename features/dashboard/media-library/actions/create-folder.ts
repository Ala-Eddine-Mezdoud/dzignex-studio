"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"
import { BUCKET_NAME, r2Client } from "../../../../lib/r2Client"
import { normalizeMediaPrefix } from "../types"

export async function createFolder(folderName: string, parentPath?: string) {
  try {
    const normalizedParent = normalizeMediaPrefix(parentPath)
    const sanitizedFolder = folderName.replace(/\/+$/, "").trim()

    if (!sanitizedFolder) {
      return {
        success: false,
        error: "Folder name is required.",
      }
    }

    const key = `${normalizedParent}${sanitizedFolder}/`

    await r2Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: "",
      })
    )

    revalidatePath("/dashboard/media-library")

    return {
      success: true,
      data: {
        type: "folder" as const,
        name: sanitizedFolder,
        path: key,
        key,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to create folder.",
    }
  }
}
