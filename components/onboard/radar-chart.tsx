'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface RadarChartProps {
  onNext: () => void
  onBack: () => void
}

export function RadarChart({ onNext, onBack }: RadarChartProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            You vs the version of you that gets there.
          </CardTitle>
          <p className="text-xs text-muted">Radar mapping based on your stated goal metrics.</p>
        </div>

        {/* SVG Radar */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full max-w-[220px]">
            {/* Grid rings */}
            <polygon points="100,20 180,60 180,140 100,180 20,140 20,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            <polygon points="100,60 140,80 140,120 100,140 60,120 60,80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            {/* Axis lines */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            <line x1="20" y1="60" x2="180" y2="140" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            <line x1="20" y1="140" x2="180" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            {/* Ideal Target Shape */}
            <polygon
              points="100,30 170,70 160,130 100,160 30,130 40,70"
              fill="rgba(122,139,111,0.15)"
              stroke="#7a8b6f"
              strokeWidth="1.5"
            />
            {/* Actual Feed Shape */}
            <polygon
              points="100,130 120,90 140,110 100,150 70,120 60,110"
              fill="rgba(201,123,92,0.25)"
              stroke="#c97b5c"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#7a8b6f]" /> Ideal diet
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c97b5c]" /> Your feed
          </span>
        </div>

        <div className="space-y-3">
          <p className="text-center text-xs text-muted">
            Largest gaps: goal alignment, source quality, depth.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="button" onClick={onNext} className="flex-1">
              See my digital diet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
