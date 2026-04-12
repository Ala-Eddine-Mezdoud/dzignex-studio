"use server"

import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { BUCKET_NAME, r2Client } from "../../../../lib/r2Client"
import { MediaFile, MediaFolder, normalizeMediaPrefix, getFileType } from "../types"

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
