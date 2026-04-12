import { Suspense } from "react"
import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import MagicLinkCallbackContent from "./MagicLinkCallbackContent"

export default function MagicLinkCallbackPage() {
  return (
    <Suspense fallback={<MagicLinkFallback />}>
      <MagicLinkCallbackContent />
    </Suspense>
  )
}

function MagicLinkFallback() {
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
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 h-full w-full bg-dzignex-black/50" />
      </div>
    </div>
  )
}
