

import Image from "next/image"
import { GalleryVerticalEnd } from "lucide-react"
import { ResetPasswordForm } from "../../../components/reset-password-form"
import Link from "next/link"
import { db } from "../../../db/drizzle"
import { verificationTokens } from "../../../db/schema/user"
import { eq, and, gt } from "drizzle-orm"

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string
    email?: string
    error?: string
  }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = await searchParams
  const { token, email, error } = params

  // If no token or email, show error
  if (!token || !email) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2 bg-dzignex-black text-dzignex-white">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Dzignex Studio.
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs text-center">
              <h1 className="text-2xl font-bold mb-4">Invalid Reset Link</h1>
              <p className="text-sm text-muted-foreground mb-6">
                The password reset link is invalid or has expired.
              </p>
              <Link
                href="/sign-in"
                className="text-sm underline-offset-4 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            width={1920}
            height={1080}
            src="/footerBg.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  }

  // Validate that token exists and hasn't expired
  const tokenRecord = await db.query.verificationTokens.findFirst({
    where: and(
      eq(verificationTokens.identifier, email),
      eq(verificationTokens.token, token),
      gt(verificationTokens.expires, new Date())
    ),
  })

  // If token doesn't exist or is expired, show error immediately
  if (!tokenRecord) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2 bg-dzignex-black text-dzignex-white">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Dzignex Studio.
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs text-center">
              <h1 className="text-2xl font-bold mb-4">Link Already Used</h1>
              <p className="text-sm text-muted-foreground mb-6">
                This password reset link has already been used or has expired.
              </p>
              <Link
                href="/sign-in"
                className="text-sm underline-offset-4 hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <Image
            width={1920}
            height={1080}
            src="/footerBg.png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-dzignex-black text-dzignex-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Dzignex Studio.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ResetPasswordForm token={token} email={email} error={error} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          width={1920}
          height={1080}
          src="/footerBg.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}