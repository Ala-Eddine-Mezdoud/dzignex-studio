"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"
import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function AnalyticsChart() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/pageviews?startAt=${twentyFourHoursAgo}&endAt=${now}&unit=hour&timezone=Africa/Algiers`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <div className="text-sm text-muted-foreground">Error loading chart data</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <div className="h-[260px] animate-pulse bg-muted rounded" />
      </div>
    )
  }

  const pageviewsArray = data?.pageviews || []
  const sessionsArray = data?.sessions || []

  const processedData = pageviewsArray.map((pageviewItem: any) => {
    const date = pageviewItem.x || pageviewItem.date
    const views = pageviewItem.y || 0

    const sessionItem = sessionsArray.find(
      (s: any) => (s.x || s.date) === date
    )
    const visitors = sessionItem?.y || 0

    return {
      date,
      visitors,
      views,
    }
  })

  const labels = processedData.map((d: any) =>
    new Date(d.date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  )

  const chartData = {
    labels,
datasets: [
  {
    label: "Visitors",
    data: processedData.map((d: any) => d.visitors),
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    order: 1,  // renders first = bottom
  },
  {
    label: "Views",
    data: processedData.map((d: any) => d.views),
    backgroundColor: "rgba(147,197,253,0.5)",
    borderRadius: 2,
    order: 2,  // renders second = top
  },
],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#94a3b8",
        bodyColor: "#e2e8f0",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        stacked: true,
        grid: { color: "rgba(255,255,255,0.06)" },
        border: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
    },
  } as const

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
          Visitors
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-300/50 inline-block" />
          Views
        </span>
      </div>
      <div className="h-[260px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}