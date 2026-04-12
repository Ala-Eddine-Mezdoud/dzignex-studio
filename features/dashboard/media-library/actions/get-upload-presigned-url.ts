"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { BUCKET_NAME, r2Client } from "../../../../lib/r2Client"

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
