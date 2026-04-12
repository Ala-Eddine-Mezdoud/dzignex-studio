"use server"

import { db } from "../../../../db/drizzle"
import { users } from "../../../../db/schema/user"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/**
 * Update current user profile
 */
export async function updateCurrentUser(userId: string, data: { name?: string; email?: string }) {
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
