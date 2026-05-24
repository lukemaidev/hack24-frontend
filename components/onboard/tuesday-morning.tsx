'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface TuesdayMorningProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function TuesdayMorning({ value, onChange, onNext, onBack }: TuesdayMorningProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Picture yourself when you have made it.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            What does a good Tuesday morning look like?
          </p>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Describe the feeling, actions, and focus details."
            rows={5}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
          <p className="text-xs text-muted">Take your time. Be specific. This is the most important answer.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
