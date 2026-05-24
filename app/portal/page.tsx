'use client'

import { useEffect, useState } from "react"
import BottomNav from "@/components/bottom-nav"
import { InfluenceReachCard } from "@/components/influence-reach-card"
import { useUserStore } from "@/store/user-store"

interface CategoryRow {
  label: string
  target: number
  current: number
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

function CategoryCard({ label, target, current }: CategoryRow) {
  const gap = Math.abs(target - current)
  const ahead = current >= target
  return (
    <div className="rounded-[32px] border border-card bg-card p-5 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
          ahead
            ? "bg-[#7a8b6f]/10 text-[#7a8b6f]"
            : "bg-destructive/10 text-destructive"
        }`}>
          {ahead ? "+" : "-"}{gap} pts
        </span>
      </div>

      {/* Target bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted">
          <span>Target</span>
          <span className="font-semibold text-foreground">{target}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-[#7a8b6f] transition-all duration-500"
            style={{ width: `${target}%` }}
          />
        </div>
      </div>

      {/* Current bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted">
          <span>Current</span>
          <span className="font-semibold text-foreground">{current}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${current}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function PortalPage() {
  const user = useUserStore((s) => s.user)
  const firstName = user?.fullName?.split(" ")[0] ?? "there"

  const [topCategories, setTopCategories] = useState<CategoryRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?._id) { setLoading(false); return }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/users/${user._id}`)
      .then((res) => res.ok ? res.json() : Promise.reject(res.status))
      .then((data) => {
        const target: Record<string, number> = data?.data?.targetCategoryScores ?? {}
        const current: Record<string, number> = data?.data?.currentCategoryScores ?? {}

        const top2 = Object.entries(target)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 2)
          .map(([key, targetVal]) => ({
            label: formatLabel(key),
            target: targetVal,
            current: current[key] ?? 0,
          }))

        setTopCategories(top2)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?._id])

  return (
    <div className="min-h-screen bg-background px-1 pt-4 pb-1">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 px-1">

        {/* Header */}
        <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-muted">Morning, {firstName}</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight text-foreground font-serif">
                Your portal is ready.
              </h1>
            </div>
            <div className="rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              31 <span className="text-xs text-muted">+2</span>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">
            This is where you come every morning. Check where your feed stands against your targets.
          </p>
        </div>

        {/* Top 2 target categories — each its own card */}
        {loading && (
          <div className="rounded-[32px] border border-card bg-card p-6 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
            <p className="text-center text-sm text-muted animate-pulse">Loading categories…</p>
          </div>
        )}

        {!loading && topCategories.map((cat) => (
          <CategoryCard key={cat.label} {...cat} />
        ))}

        {/* Influence & Reach */}
        <div className="rounded-[32px] border border-card bg-card p-5 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
          <InfluenceReachCard />
        </div>

        <div className="h-24" />
        <BottomNav />
      </div>
    </div>
  )
}
