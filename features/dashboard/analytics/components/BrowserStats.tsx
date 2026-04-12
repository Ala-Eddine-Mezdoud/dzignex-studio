"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"
import { Chrome, Globe, Apple, Layers, HelpCircle } from "lucide-react"

// Browser icon mapping with brand colors
const browserConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Chrome: {
    icon: <Chrome className="w-4 h-4" />,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  Firefox: {
    icon: <Globe className="w-4 h-4" />,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-950/50",
  },
  Safari: {
    icon: <Apple className="w-4 h-4" />,
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
  Edge: {
    icon: <Layers className="w-4 h-4" />,
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-950/50",
  },
  default: {
    icon: <HelpCircle className="w-4 h-4" />,
    color: "text-slate-600",
    bg: "bg-slate-50 dark:bg-slate-950/50",
  },
}

function getBrowserConfig(name: string) {
  const normalized = name?.toLowerCase() || ""
  if (normalized.includes("chrome")) return browserConfig.Chrome
  if (normalized.includes("firefox")) return browserConfig.Firefox
  if (normalized.includes("safari")) return browserConfig.Safari
  if (normalized.includes("edge")) return browserConfig.Edge
  return browserConfig.default
}

export function BrowserStats() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=browser&limit=10`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Environment</h3>
        <div className="text-sm text-muted-foreground">Error loading data</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Environment</h3>
        <div className="space-y-2">
          <div className="text-sm font-medium mb-3">Browser</div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-muted rounded-lg" />
                    <div className="h-4 bg-muted rounded w-20" />
                  </div>
                  <div className="h-4 bg-muted rounded w-12" />
                </div>
                <div className="h-2 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const browserArray = Array.isArray(data) ? data : (data?.data || [])
  const totalVisitors = browserArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)
  const maxValue = Math.max(...browserArray.map((item: any) => item.y || item.value || 0))

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Environment</h3>
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground mb-3">Browser</div>
        <div className="space-y-4">
          {browserArray.length === 0 ? (
            <div className="text-sm text-muted-foreground">No data available.</div>
          ) : (
            browserArray.map((item: any, index: number) => {
              const value = item.y || item.value || 0
              const percentage = totalVisitors > 0 ? ((value / totalVisitors) * 100).toFixed(1) : "0"
              const progressWidth = maxValue > 0 ? ((value / maxValue) * 100).toFixed(1) : "0"
              const browserName = item.x || item.name || item.browser || "Unknown"
              const config = getBrowserConfig(browserName)

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
                        {config.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{browserName}</div>
                        <div className="text-xs text-muted-foreground">{percentage}%</div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{value.toLocaleString()}</div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? "bg-blue-500" :
                        index === 1 ? "bg-violet-500" :
                        index === 2 ? "bg-emerald-500" :
                        "bg-slate-400"
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
    </div>
  )
}
