"use server"

import { redirect } from "next/navigation"
import { db } from "../db/drizzle"
import { users, verificationTokens } from "../db/schema/user"
import { eq } from "drizzle-orm"
import { sendPasswordResetEmail } from "../lib/email"

function generateToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    redirect("/forget-password?error=MissingEmail")
  }

  // Find user by email
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  // Show error if account doesn't exist
  if (!user) {
    redirect("/forget-password?error=AccountNotFound")
  }

  // Check if user has a password (some users might only have magic link/OAuth)
  if (!user.password) {
    redirect("/forget-password?error=NoPasswordSet")
  }

  // Generate token and set expiration (30 minutes)
  const token = generateToken()
  const expires = new Date(Date.now() + 30 * 60 * 1000)

  // Store token in database
  await db.insert(verificationTokens).values({
    identifier: email,
    token,
    expires,
  })

  // Generate reset link
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  const resetLink = `${baseUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

  // Send email
  const result = await sendPasswordResetEmail(email, resetLink)

  if (!result.success) {
    console.error(`[Forgot Password] Failed to send email to ${email}:`, result.error)
    // Still redirect to avoid exposing error
  }

  // Redirect to sign-in with success message
  redirect("/sign-in?message=CheckEmailInbox")
}
