w"use server"

import { DeleteObjectsCommand, DeleteObjectCommand, ListObjectsV2Command, PutObjectCommand, type ListObjectsV2CommandOutput } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { revalidatePath } from "next/cache"

import { BUCKET_NAME, r2Client } from "../../../lib/r2Client"
import { MediaFile, MediaFolder, normalizeMediaPrefix, getFileType } from "./types"


function extractName(key: string) {
  return key.replace(/\/+$/, "").split("/").pop() ?? key
}

export async function listMedia(prefix?: string) {
  try {
    const normalizedPrefix = normalizeMediaPrefix(prefix)

    const response = await r2Client.send(
      new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: normalizedPrefix,
        Delimiter: "/",
      })
    )

    const folders: MediaFolder[] = (response.CommonPrefixes ?? [])
      .map((prefixItem) => prefixItem.Prefix)
      .filter((prefix): prefix is string => typeof prefix === "string")
      .map((prefixString) => {
        const name = prefixString.replace(normalizedPrefix, "").replace(/\/+$/, "")
        return {
          type: "folder",
          name,
          path: prefixString,
          key: prefixString,
        }
      })

    const files: MediaFile[] = (response.Contents ?? [])
      .filter((item) => item.Key && item.Key !== normalizedPrefix)
      .map((item) => {
        const key = item.Key ?? ""
        const name = extractName(key)
        const url = `${process.env.R2_PUBLIC_URL}/${key}`

        return {
          type: getFileType(name),
          name,
          path: key.replace(normalizedPrefix, ""),
          key,
          size: item.Size ?? 0,
          lastModified: item.LastModified?.toISOString() ?? new Date().toISOString(),
          url,
        }
      })

    return {
      success: true,
      data: {
        folders,
        files,
        currentPath: normalizedPrefix,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to load media.",
    }
  }
}

export async function getUploadPresignedUrl(key: string, contentType: string) {
  try {
    const normalizedKey = key.replace(/^\/+/, "")
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: normalizedKey,
      ContentType: contentType,
    })

    const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 })

    return {
      success: true,
      data: {
        url,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to create upload URL.",
    }
  }
}

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

export async function deleteMultipleMedia(keys: string[]) {
  const results = await Promise.allSettled(keys.map((key) => deleteMedia(key)))
  const errors = results
    .flatMap((result, index) =>
      result.status === "rejected" || (result.status === "fulfilled" && !result.value.success)
        ? [`${keys[index]}: ${result.status === "rejected" ? String(result.reason) : result.value.error}`]
        : []
    )

  if (errors.length > 0) {
    return {
      success: false,
      error: `One or more items could not be deleted: ${errors.join("; ")}`,
    }
  }

  return {
    success: true,
  }
}

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
