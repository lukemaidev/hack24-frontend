'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/store/user-store"

interface TuesdayMorningProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function TuesdayMorning({ value, onChange, onNext, onBack }: TuesdayMorningProps) {
  const userId = useUserStore((s) => s.user?._id)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleContinue = async () => {
    if (!value.trim()) return

    if (!userId) {
      setError("User not found. Please log in again.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ai-actions/predict-target-scores/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: value }),
        }
      )
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      onNext()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            What do you want to pivot your feed towards?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            For example, you might want to join YC or gain more muscle...
          </p>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe the feeling, actions, and focus details."
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
          <p className="text-xs text-muted">Take your time. Be specific. This is the most important answer.</p>

          {error && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-xs text-destructive">{error}</p>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            type="button"
            onClick={handleContinue}
            disabled={!value.trim() || loading}
            className="flex-1"
          >
            {loading ? "Generating…" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
