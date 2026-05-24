'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useCompleteOnboarding } from "@/hooks/use-auth"

interface GatewayLandingProps {
  onNext: () => void
}

export function GatewayLanding({ onNext }: GatewayLandingProps) {
  const { completeOnboarding, isLoading } = useCompleteOnboarding()

  const handleOpen = async () => {
    try {
      await completeOnboarding()
    } finally {
      // Navigate regardless — don't block the user if the PATCH fails
      onNext()
    }
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col items-center justify-between gap-8 p-6 text-center">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          {/* Icon mark */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-primary/10">
            <span className="font-serif text-xl font-semibold text-primary">A/H</span>
          </div>

          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Your portal is ready.
          </CardTitle>
          <p className="max-w-[260px] text-sm leading-6 text-muted">
            Three of your mentors have already posted in the last 24 hours. Come here every morning to catch what matters.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpen}
          disabled={isLoading}
          className="w-full rounded-full py-3 text-sm font-semibold"
        >
          {isLoading ? "Setting up…" : "Open my portal"}
        </Button>
      </CardContent>
    </Card>
  )
}
