'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface PrescriptionCoverProps {
  onNext: () => void
  onBack: () => void
}

export function PrescriptionCover({ onNext, onBack }: PrescriptionCoverProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Here are the voices you should be hearing.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            We picked these based on your goal, your stage, and the people you already look up to. You can swap, remove, or add any of them. This is your prescription, not ours.
          </p>

          {/* Visual teaser cards */}
          <div className="space-y-2">
            {["Goal alignment", "Source quality", "Content depth"].map((label, i) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3"
              >
                <span className="font-serif text-sm text-muted">{i + 1}</span>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            See my mentors
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
