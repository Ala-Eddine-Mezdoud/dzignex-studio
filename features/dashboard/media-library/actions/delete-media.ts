"use server"

import { DeleteObjectCommand, ListObjectsV2Command, type ListObjectsV2CommandOutput } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"
import { BUCKET_NAME, r2Client } from "../../../../lib/r2Client"

async function gatherFolderKeys(prefix: string) {
  const keys: string[] = []
  let continuationToken: string | undefined = undefined

  do {
    const response = await r2Client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      })
    ) as ListObjectsV2CommandOutput

    for (const item of response.Contents ?? []) {
      if (item.Key) {
        keys.push(item.Key)
      }
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
  } while (continuationToken)

  return keys
}

export async function deleteMedia(key: string) {
  try {
    const normalizedKey = key.replace(/^\/+/, "")

    if (normalizedKey.endsWith("/")) {
      const { DeleteObjectsCommand } = await import("@aws-sdk/client-s3")
      const keys = await gatherFolderKeys(normalizedKey)

      if (keys.length > 0) {
        const objects = keys.map((Key) => ({ Key }))
        await r2Client.send(
          new DeleteObjectsCommand({
            Bucket: BUCKET_NAME,
            Delete: {
              Objects: objects,
              Quiet: true,
            },
          })
        )
      }
    } else {
      await r2Client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: normalizedKey,
        })
      )
    }

    revalidatePath("/dashboard/media-library")

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to delete media.",
    }
  }
}
