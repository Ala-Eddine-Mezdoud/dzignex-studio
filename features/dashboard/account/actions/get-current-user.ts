"use server"

import { db } from "../../../../db/drizzle"
import { users } from "../../../../db/schema/user"
import { eq } from "drizzle-orm"

/**
 * Get current user by ID
 */
export async function getCurrentUser(userId: string) {
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
