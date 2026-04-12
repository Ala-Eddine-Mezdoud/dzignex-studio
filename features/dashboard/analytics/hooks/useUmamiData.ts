"use client"

import { useState, useEffect } from "react"

const UMAMI_API_BASE = "https://api.umami.is/v1"

async function fetchUmamiData(endpoint: string) {
  const response = await fetch(`${UMAMI_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UMAMI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data from Umami: ${response.statusText}`)
  }

  return response.json()
}

export function useUmamiData<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!endpoint) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchUmamiData(endpoint as string)
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "An error occurred")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      cancelled = true
    }
  }, [endpoint])

  return { data, loading, error }
}
