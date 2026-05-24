'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiTiktok } from "react-icons/si"

interface PermissionIntroProps {
  onNext: () => void
}

const platforms = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: SiTiktok, label: "TikTok" },
  { icon: FaXTwitter, label: "X (Twitter)" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaLinkedin, label: "LinkedIn" },
]

export function PermissionIntro({ onNext }: PermissionIntroProps) {
  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Now we need to see what your feed is feeding you.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Algorithm Health works by understanding what you actually consume, then helping you shift it. We will connect to your social accounts to read what your feed is showing you. We never post on your behalf. We never see anything you do not show us.
          </p>
          <div className="space-y-2">
            {platforms.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3"
              >
                <Icon className="h-4 w-4 text-muted" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-center text-xs text-muted">
            You can disconnect any platform at any time.
          </p>
          <Button type="button" onClick={onNext} className="w-full rounded-full py-3 text-sm font-semibold">
            Connect my platforms
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
