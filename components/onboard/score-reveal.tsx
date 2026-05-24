'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ScoreRevealProps {
  onNext: () => void
}

export function ScoreReveal({ onNext }: ScoreRevealProps) {
  const score = 31

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col items-center justify-between gap-8 p-6 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-muted">Your Algorithm Score</p>
          <p className="font-serif text-[96px] font-semibold leading-none text-foreground">
            {score}
          </p>
          <p className="text-sm text-muted">out of 100</p>
          <h2 className="mt-4 max-w-[240px] font-serif text-xl font-semibold leading-snug text-foreground">
            Your feed and your goals are {100 - score} points apart.
          </h2>
          <p className="text-sm leading-6 text-muted">
            This is where you start. Most people begin here. What matters is the direction you move from here.
          </p>
        </div>

        <Button type="button" onClick={onNext} className="w-full rounded-full py-3 text-sm font-semibold">
          Show me why
        </Button>
      </CardContent>
    </Card>
  )
}
