"use server"

import { ListObjectsV2Command, type ListObjectsV2CommandOutput } from "@aws-sdk/client-s3"
import { BUCKET_NAME, r2Client } from "../../../../lib/r2Client"

export async function getStorageUsage() {
  try {
    let totalSize = 0
    let continuationToken: string | undefined = undefined

    do {
      const response: ListObjectsV2CommandOutput = await r2Client.send(
        new ListObjectsV2Command({
          Bucket: BUCKET_NAME,
          ContinuationToken: continuationToken,
        })
      )

      for (const item of response.Contents ?? []) {
        totalSize += item.Size ?? 0
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined
    } while (continuationToken)

    // Assume 10GB limit for the bucket
    const maxStorage = 10 * 1024 * 1024 * 1024
    const percentage = (totalSize / maxStorage) * 100

    return {
      success: true,
      data: {
        totalSize,
        percentage,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to get storage usage.",
    }
  }
}
