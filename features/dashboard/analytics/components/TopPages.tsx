"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"
import { FileText, ExternalLink } from "lucide-react"

export function TopPages() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=url&limit=10`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
        <div className="text-sm text-muted-foreground">Error loading data</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
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

  const pagesArray = Array.isArray(data) ? data : (data?.data || [])
  const totalViews = pagesArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)
  const maxValue = Math.max(...pagesArray.map((item: any) => item.y || item.value || 0))

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
      <div className="space-y-4">
        {pagesArray.length === 0 ? (
          <div className="text-sm text-muted-foreground">No data available.</div>
        ) : (
          pagesArray.map((item: any, index: number) => {
            const value = item.y || item.value || 0
            const percentage = totalViews > 0 ? ((value / totalViews) * 100).toFixed(1) : "0"
            const progressWidth = maxValue > 0 ? ((value / maxValue) * 100).toFixed(1) : "0"
            const url = item.x || item.name || item.url || "/"
            const shortUrl = url.length > 30 ? url.slice(0, 27) + "..." : url

            return (
              <div key={index} className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" title={url}>{shortUrl}</div>
                      <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{value.toLocaleString()}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? "bg-blue-500" :
                      index === 1 ? "bg-violet-500" :
                      index === 2 ? "bg-emerald-500" :
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
