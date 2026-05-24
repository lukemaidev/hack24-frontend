'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface VisionQ2Props {
  archetype: string
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function VisionQ2({ archetype, value, onChange, onNext, onBack }: VisionQ2Props) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted">
            You said: {archetype || "a founder"}
          </div>
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            What kind of founder do you want to be in five years?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            A small detail here helps the system recommend a better feed.
          </p>
          <Input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="E.g., bootstrapped SaaS founder shipping code."
            className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
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
