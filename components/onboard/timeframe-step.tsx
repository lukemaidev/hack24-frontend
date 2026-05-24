'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface TimeframeStepProps {
  value: string
  onSelect: (value: string) => void
  onNext: () => void
  onBack: () => void
}

const options = ["Within 1 year", "1 to 3 years", "3 to 5 years", "Longer than that"]

export function TimeframeStep({ value, onSelect, onNext, onBack }: TimeframeStepProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            When do you want to be there?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            The timeframe helps prioritize what content surfaces first.
          </p>
          <div className="grid gap-3">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                  value === option
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
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
