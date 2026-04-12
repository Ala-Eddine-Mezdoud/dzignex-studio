"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function MagicLinkCallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token && email) {
      // Attempt sign in with magic link credentials
      signIn("magic-link", {
        token,
        email,
        callbackUrl: "/dashboard",
        redirect: false,
      }).then((result) => {
        if (result?.error) {
          // Check if banned user error
          if (result.error === "CredentialsSignin" || result.error === "BannedUser") {
            router.push("/sign-in?error=BannedUser")
          } else {
            router.push("/sign-in?error=InvalidMagicLink")
          }
        } else if (result?.ok) {
          router.push("/dashboard")
        }
      }).catch(() => {
        setError("InvalidMagicLink")
      })
    }
  }, [token, email, router])

  // If no token or email, show error
  if (!token || !email || error) {
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
              <h1 className="text-2xl font-bold mb-4">Invalid Magic Link</h1>
              <p className="text-sm text-muted-foreground mb-6">
                The magic link is invalid, has expired, or your account has been restricted.
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
          <div className="absolute inset-0 h-full w-full bg-dzignex-black/50" />
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
          <div className="w-full max-w-xs text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin mb-4" />
            <h1 className="text-2xl font-bold mb-2">Signing you in...</h1>
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your magic link.
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 h-full w-full bg-dzignex-black/50" />
      </div>
    </div>
  )
}
