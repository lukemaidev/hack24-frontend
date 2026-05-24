'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface ArchetypePickerProps {
  value: string
  onSelect: (value: string) => void
  onNext: () => void
  onBack: () => void
}

const archetypes = ["Builder", "Creative", "Leader", "Learner"]

export function ArchetypePicker({ value, onSelect, onNext, onBack }: ArchetypePickerProps) {
  const [selected, setSelected] = useState<string>(value || archetypes[0])

  const handleChoose = (choice: string) => {
    setSelected(choice)
    onSelect(choice)
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Pick the version of you that feels closest.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            You can change this any time.
          </p>
          <div className="grid gap-3">
            {archetypes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleChoose(item)}
                className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                  selected === item
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                {item}
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
