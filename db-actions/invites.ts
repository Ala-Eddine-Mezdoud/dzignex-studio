"use server"

import { db } from "../db/drizzle"
import { inviteTokens, users } from "../db/schema"
import { eq, and, gt, isNull } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getUserByEmail } from "./user"

/**
 * Create an invite token for a given email
 */
export async function createInviteToken(email: string, createdBy: string) {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new Error("A user with this email already exists")
    }

    // Check if there's already an active invite for this email
    const existingInvite = await db.query.inviteTokens.findFirst({
      where: and(
        eq(inviteTokens.email, email),
        isNull(inviteTokens.usedAt),
        gt(inviteTokens.expiresAt, new Date())
      ),
    })

    if (existingInvite) {
      throw new Error("An active invite already exists for this email")
    }

    // Generate unique token
    const token = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Create invite token
    const [inviteToken] = await db.insert(inviteTokens).values({
      email,
      token,
      expiresAt,
      createdBy,
    }).returning()

    revalidatePath("/dashboard/team")
    return inviteToken
  } catch (error) {
    console.error("Error creating invite token:", error)
    throw error
  }
}

/**
 * Validate an invite token
 */
export async function validateInviteToken(token: string) {
  try {
    console.log("Validating token:", token)
    
    // First check if token exists at all
    const anyInvite = await db.query.inviteTokens.findFirst({
      where: eq(inviteTokens.token, token),
    })
    
    console.log("Any invite found:", anyInvite)
    
    if (!anyInvite) {
      console.log("No invite found with this token")
      return null
    }
    
    console.log("Invite found:", anyInvite)
    console.log("Used at:", anyInvite.usedAt)
    console.log("Expires at:", anyInvite.expiresAt)
    console.log("Current time:", new Date())
    
    // Now check the full validation
    const invite = await db.query.inviteTokens.findFirst({
      where: and(
        eq(inviteTokens.token, token),
        isNull(inviteTokens.usedAt),
        gt(inviteTokens.expiresAt, new Date())
      ),
    })

    console.log("Validated invite:", invite)

    if (!invite) {
      return null
    }

    return invite
  } catch (error) {
    console.error("Error validating invite token:", error)
    return null
  }
}

/**
 * Complete invite setup by creating user account
 */
export async function completeInviteSetup(token: string, name: string, password: string) {
  try {
    // Validate token
    const invite = await validateInviteToken(token)
    if (!invite) {
      throw new Error("Invalid or expired invite token")
    }

    // Import bcrypt for password hashing
    const bcrypt = await import("bcryptjs")

    // Create user account
    const hashedPassword = await bcrypt.hash(password, 12)
    const [newUser] = await db.insert(users).values({
      name,
      email: invite.email,
      password: hashedPassword,
      role: "USER", // Default role for invited users
      acknowledged: true, // Auto-acknowledge since they completed setup
    }).returning()

    // Mark invite as used
    await db.update(inviteTokens)
      .set({ usedAt: new Date() })
      .where(eq(inviteTokens.token, token))

    revalidatePath("/dashboard/team")
    return newUser
  } catch (error) {
    console.error("Error completing invite setup:", error)
    throw error
  }
}

/**
 * Get all invite tokens (for admin management)
 */
export async function getInviteTokens() {
  try {
    return await db.query.inviteTokens.findMany({
      orderBy: (inviteTokens, { desc }) => [desc(inviteTokens.createdAt)],
    })
  } catch (error) {
    console.error("Error fetching invite tokens:", error)
    throw new Error("Failed to fetch invite tokens")
  }
}

/**
 * Delete an invite token
 */
export async function deleteInviteToken(id: string) {
  try {
    await db.delete(inviteTokens).where(eq(inviteTokens.id, id))
    revalidatePath("/dashboard/team")
    return { success: true }
  } catch (error) {
    console.error("Error deleting invite token:", error)
    throw new Error("Failed to delete invite token")
  }
}

/**
 * Resend an invite (creates new token and invalidates old one)
 */
export async function resendInvite(email: string, createdBy: string) {
  try {
    // Mark existing invites as used (invalidate them)
    await db.update(inviteTokens)
      .set({ usedAt: new Date() })
      .where(and(
        eq(inviteTokens.email, email),
        isNull(inviteTokens.usedAt)
      ))

    // Create new invite token
    return await createInviteToken(email, createdBy)
  } catch (error) {
    console.error("Error resending invite:", error)
    throw error
  }
}

/**
 * Send an invitation email and create token (server action wrapper)
 */
export async function sendInvitation(email: string, createdBy: string) {
  try {
    console.log("Creating invitation for email:", email, "by user:", createdBy)
    
    // Create invite token
    const inviteToken = await createInviteToken(email, createdBy)
    
    console.log("Created invite token:", inviteToken)

    // Generate invite link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const inviteLink = `${baseUrl}/invite/${inviteToken.token}`
    
    console.log("Generated invite link:", inviteLink)

    // Import email function only in server context
    const { sendInviteEmail } = await import("../lib/email")
    
    // Send invite email
    const emailResult = await sendInviteEmail(email, inviteLink)
    
    console.log("Email result:", emailResult)

    if (!emailResult.success) {
      throw new Error(emailResult.error || "Failed to send invite email")
    }

    return { success: true, inviteToken }
  } catch (error) {
    console.error("Error sending invitation:", error)
    throw error
  }
}

/**
 * Complete invite setup and auto-login (server action)
 */
export async function completeInviteSetupWithLogin(token: string, name: string, password: string) {
  try {
    // Complete the invite setup (creates user account)
    const user = await completeInviteSetup(token, name, password)
    
    // Import signIn only in server context
    const { signIn } = await import("../auth")
    
    // Auto-login the new user
    await signIn("credentials", {
      email: user.email!,
      password,
      redirect: false, // Don't redirect here, let the client handle it
    })

    return { success: true, user }
  } catch (error) {
    console.error("Error completing invite setup:", error)
    throw error
  }
}
