'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface IdentityDriftProps {
  aspiration?: string
  onNext: () => void
  onBack: () => void
}

export function IdentityDrift({ aspiration, onNext, onBack }: IdentityDriftProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Who your feed thinks you are.
          </CardTitle>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {/* Left: stated */}
            <div className="flex flex-col gap-2 bg-card p-4">
              <span className="text-[10px] uppercase tracking-widest text-muted">You said</span>
              <p className="font-serif text-sm italic leading-6 text-foreground">
                {aspiration
                  ? `${aspiration.charAt(0).toUpperCase()}${aspiration.slice(1)}.`
                  : "A future founder building a SaaS in 1 to 3 years."}
              </p>
            </div>
            {/* Right: actual */}
            <div className="flex flex-col gap-2 bg-background p-4">
              <span className="text-[10px] uppercase tracking-widest text-muted">Your feed says</span>
              <p className="font-serif text-sm italic leading-6 text-foreground">
                A 22-year-old into comedy, lifestyle vlogs, and food content.
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-muted">
            There is a real gap. The good news: gaps are closeable. Here is how to start.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            Show me who to follow
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
