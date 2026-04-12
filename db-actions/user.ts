"use server"

import { db } from "../db/drizzle"
import { users } from "../db/schema/user"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

/**
 * Get all users (Team members)
 */
export async function getUsers() {
  try {
    return await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)]
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    })
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    throw new Error("Failed to fetch user")
  }
}

/**
 * Create a new user with hashed password
 */
export async function createUser(data: typeof users.$inferInsert) {
  try {
    const password = data.password 
      ? await bcrypt.hash(data.password, 12)
      : null

    const [newUser] = await db.insert(users).values({
      ...data,
      password,
    }).returning()
    
    revalidatePath("/dashboard/team")
    return newUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

/**
 * Update user
 */
export async function updateUser(id: string, data: Partial<typeof users.$inferInsert>) {
  try {
    let updateData = { ...data }
    
    // Hash password if it's being updated
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12)
    }

    const [updatedUser] = await db.update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning()
    
    revalidatePath("/dashboard/team")
    return updatedUser
  } catch (error) {
    console.error(`Error updating user ${id}:`, error)
    throw new Error("Failed to update user")
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath("/dashboard/team")
    return { success: true }
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error)
    throw new Error("Failed to delete user")
  }
}

/**
 * Get user by email for authentication
 */
export async function getUserByEmail(email: string) {
  try {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    })
  } catch (error) {
    console.error(`Error fetching user by email ${email}:`, error)
    throw new Error("Failed to fetch user")
  }
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}
