'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiTiktok } from "react-icons/si"

interface PlatformConnectProps {
  selected: string[]
  onSelect: (platforms: string[]) => void
  onNext: () => void
  onBack: () => void
}

export const platforms = [
  { id: "instagram", icon: FaInstagram, label: "Instagram" },
  { id: "tiktok", icon: SiTiktok, label: "TikTok" },
  { id: "twitter", icon: FaXTwitter, label: "X (Twitter)" },
  { id: "youtube", icon: FaYoutube, label: "YouTube" },
  { id: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
]

export function PlatformConnect({ selected, onSelect, onNext, onBack }: PlatformConnectProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((p) => p !== id))
    } else {
      onSelect([...selected, id])
    }
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <div>
            <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
              Choose your platforms.
            </CardTitle>
            <p className="mt-3 text-sm leading-6 text-muted">
              Select every platform you want us to analyse. You&apos;ll upload screenshots for each one next.
            </p>
          </div>

          <div className="space-y-3">
            {platforms.map(({ id, icon: Icon, label }) => {
              const active = selected.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted"}`} />
                    <span>{label}</span>
                  </div>
                  <span className={`text-xs ${active ? "text-primary font-semibold" : "text-muted"}`}>
                    {active ? "Selected" : "Select"}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={selected.length === 0}
            className="flex-1"
          >
            Next {selected.length > 0 && `(${selected.length})`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
