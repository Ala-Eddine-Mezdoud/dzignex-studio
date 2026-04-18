"use server"

import { db } from "../../../db/drizzle"
import { users } from "../../../db/schema/user"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { r2Client, BUCKET_NAME } from "../../../lib/r2Client"
import bcrypt from "bcryptjs"
import { requireAuth } from "../../../lib/auth-guard"

/**
 * Get current user by ID
 */
export async function getCurrentUser(userId: string) {
  await requireAuth()
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      }
    })
    return user
  } catch (error) {
    console.error("Error fetching current user:", error)
    throw new Error("Failed to fetch user")
  }
}

/**
 * Update current user profile
 */
export async function updateCurrentUser(userId: string, data: { name?: string; email?: string }) {
  await requireAuth()
  try {
    const [updatedUser] = await db.update(users)
      .set(data)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
        role: users.role,
      })

    revalidatePath("/dashboard/account")
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }
}

/**
 * Update user password
 */
export async function updateUserPassword(userId: string, currentPassword: string, newPassword: string) {
  await requireAuth()
  try {
    // Get user with password
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })

    if (!user || !user.password) {
      throw new Error("User not found")
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      throw new Error("Current password is incorrect")
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId))

    return { success: true }
  } catch (error) {
    console.error("Error updating password:", error)
    throw error
  }
}

/**
 * Update user avatar
 */
export async function updateUserAvatar(userId: string, imageUrl: string) {
  await requireAuth()
  try {
    const [updatedUser] = await db.update(users)
      .set({ image: imageUrl })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        image: users.image,
      })

    revalidatePath("/dashboard/account")
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error("Error updating avatar:", error)
    throw new Error("Failed to update avatar")
  }
}

/**
 * Get presigned URL for avatar upload
 */
export async function getAvatarUploadUrl(key: string, contentType: string) {
  await requireAuth()
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
