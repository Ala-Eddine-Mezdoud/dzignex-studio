"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../components/ui/chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--primary))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--muted-foreground))",
  },
} satisfies ChartConfig

interface AnalyticsChartProps {
  data: Array<{
    date: string
    visitors: number
    views: number
  }>
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  // Generate fallback data for the last 30 days with zeros if no data is provided
  const chartData = React.useMemo(() => {
    if (data && data.length > 0) {
      return data
    }

    // Generate 30 days of zero data
    const fallbackData = []
    const now = new Date()
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      fallbackData.push({
        date: date.toISOString(),
        visitors: 0,
        views: 0,
      })
    }
    return fallbackData
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pageviews Over Time</CardTitle>
        <CardDescription>Visitors and views per day for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="visitors" fill="var(--color-visitors)" radius={4} />
            <Bar dataKey="views" fill="var(--color-views)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
