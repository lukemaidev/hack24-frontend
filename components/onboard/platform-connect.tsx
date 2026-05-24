'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiTiktok } from "react-icons/si"

interface PlatformConnectProps {
  onNext: () => void
  onBack: () => void
}

const platforms = [
  { id: "instagram", icon: FaInstagram, label: "Instagram" },
  { id: "tiktok", icon: SiTiktok, label: "TikTok" },
  { id: "twitter", icon: FaXTwitter, label: "X (Twitter)" },
  { id: "youtube", icon: FaYoutube, label: "YouTube" },
  { id: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
]

export function PlatformConnect({ onNext, onBack }: PlatformConnectProps) {
  const [connected, setConnected] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setConnected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Connect what you use.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Tap each platform you want us to read. At least one is needed to run your feed audit.
          </p>
          <div className="space-y-3">
            {platforms.map(({ id, icon: Icon, label }) => {
              const isConnected = connected.has(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    isConnected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted" />
                    <span>{label}</span>
                  </div>
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Check className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Connect</span>
                  )}
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
            disabled={connected.size === 0}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
