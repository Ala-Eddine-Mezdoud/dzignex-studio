import Image from "next/image"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "../../../components/login-form"
import Link from "next/link"

interface LoginPageProps {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const { error, message } = params

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
            <LoginForm error={error} message={message} />
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
