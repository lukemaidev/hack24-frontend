'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface WelcomeProps {
  onNext: () => void
}

export function Welcome({ onNext }: WelcomeProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Hi. Before we start, we need to know one thing.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            We will guide you through a quick onboarding flow so your feed starts matching the version of you you want to become.
          </p>
        </div>

        <Button type="button" onClick={onNext} className="w-full rounded-full py-3 text-sm font-semibold">
          Continue
        </Button>
      </CardContent>
    </Card>
  )
}
