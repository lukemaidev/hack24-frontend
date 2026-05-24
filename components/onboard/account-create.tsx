'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface AccountCreateProps {
  onNext: () => void
  onBack: () => void
}

export function AccountCreate({ onNext, onBack }: AccountCreateProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Card className="h-full w-full rounded-[32px] border border-card bg-card p-0 shadow-[0_30px_70px_-40px_rgba(31,29,26,0.18)]">
      <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
        <div className="space-y-6">
          <CardTitle className="text-3xl font-semibold leading-tight tracking-[-0.03em] font-serif text-foreground">
            Create your account.
          </CardTitle>
          <p className="text-sm leading-6 text-muted">
            Enter the details below so we can set up your profile and keep your progress saved.
          </p>
          <div className="space-y-4">
            <label className="block space-y-2 text-sm uppercase tracking-[0.28em] text-muted">
              Email Address
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@domain.com"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
              />
            </label>
            <label className="block space-y-2 text-sm uppercase tracking-[0.28em] text-muted">
              Password
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base focus-visible:ring-0"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={onBack} className="flex-1">
              Back
            </Button>
            <Button type="button" onClick={onNext} className="flex-1">
              Finish
            </Button>
          </div>
          <p className="text-center text-xs text-muted">
            You can update these later in your profile settings.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
