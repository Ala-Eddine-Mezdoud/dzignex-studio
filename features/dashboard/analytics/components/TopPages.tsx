"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"

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
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-muted rounded w-32 mb-1" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
              <div className="h-4 bg-muted rounded w-12 ml-4" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const pagesArray = Array.isArray(data) ? data : (data?.data || [])
  const totalViews = pagesArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
      <div className="space-y-3">
        {pagesArray.length === 0 ? (
          <div className="text-sm text-muted-foreground">No data available.</div>
        ) : (
          pagesArray.map((item: any, index: number) => {
            const value = item.y || item.value || 0
            const percentage = totalViews > 0 ? ((value / totalViews) * 100).toFixed(1) : "0"
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{item.x || item.name || item.url}</div>
                  <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                </div>
                <div className="text-sm font-semibold ml-4">{value.toLocaleString()}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
