'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/store/user-store"

interface DietBreakdownProps {
  onNext: () => void
  onBack: () => void
}

const PALETTE = [
  "#FF6A00",
  "#FFC89E",
  "#7a8b6f",
  "#b5a48a",
  "#c97b5c",
  "#8b9e88",
  "#ccc6bc",
  "#a0856e",
]

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export function DietBreakdown({ onNext, onBack }: DietBreakdownProps) {
  const userId = useUserStore((s) => s.user?._id)
  const [categories, setCategories] = useState<{ label: string; percent: number; color: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userId) {
      setError("User not found.")
      setLoading(false)
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const scores: Record<string, number> = data?.data?.targetCategoryScores ?? {}
        const entries = Object.entries(scores)
        if (!entries.length) throw new Error("No category scores available yet.")

        const total = entries.reduce((sum, [, v]) => sum + v, 0)

        const sorted = entries
          .sort(([, a], [, b]) => b - a)
          .map(([key, value], i) => ({
            label: formatLabel(key),
            percent: total > 0 ? Math.round((value / total) * 100) : 0,
            color: PALETTE[i % PALETTE.length],
          }))

        // Fix rounding so percents sum to exactly 100
        const diff = 100 - sorted.reduce((s, c) => s + c.percent, 0)
        if (sorted.length > 0) sorted[0].percent += diff

        setCategories(sorted)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load breakdown."))
      .finally(() => setLoading(false))
  }, [userId])

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            What you want to consume.
          </CardTitle>
          <p className="text-xs text-muted">Distribution of your target category scores.</p>
        </div>

        {loading && (
          <p className="text-center text-sm text-muted animate-pulse">Loading breakdown…</p>
        )}

        {!loading && error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
        )}

        {!loading && !error && (
          <>
            {/* Stacked bar */}
            <div className="flex h-5 w-full overflow-hidden rounded-full">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  title={`${cat.label}: ${cat.percent}%`}
                />
              ))}
            </div>

            {/* Category list */}
            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-foreground">{cat.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{cat.percent}%</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} disabled={loading} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
