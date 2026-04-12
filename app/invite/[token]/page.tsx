import Image from "next/image"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { validateInviteToken } from "../../../db-actions/invites"
import { InviteSetupForm } from "../../../features/auth/invite/components/InviteSetupForm"

interface InvitePageProps {
  params: Promise<{
    token: string
  }>
}

function ErrorState({ 
  icon, 
  title, 
  description, 
  subDescription 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  subDescription?: string
}) {
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
          <div className="w-full max-w-xs text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              {icon}
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
            {subDescription && (
              <p className="text-sm text-muted-foreground">{subDescription}</p>
            )}
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

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params

  console.log("Invite page called with token:", token)
  console.log("Params:", await params)

  try {
    // Validate the invite token
    console.log("About to validate token...")
    const invite = await validateInviteToken(token)
    console.log("Validation result:", invite)

    if (!invite) {
      console.log("Invite validation returned null")
      return (
        <ErrorState
          icon={
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
          title="Invalid Invitation"
          description="This invitation link is invalid, has expired, or has already been used."
          subDescription="Please contact your team administrator for a new invitation."
        />
      )
    }

    console.log("Invite is valid, rendering setup form")
    return <InviteSetupForm token={token} email={invite.email} />
  } catch (error) {
    console.error("Error validating invite:", error)
    return (
      <ErrorState
        icon={
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        }
        title="Something went wrong"
        description="We couldn't validate your invitation. Please try again or contact support."
      />
    )
  }
}
