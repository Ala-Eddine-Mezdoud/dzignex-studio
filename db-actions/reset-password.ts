"use server"

import { redirect } from "next/navigation"
import { db } from "../db/drizzle"
import { users, verificationTokens } from "../db/schema/user"
import { eq, and, gt } from "drizzle-orm"
import { updateUser } from "./user"

export async function resetPasswordAction(formData: FormData) {
  const token = formData.get("token") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!token || !email || !password || !confirmPassword) {
    redirect(`/reset-password?token=${token}&email=${encodeURIComponent(email)}&error=MissingFields`)
  }

  if (password !== confirmPassword) {
    redirect(`/reset-password?token=${token}&email=${encodeURIComponent(email)}&error=PasswordsDoNotMatch`)
  }

  if (password.length < 8) {
    redirect(`/reset-password?token=${token}&email=${encodeURIComponent(email)}&error=PasswordTooShort`)
  }

  // Verify token exists and hasn't expired
  const tokenRecord = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.identifier, email),
      eq(verificationTokens.token, token),
      gt(verificationTokens.expires, new Date())
    ),
  })

  if (!tokenRecord) {
    console.log(`[Reset Password] Token not found or expired for email: ${email}`)
    redirect("/sign-in?error=InvalidOrExpiredToken")
  }

  console.log(`[Reset Password] Valid token found for email: ${email}, deleting...`)

  // IMMEDIATELY delete the token to ensure single-use semantics
  const deleteResult = await db.delete(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .returning()

  console.log(`[Reset Password] Token deleted, rows affected: ${deleteResult.length}`)

  // Get user by email
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    redirect("/sign-in?error=UserNotFound")
  }

  // Update password (updateUser will hash it)
  await updateUser(user.id, { password })

  redirect("/sign-in?message=PasswordResetSuccess")
}
