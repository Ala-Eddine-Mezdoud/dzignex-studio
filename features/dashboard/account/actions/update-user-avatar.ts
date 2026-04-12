"use server"

import { db } from "../../../../db/drizzle"
import { users } from "../../../../db/schema/user"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/**
 * Update user avatar
 */
export async function updateUserAvatar(userId: string, imageUrl: string) {
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
