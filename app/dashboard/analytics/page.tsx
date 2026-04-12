"use client"

import { StatsCards } from "../../../features/dashboard/analytics/components/StatsCards"
import { AnalyticsChart } from "../../../features/dashboard/analytics/components/AnalyticsChart"
import { TopPages } from "../../../features/dashboard/analytics/components/TopPages"
import { Referrers } from "../../../features/dashboard/analytics/components/Referrers"
import { BrowserStats } from "../../../features/dashboard/analytics/components/BrowserStats"
import { LocationStats } from "../../../features/dashboard/analytics/components/LocationStats"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 container mx-auto py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Overview of your website performance</p>
      </div>

      {/* Stat Cards */}
      <StatsCards />

      {/* Chart */}
      <AnalyticsChart />

      {/* Top Pages and Referrers */}
      <div className="grid gap-4 md:grid-cols-2">
        <TopPages />
        <Referrers />
      </div>

      {/* Browser and Location */}
      <div className="grid gap-4 md:grid-cols-2">
        <BrowserStats />
        <LocationStats />
      </div>
    </div>
  )
}