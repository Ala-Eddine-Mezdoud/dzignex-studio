"use server"

import { db } from "../db/drizzle"
import { users, verificationTokens } from "../db/schema/user"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { sendPasswordResetEmail, sendMagicLinkEmail } from "../lib/email"

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

/**
 * Generate a secure random token
 */
function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Send password reset email to user
 */
export async function sendPasswordReset(userId: string) {
  try {
    const user = await getUserById(userId)
    if (!user || !user.email) {
      return { success: false, error: "User not found or has no email" }
    }

    // Generate token and set expiration (30 minutes)
    const token = generateToken()
    const expires = new Date(Date.now() + 30 * 60 * 1000)

    // Store token in database
    await db.insert(verificationTokens).values({
      identifier: user.email,
      token,
      expires,
    })

    // Generate reset link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const resetLink = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`

    // Send email
    const result = await sendPasswordResetEmail(user.email, resetLink)

    if (!result.success) {
      return { success: false, error: result.error || "Failed to send email" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending password reset:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to send password reset" }
  }
}

/**
 * Send magic link email to user for passwordless login
 */
export async function sendMagicLink(userId: string) {
  try {
    const user = await getUserById(userId)
    if (!user || !user.email) {
      return { success: false, error: "User not found or has no email" }
    }

    // Generate token and set expiration (24 hours)
    const token = generateToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    // Store token in database
    await db.insert(verificationTokens).values({
      identifier: user.email,
      token,
      expires,
    })

    // Generate magic link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const magicLink = `${baseUrl}/api/auth/magic-link?token=${token}&email=${encodeURIComponent(user.email)}`

    // Send email
    const result = await sendMagicLinkEmail(user.email, magicLink)

    if (!result.success) {
      return { success: false, error: result.error || "Failed to send email" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending magic link:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to send magic link" }
  }
}
