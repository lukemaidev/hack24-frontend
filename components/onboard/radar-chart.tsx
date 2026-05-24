'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/store/user-store"

interface RadarChartProps {
  onNext: () => void
  onBack: () => void
}

interface CategoryBar {
  label: string
  value: number
}

function sortAndTake(scores: Record<string, number>, n: number): CategoryBar[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([label, value]) => ({ label, value }))
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

function BarRow({
  label,
  value,
  color,
  max,
}: {
  label: string
  value: number
  color: string
  max: number
}) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{formatLabel(label)}</span>
        <span className="text-muted">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function RadarChart({ onNext, onBack }: RadarChartProps) {
  const userId = useUserStore((s) => s.user?._id)
  const [targetBars, setTargetBars] = useState<CategoryBar[]>([])
  const [currentBars, setCurrentBars] = useState<CategoryBar[]>([])
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
        const user = data?.data
        const current: Record<string, number> = user?.currentCategoryScores ?? {}
        const target: Record<string, number> = user?.targetCategoryScores ?? {}

        if (!Object.keys(current).length && !Object.keys(target).length)
          throw new Error("Score data not available yet.")

        setCurrentBars(sortAndTake(current, 4))
        setTargetBars(sortAndTake(target, 2))
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load scores."))
      .finally(() => setLoading(false))
  }, [userId])

  const max = 100

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            You vs the version of you that gets there.
          </CardTitle>
          <p className="text-xs text-muted">Category scores based on your feed and your goals.</p>
        </div>

        {loading && (
          <p className="text-center text-sm text-muted animate-pulse">Loading your scores…</p>
        )}

        {!loading && error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
        )}

        {!loading && !error && (
          <div className="space-y-5">
            {/* Target scores */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7a8b6f]" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Target — Top 2</p>
              </div>
              {targetBars.map((bar) => (
                <BarRow key={bar.label} {...bar} color="#7a8b6f" max={max} />
              ))}
            </div>

            <div className="h-px bg-border" />

            {/* Current scores */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Current feed — Top 4</p>
              </div>
              {currentBars.map((bar) => (
                <BarRow key={bar.label} {...bar} color="#FF6A00" max={max} />
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} disabled={loading} className="flex-1">
            See my digital diet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
