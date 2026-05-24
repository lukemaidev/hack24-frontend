'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface VisionQ1Props {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onSkip: () => void
}

export function VisionQ1({ value, onChange, onNext, onSkip }: VisionQ1Props) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Who do you want to become?
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Be honest. Be specific.
          </p>
          <div className="space-y-2">
            <Input
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Be honest. Be specific."
              className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button type="button" onClick={onNext} className="w-full rounded-full py-3 text-sm font-semibold">
            Continue
          </Button>
          <Button variant="ghost" type="button" onClick={onSkip} className="w-full text-sm text-muted">
            I am not sure yet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
