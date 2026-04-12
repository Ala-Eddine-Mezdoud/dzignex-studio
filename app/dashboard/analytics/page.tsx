import { AnalyticsChart } from "../../../features/dashboard/analytics/components/AnalyticsChart"

const UMAMI_API_BASE = "https://api.umami.is/v1"

async function fetchUmamiData(endpoint: string) {
  const token = process.env.UMAMI_API_TOKEN
  const websiteId = process.env.UMAMI_WEBSITE_ID

  if (!token || !websiteId) {
    throw new Error("Missing UMAMI_API_TOKEN or UMAMI_WEBSITE_ID environment variables")
  }

  const response = await fetch(`${UMAMI_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data from Umami: ${response.statusText}`)
  }

  return response.json()
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString().split("T")[0]
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}m ${remainingSeconds}s`
}

export default async function AnalyticsPage() {
  const now = Math.floor(Date.now() / 1000)
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60

  // Fetch stats
  const statsData = await fetchUmamiData(
    `/websites/${process.env.UMAMI_WEBSITE_ID}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`
  )

  // Fetch pageviews over time
  const pageviewsData = await fetchUmamiData(
    `/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews?startAt=${thirtyDaysAgo}&endAt=${now}&unit=day&timezone=Africa/Algiers`
  )

  // Fetch top pages
  const pagesData = await fetchUmamiData(
    `/websites/${process.env.UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=url&limit=10`
  )

  // Fetch top referrers
  const referrersData = await fetchUmamiData(
    `/websites/${process.env.UMAMI_WEBSITE_ID}/metrics?startAt=${thirtyDaysAgo}&endAt=${now}&type=referrer&limit=10`
  )

  // Calculate stats
  const { pageviews, visits, visitors, bounces, totaltime } = statsData
  const bounceRate = visits?.value > 0 ? ((bounces.value / visits.value) * 100).toFixed(1) : "0"
  const avgDuration = visits?.value > 0 ? formatDuration(totaltime.value / visits.value) : "0m 0s"

  // Transform pageviews data for chart - handle different response structures
  const pageviewsArray = Array.isArray(pageviewsData) ? pageviewsData : (pageviewsData?.data || [])
  const chartData = pageviewsArray.map((item: any) => ({
    date: item.x || item.date,
    visitors: item.y || item.visitors || 0,
    views: item.y || item.views || 0,
  }))

  // Calculate total views for percentage calculations - handle different response structures
  const pagesArray = Array.isArray(pagesData) ? pagesData : (pagesData?.data || [])
  const totalViews = pagesArray.reduce((sum: number, item: any) => sum + (item.y || item.value || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Overview of your website performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Views</div>
          <div className="text-2xl font-bold">{pageviews?.value?.toLocaleString() || "0"}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Visits</div>
          <div className="text-2xl font-bold">{visits?.value?.toLocaleString() || "0"}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Visitors</div>
          <div className="text-2xl font-bold">{visitors?.value?.toLocaleString() || "0"}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Bounce Rate</div>
          <div className="text-2xl font-bold">{bounceRate}%</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Avg. Duration</div>
          <div className="text-2xl font-bold">{avgDuration}</div>
        </div>
      </div>

      {/* Chart */}
      <AnalyticsChart data={chartData} />

      {/* Top Pages and Referrers */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Pages */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {pagesArray.map((item: any, index: number) => {
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
            })}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {(() => {
              const referrersArray = Array.isArray(referrersData) ? referrersData : (referrersData?.data || [])
              return referrersArray.map((item: any, index: number) => {
                const value = item.y || item.value || 0
                const percentage = totalViews > 0 ? ((value / totalViews) * 100).toFixed(1) : "0"
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.x || item.name || item.referrer}</div>
                      <div className="text-xs text-muted-foreground">{percentage}% of total</div>
                    </div>
                    <div className="text-sm font-semibold ml-4">{value.toLocaleString()}</div>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}