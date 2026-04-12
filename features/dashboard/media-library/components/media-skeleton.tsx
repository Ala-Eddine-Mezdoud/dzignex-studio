import { ViewMode } from "../types"

interface MediaSkeletonProps {
  viewMode: ViewMode
}

export function MediaSkeleton({ viewMode }: MediaSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="overflow-hidden rounded-lg border border-border/50 bg-background">
        <div className="grid gap-0 border-b border-border/50 bg-muted/30 px-4 py-2.5 text-xs font-medium text-muted-foreground sm:grid-cols-[40px_minmax(0,2fr)_120px_140px_80px]">
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 rounded bg-muted" />
          </div>
          <div className="flex items-center gap-2">Name</div>
          <div className="hidden items-center justify-end sm:flex">Size</div>
          <div className="hidden items-center justify-end lg:flex">Modified</div>
          <div className="flex items-center justify-end" />
        </div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="grid gap-0 border-b border-border/50 px-4 py-2.5 animate-pulse sm:grid-cols-[40px_minmax(0,2fr)_120px_140px_80px]">
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 rounded bg-muted" />
            </div>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-muted" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
            <div className="hidden items-center justify-end sm:flex">
              <div className="h-4 w-16 rounded bg-muted" />
            </div>
            <div className="hidden items-center justify-end lg:flex">
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
            <div className="flex items-center justify-end">
              <div className="h-7 w-7 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-lg border border-border/50 bg-background">
          <div className="aspect-square bg-muted/30" />
          <div className="px-3 py-2 space-y-1.5">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
