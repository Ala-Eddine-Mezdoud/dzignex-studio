"use server"

import { db } from "../../../../db/drizzle"
import { users } from "../../../../db/schema/user"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

/**
 * Update user password
 */
export async function updateUserPassword(userId: string, currentPassword: string, newPassword: string) {
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
