"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"
import { Link2, Globe, Search, Share2 } from "lucide-react"

export function Referrers() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=referrer&limit=10`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sources</h3>
        <div className="text-sm text-muted-foreground">Error loading data</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sources</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-32" />
                </div>
                <div className="h-4 bg-muted rounded w-12" />
              </div>
              <div className="h-2 bg-muted rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const referrersArray = Array.isArray(data) ? data : (data?.data || [])
  const totalViews = referrersArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)
  const maxValue = Math.max(...referrersArray.map((item: any) => item.y || item.value || 0))

  function getReferrerIcon(referrer: string) {
    const normalized = referrer?.toLowerCase() || ""
    if (normalized.includes("google") || normalized.includes("bing") || normalized.includes("duck")) {
      return <Search className="w-4 h-4 text-blue-500" />
    }
    if (normalized.includes("facebook") || normalized.includes("twitter") || normalized.includes("linkedin") || normalized.includes("instagram")) {
      return <Share2 className="w-4 h-4 text-pink-500" />
    }
    if (normalized.includes("direct") || normalized.includes("none")) {
      return <Link2 className="w-4 h-4 text-emerald-500" />
    }
    return <Globe className="w-4 h-4 text-muted-foreground" />
  }

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Sources</h3>
      <div className="space-y-4">
        {referrersArray.length === 0 ? (
          <div className="text-sm text-muted-foreground">No data available.</div>
        ) : (
          referrersArray.map((item: any, index: number) => {
            const value = item.y || item.value || 0
            const percentage = totalViews > 0 ? ((value / totalViews) * 100).toFixed(1) : "0"
            const progressWidth = maxValue > 0 ? ((value / maxValue) * 100).toFixed(1) : "0"
            const referrer = item.x || item.name || item.referrer || "Direct"
            const displayReferrer = referrer === "null" || referrer === "" ? "Direct" : referrer

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getReferrerIcon(displayReferrer)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{displayReferrer}</div>
                      <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{value.toLocaleString()}</div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? "bg-amber-500" :
                      index === 1 ? "bg-orange-500" :
                      index === 2 ? "bg-rose-500" :
                      "bg-slate-300 dark:bg-slate-600"
                    }`}
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
