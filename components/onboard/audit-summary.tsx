'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface AuditSummaryProps {
  onNext: () => void
  onBack: () => void
}

export function AuditSummary({ onNext, onBack }: AuditSummaryProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-6">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Audit summary
          </CardTitle>

          {/* 3-metric row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "31", label: "Score" },
              { value: "6%", label: "Alignment" },
              { value: "15m", label: "On goal" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-background py-4"
              >
                <span className="font-serif text-2xl font-semibold text-foreground">{value}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted">{label}</span>
              </div>
            ))}
          </div>

          {/* Collapsible-style summary links */}
          <div className="divide-y divide-border rounded-2xl border border-border bg-background">
            {[
              "Radar comparison",
              "Diet breakdown",
              "Identity drift",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 text-sm text-foreground"
              >
                <span>{label}</span>
                <span className="text-muted">→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} className="flex-1">
            See my prescription
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
