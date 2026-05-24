'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useUserStore } from "@/store/user-store"

interface ScoreRevealProps {
  onNext: () => void
}

export function ScoreReveal({ onNext }: ScoreRevealProps) {
  const userId = useUserStore((s) => s.user?._id)
  const [score, setScore] = useState<number | null>(null)
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

        const categories = Array.from(
          new Set([...Object.keys(current), ...Object.keys(target)])
        )

        if (categories.length === 0) throw new Error("Score not available yet.")

        const totalDiff = categories.reduce((sum, cat) => {
          return sum + Math.abs((target[cat] ?? 0) - (current[cat] ?? 0))
        }, 0)

        setScore(Math.round(totalDiff / categories.length))
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load your score."))
      .finally(() => setLoading(false))
  }, [userId])

  const gap = score

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col items-center justify-between gap-8 p-6 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Your Algorithm Score</p>

          {loading && (
            <p className="font-serif text-2xl text-muted animate-pulse">Calculating…</p>
          )}

          {!loading && error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
          )}

          {!loading && score !== null && (
            <>
              <p className="font-serif text-[96px] font-semibold leading-none text-foreground">
                {score}
              </p>
              <p className="text-sm text-muted">points average gap</p>
              <h2 className="mt-4 max-w-[240px] font-serif text-xl font-semibold leading-snug text-foreground">
                Your feed and your goals are {gap} points apart on average.
              </h2>
              <p className="text-sm leading-6 text-muted">
                This is where you start. Most people begin here. What matters is the direction you move from here.
              </p>
            </>
          )}
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={loading}
          className="w-full rounded-full py-3 text-sm font-semibold"
        >
          Show me why
        </Button>
      </CardContent>
    </Card>
  )
}
