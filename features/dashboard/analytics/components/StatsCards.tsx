"use client"

import { useUmamiData } from "../hooks/useUmamiData"
import { useMemo } from "react"

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}m ${remainingSeconds}s`
}

// ─── Icon components ────────────────────────────────────────────────────────
const VisitorsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)
const VisitsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />
  </svg>
)
const ViewsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const BounceIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
)
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

// ─── Card theme config ───────────────────────────────────────────────────────
const CARD_THEMES = {
  visitors: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    bar: "from-blue-400 to-blue-300",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    label: "text-blue-700",
    value: "text-blue-950",
    sub: "text-blue-500",
    dot: "bg-blue-400",
  },
  visits: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "from-emerald-500 to-emerald-300",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    label: "text-emerald-700",
    value: "text-emerald-950",
    sub: "text-emerald-500",
    dot: "bg-emerald-400",
  },
  views: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    bar: "from-violet-500 to-violet-300",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    label: "text-violet-700",
    value: "text-violet-950",
    sub: "text-violet-500",
    dot: "bg-violet-400",
  },
  bounce: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "from-amber-500 to-amber-300",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    label: "text-amber-700",
    value: "text-amber-950",
    sub: "text-amber-500",
    dot: "bg-amber-400",
  },
  duration: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    bar: "from-rose-500 to-rose-300",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    label: "text-rose-700",
    value: "text-rose-950",
    sub: "text-rose-500",
    dot: "bg-rose-400",
  },
} as const

type Theme = keyof typeof CARD_THEMES

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  theme,
  icon,
  label,
  value,
  sub,
}: {
  theme: Theme
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  const t = CARD_THEMES[theme]
  return (
    <div
      className={`relative rounded-[14px] border ${t.bg} ${t.border} overflow-hidden
                  p-5 transition-transform duration-200 hover:-translate-y-0.5`}
    >
      {/* top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${t.bar}`} />

      {/* icon */}
      <div className={`w-8 h-8 rounded-lg ${t.iconBg} ${t.iconColor} flex items-center justify-center mb-3.5`}>
        {icon}
      </div>

      {/* label */}
      <p className={`text-[11px] font-semibold tracking-widest uppercase mb-1.5 ${t.label}`}>
        {label}
      </p>

      {/* value */}
      <p className={`font-mono text-[26px] font-medium leading-none mb-1.5 ${t.value}`}>
        {value}
      </p>

      {/* subtitle */}
      <p className={`text-[11px] flex items-center gap-1.5 ${t.sub}`}>
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${t.dot}`} />
        {sub}
      </p>
    </div>
  )
}

// ─── Skeleton card ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-[14px] border border-gray-200 bg-gray-50 p-5 animate-pulse">
      <div className="w-8 h-8 rounded-lg bg-gray-200 mb-3.5" />
      <div className="h-2.5 bg-gray-200 rounded w-3/5 mb-3" />
      <div className="h-6 bg-gray-200 rounded w-2/5 mb-2" />
      <div className="h-2 bg-gray-100 rounded w-2/5" />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
export function StatsCards() {
  const endpoint = useMemo(() => {
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    return `/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats?startAt=${thirtyDaysAgo}&endAt=${now}`
  }, [])

  const { data, loading, error } = useUmamiData<any>(endpoint)

  if (error) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="rounded-[14px] border border-red-200 bg-red-50 p-5">
            <p className="text-xs text-red-500 font-medium">Failed to load</p>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  const { pageviews, visits, visitors, bounces, totaltime } = data || {}
  const bounceRate = visits > 0 ? `${((bounces / visits) * 100).toFixed(1)}%` : "0%"
  const avgDuration = visits > 0 ? formatDuration(totaltime / visits) : "0m 0s"

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
      <StatCard
        theme="visitors"
        icon={<VisitorsIcon />}
        label="Visitors"
        value={visitors?.toLocaleString() ?? "0"}
        sub="Unique users"
      />
      <StatCard
        theme="visits"
        icon={<VisitsIcon />}
        label="Visits"
        value={visits?.toLocaleString() ?? "0"}
        sub="Total sessions"
      />
      <StatCard
        theme="views"
        icon={<ViewsIcon />}
        label="Page views"
        value={pageviews?.toLocaleString() ?? "0"}
        sub="Last 30 days"
      />
      <StatCard
        theme="bounce"
        icon={<BounceIcon />}
        label="Bounce rate"
        value={bounceRate}
        sub="Single-page sessions"
      />
      <StatCard
        theme="duration"
        icon={<ClockIcon />}
        label="Avg duration"
        value={avgDuration}
        sub="Per visit"
      />
    </div>
  )
}