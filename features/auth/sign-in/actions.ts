"use server"

import { signIn } from "../../../auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function loginWithCredentials(formData: FormData) {
  try {
    const submitData = Object.fromEntries(formData)
    await signIn("credentials", { ...submitData, redirectTo: "/dashboard" })
  } catch (error) {
    if (error instanceof AuthError) {
      // Check for banned user error code
      if ((error as any).code === "BannedUser") {
        redirect("/sign-in?error=BannedUser")
      }
      if (error.type === "CredentialsSignin") {
        redirect("/sign-in?error=InvalidCredentials")
      }
    }
    // Always rethrow so Next.js successful redirects (NEXT_REDIRECT) are handled
    throw error
  }
}
