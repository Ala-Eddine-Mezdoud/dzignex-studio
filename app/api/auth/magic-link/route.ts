import { NextRequest } from "next/server"
import { db } from "../../../../db/drizzle"
import { users, verificationTokens } from "../../../../db/schema/user"
import { eq, and, gt } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")
  const email = searchParams.get("email")

  if (!token || !email) {
    return new Response("Invalid magic link", { status: 400 })
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
    // Redirect to sign-in with error
    return Response.redirect(new URL("/sign-in?error=InvalidMagicLink", request.url))
  }

  // Get user
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return Response.redirect(new URL("/sign-in?error=UserNotFound", request.url))
  }

  // Redirect to the magic link callback page that will handle the sign-in
  // Note: Token will be deleted by the auth provider after successful sign-in
  return Response.redirect(new URL(`/magic-link-callback?token=${token}&email=${encodeURIComponent(email)}`, request.url))
}
