import { ViewMode } from "../types"

interface MediaSkeletonProps {
  viewMode: ViewMode
}

export function MediaSkeleton({ viewMode }: MediaSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="grid gap-4 rounded-3xl border border-border/50 p-4 animate-pulse sm:grid-cols-[minmax(0,1fr)_140px_180px_120px]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-muted" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-1/2 rounded bg-muted" />
              </div>
            </div>
            <div className="hidden items-center justify-end text-sm text-muted-foreground sm:flex">
              <div className="h-4 w-16 rounded bg-muted" />
            </div>
            <div className="hidden items-center justify-end text-sm text-muted-foreground lg:flex">
              <div className="h-4 w-24 rounded bg-muted" />
            </div>
            <div className="flex items-center justify-end gap-2">
              <div className="h-8 w-20 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-border/50 bg-card p-4">
          <div className="mb-4 h-40 rounded-[1.5rem] bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  )
}
