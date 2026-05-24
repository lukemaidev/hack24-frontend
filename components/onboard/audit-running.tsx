'use client'

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface AuditRunningProps {
  onNext: () => void
}

const stages = [
  { title: "Reading your Instagram Explore", sub: "Comparing content categories…" },
  { title: "Scanning your TikTok feed", sub: "Identifying signal patterns…" },
  { title: "Checking your YouTube history", sub: "Mapping topic clusters…" },
  { title: "Analysing content alignment", sub: "Calculating your score…" },
]

export function AuditRunning({ onNext }: AuditRunningProps) {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < stages.length - 1) return prev + 1
        clearInterval(interval)
        setTimeout(onNext, 900)
        return prev
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [onNext])

  const stage = stages[stageIndex]

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col items-center justify-center gap-8 p-6 text-center">
        {/* Pulse animation */}
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-primary opacity-20" />
          <span className="relative inline-flex h-8 w-8 rounded-full bg-primary opacity-60" />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold font-serif text-foreground transition-all">
            {stage.title}
          </p>
          <p className="text-sm text-muted transition-all">{stage.sub}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {stages.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                i <= stageIndex ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
