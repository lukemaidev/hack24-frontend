'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface VisionSummaryProps {
  aspiration: string
  archetype: string
  drillDetail: string
  timeframe: string
  stage: string
  constraint: string
  onNext: () => void
  onBack: () => void
}

export function VisionSummary({ aspiration, archetype, drillDetail, timeframe, stage, constraint, onNext, onBack }: VisionSummaryProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Here is what we heard.
          </CardTitle>
          <div className="space-y-4 rounded-3xl border border-border bg-background p-4 text-sm leading-6 text-foreground">
            <p className="font-semibold">Goal</p>
            <p>{aspiration || "A future founder building something meaningful."}</p>
            <p className="font-semibold mt-4">Version</p>
            <p>{archetype || "Builder"}</p>
            <p className="font-semibold mt-4">Timeframe</p>
            <p>{timeframe || "Within 1 year"}</p>
            <p className="font-semibold mt-4">Constraint</p>
            <p>{constraint || "Time"}</p>
          </div>
          <p className="text-sm text-muted">
            This summary is built from what you told us. If anything feels off, go back and update it.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Let me adjust something
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            Yes, this is me
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
