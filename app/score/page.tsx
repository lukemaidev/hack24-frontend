'use client'

import { useEffect, useState } from "react"
import BottomNav from "@/components/bottom-nav"
import { useUserStore } from "@/store/user-store"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

function sortAndTake(scores: Record<string, number>, n: number) {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([label, value]) => ({ label: formatLabel(label), value }))
}

const PALETTE = [
  "#FF6A00", "#FFC89E", "#7a8b6f", "#b5a48a",
  "#c97b5c", "#8b9e88", "#ccc6bc", "#a0856e",
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function BarRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScorePage() {
  const userId = useUserStore((s) => s.user?._id)

  const [targetBars, setTargetBars] = useState<{ label: string; value: number }[]>([])
  const [currentBars, setCurrentBars] = useState<{ label: string; value: number }[]>([])
  const [distribution, setDistribution] = useState<{ label: string; percent: number; color: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!userId) { setError("User not found."); setLoading(false); return }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const current: Record<string, number> = data?.data?.currentCategoryScores ?? {}
        const target: Record<string, number> = data?.data?.targetCategoryScores ?? {}

        if (!Object.keys(current).length && !Object.keys(target).length)
          throw new Error("Score data not available yet.")

        // RadarChart section
        setTargetBars(sortAndTake(target, 2))
        setCurrentBars(sortAndTake(current, 4))

        // DietBreakdown section
        const entries = Object.entries(target).sort(([, a], [, b]) => b - a)
        const total = entries.reduce((sum, [, v]) => sum + v, 0)
        const dist = entries.map(([key, value], i) => ({
          label: formatLabel(key),
          percent: total > 0 ? Math.round((value / total) * 100) : 0,
          color: PALETTE[i % PALETTE.length],
        }))
        const diff = 100 - dist.reduce((s, c) => s + c.percent, 0)
        if (dist.length > 0) dist[0].percent += diff
        setDistribution(dist)
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load scores."))
      .finally(() => setLoading(false))
  }, [userId])

  return (
    <div className="min-h-screen bg-background px-1 pt-4 pb-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">

        {/* Header */}
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Score</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">
            Algorithm trajectory
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            How your current feed compares to the version of you that gets there.
          </p>
        </div>

        {loading && (
          <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
            <p className="text-center text-sm text-muted animate-pulse">Loading your scores…</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Category comparison (RadarChart) ── */}
            <div className="rounded-[32px] border border-card bg-card p-5 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)] space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground">
                  You vs your target
                </p>
                <p className="mt-1 text-xs text-muted">Category scores based on your feed and your goals.</p>
              </div>

              {/* Target — top 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#7a8b6f]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Target — Top 2</p>
                </div>
                {targetBars.map((bar) => (
                  <BarRow key={bar.label} {...bar} color="#7a8b6f" />
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* Current — top 4 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Current feed — Top 4</p>
                </div>
                {currentBars.map((bar) => (
                  <BarRow key={bar.label} {...bar} color="#FF6A00" />
                ))}
              </div>
            </div>

            {/* ── Target distribution (DietBreakdown) ── */}
            <div className="rounded-[32px] border border-card bg-card p-5 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)] space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground">
                  Target distribution
                </p>
                <p className="mt-1 text-xs text-muted">How your ideal diet is split across categories.</p>
              </div>

              {/* Stacked bar */}
              <div className="flex h-5 w-full overflow-hidden rounded-full">
                {distribution.map((cat) => (
                  <div
                    key={cat.label}
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                    title={`${cat.label}: ${cat.percent}%`}
                  />
                ))}
              </div>

              {/* Legend list */}
              <div className="space-y-2.5">
                {distribution.map((cat) => (
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
            </div>
          </>
        )}

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
