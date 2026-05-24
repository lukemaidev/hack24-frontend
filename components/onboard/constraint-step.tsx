'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ConstraintStepProps {
  value: string
  onSelect: (value: string) => void
  onNext: () => void
  onBack: () => void
}

const constraints = ["Time", "Money", "Skills", "Confidence", "Connections", "Something else"]

export function ConstraintStep({ value, onSelect, onNext, onBack }: ConstraintStepProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            What is the biggest thing in the way?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Choose the primary constraint that matters most right now.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {constraints.map((constraint) => (
              <button
                key={constraint}
                type="button"
                onClick={() => onSelect(constraint)}
                className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                  value === constraint
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                {constraint}
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
