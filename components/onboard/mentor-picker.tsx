'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface MentorPickerProps {
  onNext: () => void
  onBack: () => void
}

const mentors = ["Expert Curator", "Growth Coach", "Creative Guide", "Leadership Mentor"]

export function MentorPicker({ onNext, onBack }: MentorPickerProps) {
  const [selected, setSelected] = useState<string>(mentors[0])

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Pick the version of you that feels closest.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            We will use this to tailor the mentors and content recommended to you.
          </p>
          <div className="grid gap-3">
            {mentors.map((mentor) => (
              <button
                key={mentor}
                type="button"
                onClick={() => setSelected(mentor)}
                className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${
                  selected === mentor
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                {mentor}
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
