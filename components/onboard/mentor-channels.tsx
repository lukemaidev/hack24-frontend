'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Plus, Check } from "lucide-react"

interface MentorChannelsProps {
  onNext: () => void
  onBack: () => void
}

const prescribed = [
  { id: "hormozi", name: "Alex Hormozi", handle: "@hormozi", platform: "YouTube, Instagram", why: "Business systems & growth" },
  { id: "priestley", name: "Daniel Priestley", handle: "@danielpriestley", platform: "LinkedIn", why: "Key Person of Influence frameworks" },
  { id: "sahil", name: "Sahil Bloom", handle: "@sahilbloom", platform: "X (Twitter)", why: "Mental models for founders" },
  { id: "brown", name: "Brené Brown", handle: "@brenebrown", platform: "LinkedIn, Instagram", why: "Leadership & resilience" },
  { id: "ries", name: "Eric Ries", handle: "@ericries", platform: "X (Twitter)", why: "Lean startup methodology" },
  { id: "ferriss", name: "Tim Ferriss", handle: "@tferriss", platform: "YouTube", why: "Productivity & learning fast" },
]

export function MentorChannels({ onNext, onBack }: MentorChannelsProps) {
  const [added, setAdded] = useState<Set<string>>(new Set(prescribed.map((m) => m.id)))

  const toggle = (id: string) => {
    setAdded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
              Set up your feed.
            </CardTitle>
            <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted">
              {added.size} prescribed
            </span>
          </div>

          <div className="max-h-[340px] space-y-2 overflow-y-auto pr-1">
            {prescribed.map((mentor) => {
              const isAdded = added.has(mentor.id)
              return (
                <div
                  key={mentor.id}
                  className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
                    <p className="text-xs text-muted">{mentor.platform}</p>
                    <p className="text-xs text-muted italic">{mentor.why}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(mentor.id)}
                    className={`ml-3 flex-shrink-0 rounded-full border p-1.5 transition ${
                      isAdded
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted hover:border-primary"
                    }`}
                  >
                    {isAdded ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="button" onClick={onNext} disabled={added.size === 0} className="flex-1">
            Set up my portal
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
