'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface StageStepProps {
  value: string
  onSelect: (value: string) => void
  onNext: () => void
  onBack: () => void
}

const stages = [
  { label: "Just starting out", description: "I have not really begun" },
  { label: "I have made some moves", description: "I have started taking small steps" },
  { label: "I am already a few steps in", description: "I have real momentum" },
]

export function StageStep({ value, onSelect, onNext, onBack }: StageStepProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Where are you now in this journey?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            This helps the app surface the right next step instead of content for people far ahead.
          </p>
          <div className="grid gap-3">
            {stages.map((stage) => (
              <button
                key={stage.label}
                type="button"
                onClick={() => onSelect(stage.label)}
                className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                  value === stage.label
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                <strong>{stage.label}</strong>
                <p className="mt-2 text-sm text-muted">{stage.description}</p>
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
