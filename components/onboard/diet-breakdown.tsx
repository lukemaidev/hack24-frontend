'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface DietBreakdownProps {
  onNext: () => void
  onBack: () => void
}

const categories = [
  { label: "Entertainment", percent: 38, color: "#c97b5c" },
  { label: "Food & lifestyle", percent: 22, color: "#b5a48a" },
  { label: "Fitness", percent: 14, color: "#8b9e88" },
  { label: "Business", percent: 9, color: "#7a8b6f" },
  { label: "Other", percent: 17, color: "#ccc6bc" },
]

export function DietBreakdown({ onNext, onBack }: DietBreakdownProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            What you have been eating.
          </CardTitle>
          <p className="text-xs text-muted">Estimated intake baseline distribution.</p>
        </div>

        {/* Stacked bar */}
        <div className="flex h-5 w-full overflow-hidden rounded-full">
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
              title={`${cat.label}: ${cat.percent}%`}
            />
          ))}
        </div>

        {/* Category list */}
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-foreground">{cat.label}</span>
              </div>
              <span className="font-semibold text-foreground">{cat.percent}%</span>
            </div>
          ))}
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
