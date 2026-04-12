"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}m ${remainingSeconds}s`
}

export function StatsCards() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="text-sm text-muted-foreground">Error loading data</div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-muted rounded w-24 mb-2" />
            <div className="h-8 bg-muted rounded w-16 mb-1" />
            <div className="h-3 bg-muted rounded w-12" />
          </div>
        ))}
      </div>
    )
  }

  const { pageviews, visits, visitors, bounces, totaltime } = data || {}
  const bounceRate = visits > 0 ? ((bounces / visits) * 100).toFixed(1) : "0"
  const avgDuration = visits > 0 ? formatDuration(totaltime / visits) : "0m 0s"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground mb-1">Visitors</div>
        <div className="text-2xl font-bold mb-1">{visitors?.toLocaleString() || "0"}</div>
        <div className="text-xs text-muted-foreground">100%</div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground mb-1">Visits</div>
        <div className="text-2xl font-bold mb-1">{visits?.toLocaleString() || "0"}</div>
        <div className="text-xs text-muted-foreground">100%</div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground mb-1">Views</div>
        <div className="text-2xl font-bold mb-1">{pageviews?.toLocaleString() || "0"}</div>
        <div className="text-xs text-muted-foreground">100%</div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground mb-1">Bounce rate</div>
        <div className="text-2xl font-bold mb-1">{bounceRate}%</div>
        <div className="text-xs text-muted-foreground">0%</div>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="text-sm font-medium text-muted-foreground mb-1">Visit duration</div>
        <div className="text-2xl font-bold mb-1">{avgDuration}</div>
        <div className="text-xs text-muted-foreground">0</div>
      </div>
    </div>
  )
}
