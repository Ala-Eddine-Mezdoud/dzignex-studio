"use server"

import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { r2Client, BUCKET_NAME } from "../../../../lib/r2Client"

/**
 * Get presigned URL for avatar upload
 */
export async function getAvatarUploadUrl(key: string, contentType: string) {
  try {
    const normalizedKey = key.replace(/^\/+/, "")
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: normalizedKey,
      ContentType: contentType,
    })

    const url = await getSignedUrl(r2Client, command, { expiresIn: 60 * 5 })
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${normalizedKey}`

    return {
      success: true,
      data: {
        url,
        publicUrl,
        key: normalizedKey,
      },
    }
  } catch (error) {
    console.error("Error generating upload URL:", error)
    return {
      success: false,
      error: "Failed to generate upload URL",
    }
  }
}
